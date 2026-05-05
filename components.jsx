// ============================================
// COMPONENTS — Header, Hero, Skills, About, Contact, Footer, GoTop
// ============================================
const { useState, useEffect, useRef } = React;

// ----- HEADER -----
function Header({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#hero" className="logo" aria-label="Rômulo Lima">
          <img src="assets/logo-rl.png" alt="RL" />
        </a>
        <nav className="nav">
          <a href="#skills">{t.nav.skills}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#about">{t.nav.about}</a>
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            <button className={lang === 'pt' ? 'active' : ''} onClick={() => setLang('pt')}>PT</button>
          </div>
          <a href="#contact" className="btn-contact" style={{ letterSpacing: "1.4px", width: "100px", textAlign: "center" }}>{t.nav.contact}</a>
        </nav>
      </div>
    </header>);

}

// ----- HERO -----
function Hero({ t }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-glow g1"/>
      <div className="hero-glow g2"/>
      <div className="hero-glow g3"/>
      <div className="container hero-inner">
        <h1 style={{ height: "auto", width: "auto" }}>
          <span className="hero-hey">{t.hero.hey}</span>
          <span className="accent">{t.hero.welcome}</span>
        </h1>
        <p>
          {t.hero.intro_pre}
          <span className="name">{t.hero.intro_name}</span>
          {t.hero.intro_post}
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-outline">{t.hero.see_projects}</a>
          <a href="#contact" className="btn btn-primary">{t.hero.contact_me}</a>
        </div>
      </div>
    </section>);

}

// ----- STACKS & SKILLS -----
function StacksSection({ t }) {
  const stacks = [
  { name: 'Laravel', icon: 'laravel', color: '#ef4444' },
  { name: 'React', icon: 'react', color: '#22d3ee' },
  { name: 'Docker', icon: 'docker', color: '#60a5fa' },
  { name: 'Node.js', icon: 'nodejs', color: '#4ade80' },
  { name: 'JQuery', icon: 'jquery', color: '#3b82f6' },
  { name: 'Postgres', icon: 'postgres', color: '#a78bfa' },
  { name: 'Azure', icon: 'azure', color: '#38bdf8' },
  { name: 'Deploy', icon: 'deploy', color: '#34d399' },
  { name: 'Leader', icon: 'leader', color: '#fb923c' },
  { name: 'Scrum', icon: 'scrum', color: '#f87171' },
  { name: 'Automated Tests', icon: 'tests', color: '#94a3b8' }];


  return (
    <section className="section reveal" id="skills">
      <div className="container">
        <div className="section-head">
          <h2>{t.skills.title}</h2>
          <p>{t.skills.subtitle}</p>
        </div>
        <div className="stack-grid">
          {stacks.map((s) =>
          <div key={s.name} className="stack-pill" style={{ '--c': s.color }}>
              {window.StackIcons[s.icon]}
              <span>{s.name}</span>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ----- ABOUT -----
function About({ t }) {
  const skills = [
  { label: 'Backend', pct: 95 },
  { label: 'Frontend', pct: 80 },
  { label: 'External Services', pct: 85 },
  { label: 'Version Management', pct: 80 },
  { label: 'Agile Methodologies', pct: 80 },
  { label: 'Team Leadership', pct: 80 }];


  const techSkills = [
  'Version management', 'Scrum', 'Team leadership',
  'API development and consumption', 'Azure Cognitive Services',
  'Azure Cloud Storage', 'AWS S3', 'Azure Video Call'];


  return (
    <section className="section reveal" id="about">
      <div className="container">
        <div className="about-intro">
          <div className="avatar">
            <img
              src="https://github.com/RomuloLim.png"
              alt="Rômulo Lima"
              loading="lazy"
            />
          </div>
          <div className="about-text">
            <h2>{t.about.title}</h2>
            <p>{t.about.bio}</p>
            <a href="https://github.com/RomuloLim" target="_blank" rel="noopener" className="btn btn-outline">{t.about.download_cv}</a>
          </div>
        </div>

        <div className="about-grid">
          <div className="profile-block">
            <h3>{t.about.profile}</h3>
            <ul className="profile-list">
              <li><strong>{t.about.name}:</strong> {t.about.name_v}</li>
              <li><strong>{t.about.nationality}:</strong> {t.about.nationality_v}</li>
              <li><strong>{t.about.working}:</strong> {t.about.working_v}</li>
              <li>
                <strong>{t.about.tech_skills}</strong>
                <ul className="skills-list">
                  {techSkills.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </li>
            </ul>
            <a href="https://github.com/RomuloLim" target="_blank" rel="noopener" className="btn btn-outline">{t.about.more_cv}</a>
          </div>

          <SkillsCard t={t} skills={skills} />
        </div>
      </div>
    </section>);

}

function SkillsCard({ t, skills }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {setVisible(true);obs.disconnect();}
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="skills-card" ref={ref}>
      <span className="skills-card-tag">{t.about.skills_tag}</span>
      {skills.map((s) =>
      <div key={s.label} className="skill-item">
          <div className="skill-label">{s.label}</div>
          <div className="skill-bar">
            <div className="skill-bar-fill" style={{ '--p': visible ? `${s.pct}%` : '0%' }} />
          </div>
          <div className="skill-percent">{s.pct}%</div>
        </div>
      )}
    </div>);

}

// ----- CONTACT -----
function Contact({ t }) {
  const [data, setData] = useState({ name: '', email: '', subject: '' });
  const onSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(`${data.subject}\n\n— ${data.name}`);
    const subj = encodeURIComponent(`Portfolio contact — ${data.name}`);
    window.location.href = `mailto:romulo.lf123@gmail.com?subject=${subj}&body=${body}`;
  };
  return (
    <section id="contact">
      <div className="contact-card reveal">
        <h2>{t.contact.title}</h2>
        <p>{t.contact.subtitle}</p>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="contact-row">
            <input
              type="text" required placeholder={t.contact.name}
              value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            
            <input
              type="email" required placeholder={t.contact.email}
              value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            
          </div>
          <textarea
            required placeholder={t.contact.subject}
            value={data.subject} onChange={(e) => setData({ ...data, subject: e.target.value })} />
          
          <button type="submit" className="contact-submit">{t.contact.send}</button>
        </form>
      </div>
    </section>);

}

// ----- FOOTER + GoTop -----
function Footer({ t }) {
  return (
    <footer className="footer">
      {t.footer.made} <span className="heart">❤</span> {t.footer.by} <a href="https://github.com/RomuloLim" target="_blank" rel="noopener">RomuloLim</a>
    </footer>);

}

function GoTop({ t }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`go-top ${show ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t.top}>
      
      ↑ {t.top}
    </button>);

}

Object.assign(window, { Header, Hero, StacksSection, About, Contact, Footer, GoTop });