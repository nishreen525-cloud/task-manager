# Task Manager App 📋

A full-stack week-wise task management application built with React and Node.js.

## Features ✨

- 📅 **Week View**: Visualize tasks organized by day of the week
- ✏️ **Create Tasks**: Add tasks with title, description, category, status, urgency, and due date
- 🏷️ **Categories**: Organize tasks (Work, Personal, Shopping, Health, Learning, Other)
- ⚡ **Urgency Levels**: Set priority (Low, Medium, High, Critical)
- 📊 **Status Tracking**: Track task progress (Pending, In Progress, Completed, Cancelled)
- 🔍 **Filters**: Filter tasks by category, status, and urgency
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ✏️ **Edit & Delete**: Manage your tasks easily
- 💾 **Persistent Storage**: SQLite database for data persistence

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite with better-sqlite3

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone/Download the project**
```bash
cd task-manager
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

## Development

### Running in Development Mode

**Terminal 1 - Backend Server:**
```bash
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

## Production Build

### Build Frontend
```bash
cd client
npm run build
```

### Run Production Server
```bash
npm start
```
Server will serve both API and built frontend on `http://localhost:5000`

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/week/:weekStart` - Get tasks for a specific week
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Filters
- `GET /api/filter/category/:category` - Get tasks by category
- `GET /api/filter/status/:status` - Get tasks by status
- `GET /api/filter/urgency/:urgency` - Get tasks by urgency
- `GET /api/categories` - Get all categories
- `GET /api/health` - Health check

## Project Structure

```
task-manager/
├── server.js           # Express server
├── db.js              # Database operations
├── package.json       # Backend dependencies
└── client/
    ├── src/
    │   ├── main.jsx           # React entry point
    │   ├── App.jsx            # Main component
    │   ├── styles.css         # Global styles
    │   └── components/
    │       ├── TaskForm.jsx   # Task creation form
    │       ├── TaskCard.jsx   # Individual task card
    │       ├── TaskList.jsx   # Task list view
    │       ├── WeekView.jsx   # Weekly calendar view
    │       └── Filters.jsx    # Filter controls
    ├── index.html      # HTML entry point
    ├── vite.config.js  # Vite configuration
    └── package.json    # Frontend dependencies
```

## Usage

1. **Create a Task**
   - Fill in the task form in the sidebar
   - Select category, status, urgency, and due date
   - Click "Create Task"

2. **View Tasks**
   - Week View: See all tasks organized by day
   - All Tasks: See all tasks organized by status

3. **Edit/Delete Tasks**
   - Click ✏️ to edit task details
   - Click 🗑️ to delete a task

4. **Filter Tasks**
   - Use filter buttons in the sidebar
   - Filter by category, status, or urgency

## Features in Detail

### Week View
- Visual calendar showing each day of the week
- Task count per day
- Expandable day cards
- Color-coded urgency indicators
- Today is highlighted with a blue top border

### Task Card
- Title with category emoji
- Description (if provided)
- Category, status, and due date badges
- Urgency level color indicator (left border)
- Edit and delete buttons
- Quick status and urgency updates

### Responsive Design
- Mobile-friendly interface
- Adaptive layout for all screen sizes
- Touch-friendly buttons and controls

## Database Schema

### tasks table
```
id (INTEGER, PK, Auto-increment)
title (TEXT, NOT NULL)
description (TEXT)
category (TEXT, NOT NULL)
status (TEXT, NOT NULL) - pending | in-progress | completed | cancelled
urgency (TEXT, NOT NULL) - low | medium | high | critical
dueDate (TEXT, NOT NULL) - YYYY-MM-DD format
createdAt (DATETIME, Auto-timestamp)
updatedAt (DATETIME, Auto-timestamp)
```

## License

MIT

## Author

Created with ❤️ using React and Node.js
