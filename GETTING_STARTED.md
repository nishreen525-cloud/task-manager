# GETTING STARTED 🚀

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd /tmp/task-manager
chmod +x setup.sh
./setup.sh
```

Or manually:
```bash
npm install
cd client && npm install && cd ..
```

### 2. Start Development Servers

**Terminal 1 - Backend API:**
```bash
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend UI:**
```bash
cd client
npm run dev
# App runs on http://localhost:5173
```

### 3. Open in Browser
Visit: `http://localhost:5173`

---

## Features Guide 📖

### Creating a Task
1. Fill in the form on the left sidebar
2. **Title**: Required - Task name
3. **Description**: Optional - Task details
4. **Category**: Choose from Work, Personal, Shopping, Health, Learning, or Other
5. **Status**: Select Pending, In Progress, Completed, or Cancelled
6. **Urgency**: Set Low, Medium, High, or Critical
7. **Due Date**: Pick the date the task is due
8. Click "✅ Create Task"

### Week View
- See all 7 days of the week in calendar format
- Each day shows task count
- Click on a day to expand/collapse tasks
- Today is highlighted with a blue border
- Navigate between weeks with Previous/Next buttons
- Click "Today" to jump to current week

### All Tasks View
- See all tasks grouped by status
- Tasks sorted by due date and urgency
- Edit or delete tasks from cards

### Filtering Tasks
Use the filter panel on the left:
- **By Category**: Work, Personal, Shopping, etc.
- **By Status**: Pending, In Progress, Completed, Cancelled
- **By Urgency**: Low, Medium, High, Critical
- Click "Clear All Filters" to reset

### Editing a Task
1. Click ✏️ on any task card
2. Update title, description, status, or urgency
3. Click "Save" to confirm
4. Click "Cancel" to discard changes

### Deleting a Task
1. Click 🗑️ on any task card
2. Confirm deletion in the popup
3. Task is removed permanently

---

## Task Properties Explained 📝

### Categories
- **Work**: Professional tasks, meetings, deadlines
- **Personal**: Personal goals, habits
- **Shopping**: Shopping lists, errands
- **Health**: Doctor appointments, fitness, wellness
- **Learning**: Courses, studying, skill development
- **Other**: Miscellaneous tasks

### Status
- **Pending**: Not started
- **In Progress**: Currently working on
- **Completed**: Done ✓
- **Cancelled**: Not doing this task

### Urgency
- **Low**: Can wait, not time-sensitive
- **Medium**: Normal priority
- **High**: Should be done soon
- **Critical**: Need to do immediately

### Visual Indicators
- Left border color indicates urgency:
  - Green: Low
  - Yellow: Medium
  - Orange: High
  - Red: Critical
- Category emoji for quick identification
- Status badge shows current state

---

## Tips & Tricks 💡

1. **Weekly Planning**: Set all week's tasks on Sunday with due dates
2. **Priority Matrix**: Use urgency + status to track what's most important
3. **Category Filtering**: Focus on one category at a time
4. **Expand Days**: Click on days to see more details
5. **Quick Edits**: Edit status and urgency directly from task card
6. **Mobile Access**: App works great on phones and tablets

---

## Keyboard Shortcuts ⌨️

(Future enhancement - currently use mouse)

---

## Troubleshooting 🔧

### Port Already in Use
If port 5000 is busy:
```bash
PORT=3000 npm run dev
```

If port 5173 is busy, Vite will automatically use 5174, 5175, etc.

### Database Issues
To reset the database:
```bash
rm tasks.db
npm run dev
```

### Dependencies Issues
```bash
rm -rf node_modules client/node_modules
npm install
cd client && npm install && cd ..
```

---

## Building for Production 🏗️

```bash
cd client
npm run build
cd ..
npm start
```

App will run on `http://localhost:5000` with optimized frontend.

---

## Project Structure 📁

```
task-manager/
├── server.js              # Express API server
├── db.js                 # SQLite database operations
├── package.json          # Backend dependencies
├── tasks.db             # SQLite database (created at runtime)
├── README.md            # Full documentation
├── setup.sh             # Quick setup script
└── client/
    ├── index.html                    # HTML entry
    ├── vite.config.js               # Vite config
    ├── package.json                 # Frontend dependencies
    └── src/
        ├── main.jsx                 # React entry
        ├── App.jsx                  # Main app component
        ├── styles.css              # All CSS styles
        └── components/
            ├── TaskForm.jsx        # Create task form
            ├── TaskCard.jsx        # Individual task display
            ├── TaskList.jsx        # List view
            ├── WeekView.jsx        # Calendar view
            └── Filters.jsx         # Filter controls
```

---

## API Reference 🔌

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "category": "Shopping",
    "urgency": "high",
    "dueDate": "2026-06-30"
  }'
```

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

### Get Week Tasks
```bash
curl http://localhost:5000/api/tasks/week/2026-06-29
```

### Update Task
```bash
curl -X PATCH http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{ "status": "completed" }'
```

### Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

---

## Support & Feedback

For issues or suggestions, check the README.md for more details!

Happy task managing! 🎉
