# Vytal 🩺  
![Build](https://img.shields.io/badge/build-passing-brightgreen)  
![Tech](https://img.shields.io/badge/stack-React.js%20%7C%20Node.js%20%7C%20MongoDB-blue)  

A **doctor appointment platform** that simplifies healthcare by connecting **Admin, Doctors, and Users** on a single seamless system.  

---

## 🚀 Vision  
Healthcare shouldn’t feel like paperwork. **Vytal** is designed to make scheduling, managing, and attending doctor appointments effortless for patients, efficient for doctors, and transparent for admins.  

---

## ✨ Features  
- 👩‍⚕️ **Doctor Portal** – Manage schedules, confirm/cancel appointments, and interact with patients.  
- 🧑‍💻 **User Dashboard** – Book appointments, view visits, and manage personal health profiles.  
- 🛠️ **Admin Panel** – Oversee system activity, onboard doctors, and manage users.  
- 🔐 **Role-Based Authentication** – Secure login/signup for Admin, Doctor, and User roles.  
- ⚡ **Modern UI/UX** – Built with React + Tailwind for speed and simplicity.  

---

## 📂 Folder Structure  

vytal/
```
│── admin/ # Admin dashboard – management of doctors & users
│── frontend/ # User & Doctor web app – appointment booking, schedules, profiles
│── backend/ # APIs, database models, authentication & business logic
```
---

## 🛠️ Tech Stack  
- **Frontend** → Next.js, React, Tailwind CSS  
- **Backend** → Node.js, Express  
- **Database** → MongoDB
- **Authentication** → JWT-based secure login  
- **Deployment** → Vercel + cloud backend  

---

## ⚙️ Setup & Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/AdarshSugandhe/vytal.git
   cd vytal
Install dependencies (do this in frontend/, backend/, admin/)

npm install


Configure environment variables
Create .env files in each module with:

DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=5000


Run the app in dev mode

npm run dev

