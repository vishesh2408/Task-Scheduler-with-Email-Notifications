import Notification from "../models/notificationModel.js";

// Get all notifications (optionally filter unread)
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as read" });
  }
};

// Create a notification (for internal use)
export const createNotification = async ({ message, type, taskId }) => {
  try {
    await Notification.create({ message, type, taskId });
  } catch (err) {
    console.error("Failed to create notification:", err);
  }
};
