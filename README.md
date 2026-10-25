# Personal Portfolio & DevOps Practicals (TPDS-01)

A responsive, high-performance Personal Portfolio Website developed with **HTML5, CSS3, Bootstrap 5, and JavaScript**, managed using **Git and GitHub**, and configured for zero-cost static cloud deployment on **Vercel** and **GitHub Pages**.

---

## 📌 Practical 1: Website Development & Version Control using Git and GitHub

### Aim
Design and develop a responsive personal portfolio website and manage its source code using Git and GitHub, demonstrating repository creation, branching, commits, merging, and push/pull operations.

### Problem Statement
Develop a responsive portfolio website containing Home, About, Skills, Projects, and Contact sections. Use Git for version control and GitHub for remote repository management. Demonstrate collaborative development through branches and pull requests.

### Software Requirements
- **Code Editor:** Visual Studio Code
- **Version Control:** Git & GitHub CLI / Web
- **Frontend Stack:** HTML5, CSS3, Bootstrap 5, JavaScript (ES6+)
- **Cloud Hosting:** Vercel / GitHub Pages

---

## 🚀 Step-by-Step Git Workflow Execution Guide

Follow these exact terminal commands inside the project directory:

### 1. Initialize Local Git Repository (Completed)
```bash
git init
```

### 2. Connect Remote GitHub Repository (Completed)
```bash
git remote add origin https://github.com/TusharSingh14x/tpds-01.git
```

### 3. Stage Files & Create Initial Commit
```bash
git add .
git commit -m "feat: initial commit - responsive portfolio website with bootstrap 5"
```

### 4. Create Feature Branch & Add Feature
```bash
# Create and switch to feature branch
git checkout -b feature/interactive-task-manager

# Verify current active branch
git branch
```

*(The interactive Student Task Manager module is implemented in `index.html` and `js/script.js`)*

```bash
# Stage feature changes and commit
git add .
git commit -m "feat: add interactive student task manager with CRUD and localStorage"
```

### 5. Push Feature Branch to GitHub
```bash
git push -u origin feature/interactive-task-manager
```

### 6. Merge Feature Branch into Main
You can merge via GitHub Pull Request or directly via the terminal:

```bash
# Switch back to main branch
git checkout -b main || git checkout main

# Merge feature branch
git merge feature/interactive-task-manager -m "merge: merge feature/interactive-task-manager into main"

# Push main branch to remote GitHub
git push -u origin main
```

### 7. Demonstrate Clone & Git Pull
To demonstrate pulling latest changes into another directory or testing:
```bash
# Check status and pull latest changes
git pull origin main

# View formatted commit history (Requirement 9)
git log --oneline --graph --decorate --all
```

---

## 🌐 Instant Zero-Cost Cloud Deployment (Vercel)

Since Railway backend quotas may be exhausted, this application is engineered to run **100% client-side** with zero backend infrastructure requirements, allowing **free, unlimited hosting on Vercel**:

### Method 1: Deploy with Vercel Web Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account (`TusharSingh14x`).
2. Click **"Add New..."** -> **"Project"**.
3. Select your repository: **`TusharSingh14x/tpds-01`**.
4. Leave Framework Preset as **"Other"** or **"Vite/Static"** (Root Directory: `./`).
5. Click **Deploy**. Your site will be live with a free SSL domain (e.g., `https://tpds-01.vercel.app`) in under 20 seconds!

### Method 2: Deploy using Vercel CLI (Optional)
```bash
npx vercel --prod
```

### Method 3: Deploy to GitHub Pages (Alternative Free Host)
1. Go to your repository on GitHub: `https://github.com/TusharSingh14x/tpds-01`.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, select **Source:** `Deploy from a branch`.
4. Choose Branch: `main` and Folder: `/ (root)`.
5. Click **Save**.

---

## 🛠️ Features Included

- **Dynamic Typography & Modern Glassmorphism:** Outfit and Plus Jakarta Sans with glowing ambient background orbs.
- **Dark / Light Theme Toggle:** Instant theme switcher persisted in browser `localStorage`.
- **Typing Hero Animation:** Dynamic developer roles typewriter effect.
- **Projects Filtering:** Instant client-side filtering for Lab Practicals, Web Apps, and DevOps.
- **Practical 2 Interactive Demo:** Fully responsive Student Task Management tool with full CRUD operations (Add, Check/Uncheck, Filter, Delete, and LocalStorage persistence).
- **Interactive Contact Form:** Built-in form validation and simulated asynchronous submission toast.
- **Git Command Terminal Showcase:** Built-in lab practical cheat-sheet embedded into the webpage for review.

---

## 👤 Author
- **Name:** Tushar Singh
- **GitHub:** [@TusharSingh14x](https://github.com/TusharSingh14x)
- **Repository:** [tpds-01](https://github.com/TusharSingh14x/tpds-01)
