import Task from "../models/taskModel.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, emails } = req.body;
    
    // Check for duplicate task
    const existingTask = await Task.findOne({ title });
    if (existingTask) {
      return res.status(400).json({ error: "Task with this title already exists" });
    }

    let status = "upcoming";
    
    if (new Date(dueDate) < new Date()) {
      status = "completed";
    }

    const formattedEmails = emails.map(email => ({ email, isSend: false }));

    const task = new Task({
      title,
      description,
      dueDate,
      emails: formattedEmails,
      status
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
