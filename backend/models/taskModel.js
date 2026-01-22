import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  emails: [{
    email: { type: String, required: true },
    isSend: { type: Boolean, default: false }
  }],
  status: {
    type: String,
    enum: ["upcoming", "completed", "missed"],
    default: "upcoming"
  },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
