# TaskFlow Frontend

This is the client-side application for the TaskFlow Scheduler system. Built with React.js, Vite, and Tailwind CSS, it provides a modern, responsive interface for managing tasks and tracking automated email reminders.

## 🚀 Key Features

*   **Task Management UI:** Intuitive forms to Create, Read, Update, and Delete (CRUD) tasks.
*   **Responsive Design:** Optimized for Mobile, Tablet, and Desktop using Tailwind CSS grid and flex layouts.
*   **Interactive Dashboard:**
    *   **Unified View:** Toggle between "Upcoming", "Completed", and "Missed" tasks.
    *   **Search & Filter:** Real-time search by task title.
    *   **Pagination:** Clean paginated list view for better organization.
*   **Visual Status Indicators:** Color-coded cards to quickly identify task status (e.g., Green for success, Red for missed).
*   **Glassmorphism Aesthetic:** Premium dark-mode UI with blur effects and smooth animations.

## 🛠️ Tech Stack

*   **React.js:** Component-based UI library.
*   **Vite:** High-performance build tool and dev server.
*   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.

## ⚙️ Setup Instructions

### 1. Prerequisites
Ensure you have Node.js (v16+) installed.

### 2. Installation
Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

### 3. Configuration
Create a `.env` file in the `frontend` root directory to connect to your backend:
```env
VITE_BACKEND_URI=http://localhost:5000
```
*If your backend runs on a different port, update the URI accordingly.*

### 4. Running the App
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Navigation bar
│   │   ├── TaskForm.jsx     # Form for creating/editing tasks
│   │   └── TaskList.jsx     # Grid view of task cards
│   ├── App.jsx              # Main layout container
│   ├── TaskDashboard.jsx    # Main dashboard logic & state
│   └── index.css            # Tailwind directives & global styles
├── .gitignore               # Git configuration
├── eslint.config.js         # Linting rules
├── index.html               # Entry HTML
├── package.json             # Dependencies & scripts
└── vite.config.js           # Vite configuration
```

## 📸 Usage
- **Add Task:** Click the "Create Task" panel (or top section on mobile) and fill in the title, details, due date, and recipient emails.
- **Edit Task:** Click the **Pencil icon** on any task card to load its details into the form for updating.
- **Delete Task:** Click the **Trash icon** to remove a task.
- **Track Status:** Watch tasks move automatically from "Upcoming" to "Completed" (if email sends successfully) or "Missed" (if it fails) as time passes.
