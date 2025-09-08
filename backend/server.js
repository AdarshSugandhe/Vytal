import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/DoctorRoute.js'
import userRouter from './routes/userRoute.js'



// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors())


app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send("API working ✅")
})

app.listen(port, () => console.log("Server started", port ))