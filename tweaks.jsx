// ============================================
// TWEAKS — three expressive controls that reshape feel
//
// 1. Mood preset — swaps entire palette + accent (Aurora / Sunset / Mono / Neon)
// 2. Hero atmosphere — how dense/quiet the hero feels (calm / aurora / dense)
// 3. Card personality — outlined / glass / brutalist
// ============================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "aurora",
  "atmosphere": "aurora",
  "cards": "outlined"
}/*EDITMODE-END*/;

const MOODS = {
  aurora: {
    label: 'Aurora',
    desc: 'Default — orange + purple haze',
    vars: {
      '--bg': '#0a0a0a',
      '--bg-2': '#111111',
      '--bg-3': '#161616',
      '--surface': '#1a1a1a',
      '--border': '#2a2a2a',
      '--border-soft': '#1f1f1f',
      '--text': '#ffffff',
      '--text-2': '#b8b8b8',
      '--text-3': '#7a7a7a',
      '--orange': '#f59e0b',
      '--orange-2': '#f97316',
      '--orange-glow': 'rgba(249, 115, 22, 0.35)',
      '--yellow-bg': '#fbb528',
      '--gradient-text': 'linear-gradient(90deg, #9DE8EE 0%, #FA7C0B 49%, #9F8CED 100%)',
      '--hero-glow-1': 'rgba(249, 115, 22, 0.18)',
      '--hero-glow-2': 'rgba(168, 85, 247, 0.18)',
    }
  },
  sunset: {
    label: 'Sunset',
    desc: 'Warm — magenta + amber',
    vars: {
      '--bg': '#120608',
      '--bg-2': '#1a0a0e',
      '--bg-3': '#1f0c11',
      '--surface': '#240e14',
      '--border': '#3a1820',
      '--border-soft': '#2a1218',
      '--text': '#fff5ec',
      '--text-2': '#d4b5a8',
      '--text-3': '#8a6a5d',
      '--orange': '#fb923c',
      '--orange-2': '#ec4899',
      '--orange-glow': 'rgba(236, 72, 153, 0.35)',
      '--yellow-bg': '#f97316',
      '--gradient-text': 'linear-gradient(135deg, #fde047 0%, #fb923c 40%, #ec4899 100%)',
      '--hero-glow-1': 'rgba(251, 146, 60, 0.25)',
      '--hero-glow-2': 'rgba(236, 72, 153, 0.22)',
    }
  },
  mono: {
    label: 'Mono',
    desc: 'Editorial — refined, tonal',
    vars: {
      '--bg': '#0f0f10',
      '--bg-2': '#161618',
      '--bg-3': '#1c1c1f',
      '--surface': '#202024',
      '--border': '#2f2f33',
      '--border-soft': '#222226',
      '--text': '#fafafa',
      '--text-2': '#a8a8ac',
      '--text-3': '#6e6e74',
      '--orange': '#e5e5e5',
      '--orange-2': '#cccccc',
      '--orange-glow': 'rgba(255, 255, 255, 0.15)',
      '--yellow-bg': '#e5e5e5',
      '--gradient-text': 'linear-gradient(135deg, #ffffff 0%, #a8a8ac 100%)',
      '--hero-glow-1': 'rgba(255, 255, 255, 0.06)',
      '--hero-glow-2': 'rgba(180, 180, 200, 0.05)',
    }
  },
  neon: {
    label: 'Neon',
    desc: 'Retro — cyan + magenta on indigo',
    vars: {
      '--bg': '#08081a',
      '--bg-2': '#0d0d24',
      '--bg-3': '#11112e',
      '--surface': '#16163a',
      '--border': '#2a2a5a',
      '--border-soft': '#1d1d40',
      '--text': '#e8f0ff',
      '--text-2': '#a8b8d8',
      '--text-3': '#6878a8',
      '--orange': '#22d3ee',
      '--orange-2': '#d946ef',
      '--orange-glow': 'rgba(217, 70, 239, 0.4)',
      '--yellow-bg': '#22d3ee',
      '--gradient-text': 'linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #d946ef 100%)',
      '--hero-glow-1': 'rgba(34, 211, 238, 0.22)',
      '--hero-glow-2': 'rgba(217, 70, 239, 0.22)',
    }
  }
};

const ATMOSPHERES = {
  calm: {
    label: 'Calm',
    desc: 'Quiet — minimal background activity',
    vars: {
      '--hero-bg': 'var(--bg)',
      '--hero-grid-opacity': '0',
      '--hero-noise': 'none',
    }
  },
  aurora: {
    label: 'Aurora',
    desc: 'Default — soft glows + faint grid',
    vars: {
      '--hero-bg': `
        radial-gradient(ellipse 600px 400px at 0% 60%, var(--hero-glow-1), transparent 70%),
        radial-gradient(ellipse 500px 400px at 100% 40%, var(--hero-glow-2), transparent 70%),
        var(--bg)`,
      '--hero-grid-opacity': '1',
      '--hero-noise': 'none',
    }
  },
  dense: {
    label: 'Dense',
    desc: 'Atmospheric — large blooms + scanlines',
    vars: {
      '--hero-bg': `
        radial-gradient(ellipse 900px 600px at -10% 80%, var(--hero-glow-1), transparent 60%),
        radial-gradient(ellipse 800px 600px at 110% 20%, var(--hero-glow-2), transparent 60%),
        radial-gradient(ellipse 600px 400px at 50% 100%, var(--hero-glow-1), transparent 70%),
        var(--bg)`,
      '--hero-grid-opacity': '1.5',
      '--hero-noise': 'repeating-linear-gradient(180deg, transparent 0, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 4px)',
    }
  }
};

const CARDS = {
  outlined: {
    label: 'Outlined',
    desc: 'Default — bordered card',
  },
  glass: {
    label: 'Glass',
    desc: 'Frosted — translucent + blur',
  },
  brutalist: {
    label: 'Brutalist',
    desc: 'Hard — flat fill, offset shadow',
  }
};

function applyTweaks({ mood, atmosphere, cards }) {
  const root = document.documentElement;
  const moodVars = (MOODS[mood] || MOODS.aurora).vars;
  const atmVars  = (ATMOSPHERES[atmosphere] || ATMOSPHERES.aurora).vars;
  Object.entries(moodVars).forEach(([k, v]) => root.style.setProperty(k, v));
  Object.entries(atmVars).forEach(([k, v]) => root.style.setProperty(k, v));
  // Card personality is just a class on body — CSS handles the rest
  document.body.dataset.cards = cards;
  document.body.dataset.mood = mood;
}

// React hook driving the panel
function PortfolioTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyTweaks(t);
  }, [t.mood, t.atmosphere, t.cards]);

  // Apply on mount synchronously to avoid FOUC
  if (typeof window !== 'undefined' && !window.__tweaksApplied) {
    applyTweaks(t);
    window.__tweaksApplied = true;
  }

  const moodOpts = Object.keys(MOODS).map(k => ({ value: k, label: MOODS[k].label }));
  const atmOpts  = Object.keys(ATMOSPHERES).map(k => ({ value: k, label: ATMOSPHERES[k].label }));
  const cardOpts = Object.keys(CARDS).map(k => ({ value: k, label: CARDS[k].label }));

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Mood"/>
      <TweakRadio
        label="Palette"
        value={t.mood}
        options={moodOpts}
        onChange={(v) => setTweak('mood', v)}
      />
      <div style={{
        fontSize: 10.5, color: 'rgba(41,38,27,.55)', marginTop: -2,
        fontStyle: 'italic'
      }}>
        {MOODS[t.mood].desc}
      </div>

      <TweakSection label="Hero atmosphere"/>
      <TweakRadio
        label="Density"
        value={t.atmosphere}
        options={atmOpts}
        onChange={(v) => setTweak('atmosphere', v)}
      />
      <div style={{
        fontSize: 10.5, color: 'rgba(41,38,27,.55)', marginTop: -2,
        fontStyle: 'italic'
      }}>
        {ATMOSPHERES[t.atmosphere].desc}
      </div>

      <TweakSection label="Card personality"/>
      <TweakRadio
        label="Style"
        value={t.cards}
        options={cardOpts}
        onChange={(v) => setTweak('cards', v)}
      />
      <div style={{
        fontSize: 10.5, color: 'rgba(41,38,27,.55)', marginTop: -2,
        fontStyle: 'italic'
      }}>
        {CARDS[t.cards].desc}
      </div>
    </TweaksPanel>
  );
}

window.PortfolioTweaks = PortfolioTweaks;
window.applyTweaks = applyTweaks;
window.TWEAK_DEFAULTS = TWEAK_DEFAULTS;
