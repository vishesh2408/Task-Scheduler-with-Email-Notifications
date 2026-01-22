# TaskFlow - Automated Task Scheduler

A robust task scheduling system built with the MERN stack that enables users to manage tasks and receive automated email reminders at scheduled times. The application features a modern, responsive glassmorphism UI and a powerful backend scheduler.

## 🚀 Key Features

*   **Task Management (CRUD):** Create, Read, Update, and Delete tasks with ease.
*   **Automated Scheduler:** Uses `node-cron` to check for due tasks every minute.
*   **Email Reminders:** Integrates with `Nodemailer` to send email alerts to multiple assignees when a task is due.
*   **Smart Dashboard:** Automatically categorizes tasks into **Upcoming**, **Completed** (Email Sent), and **Missed** (Email Failed).
*   **Responsive Design:** Fully responsive UI built with **Tailwind CSS**, featuring a premium dark mode and glassmorphism aesthetics.
*   **Validation:** Prevents duplicate tasks and ensures data integrity.

## 🛠️ Technology Stack

*   **Frontend:** React.js, Vite, Tailwind CSS
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose
*   **Scheduler:** Node-cron
*   **Email Service:** Nodemailer (SMTP)

## 📂 Project Structure

```
task-scheduler/
├── backend/            # Express.js Server & logic
│   ├── config/         # DB & CORS config
│   ├── controllers/    # Route logic (Tasks, Scheduler)
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Routes
│   └── utils/          # Helper functions (Email)
└── frontend/           # React.js Client
    ├── src/
    │   ├── components/ # Reusable UI components
    │   └── ...
    └── ...
```

## ⚙️ Setup Instructions

### 1. Prerequisites
*   Node.js (v16+)
*   MongoDB (Atlas or Local)

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
smtp_host=smtp.gmail.com
smtp_port=587
smtp_user=your_email@gmail.com
smtp_pass=your_app_password
smtp_from=your_email@gmail.com
FRONTEND_URI=http://localhost:5173
```
*Note: For Gmail, use an **App Password** (enabled in Google Account > Security > 2-Step Verification) instead of your login password.*

Start the server:
```bash
npm start
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder (optional, defaults are set):
```env
VITE_BACKEND_URI=http://localhost:5000
```

Start the React development server:
```bash
npm run dev
```

## 🖥️ Usage
1.  Open your browser and navigate to `http://localhost:5173`.
2.  Use the **Create Task** form to schedule a new task.
3.  Add multiple email recipients separated by commas.
4.  The system will automatically trigger an email when the due date is reached.
    *   **Success:** Task moves to "Completed" tab.
    *   **Failure:** Task moves to "Missed" tab.

## 📝 License
This project is open-source and available under the MIT License.
