import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getAllTasks,
  getTasksByWeek,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getTasksByCategory,
  getTasksByStatus,
  getTasksByUrgency,
  getCategories,
} from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// API Routes

// Get all tasks
app.get('/api/tasks', (req, res) => {
  try {
    const tasks = getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tasks for a specific week
app.get('/api/tasks/week/:weekStart', (req, res) => {
  try {
    const tasks = getTasksByWeek(req.params.weekStart);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single task
app.get('/api/tasks/:id', (req, res) => {
  try {
    const task = getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tasks by category
app.get('/api/filter/category/:category', (req, res) => {
  try {
    const tasks = getTasksByCategory(req.params.category);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tasks by status
app.get('/api/filter/status/:status', (req, res) => {
  try {
    const tasks = getTasksByStatus(req.params.status);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tasks by urgency
app.get('/api/filter/urgency/:urgency', (req, res) => {
  try {
    const tasks = getTasksByUrgency(req.params.urgency);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = getCategories();
    res.json(categories.map((c) => c.category));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create task
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description, category, status, urgency, dueDate } = req.body;

    if (!title || !category || !dueDate) {
      return res
        .status(400)
        .json({ error: 'Title, category, and dueDate are required' });
    }

    const task = createTask({
      title,
      description,
      category,
      status,
      urgency,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task
app.patch('/api/tasks/:id', (req, res) => {
  try {
    const task = updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  try {
    deleteTask(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
