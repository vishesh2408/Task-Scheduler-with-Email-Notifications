import cron from "node-cron";
import Task from "../models/taskModel.js";
import sendEmail from "../utils/sendEmail.js";
import { createNotification } from "./notificationController.js";

// Run every minute to check for due tasks
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const tasks = await Task.find({
    dueDate: { $lte: now },
    status: "upcoming"
  });
  for (const task of tasks) {
    let allEmailsSent = true;
    
    if (Array.isArray(task.emails) && task.emails.length > 0) {
      for (const recipient of task.emails) {
        try {
          await sendEmail(recipient.email, task.title, task.description);
          recipient.isSend = true;
        } catch (error) {
          console.error(`Failed to send email to ${recipient.email}:`, error.message);
          recipient.isSend = false;
          allEmailsSent = false;
        }
      }
    }

    if (allEmailsSent) {
      task.status = "completed";
      await task.save();
      await createNotification({
        message: `Task "${task.title}" completed. Reminders sent successfully.`,
        type: "completed",
        taskId: task._id
      });
    } else {
      task.status = "missed";
      await task.save();
      await createNotification({
        message: `Task "${task.title}" marked as missed. Some emails failed to send.`,
        type: "missed",
        taskId: task._id
      });
    }
  }
});
