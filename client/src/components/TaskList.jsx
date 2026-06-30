import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <p>📭 No tasks yet. Create one to get started!</p>
        </div>
      </div>
    );
  }

  const groupedByStatus = {
    pending: tasks.filter((t) => t.status === 'pending'),
    'in-progress': tasks.filter((t) => t.status === 'in-progress'),
    completed: tasks.filter((t) => t.status === 'completed'),
    cancelled: tasks.filter((t) => t.status === 'cancelled'),
  };

  return (
    <div className="task-list">
      {Object.entries(groupedByStatus).map(([status, statusTasks]) => (
        statusTasks.length > 0 && (
          <div key={status} className="status-group">
            <h3 className={`status-title status-${status}`}>
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')} ({statusTasks.length})
            </h3>
            <div className="tasks-container">
              {statusTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onTaskUpdated={onTaskUpdated}
                  onTaskDeleted={onTaskDeleted}
                />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
