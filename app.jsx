// ============================================
// APP — root component, ties everything together
// ============================================
const { useState: useS, useEffect: useE } = React;

function App() {
  const [lang, setLang] = useS(() => {
    return localStorage.getItem('portfolio-lang') || 'en';
  });
  const t = window.translations[lang];

  useE(() => {
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Dismiss page loader once React has mounted
  useE(() => {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    loader.classList.add('loader-done');
    const t = setTimeout(() => loader.remove(), 550);
    return () => clearTimeout(t);
  }, []);

  // Scroll reveal
  useE(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <React.Fragment>
      <Header t={t} lang={lang} setLang={setLang}/>
      <Hero t={t}/>
      <StacksSection t={t}/>
      <Projects t={t} lang={lang}/>
      <About t={t}/>
      <Contact t={t}/>
      <Footer t={t}/>
      <GoTop t={t}/>
      {window.PortfolioTweaks ? <window.PortfolioTweaks/> : null}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
