import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, 'tasks.json');

let tasks = [];

function loadData() {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf-8');
      tasks = JSON.parse(data);
    }
  } catch (error) {
    console.log('Starting with empty tasks');
    tasks = [];
  }
}

function saveData() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

loadData();

function urgencyOrder(urgency) {
  const order = { critical: 4, high: 3, medium: 2, low: 1 };
  return order[urgency] || 0;
}

export function getAllTasks() {
  return tasks.sort((a, b) => {
    const dateCompare = new Date(a.dueDate) - new Date(b.dueDate);
    if (dateCompare !== 0) return dateCompare;
    return urgencyOrder(b.urgency) - urgencyOrder(a.urgency);
  });
}

export function getTasksByWeek(weekStart) {
  const startDate = new Date(weekStart);
  const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  const startStr = startDate.toISOString().split('T')[0];
  const endStr = endDate.toISOString().split('T')[0];

  return tasks.filter((task) => task.dueDate >= startStr && task.dueDate < endStr)
    .sort((a, b) => {
      const dateCompare = new Date(a.dueDate) - new Date(b.dueDate);
      if (dateCompare !== 0) return dateCompare;
      return urgencyOrder(b.urgency) - urgencyOrder(a.urgency);
    });
}

export function createTask(task) {
  const newTask = {
    id: Date.now(),
    title: task.title,
    description: task.description || '',
    category: task.category,
    status: task.status || 'pending',
    urgency: task.urgency || 'medium',
    dueDate: task.dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveData();
  return newTask;
}

export function updateTask(id, updates) {
  const index = tasks.findIndex((t) => t.id == id);
  if (index === -1) return null;

  const task = tasks[index];
  tasks[index] = {
    ...task,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveData();
  return tasks[index];
}

export function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id == id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  saveData();
  return true;
}

export function getTaskById(id) {
  return tasks.find((t) => t.id == id);
}

export function getTasksByCategory(category) {
  return tasks
    .filter((t) => t.category === category)
    .sort((a, b) => {
      const dateCompare = new Date(a.dueDate) - new Date(b.dueDate);
      if (dateCompare !== 0) return dateCompare;
      return urgencyOrder(b.urgency) - urgencyOrder(a.urgency);
    });
}

export function getTasksByStatus(status) {
  return tasks
    .filter((t) => t.status === status)
    .sort((a, b) => {
      const dateCompare = new Date(a.dueDate) - new Date(b.dueDate);
      if (dateCompare !== 0) return dateCompare;
      return urgencyOrder(b.urgency) - urgencyOrder(a.urgency);
    });
}

export function getTasksByUrgency(urgency) {
  return tasks.filter((t) => t.urgency === urgency).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

export function getCategories() {
  const categories = [...new Set(tasks.map((t) => t.category))];
  return categories.sort();
}
