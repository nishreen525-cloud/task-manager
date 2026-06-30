import './styles.css';
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import WeekView from './components/WeekView';
import Filters from './components/Filters';

function App() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('week');
  const [selectedWeek, setSelectedWeek] = useState(getWeekStart(new Date()));
  const [filters, setFilters] = useState({ category: null, status: null, urgency: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [selectedWeek]);

  function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    const weekStart = new Date(d.setDate(diff));
    const year = weekStart.getFullYear();
    const month = String(weekStart.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(weekStart.getDate()).padStart(2, '0');
    return `${year}-${month}-${dayOfMonth}`;
  }

  function loadTasks() {
    setIsLoading(true);
    const url = view === 'week' ? `/api/tasks/week/${selectedWeek}` : '/api/tasks';
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error loading tasks:', err))
      .finally(() => setIsLoading(false));
  }

  function handleTaskAdded(task) {
    setTasks([...tasks, task]);
  }

  function handleTaskUpdated(updatedTask) {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  }

  function handleTaskDeleted(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  function handlePrevWeek() {
    const date = new Date(selectedWeek);
    date.setDate(date.getDate() - 7);
    setSelectedWeek(date.toISOString().split('T')[0]);
  }

  function handleNextWeek() {
    const date = new Date(selectedWeek);
    date.setDate(date.getDate() + 7);
    setSelectedWeek(date.toISOString().split('T')[0]);
  }

  function handleToday() {
    setSelectedWeek(getWeekStart(new Date()));
  }

  const weekStart = new Date(selectedWeek);
  const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 ✨ Task Manager</h1>
        <p>Week-wise task management system</p>
      </header>

      <main className="app-main">
        <div className="sidebar">
          <TaskForm onTaskAdded={handleTaskAdded} />
          <Filters onFiltersChange={setFilters} />
        </div>

        <div className="content">
          <div className="view-controls">
            <div className="view-buttons">
              <button
                className={`btn ${view === 'week' ? 'active' : ''}`}
                onClick={() => setView('week')}
              >
                Week View
              </button>
              <button
                className={`btn ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')}
              >
                All Tasks
              </button>
            </div>

            {view === 'week' && (
              <div className="week-navigation">
                <button className="btn" onClick={handlePrevWeek}>
                  ← Previous
                </button>
                <button className="btn" onClick={handleToday}>
                  Today
                </button>
                <button className="btn" onClick={handleNextWeek}>
                  Next →
                </button>
                <span className="week-range">
                  {weekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="loading">Loading tasks...</div>
          ) : view === 'week' ? (
            <WeekView tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
          ) : (
            <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
