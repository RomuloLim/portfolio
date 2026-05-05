/* ============================================================
   MOTION LAYER — GSAP enhancements on top of the React app
   Runs after React has mounted and rendered the initial DOM.
   ============================================================ */

(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* ----------------------------------------------------------
     Wait for React to render the #root content
     ---------------------------------------------------------- */
  function onReady(callback) {
    const root = document.getElementById('root');
    if (!root || !root.firstChild) {
      const obs = new MutationObserver(() => {
        if (root.firstChild) { obs.disconnect(); callback(); }
      });
      obs.observe(root, { childList: true, subtree: true });
    } else {
      callback();
    }
  }

  onReady(function () {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        /* Unlock all .reveal sections immediately so GSAP reads correct
           computed values and CSS opacity:0 doesn't bleed into children */
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));

        initScrollProgress();
        initCursor();
        initHeroEntrance();
        initHeroGlowParallax();
        // initMagneticButtons();
        initSectionScrollAnimations();
      });
    });
  });

  /* ----------------------------------------------------------
     SCROLL PROGRESS BAR
     ---------------------------------------------------------- */
  function initScrollProgress() {
    gsap.to('#scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
      },
    });
  }

  /* ----------------------------------------------------------
     CUSTOM CURSOR
     ---------------------------------------------------------- */
  function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    document.body.style.cursor = 'none';
    document.documentElement.classList.add('custom-cursor');

    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.07, ease: 'none' });
    }, { passive: true });

    (function lerp() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(lerp);
    })();

    const INTERACTIVE = 'a, button, [data-magnetic], .stack-pill, .project-card, .btn, .btn-contact, .lang-toggle button';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(ring, { scale: 1.9, opacity: 0.5, duration: 0.3 });
        gsap.to(dot, { scale: 0.35, duration: 0.3 });
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    });
  }

  /* ----------------------------------------------------------
     HERO ENTRANCE
     ---------------------------------------------------------- */
  function initHeroEntrance() {
    const header = document.querySelector('.header');
    const heyEl = document.querySelector('.hero-hey');
    const accEl = document.querySelector('.hero .accent');
    const heroP = document.querySelector('.hero > .container > p, .hero p');
    const heroAct = document.querySelector('.hero-actions');

    if (!header) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(header, { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 });
    if (heyEl) tl.fromTo(heyEl, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.55 }, '-=0.2');
    if (accEl) tl.fromTo(accEl, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.55 }, '-=0.4');
    if (heroP) tl.fromTo(heroP, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
    if (heroAct) tl.fromTo(heroAct.children,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.45 },
      '-=0.15');
  }

  /* ----------------------------------------------------------
     HERO GLOW MOUSE PARALLAX
     ---------------------------------------------------------- */
  function initHeroGlowParallax() {
    const g1 = document.querySelector('.hero-glow.g1');
    const g2 = document.querySelector('.hero-glow.g2');
    if (!g1 && !g2) return;

    window.addEventListener('mousemove', (e) => {
      const xP = (e.clientX / window.innerWidth - 0.5) * 2;
      const yP = (e.clientY / window.innerHeight - 0.5) * 2;
      if (g1) gsap.to(g1, { x: xP * -28, y: yP * -18, duration: 1.4, ease: 'power1.out', overwrite: 'auto' });
      if (g2) gsap.to(g2, { x: xP * 22, y: yP * 18, duration: 1.6, ease: 'power1.out', overwrite: 'auto' });
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     MAGNETIC BUTTONS
     ---------------------------------------------------------- */
  function initMagneticButtons() {
    document.querySelectorAll('.hero-actions .btn, .hero-actions a').forEach((btn) => {
      btn.setAttribute('data-magnetic', '');
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.32;
        const dy = (e.clientY - r.top - r.height / 2) * 0.32;
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  /* ----------------------------------------------------------
     SCROLL-TRIGGERED SECTION ANIMATIONS
     ---------------------------------------------------------- */
  function initSectionScrollAnimations() {

    /* Section headers */
    document.querySelectorAll('.section-head h2').forEach((h2) => {
      gsap.fromTo(h2,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: h2, start: 'top 88%', once: true }
        }
      );
    });

    document.querySelectorAll('.section-head p').forEach((p) => {
      gsap.fromTo(p,
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.1,
          scrollTrigger: { trigger: p, start: 'top 90%', once: true }
        }
      );
    });

    /* Stack pills staggered */
    const pills = document.querySelectorAll('.stack-pill');
    if (pills.length) {
      gsap.fromTo(pills,
        { opacity: 0, y: 28, scale: 0.88 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: { amount: 0.5, from: 'start' },
          duration: 0.5, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.stack-grid', start: 'top 84%', once: true }
        }
      );
    }

    /* Project cards — enhanced tilt on hover */
    initProjectCardEffects();

    /* About section */
    const avatar = document.querySelector('.avatar');
    if (avatar) {
      gsap.fromTo(avatar,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: avatar, start: 'top 85%', once: true }
        }
      );
    }

    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
      gsap.fromTo(aboutText.children,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: aboutText, start: 'top 86%', once: true }
        }
      );
    }

    const profileBlock = document.querySelector('.profile-block');
    if (profileBlock) {
      gsap.fromTo(profileBlock.children,
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.55, ease: 'power2.out',
          scrollTrigger: { trigger: profileBlock, start: 'top 84%', once: true }
        }
      );
    }

    const skillsCard = document.querySelector('.skills-card');
    if (skillsCard) {
      gsap.fromTo(skillsCard,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: skillsCard, start: 'top 84%', once: true }
        }
      );
    }

    /* Contact card */
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
      gsap.fromTo(contactCard,
        { opacity: 0, y: 56, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: contactCard, start: 'top 86%', once: true }
        }
      );
      gsap.fromTo(
        contactCard.querySelectorAll('input, textarea, .contact-submit'),
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out', delay: 0.2,
          scrollTrigger: { trigger: contactCard, start: 'top 82%', once: true }
        }
      );
    }
  }

  /* ----------------------------------------------------------
     PROJECT CARD 3D TILT + GSAP STAGGER (after API loads)
     ---------------------------------------------------------- */
  function initProjectCardEffects() {
    let attempts = 0;
    const tryInit = () => {
      const cards = document.querySelectorAll('.project-card');
      if (!cards.length && attempts++ < 30) {
        setTimeout(tryInit, 400);
        return;
      }
      if (!cards.length) return;

      gsap.fromTo(cards,
        { opacity: 0, y: 48, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: { amount: 0.45 },
          duration: 0.55, ease: 'power3.out',
          scrollTrigger: { trigger: '.projects-grid', start: 'top 84%', once: true }
        }
      );

      cards.forEach((card) => {
        card.style.transformStyle = 'preserve-3d';
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const xR = (e.clientX - r.left) / r.width - 0.5;
          const yR = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateX: -yR * 7, rotateY: xR * 7,
            transformPerspective: 900,
            duration: 0.35, ease: 'power1.out',
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
        });
      });
    };
    tryInit();
  }

})();
