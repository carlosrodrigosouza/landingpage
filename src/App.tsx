import { useEffect, useRef, useState } from 'react'
import { ConfigMissing } from './components/ConfigMissing'
import { ServiceFlipCard } from './components/ServiceFlipCard'
import { SiteTerminal } from './components/SiteTerminal'
import { siteConfig, siteConfigStatus } from './config/siteConfig'

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const whatsappNumber = siteConfig.contact.whatsappParts.join('')
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`
  const themeClass = `theme-${siteConfig.theme ?? 'bootstrap'}`

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const onResize = () => {
      if (mq.matches) setNavOpen(false)
    }
    mq.addEventListener('change', onResize)
    onResize()
    return () => mq.removeEventListener('change', onResize)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false)
    }
    if (navOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navOpen])

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!navOpen) return
      if (headerRef.current?.contains(e.target as Node)) return
      setNavOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [navOpen])

  const closeNav = () => setNavOpen(false)
  const openWhatsApp = () => {
    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
  }

  if (!siteConfigStatus.isReady) {
    return (
      <div className={`app-root ${themeClass}`}>
        <ConfigMissing missing={siteConfigStatus.missing} />
      </div>
    )
  }

  return (
    <div className={`app-root ${themeClass}`}>
      <header className="nav-shell" ref={headerRef}>
        <div className="nav-shell__inner">
          <a href="#" className="nav-shell__brand" onClick={closeNav}>
            <strong>{siteConfig.brand.name}</strong>
            <strong className="nav-shell__brand-short">{siteConfig.brand.shortName}</strong>
            <span>{siteConfig.brand.role}</span>
          </a>
          <button
            type="button"
            className={`nav-shell__menu-btn${navOpen ? ' nav-shell__menu-btn--open' : ''}`}
            aria-expanded={navOpen}
            aria-controls="site-nav"
            aria-label={navOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span className="nav-shell__menu-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <nav
            id="site-nav"
            className={`nav-shell__nav${navOpen ? ' nav-shell__nav--open' : ''}`}
            aria-label="Seções"
          >
            <a className="nav-shell__link" href="#console" onClick={closeNav}>
              Console
            </a>
            <a className="nav-shell__link" href="#stack" onClick={closeNav}>
              Stack
            </a>
            <a className="nav-shell__link" href="#servicos" onClick={closeNav}>
              Serviços
            </a>
            <a className="nav-shell__link" href="#entregas" onClick={closeNav}>
              Entregas
            </a>
            <a className="nav-shell__link nav-shell__link--cta" href="#contato" onClick={closeNav}>
              Contato
            </a>
          </nav>
        </div>
      </header>

      <main className="page">
      <div className="hero-terminal-row">
        <section className="hero section-surface">
          <p className="tag">{siteConfig.hero.tag}</p>
          <h1>{siteConfig.hero.title}</h1>
          <p className="subtitle">{siteConfig.hero.subtitle}</p>
          <div className="actions">
            <a href={siteConfig.hero.primaryCtaLink}>{siteConfig.hero.primaryCtaLabel}</a>
            <a href={siteConfig.hero.secondaryCtaLink} className="secondary">
              {siteConfig.hero.secondaryCtaLabel}
            </a>
          </div>
          <div className="stats">
            {siteConfig.stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <SiteTerminal
          title={siteConfig.sections.terminalTitle}
          intro={siteConfig.sections.terminalIntro}
          techStack={siteConfig.techStack}
          services={siteConfig.services.map((service) => service.title)}
          projects={siteConfig.projects.map((project) => ({ title: project.title, result: project.result }))}
          whatsappUrl={whatsappLink}
        />
      </div>

      <section id="stack" className="tech-strip section-surface">
        <p className="tech-strip__title">{siteConfig.sections.techTitle}</p>
        <div className="tech-grid">
          {siteConfig.techStack.map((item) => (
            <span key={item} className="tech-chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="clients section-surface">
        <p>{siteConfig.sections.clientsIntro}</p>
        <div className="clients-grid">
          {siteConfig.sections.clients.map((client) => (
            <span key={client}>{client}</span>
          ))}
        </div>
      </section>

      <section id="servicos" className="section">
        <h2>{siteConfig.sections.servicesTitle}</h2>
        <div className="grid services-grid">
          {siteConfig.services.map((service) => (
            <ServiceFlipCard key={service.title} title={service.title} description={service.description} />
          ))}
        </div>
      </section>

      <section id="entregas" className="section">
        <h2>{siteConfig.sections.projectsTitle}</h2>
        <div className="grid projects-grid">
          {siteConfig.projects.map((project) => (
            <article className="card" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <strong className="result">{project.result}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>{siteConfig.sections.processTitle}</h2>
        <div className="grid process-grid">
          {siteConfig.process.map((step) => (
            <article className="card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="consultoria" className="section">
        <article className="card consulting-card">
          <h2>{siteConfig.consulting.title}</h2>
          <p>{siteConfig.consulting.description}</p>
        </article>
      </section>

      <section id="contato" className="section">
        <h2>Contato</h2>
        <p>{siteConfig.sections.contactLead}</p>
        <div className="contact-list">
          <button type="button" className="whatsapp-button" onClick={openWhatsApp}>
            <span className="whatsapp-button__icon" aria-hidden="true">
              WA
            </span>
            <span>
              <strong>Conversar no WhatsApp</strong>
              <small>Resposta rápida para alinhar escopo, prazo e próximos passos</small>
            </span>
          </button>
        </div>
      </section>

      <footer className="footer">
        <p>{siteConfig.footer.note}</p>
      </footer>
      </main>
    </div>
  )
}

export default App
