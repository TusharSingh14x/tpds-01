/**
 * Portfolio & Task Manager Interactive Engine
 * Author: Tushar Singh
 * Handles: Theme toggle, Typing effect, Project filtering, Task Manager CRUD with LocalStorage, Contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initNavbarScroll();
  initProjectFilter();
  initTaskManager();
  initContactForm();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlTag = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlTag.getAttribute('data-bs-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlTag.setAttribute('data-bs-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-moon-stars-fill text-warning';
      } else {
        themeIcon.className = 'bi bi-sun-fill text-warning';
      }
    }
  }
}

/* ==========================================================================
   2. Typing Effect in Hero
   ========================================================================== */
function initTypingEffect() {
  const typedTarget = document.getElementById('typedText');
  if (!typedTarget) return;

  const words = [
    'responsive web applications',
    'Docker containerized solutions',
    'modern frontend experiences',
    'cloud-native architectures',
    'clean, version-controlled code'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 1800;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let nextSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      nextSpeed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      nextSpeed = 400;
    }

    setTimeout(type, nextSpeed);
  }

  type();
}

/* ==========================================================================
   3. Navbar Scroll Behavior
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-sm');
    } else {
      navbar.classList.remove('shadow-sm');
    }
  });

  // Auto-close mobile navbar on link click
  const navLinks = document.querySelectorAll('.nav-link');
  const navCollapse = document.getElementById('navMenu');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* ==========================================================================
   4. Project Category Filtering
   ========================================================================== */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('#projectFilter .filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          item.style.display = 'block';
          item.classList.add('fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Student Task Manager (Practical 2 Frontend CRUD Engine)
   ========================================================================== */
function initTaskManager() {
  const taskForm = document.getElementById('taskForm');
  const taskTitleInput = document.getElementById('taskTitle');
  const taskPrioritySelect = document.getElementById('taskPriority');
  const taskCategorySelect = document.getElementById('taskCategory');
  const taskListContainer = document.getElementById('taskList');
  const clearAllBtn = document.getElementById('clearAllTasksBtn');
  const filterBtns = document.querySelectorAll('#taskFilterButtons button');
  
  const countAll = document.getElementById('countAll');
  const countPending = document.getElementById('countPending');
  const countCompleted = document.getElementById('countCompleted');

  if (!taskForm || !taskListContainer) return;

  // Starter Default Tasks if none exist
  const defaultTasks = [
    { id: 1, title: 'Complete Practical 1 Git Repository and Branching', priority: 'High', category: 'Practical', completed: true },
    { id: 2, title: 'Dockerize Node.js application and test port mapping', priority: 'High', category: 'DevOps', completed: false },
    { id: 3, title: 'Deploy frontend portfolio directly to Vercel', priority: 'Medium', category: 'Practical', completed: false },
    { id: 4, title: 'Revise Git commands (git log, git merge, git pull)', priority: 'Low', category: 'Study', completed: true }
  ];

  let tasks = JSON.parse(localStorage.getItem('student-tasks')) || defaultTasks;
  let currentFilter = 'all';

  function saveTasks() {
    localStorage.setItem('student-tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function getPriorityBadgeClass(priority) {
    switch (priority) {
      case 'High': return 'bg-danger-subtle text-danger border-danger-subtle';
      case 'Medium': return 'bg-warning-subtle text-warning border-warning-subtle';
      case 'Low': return 'bg-success-subtle text-success border-success-subtle';
      default: return 'bg-secondary-subtle text-secondary';
    }
  }

  function renderTasks() {
    taskListContainer.innerHTML = '';

    const filtered = tasks.filter(task => {
      if (currentFilter === 'pending') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true;
    });

    // Update Counts
    const totalCount = tasks.length;
    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = totalCount - completedCount;

    if (countAll) countAll.textContent = totalCount;
    if (countPending) countPending.textContent = pendingCount;
    if (countCompleted) countCompleted.textContent = completedCount;

    if (filtered.length === 0) {
      taskListContainer.innerHTML = `
        <div class="text-center py-4 text-body-secondary">
          <i class="bi bi-clipboard2-check fs-2 d-block mb-2 text-primary opacity-50"></i>
          <span>No tasks found in this view. Add one above!</span>
        </div>
      `;
      return;
    }

    filtered.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
      taskDiv.innerHTML = `
        <div class="d-flex align-items-center gap-3 overflow-hidden">
          <div class="form-check m-0">
            <input class="form-check-input toggle-task-check" type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}" id="check-${task.id}">
          </div>
          <div class="text-truncate">
            <label class="task-title-text fw-medium d-block text-truncate mb-0" for="check-${task.id}">
              ${escapeHtml(task.title)}
            </label>
            <div class="d-flex align-items-center gap-2 mt-1">
              <span class="badge border ${getPriorityBadgeClass(task.priority)} small">${task.priority}</span>
              <span class="badge bg-body-secondary text-body-secondary border small">${task.category}</span>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center gap-2 flex-shrink-0">
          <button class="btn btn-sm btn-outline-danger border-0 delete-task-btn" data-id="${task.id}" title="Delete Task">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;
      taskListContainer.appendChild(taskDiv);
    });

    // Attach Toggle Listeners
    document.querySelectorAll('.toggle-task-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        tasks = tasks.map(t => t.id === id ? { ...t, completed: e.target.checked } : t);
        saveTasks();
      });
    });

    // Attach Delete Listeners
    document.querySelectorAll('.delete-task-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
      });
    });
  }

  // Handle New Task Submission
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskTitleInput.value.trim();
    if (!title) return;

    const newTask = {
      id: Date.now(),
      title: title,
      priority: taskPrioritySelect.value,
      category: taskCategorySelect.value,
      completed: false
    };

    tasks.unshift(newTask);
    saveTasks();
    taskForm.reset();
  });

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderTasks();
    });
  });

  // Clear Completed
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => !t.completed);
      saveTasks();
    });
  }

  // Initial Render
  renderTasks();
}

/* ==========================================================================
   6. Contact Form Simulation
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactAlert');
  const submitBtn = document.getElementById('submitContactBtn');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
    }

    // Simulate asynchronous sending
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i> Send Message';
      }
      if (contactAlert) {
        contactAlert.classList.remove('d-none');
        setTimeout(() => {
          contactAlert.classList.add('d-none');
        }, 5000);
      }
      contactForm.reset();
    }, 800);
  });
}

// Utility: XSS prevention
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
