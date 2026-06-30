import React from 'react';

const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health', 'Learning', 'Other'];
const STATUSES = ['pending', 'in-progress', 'completed', 'cancelled'];
const URGENCY_LEVELS = ['low', 'medium', 'high', 'critical'];

export default function Filters({ onFiltersChange }) {
  function handleCategoryFilter(category) {
    onFiltersChange({ category, status: null, urgency: null });
  }

  function handleStatusFilter(status) {
    onFiltersChange({ category: null, status, urgency: null });
  }

  function handleUrgencyFilter(urgency) {
    onFiltersChange({ category: null, status: null, urgency });
  }

  function clearFilters() {
    onFiltersChange({ category: null, status: null, urgency: null });
  }

  return (
    <div className="filters">
      <h2>🔍 Filters</h2>

      <div className="filter-section">
        <h4>Category</h4>
        <div className="filter-buttons">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="filter-btn"
              onClick={() => handleCategoryFilter(cat)}
              title={`Filter by ${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Status</h4>
        <div className="filter-buttons">
          {STATUSES.map((status) => (
            <button
              key={status}
              className="filter-btn"
              onClick={() => handleStatusFilter(status)}
              title={`Filter by ${status}`}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Urgency</h4>
        <div className="filter-buttons">
          {URGENCY_LEVELS.map((urgency) => (
            <button
              key={urgency}
              className={`filter-btn urgency-${urgency}`}
              onClick={() => handleUrgencyFilter(urgency)}
              title={`Filter by ${urgency}`}
            >
              {urgency}
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn-secondary" onClick={clearFilters}>
        Clear All Filters
      </button>
    </div>
  );
}
