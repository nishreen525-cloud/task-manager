import React, { useState } from 'react';
import TaskCard from './TaskCard';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FULL_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function WeekView({ tasks, onTaskUpdated, onTaskDeleted }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const categoryEmojis = {
    Work: '💼',
    Personal: '🎯',
    Shopping: '🛒',
    Health: '🏥',
    Learning: '📚',
    Religion: '🙏',
    Other: '📌',
  };

  const STATUSES = ['pending', 'in-progress', 'completed', 'cancelled'];

  function getTasksByDay(day) {
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return taskDate.getDay() === day;
    });
  }

  const today = new Date();
  const todayDateString = today.toLocaleDateString();

  function getDateForDay(dayIndex) {
    const date = new Date(today);
    const currentDay = today.getDay();
    const diff = dayIndex - currentDay;
    date.setDate(date.getDate() + diff);
    return date;
  }

  function getUrgencyStats(dayTasks) {
    return {
      critical: dayTasks.filter((t) => t.urgency === 'critical').length,
      high: dayTasks.filter((t) => t.urgency === 'high').length,
      medium: dayTasks.filter((t) => t.urgency === 'medium').length,
      low: dayTasks.filter((t) => t.urgency === 'low').length,
      completed: dayTasks.filter((t) => t.status === 'completed').length,
    };
  }

  function getProgressPercent(dayTasks) {
    if (dayTasks.length === 0) return 0;
    const completed = dayTasks.filter((t) => t.status === 'completed').length;
    return Math.round((completed / dayTasks.length) * 100);
  }

  async function handlePreviewStatusChange(task, newStatus) {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      onTaskUpdated(updated);
    } catch (err) {
      alert('Error updating task: ' + err.message);
    }
  }

  return (
    <div className="week-view-new">
      {/* Week Calendar Grid */}
      <div className="week-calendar">
        {DAYS.map((dayName, dayIndex) => {
          const date = getDateForDay(dayIndex);
          const dayTasks = getTasksByDay(dayIndex);
          const isToday = date.toLocaleDateString() === todayDateString;
          const stats = getUrgencyStats(dayTasks);
          const progress = getProgressPercent(dayTasks);

          return (
            <div
              key={dayName}
              className={`week-day ${isToday ? 'today' : ''} ${selectedDay === dayIndex ? 'selected' : ''}`}
              onClick={() => setSelectedDay(selectedDay === dayIndex ? null : dayIndex)}
            >
              {/* Day Header */}
              <div className="week-day-header">
                <div className="day-label">
                  <span className="day-name">{dayName}</span>
                  <span className="day-number">{date.getDate()}</span>
                </div>
                {isToday && <span className="today-badge">TODAY</span>}
              </div>

              {/* Task Count & Stats */}
              <div className="day-stats">
                <div className="task-count-badge">{dayTasks.length}</div>
                
                {dayTasks.length > 0 && (
                  <div className="urgency-indicators">
                    {stats.critical > 0 && (
                      <span className="urgency-dot critical" title={`${stats.critical} critical`}>
                        ●
                      </span>
                    )}
                    {stats.high > 0 && (
                      <span className="urgency-dot high" title={`${stats.high} high`}>
                        ●
                      </span>
                    )}
                    {stats.medium > 0 && (
                      <span className="urgency-dot medium" title={`${stats.medium} medium`}>
                        ●
                      </span>
                    )}
                    {stats.low > 0 && (
                      <span className="urgency-dot low" title={`${stats.low} low`}>
                        ●
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {dayTasks.length > 0 && (
                <div className="progress-section">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="progress-text">{progress}%</span>
                </div>
              )}

              {/* Day Content Preview */}
              <div className="day-content">
                {dayTasks.length === 0 ? (
                  <p className="empty-state">✨ No tasks</p>
                ) : (
                  <>
                    <div className="task-preview">
                      {dayTasks.slice(0, 2).map((task) => (
                        <div key={task.id} className={`task-mini status-${task.status}`}>
                          <div className="task-mini-header">
                            <span className="category-emoji">{categoryEmojis[task.category]}</span>
                            <span className="task-mini-title">{task.title.substring(0, 18)}</span>
                          </div>
                          <div className="task-mini-meta">
                            <span className={`urgency-badge urgency-${task.urgency}`}>
                              <span className="urgency-dot"></span>
                              {task.urgency}
                            </span>
                            <select 
                              value={task.status}
                              onChange={(e) => handlePreviewStatusChange(task, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className={`status-dropdown status-${task.status}`}
                              title="Click to change status"
                            >
                              {STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status.replace('-', ' ')}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className="more-tasks">+{dayTasks.length - 2} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Details Panel */}
      {selectedDay !== null && (
        <div className="task-details-panel">
          <div className="panel-header">
            <h3>
              {FULL_DAYS[selectedDay]} • {getDateForDay(selectedDay).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </h3>
            <button className="close-btn" onClick={() => setSelectedDay(null)}>
              ✕
            </button>
          </div>

          <div className="panel-content">
            {getTasksByDay(selectedDay).length === 0 ? (
              <div className="empty-panel">
                <p>📭 No tasks for this day</p>
                <p className="hint">Create a task to get started!</p>
              </div>
            ) : (
              <div className="tasks-list">
                {getTasksByDay(selectedDay).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
