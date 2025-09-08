import express from 'express'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import {changeAvailability} from '../controllers/doctorController.js'
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)

adminRouter.post('/login', loginAdmin)

adminRouter.post('/all-doctors', authAdmin, allDoctors)

adminRouter.post('/change-availability', authAdmin, changeAvailability)

adminRouter.get('/appointments', authAdmin, appointmentsAdmin)

adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)

adminRouter.get("/dashboard", authAdmin, adminDashboard)


export default adminRouter