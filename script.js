// ================== Theme toggle ==================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

function setTheme(mode) {
  root.className = mode === 'light' ? 'light' : '';
  localStorage.setItem('theme', mode);
  themeToggle.textContent = mode === 'light' ? '🌚' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const newMode = root.className === 'light' ? 'dark' : 'light';
  setTheme(newMode);
});

setTheme(localStorage.getItem('theme') || 'dark');

// ================== Animate skill bars ==================
const bars = document.querySelectorAll('.bar');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const span = entry.target.querySelector('span');
      const val = span.getAttribute('data-value');
      entry.target.style.setProperty('--fill', val + '%');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => io.observe(b));

// ================== Projects ==================
const projects = [
  {
    title: 'Manufacturing Data Analysis System',
    desc: 'Automated pipeline to process 50k+ datapoints/day and reduce analysis time by 30%.',
    tags: ['python', 'sql', 'automation'],
    image: 'assets/project-1.png',
    link: '#'
  },
  {
    title: 'Operational Dashboard',
    desc: 'Excel Power Pivot + MySQL backend KPI dashboard for quick decision-making.',
    tags: ['sql', 'excel'],
    image: 'assets/project-2.png',
    link: '#'
  },
  {
    title: 'Data System Engineer — Instant Chartz App',
    desc: 'Built automation (+15% efficiency), optimized workflows (-10% costs), preventive maintenance (-20% downtime).',
    tags: ['automation', 'python'],
    image: 'assets/project-3.png',
    link: '#'
  },
  {
    title: 'AI Chatbot Assistant',
    desc: 'Simple AI chatbot for FAQs using Python + Flask, integrated with website.',
    tags: ['python', 'ai'],
    image: 'assets/project-4.png',
    link: '#'
  },
  {
    title: 'Student Performance Tracker',
    desc: 'Analyzed student data trends for grades, attendance, and performance.',
    tags: ['sql', 'data-analysis'],
    image: 'assets/project-5.png',
    link: '#'
  }
];

function render(filter = 'all') {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  grid.innerHTML = '';
  const filtered = projects.filter(p => filter === 'all' || p.tags.includes(filter));

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="muted">No projects found for this filter.</p>';
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="p-body">
        <h3>${p.title}</h3>
        <p class="muted">${p.desc}</p>
        <div>${p.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</div>
        <div style="margin-top:.6rem">
          <a class="btn" href="${p.link}" target="_blank" rel="noreferrer">Open</a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });
});

// ================== Contact Form ==================
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Sending...';
  const data = Object.fromEntries(new FormData(form));

  // Formspree endpoint if available
  const FORMSPREE_ENDPOINT = '';

  try {
    if (FORMSPREE_ENDPOINT) {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Network error');
      statusEl.textContent = 'Message sent!';
      form.reset();
    } else {
      // Fallback mailto
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`);
      window.location.href = `mailto:elsayedswalm@gmail.com?subject=${encodeURIComponent(data.subject || 'Portfolio Contact')}&body=${body}`;
      statusEl.textContent = 'Opening email app...';
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Failed to send. Please try again.';
  }
});
