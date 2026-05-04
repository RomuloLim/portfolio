// ============================================
// GITHUB PROJECTS — fetches public repos and
// filters by description containing [PTF]
// ============================================
const { useState: useStateGH, useEffect: useEffectGH } = React;

const GITHUB_USER = 'RomuloLim';

// Color palette per language (subset of GitHub's official colors)
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  PHP: '#4F5D95',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Shell: '#89e051',
  Dockerfile: '#384d54',
};

// Categorize project type to choose icon + gradient.
// We look at the description and language to guess.
function categorize(repo) {
  const desc = (repo.description || '').toLowerCase();
  const lang = (repo.language || '').toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());
  const all = `${desc} ${topics.join(' ')} ${lang}`;

  if (/api|rest|graphql|backend|server/.test(all) && !/front/.test(desc))
    return { kind: 'api', c1: '#a855f7', c2: '#ec4899' };
  if (/mobile|android|ios|flutter|react.?native|kotlin|swift/.test(all))
    return { kind: 'mobile', c1: '#f59e0b', c2: '#ef4444' };
  if (/full.?stack|fullstack/.test(all))
    return { kind: 'fullstack', c1: '#06b6d4', c2: '#a855f7' };
  if (/front.?end|frontend|react|vue|next|ui|web/.test(all))
    return { kind: 'frontend', c1: '#f97316', c2: '#a855f7' };
  return { kind: 'default', c1: '#f97316', c2: '#fbbf24' };
}

function ProjectCard({ repo, t }) {
  const cat = categorize(repo);
  const langColor = LANG_COLORS[repo.language] || '#7a7a7a';

  // Strip [PTF] tag from description for display
  const desc = (repo.description || '').replace(/\[PTF\]/gi, '').trim();
  // Pretty title from repo name (kebab/snake → Title Case)
  const title = repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <a
      className="project-card"
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — ${t.projects.view}`}
    >
      <div className="project-icon" style={{ '--icon-c': cat.c1, '--icon-c2': cat.c2 }}>
        {window.ProjectIcons[cat.kind] || window.ProjectIcons.default}
      </div>
      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{desc || '—'}</p>
      <div className="project-meta">
        {repo.language && (
          <span className="project-lang">
            <span className="project-lang-dot" style={{ '--lang-color': langColor }}/>
            {repo.language}
          </span>
        )}
        <span className="project-stars" title={`${repo.stargazers_count} ${t.projects.stars}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 1-5 5 1.5 7L12 18l-6.5 3.5L7 14.5l-5-5 7-1z"/></svg>
          {repo.stargazers_count}
        </span>
        {repo.forks_count > 0 && (
          <span className="project-stars" title="Forks">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v2a4 4 0 004 4h4a4 4 0 004-4V8M12 14v2"/></svg>
            {repo.forks_count}
          </span>
        )}
      </div>
    </a>
  );
}

function Projects({ t }) {
  const [state, setState] = useStateGH({ status: 'loading', repos: [] });

  useEffectGH(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
          { headers: { Accept: 'application/vnd.github+json' } }
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const all = await res.json();
        // Filter: description must contain [PTF] (case-insensitive)
        const filtered = all
          .filter(r => r.description && /\[PTF\]/i.test(r.description))
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 6);
        if (!cancelled) setState({ status: 'ok', repos: filtered });
      } catch (err) {
        console.error('GitHub fetch failed:', err);
        if (!cancelled) setState({ status: 'error', repos: [] });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="section reveal" id="projects">
      <div className="container">
        <div className="section-head">
          <h2>{t.projects.title}</h2>
          <p>{t.projects.subtitle}</p>
        </div>
        <div className="projects-grid">
          {state.status === 'loading' && (
            <div className="projects-loading">
              <div className="spinner"/>
              {t.projects.loading}
            </div>
          )}
          {state.status === 'error' && (
            <div className="projects-error">{t.projects.error}</div>
          )}
          {state.status === 'ok' && state.repos.length === 0 && (
            <div className="projects-empty">{t.projects.empty}</div>
          )}
          {state.status === 'ok' && state.repos.map(r => (
            <ProjectCard key={r.id} repo={r} t={t}/>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Projects = Projects;
