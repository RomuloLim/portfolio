// ============================================
// ICONS — inline SVGs for stacks, skills, projects
// ============================================
const { useMemo } = React;

const StackIcons = {
  laravel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l10 5 10-5"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2.2" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 11h2v2H3v-2zm3 0h2v2H6v-2zm3 0h2v2H9v-2zm3 0h2v2h-2v-2zm-6-3h2v2H6V8zm3 0h2v2H9V8zm3 0h2v2h-2V8zm0-3h2v2h-2V5zM2 14h18.5c1 0 1.5.5 1.5 1.5 0 2.5-3 4.5-7 4.5H8c-3 0-6-2-6-6z"/></svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/><path d="M9 9v5a2 2 0 002 2M14 9c2 0 2 1.5 2 1.5M14 14c2 0 2-1.5 2-1.5"/></svg>
  ),
  jquery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6c0 8 4 14 12 14M2 9c0 8 5 12 13 12M6 4c0 5 4 8 10 8"/></svg>
  ),
  postgres: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>
  ),
  azure: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 4L4 18h6l1.5-3 4 5h6L13 4h-2zm0 4l3 6-3 1-2 2 2-9z"/></svg>
  ),
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
  )
};

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
