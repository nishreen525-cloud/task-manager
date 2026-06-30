import React, { useState } from 'react';

const STATUSES = ['pending', 'in-progress', 'completed', 'cancelled'];
const URGENCY_LEVELS = ['low', 'medium', 'high', 'critical'];

export default function TaskCard({ task, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleUpdate() {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editData.title,
          description: editData.description,
          status: editData.status,
          urgency: editData.urgency,
        }),
      });

      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      onTaskUpdated(updated);
      setIsEditing(false);
    } catch (err) {
      alert('Error updating task: ' + err.message);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this task?')) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      onTaskDeleted(task.id);
    } catch (err) {
      alert('Error deleting task: ' + err.message);
      setIsDeleting(false);
    }
  }

  async function handleQuickToggle() {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
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

  const urgencyColors = {
    low: '#90EE90',
    medium: '#FFD700',
    high: '#FF8C00',
    critical: '#FF4500',
  };

  const categoryEmojis = {
    Work: '💼',
    Personal: '🎯',
    Shopping: '🛒',
    Health: '🏥',
    Learning: '📚',
    Religion: '🙏',
    Other: '📌',
  };

  if (isEditing) {
    return (
      <div className="task-card editing">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="edit-input"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          className="edit-textarea"
        />
        <div className="edit-controls">
          <select
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace('-', ' ')}
              </option>
            ))}
          </select>
          <select
            value={editData.urgency}
            onChange={(e) => setEditData({ ...editData, urgency: e.target.value })}
          >
            {URGENCY_LEVELS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
        <div className="button-group">
          <button onClick={handleUpdate} className="btn btn-save">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="btn btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card status-card-${task.status}`} style={{ borderLeftColor: urgencyColors[task.urgency] }}>
      <div className="task-status-bar" data-status={task.status}></div>
      
      <div className="task-header">
        <div className="task-title-section">
          <button 
            onClick={handleQuickToggle}
            className="quick-toggle"
            title="Click to toggle completion"
          >
            {task.status === 'completed' ? '✓' : '○'}
          </button>
          <span className="category-emoji">{categoryEmojis[task.category]}</span>
          <h4>{task.title}</h4>
        </div>
        <span className={`urgency-badge urgency-${task.urgency}`}>{task.urgency}</span>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-meta">
        <span className="task-category">{task.category}</span>
        <span className={`task-status-badge status-${task.status}`}>
          <span className="status-dot"></span>
          {task.status.replace('-', ' ')}
        </span>
        <span className="task-date">📅 {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>

      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} className="btn btn-small">
          ✏️ Edit
        </button>
        <button onClick={handleDelete} disabled={isDeleting} className="btn btn-small btn-danger">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
