export function Footer() {
  return (
    <footer style={{ background: '#293241', padding: '60px 0 0' }}>
      <div className="sp-container">
        {/* Main columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 40,
          paddingBottom: 48,
        }} className="footer-grid">

          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--sp-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '0.875rem'
              }}>S</span>
              <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#fff', letterSpacing: '-0.3px' }}>
                Speedy<span style={{ color: '#98C1D9' }}>Pharma</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#98C1D9', lineHeight: 1.65, marginBottom: 20, maxWidth: 240 }}>
              Le pharmacien que tu voudrais avoir comme pote — accessible, crédible, humain.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'Instagram', icon: '📷' },
                { label: 'Facebook', icon: '📘' },
                { label: 'LinkedIn', icon: '💼' },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', fontSize: '1rem',
                  transition: 'background 0.15s ease',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation col */}
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 16 }}>
              Navigation
            </div>
            {[
              { label: 'Douleur', href: '/#problemes' },
              { label: 'Sommeil', href: '/sommeil' },
              { label: 'Énergie', href: '/#problemes' },
              { label: 'Rhume', href: '/#problemes' },
              { label: 'Digestion', href: '/#problemes' },
              { label: 'Peau', href: '/#problemes' },
            ].map((item) => (
              <a key={item.label} href={item.href} className="footer-link">{item.label}</a>
            ))}
          </div>

          {/* Aide col */}
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 16 }}>
              Aide
            </div>
            {['FAQ', 'Contact', 'Livraison', 'Retours', 'Mon compte'].map((item) => (
              <a key={item} href="#" className="footer-link">{item}</a>
            ))}
          </div>

          {/* Légal col */}
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 16 }}>
              Légal
            </div>
            {['CGV', 'Mentions légales', 'Confidentialité', 'Cookies', 'AFMPS'].map((item) => (
              <a key={item} href="#" className="footer-link">{item}</a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 0' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)' }}>
              © 2026 SpeedyPharma. Tous droits réservés.
            </span>
            {/* AFMPS badge */}
            <a href="#" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8, padding: '8px 14px',
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            >
              <span style={{ fontSize: '1rem' }}>🏥</span>
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>Certifiée par</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#98C1D9' }}>AFMPS</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
