import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

import razorpay from 'razorpay'


// API to register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" })
    }


    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" })

    }


    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" })

    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    const userData = {
      name, email, password: hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })


  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// API for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    }

    else {
      res.json({ success: false, message: "Invalid credentials" })

    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// API to get user profile data
export const getProfile = async (req, res) => {
  try {
    // const { userId } = req.body
    const userData = await userModel.findById(req.userId).select('-password')


    res.json({ success: true, userData })
  }

  catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// API to update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" })
    }

    const updateFields = {
      name,
      phone,
      address: address ? JSON.parse(address) : {},
      dob,
      gender,
    }

    if (imageFile) {
      // Upload Image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image', folder: "vytal users" })
      updateFields.image = imageUpload.secure_url
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      { $set: updateFields },
      { new: true }
    ).select("-password")

    res.json({ success: true, message: "Profile Updated", userData: updatedUser })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// API to book appointment
export const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId
    const { docId, slotDate, slotTime } = req.body

    const docData = await doctorModel.findById(docId).select('-password')

    if (!docData || !docData.available) {
      return res.json({ success: false, message: "Doctor not available" })
    }

    let slots_booked = docData.slots_booked

    // Checking for slots availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" })
      }
      else {
        slots_booked[slotDate].push(slotTime)
      }
    }
    else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select('-password');

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // Save new slots data in dacData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: "Appointment Booked" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// API to get user appointments for frontend my-appointments page
export const listAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId })

    res.json({ success: true, appointments })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}



// API to cancel appointment
export const cancelAppointment = async (req, res) => {
  try {

    const userId = req.userId
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "" })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    const { docId, slotDate, slotTime } = appointmentData

    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, { slots_booked }

    )
    res.json({ success: true, message: "Appointment Cancelled" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// })

// API to make payment of appointment using razorpay
// export const paymentRazorpay = async (req, res) => {
//   try {

//     const { appointmentId } = req.body;

//     const appointmentData = await appointmentModel.findById(appointmentId)

//     if (!appointmentData || appointmentData.cancelled) {
//       return res.json({ success: false, message: "Appointment Cancelled or not found" })
//     }

//     // Creating options for razorpay payment
//     const options = {
//       amount: appointmentData.amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: appointmentId,
//     }

//     // creation of an order 
//     const order = await razorpayInstance.orders.create(options)

//     res.json({ success: true, order })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }


// API to verify payment of razorpay


// export const verifyRazorpay = async (req, res) => {
//   try {
//     const {razorpay_order_id} = req.body
//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//     console.log(orderInfo);

//     if (orderInfo.status === 'paid') {
//       await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})

//       res.json({success: true, message: "Payment Successfull"})
//     }
//     else {
//       res.json({success: false, message: "Payment Failed"})
//     }

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }