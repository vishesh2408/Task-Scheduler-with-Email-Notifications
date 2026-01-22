# Task Scheduler Backend

This is the backend for the Task Scheduler application. It provides RESTful APIs for managing tasks, scheduling email reminders, and user notifications.

## Features
- Task CRUD (Create, Read, Update, Delete)
- Email reminders using Nodemailer
- MongoDB database (Mongoose)
- Job scheduling with node-cron
- Multi-assignee support (multiple emails per task)
- CORS configuration for secure frontend-backend communication

## Environment Variables
Create a `.env` file in the backend directory with the following:

```
MONGO_URI=your_mongodb_connection_string
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_email
SMTP_PASS=your_email_password_or_app_password
SMTP_FROM=your_email
FRONTEND_URI=http://localhost:5173
```

## Scripts
- `npm install` — Install dependencies
- `npm start` — Start the backend server

## Folder Structure
```
backend/
  config/         # Database and CORS configuration
  controllers/    # Business logic and schedulers
  models/         # Mongoose schemas
  routes/         # API route definitions
  .env            # Environment variables
  .gitignore      # Git ignore rules
  server.js       # Main server entry point
```

## API Endpoints
- `GET /api/tasks` — List all tasks
- `POST /api/tasks` — Create a new task
- `PUT /api/tasks/:id` — Update a task
- `DELETE /api/tasks/:id` — Delete a task

## License
MIT
