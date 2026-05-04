/* ============================================================
   GSAP SETUP
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);

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
  return LANG_ICONS[lang.toLowerCase()] || null;
}

function getLangColor(lang) {
  if (!lang) return '#a1aebf';
  return LANG_COLORS[lang.toLowerCase()] || '#a1aebf';
}

function buildProjectCard(repo) {
  const description = cleanDescription(repo.description);
  const langColor   = getLangColor(repo.language);
  const langIcon    = getLangIcon(repo.language);

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
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
               fill="rgba(255,255,255,0.4)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14
                     2 9.27l6.91-1.01L12 2z"/>
          </svg>
          ${repo.stargazers_count}
        </span>
      ` : ''}
    </div>`;

  return `
    <a class="project-card" href="${repo.html_url}" target="_blank"
       rel="noopener noreferrer" aria-label="${repo.name}">
      <div class="project-card-icon">${iconHtml}</div>
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
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const repos    = await res.json();
    const ptfRepos = repos.filter(
      r => r.description && r.description.toUpperCase().includes(PTF_TAG)
    );

    if (ptfRepos.length === 0) {
      grid.innerHTML = `<div class="projects-empty">
        No projects tagged with ${PTF_TAG} found yet. Check back soon!
      </div>`;
      return;
    }

    grid.innerHTML = ptfRepos.map(buildProjectCard).join('');
    animateProjectCards();

  } catch (err) {
    console.error('Failed to load GitHub projects:', err);
    grid.innerHTML = `<div class="projects-error">
      Could not load projects. Visit
      <a href="https://github.com/${GITHUB_USERNAME}" target="_blank"
         rel="noopener" style="color:#ffa800">github.com/${GITHUB_USERNAME}</a>.
    </div>`;
  }
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  gsap.to('#scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'none' });
  });

  // Ring lags behind with lerp
  function tickRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(ring, { x: ringX, y: ringY });
    requestAnimationFrame(tickRing);
  }
  tickRing();

  // Scale ring on interactive elements
  const interactives = 'a, button, [data-magnetic], .skill-badge, .project-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) {
      gsap.to(ring, { scale: 1.8, opacity: 0.6, duration: 0.3 });
      gsap.to(dot,  { scale: 0.4, duration: 0.3 });
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot,  { scale: 1, duration: 0.3 });
    }
  });

  // Hide on mobile
  if ('ontouchstart' in window) {
    dot.style.display  = 'none';
    ring.style.display = 'none';
  }
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
function initMagneticButtons() {
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect    = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const dx      = (e.clientX - centerX) * 0.35;
      const dy      = (e.clientY - centerY) * 0.35;
      gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

/* ============================================================
   MOUSE PARALLAX — HERO GLOWS
   ============================================================ */
function initHeroParallax() {
  const glowL = document.querySelector('.hero-glow-left');
  const glowR = document.querySelector('.hero-glow-right');
  if (!glowL || !glowR) return;

  window.addEventListener('mousemove', (e) => {
    const xPct = (e.clientX / window.innerWidth  - 0.5) * 2;
    const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to(glowL, { x: xPct * -30, y: yPct * -20, duration: 1.2, ease: 'power1.out' });
    gsap.to(glowR, { x: xPct *  25, y: yPct *  20, duration: 1.4, ease: 'power1.out' });
  });
}

/* ============================================================
   SPLIT WORDS UTILITY
   ============================================================ */
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words
    .map(w => `<span class="split-word"><span class="split-inner">${w}</span></span>`)
    .join(' ');
  return el.querySelectorAll('.split-inner');
}

/* ============================================================
   HERO ENTRANCE ANIMATION
   ============================================================ */
function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });

  tl.from('#navbar', { y: -80, opacity: 0, duration: 0.7 })
    .from('.hero-hey',      { opacity: 0, x: -50, duration: 0.55 }, '-=0.25')
    .from('.hero-welcome',  { opacity: 0, x:  50, duration: 0.55 }, '-=0.4')
    .from('.hero-subtitle', { opacity: 0, y:  28, duration: 0.5  }, '-=0.2')
    .from('.hero-ctas > *', {
      opacity: 0, y: 20, stagger: 0.12, duration: 0.45,
    }, '-=0.2');
}

/* ============================================================
   SCROLL-TRIGGERED SECTION ANIMATIONS
   ============================================================ */
function initSectionAnimations() {

  // --- Section headers with split-word reveal ---
  document.querySelectorAll('[data-split-words]').forEach((h2) => {
    const words = splitWords(h2);
    gsap.from(words, {
      scrollTrigger: { trigger: h2, start: 'top 88%', once: true },
      y: '110%', opacity: 0,
      stagger: 0.07,
      duration: 0.6,
      ease: 'power3.out',
    });
  });

  // --- Section header subtitles ---
  gsap.utils.toArray('.section-header p').forEach((p) => {
    gsap.from(p, {
      scrollTrigger: { trigger: p, start: 'top 90%', once: true },
      opacity: 0, y: 22, duration: 0.6, ease: 'power2.out',
    });
  });

  // --- Skill badges staggered bounce ---
  gsap.from('.skill-badge', {
    scrollTrigger: { trigger: '.skills-grid', start: 'top 82%', once: true },
    opacity: 0, y: 35, scale: 0.85,
    stagger: { amount: 0.6, from: 'start' },
    duration: 0.5,
    ease: 'back.out(1.8)',
  });

  // --- About: avatar slide in from left ---
  gsap.from('.about-avatar', {
    scrollTrigger: { trigger: '.about-top', start: 'top 82%', once: true },
    opacity: 0, x: -60, duration: 0.7, ease: 'power3.out',
  });

  // --- About: intro text slide from right ---
  gsap.from('.about-intro > *', {
    scrollTrigger: { trigger: '.about-top', start: 'top 82%', once: true },
    opacity: 0, x: 50,
    stagger: 0.12,
    duration: 0.6,
    ease: 'power3.out',
  });

  // --- Profile card lines ---
  gsap.from('.profile-card > *', {
    scrollTrigger: { trigger: '.about-bottom', start: 'top 82%', once: true },
    opacity: 0, y: 24,
    stagger: 0.1,
    duration: 0.55,
    ease: 'power2.out',
  });

  // --- Skills card ---
  gsap.from('.skills-card', {
    scrollTrigger: { trigger: '.about-bottom', start: 'top 82%', once: true },
    opacity: 0, x: 50, duration: 0.7, ease: 'power3.out',
  });

  // --- Skill progress bars ---
  document.querySelectorAll('.skill-bar-fill').forEach((fill) => {
    const pct = fill.dataset.pct || '0';
    gsap.fromTo(fill,
      { width: '0%' },
      {
        width: pct + '%',
        duration: 1.3,
        ease: 'power2.out',
        scrollTrigger: { trigger: fill, start: 'top 88%', once: true },
      }
    );
  });

  // --- Skill bar names count-up ---
  document.querySelectorAll('.skill-bar-pct').forEach((el) => {
    const target = parseInt(el.textContent, 10);
    const obj    = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.3,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => { el.textContent = Math.round(obj.val) + '%'; },
    });
  });

  // --- Contact box ---
  gsap.from('.contact-box', {
    scrollTrigger: { trigger: '#contact', start: 'top 85%', once: true },
    opacity: 0, y: 60, scale: 0.97, duration: 0.8, ease: 'power3.out',
  });

  // --- Contact form fields ---
  gsap.from('.contact-form input, .contact-form textarea, .btn-dark', {
    scrollTrigger: { trigger: '.contact-form', start: 'top 88%', once: true },
    opacity: 0, y: 20,
    stagger: 0.08,
    duration: 0.5,
    ease: 'power2.out',
  });

  // --- Footer ---
  gsap.from('#footer > *', {
    scrollTrigger: { trigger: '#footer', start: 'top 95%', once: true },
    opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power2.out',
  });
}

/* ============================================================
   PROJECT CARDS ANIMATION (called after API fetch)
   ============================================================ */
function animateProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  gsap.from(cards, {
    scrollTrigger: {
      trigger: '#projects-grid',
      start: 'top 85%',
      once: true,
    },
    opacity: 0,
    y: 50,
    scale: 0.93,
    stagger: { amount: 0.5, from: 'start' },
    duration: 0.55,
    ease: 'power3.out',
  });

  // Hover tilt effect on project cards
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const xRel   = (e.clientX - rect.left) / rect.width  - 0.5;
      const yRel   = (e.clientY - rect.top)  / rect.height - 0.5;
      gsap.to(card, {
        rotateX: -yRel * 8,
        rotateY:  xRel * 8,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power1.out',
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0, rotateY: 0,
        duration: 0.5, ease: 'power2.out',
      });
    });
  });
}

/* ============================================================
   NAVBAR — scroll shrink + active link
   ============================================================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  ScrollTrigger.create({
    start: 40,
    onEnter:      () => nav.classList.add('scrolled'),
    onLeaveBack:  () => nav.classList.remove('scrolled'),
  });

  // Active section highlight
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form    = document.getElementById('contact-form');
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
  document.body.classList.remove('is-loading');

  initScrollProgress();
  initCursor();
  initHeroAnimation();
  initHeroParallax();
  initSectionAnimations();
  initMagneticButtons();
  initNavbar();
  initContactForm();
  loadProjects();
});
