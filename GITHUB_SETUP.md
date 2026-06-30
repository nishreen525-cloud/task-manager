# 📤 Upload to GitHub

Your project is now ready to be uploaded to GitHub! Follow these steps:

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Click **"New repository"**
3. Enter repository name: `task-manager` (or your preferred name)
4. Add description: `A beautiful week-wise task management app with React frontend and Node.js backend`
5. Choose **Public** or **Private**
6. **Do NOT** initialize with README (we already have one)
7. Click **"Create repository"**

## Step 2: Add Remote and Push Code

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd /tmp/task-manager

# Replace USERNAME with your GitHub username
git remote add origin https://github.com/USERNAME/task-manager.git
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/john-doe/task-manager.git
git branch -M main
git push -u origin main
```

You'll be asked for your GitHub credentials. Use:
- **Username**: Your GitHub username
- **Password**: Your GitHub personal access token (or password for older accounts)

## Step 3: Verify Upload

After pushing, visit your repository on GitHub:
```
https://github.com/YOUR-USERNAME/task-manager
```

You should see all your files and the beautiful README!

---

## Alternative: Using SSH

If you prefer SSH authentication:

```bash
# Add SSH remote instead
git remote add origin git@github.com:USERNAME/task-manager.git
git branch -M main
git push -u origin main
```

Make sure you have [SSH keys configured](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) on GitHub.

---

## Generate GitHub Personal Access Token

If you need a personal access token:

1. Go to GitHub Settings → [Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"**
3. Select scopes: `repo` (full control of private repositories)
4. Click **"Generate token"**
5. Copy the token (you won't see it again!)
6. Use it as your password when pushing

---

## What's Included in Your Repository

📁 **Backend Files:**
- `server.js` - Express API server
- `db.js` - Data management layer
- `package.json` - Backend dependencies

📁 **Frontend Files:**
- `client/src/App.jsx` - Main React component
- `client/src/components/` - React components
- `client/src/styles.css` - All styling
- `client/index.html` - HTML template
- `client/package.json` - Frontend dependencies

📄 **Documentation:**
- `README.md` - Complete documentation
- `GETTING_STARTED.md` - Quick start guide
- `PROJECT_SUMMARY.md` - Project overview
- `FEATURES_CHECKLIST.md` - Feature list
- `WEEK_VIEW_IMPROVEMENTS.md` - Design improvements

⚙️ **Configuration:**
- `.gitignore` - Git ignore rules
- `setup.sh` - Quick setup script

💾 **Data:**
- `tasks.json` - Sample task data

---

## Git History

Your repository will have one initial commit containing:
- All source code
- All documentation
- Configuration files
- Setup scripts

```
commit 04934cd (HEAD -> main)
Author: Task Manager Developer <dev@taskmanager.local>

    Initial commit: Complete task manager application with React frontend 
    and Node.js backend
    
    Features:
    - Create, read, update, delete tasks
    - Assign categories, status, urgency levels, and due dates
    - Beautiful week-wise calendar view
    - Filter tasks by category, status, and urgency
    - Responsive design for all devices
    - JSON-based persistent storage
    - Express REST API
    - React with Vite
    - Full styling with animations
```

---

## After Pushing to GitHub

1. **Add a License** (Recommended)
   - Click "Add file" → "Create new file" → name it `LICENSE`
   - GitHub will suggest licenses (MIT is popular)

2. **Enable GitHub Pages** (Optional)
   - Go to Settings → Pages
   - Deploy your app documentation

3. **Add Topics** (Optional)
   - Go to About (gear icon)
   - Add topics: `react`, `nodejs`, `task-manager`, `productivity`

4. **Create Issues** (Optional)
   - Track bugs or feature requests
   - Great for collaboration

5. **Enable Discussions** (Optional)
   - Settings → Features → Enable Discussions
   - Let users discuss the project

---

## Commands Quick Reference

```bash
# View remote
git remote -v

# Change remote
git remote set-url origin https://github.com/USERNAME/task-manager.git

# Check status
git status

# View commits
git log --oneline

# Push new changes (after you've set up remote)
git add .
git commit -m "Your commit message"
git push
```

---

## Troubleshooting

**"Repository not found" error**
- Make sure you created the repository on GitHub first
- Check spelling of username and repo name

**"Authentication failed"**
- Use a personal access token instead of password
- Make sure token has `repo` scope

**"Permission denied (publickey)"**
- If using SSH, ensure keys are added to GitHub
- Try HTTPS instead

**Want to change from HTTPS to SSH later?**
```bash
git remote set-url origin git@github.com:USERNAME/task-manager.git
```

---

## Share Your Project

Once uploaded, share the link:
```
https://github.com/YOUR-USERNAME/task-manager
```

People can then:
- ⭐ Star your project
- 🍴 Fork it
- 💬 Open issues
- 🔁 Create pull requests
- 📥 Clone and use it

---

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push code using commands above
3. ⭐ (Optional) Share your repo link
4. 🎉 Celebrate! Your project is now on GitHub!

---

**Happy coding!** 🚀

For more info: [GitHub Docs](https://docs.github.com/en)
