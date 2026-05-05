// ============================================
// WE MOVE — Featured project card + showcase modal
// ============================================
const { useState: useWM, useEffect: useWMEffect } = React;

const WM_IMAGES = [
  { src: 'assets/wemove-dashboard.png',  labelPt: 'Painel Administrativo',    labelEn: 'Admin Dashboard' },
  { src: 'assets/wemove-onboarding.png', labelPt: 'Onboarding do App',         labelEn: 'App Onboarding' },
  { src: 'assets/wemove-app.png',        labelPt: 'App do Estudante',           labelEn: 'Student App' },
  { src: 'assets/wemove-routes.png',     labelPt: 'Gestão de Rotas com Mapa',   labelEn: 'Route Management' },
];

const WM_STACK    = ['Laravel', 'React', 'PWA', 'MySQL'];
const WM_AI_TOOLS = ['Claude Code', 'Cursor'];

const WM_CHIP_SLUGS = {
  'Laravel':    ['laravel',    'ef4444'],
  'React':      ['react',      '61dafb'],
  'MySQL':      ['mysql',      '4479a1'],
  'Claude Code':['anthropic',  'f5a623'],
  'Cursor':     ['cursor',     'ffffff'],
};

const WM_YOUTUBE = 'https://www.youtube.com/watch?v=uxMkbDaIDK4';
const WM_TCC     = 'https://siduece.uece.br/siduece/trabalhoAcademicoPublico.jsf?id=122157';

function WeMoveModal({ open, onClose, t, lang }) {
  const [idx, setIdx] = useWM(0);

  useWMEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const prev = () => setIdx(i => (i - 1 + WM_IMAGES.length) % WM_IMAGES.length);
  const next = () => setIdx(i => (i + 1) % WM_IMAGES.length);
  const img  = WM_IMAGES[idx];
  const label = lang === 'pt' ? img.labelPt : img.labelEn;

  return (
    <div className="wm-overlay" onClick={onClose}>
      <div className="wm-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">

        <button className="wm-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13"/>
          </svg>
        </button>

        <div className="wm-layout">

          {/* ── Gallery ── */}
          <div className="wm-gallery">
            <div className="wm-img-wrap">
              <img src={img.src} alt={label} className="wm-img"/>
              <button className="wm-nav wm-nav-prev" onClick={prev} aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button className="wm-nav wm-nav-next" onClick={next} aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            <p className="wm-img-label">{label}</p>
            <div className="wm-dots">
              {WM_IMAGES.map((_, i) => (
                <button key={i} className={`wm-dot${i === idx ? ' active' : ''}`} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`}/>
              ))}
            </div>
          </div>

          {/* ── Info ── */}
          <div className="wm-info">
            <div className="wm-badges">
              <span className="wm-badge wm-badge-featured">{t.wemove.badge_featured}</span>
              <span className="wm-badge wm-badge-tcc">TCC</span>
              <span className="wm-badge wm-badge-private">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM12 17a2 2 0 110-4 2 2 0 010 4zm5-6V8a5 5 0 00-10 0v3"/></svg>
                {t.wemove.badge_private}
              </span>
            </div>

            <div className="wm-modal-header">
              <img src="assets/wemove-icon.svg" alt="We Move" className="wm-logo" onError={e => { e.currentTarget.style.display='none'; }}/>
              <div>
                <h2 className="wm-title">We Move</h2>
                <p className="wm-subtitle-text">{t.wemove.subtitle}</p>
              </div>
            </div>

            <div className="wm-stack">
              {WM_STACK.map(s => {
                const si = WM_CHIP_SLUGS[s];
                return (
                  <span key={s} className="wm-chip">
                    {si && window.siChipIcon(si[0], si[1])}
                    {s}
                  </span>
                );
              })}
            </div>

            <p className="wm-desc">{t.wemove.description}</p>

            <div className="wm-ai-tools">
              <span className="wm-ai-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/></svg>
                {t.wemove.ai_label}
              </span>
              {WM_AI_TOOLS.map(s => {
                const si = WM_CHIP_SLUGS[s];
                return (
                  <span key={s} className="wm-chip wm-chip-ai">
                    {si && window.siChipIcon(si[0], 'a5b4fc')}
                    {s}
                  </span>
                );
              })}
            </div>

            <div className="wm-actions">
              <a href={WM_YOUTUBE} target="_blank" rel="noopener noreferrer" className="wm-btn wm-btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.6 5.8a3 3 0 002.1 2.1c1.9.6 9.3.6 9.3.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
                {t.wemove.watch}
              </a>
              <a href={WM_TCC} target="_blank" rel="noopener noreferrer" className="wm-btn wm-btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                {t.wemove.tcc}
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function WeMoveCard({ t, lang }) {
  const [open, setOpen] = useWM(false);

  return (
    <>
      <div className="wm-card" onClick={() => setOpen(true)} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(true)}
        aria-label="We Move — Ver showcase">

        <div className="wm-card-left">
          <div className="wm-card-icon">
            <img src="assets/wemove-icon.svg" alt="We Move" onError={e => { e.currentTarget.style.display='none'; }}/>
          </div>
          <div className="wm-card-info">
            <div className="wm-card-badges">
              <span className="wm-badge wm-badge-featured">{t.wemove.badge_featured}</span>
              <span className="wm-badge wm-badge-tcc">TCC</span>
            </div>
            <h3 className="wm-card-title">We Move</h3>
            <p className="wm-card-sub">{t.wemove.subtitle}</p>
            <div className="wm-card-stack">
              {WM_STACK.map(s => {
                const si = WM_CHIP_SLUGS[s];
                return (
                  <span key={s} className="wm-chip wm-chip-sm">
                    {si && window.siChipIcon(si[0], si[1])}
                    {s}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="wm-card-right">
          <span className="wm-badge wm-badge-private">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM12 17a2 2 0 110-4 2 2 0 010 4zm5-6V8a5 5 0 00-10 0v3"/></svg>
            {t.wemove.badge_private}
          </span>
          <button className="wm-open-btn" tabIndex={-1}>
            {t.wemove.open_showcase}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <WeMoveModal open={open} onClose={() => setOpen(false)} t={t} lang={lang}/>
    </>
  );
}

window.WeMoveCard = WeMoveCard;
