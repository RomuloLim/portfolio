/* ============================================================
   GITHUB PROJECTS
   ============================================================ */
const GITHUB_USERNAME = 'romulolim';
const PTF_TAG = '[PTF]';

const LANG_COLORS = {
  javascript: '#f1e05a',
  typescript: '#3178c6',
  php:        '#4F5D95',
  python:     '#3572A5',
  java:       '#b07219',
  'c#':       '#178600',
  go:         '#00ADD8',
  rust:       '#dea584',
  html:       '#e34c26',
  css:        '#563d7c',
  vue:        '#41b883',
  shell:      '#89e051',
};

const LANG_ICONS = {
  javascript: 'https://cdn.simpleicons.org/javascript/f1e05a',
  typescript: 'https://cdn.simpleicons.org/typescript/3178c6',
  php:        'https://cdn.simpleicons.org/php/4F5D95',
  python:     'https://cdn.simpleicons.org/python/3572A5',
  java:       'https://cdn.simpleicons.org/openjdk/b07219',
  'c#':       'https://cdn.simpleicons.org/dotnet/178600',
  go:         'https://cdn.simpleicons.org/go/00ADD8',
  rust:       'https://cdn.simpleicons.org/rust/dea584',
  html:       'https://cdn.simpleicons.org/html5/e34c26',
  css:        'https://cdn.simpleicons.org/css3/563d7c',
  vue:        'https://cdn.simpleicons.org/vuedotjs/41b883',
  shell:      'https://cdn.simpleicons.org/gnubash/89e051',
};

const GITHUB_ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#a1aebf">
  <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
</svg>`;

function cleanDescription(desc) {
  if (!desc) return '';
  return desc.replace(/\[PTF\]/gi, '').trim();
}

function getLangIcon(lang) {
  if (!lang) return null;
  const key = lang.toLowerCase();
  return LANG_ICONS[key] || null;
}

function getLangColor(lang) {
  if (!lang) return '#a1aebf';
  return LANG_COLORS[lang.toLowerCase()] || '#a1aebf';
}

function buildProjectCard(repo) {
  const description = cleanDescription(repo.description);
  const langKey = repo.language ? repo.language.toLowerCase() : null;
  const langColor = getLangColor(repo.language);
  const langIcon = getLangIcon(repo.language);

  const iconHtml = langIcon
    ? `<img src="${langIcon}" alt="${repo.language}" width="40" height="40">`
    : GITHUB_ICON_SVG;

  const footerHtml = `
    <div class="project-card-footer">
      ${repo.language ? `
        <span class="project-lang-dot" style="background:${langColor}"></span>
        <span class="project-lang-name">${repo.language}</span>
      ` : ''}
      ${repo.stargazers_count > 0 ? `
        <span class="project-stars" title="Stars">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          ${repo.stargazers_count}
        </span>
      ` : ''}
    </div>`;

  return `
    <a class="project-card reveal" href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="${repo.name}">
      <div class="project-card-icon">
        ${iconHtml}
      </div>
      <h3>${repo.name}</h3>
      ${description ? `<p>${description}</p>` : ''}
      ${footerHtml}
    </a>`;
}

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );

    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);

    const repos = await res.json();
    const ptfRepos = repos.filter(
      r => r.description && r.description.toUpperCase().includes(PTF_TAG)
    );

    if (ptfRepos.length === 0) {
      grid.innerHTML = `
        <div class="projects-empty">
          No projects tagged with ${PTF_TAG} found yet. Check back soon!
        </div>`;
      return;
    }

    grid.innerHTML = ptfRepos.map(buildProjectCard).join('');

    // Trigger reveal animation for newly added cards
    observeReveal();

  } catch (err) {
    console.error('Failed to load GitHub projects:', err);
    grid.innerHTML = `
      <div class="projects-error">
        Could not load projects. Please try again later or visit
        <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener" style="color:#ffa800">
          github.com/${GITHUB_USERNAME}
        </a>.
      </div>`;
  }
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function observeReveal() {
  const targets = document.querySelectorAll('.reveal:not(.visible)');
  if (!targets.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
}

/* ============================================================
   SKILL BARS ANIMATION
   ============================================================ */
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct = fill.dataset.pct || '0';
        fill.style.width = pct + '%';
        io.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(fill => io.observe(fill));
}

/* ============================================================
   NAVBAR SCROLL EFFECT
   ============================================================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(10, 10, 10, 0.92)';
    } else {
      nav.style.background = 'rgba(15, 15, 15, 0.4)';
    }
  }, { passive: true });
}

/* ============================================================
   ACTIVE NAV LINK HIGHLIGHT
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();

    if (!name || !email || !subject) return;

    const mailto = `mailto:romulolimafonseca@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${subject}`)}`;
    window.location.href = mailto;

    form.reset();
    if (success) {
      success.hidden = false;
      setTimeout(() => { success.hidden = true; }, 5000);
    }
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Add reveal class to sections/elements
  document.querySelectorAll('section > *:not(.hero-grid):not(.hero-glow-left):not(.hero-glow-right):not(.hero-content)').forEach(el => {
    el.classList.add('reveal');
  });

  initNavbar();
  initActiveNav();
  initContactForm();
  observeReveal();
  animateSkillBars();
  loadProjects();
});
