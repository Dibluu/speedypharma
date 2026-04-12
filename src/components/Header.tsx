import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS: { label: string; href: string; internal?: boolean }[] = [
  { label: 'Douleur', href: '/#problemes' },
  { label: 'Sommeil', href: '/sommeil', internal: true },
  { label: 'Énergie', href: '/#problemes' },
  { label: 'Rhume', href: '/#problemes' },
  { label: 'Digestion', href: '/#problemes' },
  { label: 'Peau', href: '/#problemes' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`header${scrolled ? ' scrolled' : ''}`}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          height: 72,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="sp-container" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" className="header__logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--sp-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '0.875rem'
            }}>S</span>
            <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--sp-primary)', letterSpacing: '-0.3px' }}>
              Speedy<span style={{ color: 'var(--sp-primary-dark)' }}>Pharma</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: 4 }} className="hidden-mobile">
            {NAV_LINKS.map((link) => {
              const navStyle = {
                padding: '6px 14px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--sp-text-2)',
                textDecoration: 'none',
                borderRadius: 9999,
                transition: 'color 0.15s ease, background 0.15s ease',
              } as React.CSSProperties
              const onEnter = (e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.color = 'var(--sp-primary)'
                e.currentTarget.style.background = 'var(--sp-bg-accent)'
              }
              const onLeave = (e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.color = 'var(--sp-text-2)'
                e.currentTarget.style.background = 'transparent'
              }
              return link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="nav-link"
                  style={navStyle}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link"
                  style={navStyle}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Cart */}
            <button
              aria-label="Panier"
              style={{
                position: 'relative', background: 'none', border: 'none',
                cursor: 'pointer', padding: 8, color: 'var(--sp-text)',
                borderRadius: '50%', transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sp-bg-2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </button>

            {/* Burger (mobile only) */}
            <button
              className="burger-btn"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 8, color: 'var(--sp-text)', display: 'none',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hidden-mobile { display: none !important; }
            .burger-btn { display: flex !important; }
          }
        `}</style>
      </header>

      {/* Mobile overlay */}
      <div className={`mobile-overlay${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* Mobile menu panel */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Menu de navigation">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--sp-primary)' }}>
            Speedy<span style={{ color: 'var(--sp-accent)' }}>Pharma</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--sp-text-2)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_LINKS.map((link) => {
            const mobileStyle = {
              padding: '14px 12px',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--sp-text)',
              textDecoration: 'none',
              borderRadius: 8,
              borderBottom: '1px solid var(--sp-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            } as React.CSSProperties
            const chevron = (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            )
            return link.internal ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                style={mobileStyle}
              >
                {link.label}
                {chevron}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={mobileStyle}
              >
                {link.label}
                {chevron}
              </a>
            )
          })}
        </nav>

        <div style={{ marginTop: 32 }}>
          <a href="/#problemes" className="sp-btn sp-btn-primary button button--primary" style={{ width: '100%', justifyContent: 'center' }}>
            Trouver ma solution
          </a>
        </div>
      </div>
    </>
  )
}
