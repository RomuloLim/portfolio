// ============================================
// ICONS — Simple Icons (CDN) + custom SVGs
// ============================================
const { useMemo } = React;

// Brand icons from Simple Icons CDN — slug maps to cdn.simpleicons.org/{slug}/{hex}
const SI_SLUGS = {
  laravel:  'laravel',
  react:    'react',
  docker:   'docker',
  nodejs:   'nodedotjs',
  jquery:   'jquery',
  postgres: 'postgresql',
  azure:    'microsoftazure',
  claude:   'anthropic',
  cursor:   'cursor',
};

// Custom SVGs for concepts without a brand icon
const StackIcons = {
  deploy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l8-12 8 12"/><path d="M4 17h16"/><path d="M8 21h8"/><path d="M10 13h4"/></svg>
  ),
  leader: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 2-3.5 4-3.5s2.5 1 2.5 2"/></svg>
  ),
  scrum: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 11-9-9c2.5 0 4.7 1 6.4 2.6"/><path d="M21 4v5h-5"/></svg>
  ),
  tests: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l2 2 4-4M7 15l2 2 4-4"/></svg>
  ),
};

// Returns a Simple Icons <img> for brand icons, or falls back to a custom SVG
function renderStackIcon(icon, color) {
  if (SI_SLUGS[icon]) {
    const hex = (color || 'ffffff').replace('#', '');
    return <img src={`https://cdn.simpleicons.org/${SI_SLUGS[icon]}/${hex}`} width="22" height="22" alt="" aria-hidden="true" style={{flexShrink:0, position:'relative', zIndex:1}}/>;
  }
  return StackIcons[icon] || StackIcons.deploy;
}

// Returns a small Simple Icons <img> for use inside chips (wemove, etc.)
function siChipIcon(slug, hex) {
  return <img src={`https://cdn.simpleicons.org/${slug}/${(hex||'ffffff').replace('#','')}`} width="13" height="13" alt="" aria-hidden="true" style={{flexShrink:0}}/>;
}

const ProjectIcons = {
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4V4z"/><path d="M16 4v16M9 9l-2 2 2 2M13 9l2 2-2 2"/></svg>
  ),
  fullstack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M7 14l-2-1 2-1M11 14l2-1-2-1"/></svg>
  ),
  frontend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18"/><circle cx="6" cy="6.5" r="0.5" fill="currentColor"/><circle cx="8" cy="6.5" r="0.5" fill="currentColor"/><path d="M14 13l3 2-3 2"/></svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4M9 6l-1 1 1 1M15 6l1 1-1 1"/></svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></svg>
  )
};

window.StackIcons = StackIcons;
window.ProjectIcons = ProjectIcons;
window.renderStackIcon = renderStackIcon;
window.siChipIcon = siChipIcon;
