import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useFadeIn } from '../hooks/useFadeIn'

// ─── Data ───────────────────────────────────────────────────────────────────

type FilterKey = 'endormissement' | 'nuit-complete' | 'recuperation'

const SEGMENTS: { key: FilterKey; emoji: string; title: string; desc: string }[] = [
  {
    key: 'endormissement',
    emoji: '🌀',
    title: 'Mon cerveau refuse de se taire',
    desc: "Tu t'allonges, les pensées s'emballent. Tu mets 1h à t'endormir.",
  },
  {
    key: 'nuit-complete',
    emoji: '⏰',
    title: "Je me réveille à 3h et c'est foutu",
    desc: "Tu t'endors bien mais tu te retrouves à regarder le plafond en pleine nuit.",
  },
  {
    key: 'recuperation',
    emoji: '😓',
    title: "Je dors 'assez' mais je suis morte",
    desc: "8h de sommeil et pourtant tu te lèves épuisée. Comme si tu n'avais pas dormi.",
  },
]

const SOMMEIL_PRODUCTS: {
  name: string
  sub: string
  price: string
  img: string
  badge: FilterKey
}[] = [
  { name: 'Mélatonine 1mg', sub: "S'endormir plus vite, naturellement", price: '9,90 €', img: '/assets/produits/melatonine.jpg', badge: 'endormissement' },
  { name: 'Valdispert 45mg', sub: 'Pour calmer le mental le soir', price: '12,50 €', img: '/assets/produits/melatonine.jpg', badge: 'endormissement' },
  { name: 'Magnésium Marin', sub: 'Détente musculaire & nerveuse', price: '14,90 €', img: '/assets/produits/melatonine.jpg', badge: 'recuperation' },
  { name: 'Spray Relaxant', sub: "Lavande & mélatonine — vaporise sur l'oreiller", price: '11,90 €', img: '/assets/produits/melatonine.jpg', badge: 'nuit-complete' },
  { name: 'Passiflore Bio', sub: 'Pour les réveils nocturnes', price: '13,20 €', img: '/assets/produits/melatonine.jpg', badge: 'nuit-complete' },
  { name: 'Tisane Sommeil', sub: 'Verveine, tilleul & passiflore', price: '6,90 €', img: '/assets/produits/melatonine.jpg', badge: 'recuperation' },
]

const BADGE_LABELS: Record<FilterKey, string> = {
  endormissement: 'Endormissement',
  'nuit-complete': 'Nuit complète',
  recuperation: 'Récupération',
}

const BADGE_COLORS: Record<FilterKey, { bg: string; color: string }> = {
  endormissement: { bg: '#EEF4F8', color: '#3D5A80' },
  'nuit-complete': { bg: '#FFF3EE', color: '#EE6C4D' },
  recuperation: { bg: '#F0FFF4', color: '#1A7F4A' },
}

const FAQ_ITEMS = [
  {
    q: "La mélatonine, c'est dangereux ?",
    a: "Non, à faibles doses (0,5–1mg), la mélatonine est très bien tolérée et non-addictive. C'est une hormone que ton corps produit naturellement. On recommande de ne pas dépasser 5mg/jour et d'éviter chez les enfants sans avis médical.",
  },
  {
    q: 'Je peux en prendre si je suis enceinte ?',
    a: "Par précaution, on déconseille la mélatonine pendant la grossesse et l'allaitement — pas parce qu'elle est dangereuse, mais parce que les études manquent. Si tu es enceinte et que tu dors mal, écris-nous, on a d'autres options douces.",
  },
  {
    q: 'Ça crée une dépendance ?',
    a: "La mélatonine ne crée pas de dépendance physique. Tu peux arrêter quand tu veux. Pour les plantes (valériane, passiflore), même chose. Ce ne sont pas des somnifères de type benzodiazépines — pas d'accoutumance.",
  },
  {
    q: 'Au bout de combien de temps ça fait effet ?',
    a: "La mélatonine agit en 30–60 minutes. À prendre 30 min avant de te coucher. Les plantes (valériane, passiflore) peuvent prendre 2–3 semaines pour un effet optimal. Le magnésium, lui, améliore souvent la qualité du sommeil après 1–2 semaines.",
  },
  {
    q: "C'est quoi la différence mélatonine/valériane ?",
    a: "La mélatonine régule ton horloge biologique — elle aide à t'endormir plus vite. La valériane agit comme un anxiolytique léger — elle calme le système nerveux et réduit les réveils nocturnes. Souvent complémentaires, mais pas interchangeables.",
  },
  {
    q: 'Je peux combiner plusieurs produits ?',
    a: "Oui, dans la plupart des cas. Mélatonine + magnésium, c'est une combinaison classique et efficace. Evite de cumuler trop de plantes sédatives sans conseil. Si tu prends des médicaments, parle-en à Thomas avant.",
  },
]

const WA_LINK = 'https://wa.me/32XXXXXXXXX?text=Bonjour%20Thomas%2C%20j%27ai%20une%20question%20sur%20le%20sommeil.'

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid var(--sp-border)' }}>
      <div className="sp-container" style={{ paddingTop: 12, paddingBottom: 12 }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: '0.875rem', color: 'var(--sp-text-muted)',
            textDecoration: 'none',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--sp-primary)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--sp-text-muted)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Accueil
        </Link>
        <span style={{ margin: '0 8px', color: 'var(--sp-border)', fontSize: '0.875rem' }}>/</span>
        <span style={{ fontSize: '0.875rem', color: 'var(--sp-text-2)', fontWeight: 500 }}>Sommeil</span>
      </div>
    </div>
  )
}

// ─── BLOC 1 — Hero ────────────────────────────────────────────────────────────

function HeroBloc({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <>
      <section className="hero-sommeil">
        {/* Contenu texte */}
        <div className="hero-sommeil__content">
          <span className="hero-sommeil__badge">😴 Troubles du sommeil</span>

          <h1 className="hero-sommeil__title">
            Marre de te<br />réveiller fatiguée ?
          </h1>

          <p className="hero-sommeil__subtitle">
            Tu n'es pas seule. 1 Belge sur 3 dort mal. On t'aide à trouver la vraie solution — pas juste un somnifère.
          </p>

          <div className="hero-sommeil__cta">
            <button
              onClick={onCTAClick}
              className="hero-sommeil__btn-primary"
            >
              Trouver ma solution
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-sommeil__btn-secondary"
            >
              <span>💬</span> Parler à Thomas
            </a>
          </div>
        </div>

        {/* Personne détourée — effet de profondeur */}
        <img
          src="/assets/sommeil-hero-removebg-preview.png"
          alt="Femme sereine serrant un oreiller"
          className="hero-sommeil__person"
          loading="eager"
        />
      </section>

      <style>{`
        .hero-sommeil {
          position: relative;
          min-height: 620px;
          background: linear-gradient(135deg, #EE6C4D 0%, #D4563B 100%);
          overflow: visible;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }

        .hero-sommeil__content {
          padding: 80px 40px 80px max(24px, calc((100vw - 1200px) / 2 + 24px));
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-sommeil__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.35);
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #2C1810;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 24px;
        }

        .hero-sommeil__title {
          font-size: clamp(2.25rem, 4.5vw, 3.25rem);
          font-weight: 700;
          line-height: 1.1;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 20px;
          max-width: 480px;
          text-shadow: 0 2px 12px rgba(44,24,16,0.2);
        }

        .hero-sommeil__subtitle {
          font-size: clamp(1rem, 1.6vw, 1.0625rem);
          line-height: 1.7;
          color: rgba(255,255,255,0.88);
          max-width: 400px;
          margin-bottom: 36px;
        }

        .hero-sommeil__cta {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .hero-sommeil__btn-primary {
          padding: 15px 30px;
          background: #fff;
          color: var(--sp-primary);
          border: none;
          border-radius: 50px;
          font-size: 0.9375rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 4px 16px rgba(44,24,16,0.15);
        }
        .hero-sommeil__btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(44,24,16,0.2);
        }

        .hero-sommeil__btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 30px;
          background: rgba(61,90,128,0.85);
          backdrop-filter: blur(8px);
          color: #fff;
          border: none;
          border-radius: 50px;
          font-size: 0.9375rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.15s ease;
        }
        .hero-sommeil__btn-secondary:hover {
          background: rgba(61,90,128,1);
        }

        /* ── Personne détourée ── */
        .hero-sommeil__person {
          position: absolute;
          right: 0;
          bottom: 0;
          height: 105%;
          width: auto;
          max-width: 52%;
          object-fit: contain;
          object-position: bottom right;
          z-index: 1;
          filter: drop-shadow(-8px 0 32px rgba(44,24,16,0.12));
          animation: heroPersonEnter 0.7s ease-out both;
        }

        @keyframes heroPersonEnter {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hero-sommeil {
            grid-template-columns: 1fr;
            min-height: auto;
            overflow: hidden;
          }
          .hero-sommeil__content {
            padding: 56px 24px 220px;
            align-items: center;
            text-align: center;
          }
          .hero-sommeil__title,
          .hero-sommeil__subtitle { max-width: 100%; }
          .hero-sommeil__cta { justify-content: center; }
          .hero-sommeil__person {
            position: relative;
            right: auto; bottom: auto;
            height: auto;
            width: 75%;
            max-width: 380px;
            margin: -160px auto 0;
            display: block;
          }
        }

        @media (max-width: 640px) {
          .hero-sommeil__content { padding: 48px 16px 180px; }
          .hero-sommeil__cta { flex-direction: column; width: 100%; }
          .hero-sommeil__btn-primary,
          .hero-sommeil__btn-secondary { width: 100%; justify-content: center; }
          .hero-sommeil__person { width: 85%; margin-top: -130px; }
        }
      `}</style>
    </>
  )
}

// ─── BLOC 2 — Segmentation ────────────────────────────────────────────────────

function SegmentBloc({
  activeFilter,
  onFilter,
}: {
  activeFilter: FilterKey | null
  onFilter: (key: FilterKey) => void
}) {
  return (
    <section style={{ background: '#fff', borderTop: '1px solid var(--sp-border)', padding: 'clamp(48px, 6vw, 64px) 0' }}>
      <div className="sp-container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.625rem)', fontWeight: 700, color: 'var(--sp-primary)', marginBottom: 8 }}>
            Ton problème, c'est plutôt lequel ?
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--sp-text-2)' }}>
            Clique pour voir les produits qui te correspondent.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }} className="segment-grid reveal-stagger">
          {SEGMENTS.map((seg) => {
            const isActive = activeFilter === seg.key
            return (
              <button
                key={seg.key}
                aria-pressed={isActive}
                onClick={() => onFilter(seg.key)}
                className="reveal"
                style={{
                  background: isActive ? 'var(--sp-bg-accent)' : '#fff',
                  border: `2px solid ${isActive ? 'var(--sp-primary)' : 'var(--sp-border)'}`,
                  borderRadius: 12,
                  padding: '24px 20px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? 'var(--sp-shadow-md)' : 'var(--sp-shadow-sm)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--sp-primary)'
                    e.currentTarget.style.background = 'var(--sp-bg-accent)'
                    e.currentTarget.style.boxShadow = 'var(--sp-shadow-md)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--sp-border)'
                    e.currentTarget.style.background = '#fff'
                    e.currentTarget.style.boxShadow = 'var(--sp-shadow-sm)'
                  }
                }}
              >
                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: 12 }}>{seg.emoji}</span>
                <div style={{
                  fontSize: '0.9375rem', fontWeight: 700,
                  color: isActive ? 'var(--sp-primary)' : 'var(--sp-text)',
                  marginBottom: 6, lineHeight: 1.3,
                }}>
                  {seg.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--sp-text-2)', lineHeight: 1.5 }}>
                  {seg.desc}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .segment-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  )
}

// ─── BLOC 3 — Conseil Pharmacien ──────────────────────────────────────────────

function PharmacistBloc() {
  return (
    <section style={{ background: 'var(--sp-bg-2)', borderTop: '1px solid var(--sp-border)', padding: 'clamp(40px, 6vw, 64px) 0' }}>
      <div className="sp-container">
        <div style={{
          display: 'flex',
          gap: 32,
          alignItems: 'flex-start',
        }} className="pharmacist-bloc-layout reveal">

          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: 120, height: 120,
              borderRadius: '50%',
              background: 'var(--sp-bg-accent)',
              border: '3px solid var(--sp-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3rem',
              overflow: 'hidden',
            }}>
              👨‍⚕️
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '0.8rem', fontWeight: 600,
              color: 'var(--sp-primary)',
              textTransform: 'uppercase', letterSpacing: '0.5px',
              marginBottom: 8,
            }}>
              Le conseil de Thomas
            </div>

            <blockquote style={{
              fontSize: 'clamp(1rem, 2vw, 1.0625rem)',
              lineHeight: 1.7,
              color: 'var(--sp-text)',
              fontStyle: 'italic',
              borderLeft: '3px solid var(--sp-primary)',
              paddingLeft: 20,
              marginBottom: 20,
            }}>
              "La mélatonine, c'est pas un somnifère. C'est un signal que tu envoies à ton cerveau pour lui dire qu'il fait nuit. À 1mg, c'est suffisant pour la majorité des gens — pas besoin d'en prendre plus. Le secret, c'est de la prendre 30 minutes avant de se coucher, toujours à la même heure. Et d'éteindre les écrans."
            </blockquote>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: '0.9375rem', fontWeight: 600,
                color: 'var(--sp-primary)',
                textDecoration: 'none',
                transition: 'gap 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.gap = '12px' }}
              onMouseLeave={(e) => { e.currentTarget.style.gap = '8px' }}
            >
              Une question ? Écris à Thomas →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .pharmacist-bloc-layout { flex-direction: column !important; align-items: center !important; text-align: center; }
          .pharmacist-bloc-layout blockquote { border-left: none !important; padding-left: 0 !important; border-top: 3px solid var(--sp-primary); padding-top: 16px; }
        }
      `}</style>
    </section>
  )
}

// ─── BLOC 4 — Grille Produits ─────────────────────────────────────────────────

function SommeilProductCard({ product, isFiltered }: {
  product: typeof SOMMEIL_PRODUCTS[0]
  isFiltered: boolean
}) {
  const [added, setAdded] = useState(false)
  const badgeStyle = BADGE_COLORS[product.badge]

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--sp-border)',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: 'var(--sp-shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      opacity: isFiltered ? 0.3 : 1,
      transform: isFiltered ? 'scale(0.97)' : 'scale(1)',
      transition: 'opacity 0.25s ease, transform 0.25s ease, box-shadow 0.2s ease',
      pointerEvents: isFiltered ? 'none' : 'auto',
    }}
      className="sommeil-product-card"
    >
      {/* Image */}
      <div style={{ height: 160, background: '#F8F9FA', position: 'relative', overflow: 'hidden' }}>
        <img
          src={product.img}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }}
          loading="lazy"
        />
        {/* Badge */}
        <span style={{
          position: 'absolute', top: 10, left: 10,
          background: badgeStyle.bg, color: badgeStyle.color,
          fontSize: '0.6875rem', fontWeight: 700,
          padding: '3px 10px', borderRadius: 9999,
          textTransform: 'uppercase', letterSpacing: '0.4px',
        }}>
          {BADGE_LABELS[product.badge]}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--sp-text)', marginBottom: 4 }}>
          {product.name}
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--sp-text-2)', lineHeight: 1.5, flex: 1, marginBottom: 14 }}>
          {product.sub}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--sp-primary)' }}>
            {product.price}
          </span>
          <button
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1800) }}
            className="sp-btn sp-btn-primary button button--primary"
            style={{
              padding: '8px 16px', fontSize: '0.8125rem',
              background: added ? '#28A745' : undefined,
              borderColor: added ? '#28A745' : undefined,
            }}
          >
            {added ? '✓ Ajouté' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductsBloc({ activeFilter }: { activeFilter: FilterKey | null }) {
  return (
    <section id="solutions" style={{ background: '#fff', borderTop: '1px solid var(--sp-border)', padding: 'clamp(48px, 6vw, 80px) 0' }}>
      <div className="sp-container">
        <div className="reveal" style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, color: 'var(--sp-primary)', marginBottom: 8 }}>
            Nos solutions pour mieux dormir
          </h2>
          {activeFilter && (
            <p style={{ fontSize: '0.9rem', color: 'var(--sp-text-2)' }}>
              Filtré : <strong style={{ color: 'var(--sp-primary)' }}>{BADGE_LABELS[activeFilter]}</strong>
            </p>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }} className="sommeil-products-grid">
          {SOMMEIL_PRODUCTS.map((p) => (
            <SommeilProductCard
              key={p.name}
              product={p}
              isFiltered={activeFilter !== null && p.badge !== activeFilter}
            />
          ))}
        </div>
      </div>

      <style>{`
        .sommeil-products-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        .sommeil-product-card:hover {
          box-shadow: var(--sp-shadow-md) !important;
          transform: translateY(-3px) scale(1) !important;
        }
        @media (max-width: 1024px) {
          .sommeil-products-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .sommeil-products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  )
}

// ─── BLOC 5 — FAQ ─────────────────────────────────────────────────────────────

function FAQBloc() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section style={{ background: 'var(--sp-bg-2)', borderTop: '1px solid var(--sp-border)', padding: 'clamp(48px, 6vw, 80px) 0' }}>
      <div className="sp-container" style={{ maxWidth: 760 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, color: 'var(--sp-primary)', marginBottom: 8 }}>
            Questions fréquentes sur le sommeil
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--sp-text-2)' }}>
            Les vraies réponses de Thomas, pas les réponses copiées-collées.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }} className="reveal">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: i === 0 ? '12px 12px 0 0' : i === FAQ_ITEMS.length - 1 ? '0 0 12px 12px' : 0,
                  border: '1px solid var(--sp-border)',
                  borderTop: i === 0 ? '1px solid var(--sp-border)' : 'none',
                  overflow: 'hidden',
                }}
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center',
                    padding: '20px 24px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', gap: 16,
                  }}
                >
                  <span style={{
                    fontSize: '0.9375rem', fontWeight: 600,
                    color: isOpen ? 'var(--sp-primary)' : 'var(--sp-text)',
                    lineHeight: 1.4,
                  }}>
                    {item.q}
                  </span>
                  <span style={{
                    flexShrink: 0,
                    width: 28, height: 28,
                    borderRadius: '50%',
                    background: isOpen ? 'var(--sp-primary)' : 'var(--sp-bg-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isOpen ? '#fff' : 'var(--sp-text-2)',
                    fontSize: '1.25rem', lineHeight: 1,
                    transition: 'all 0.2s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    +
                  </span>
                </button>

                <div style={{
                  maxHeight: isOpen ? '300px' : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p style={{
                    padding: '0 24px 20px',
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: 'var(--sp-text-2)',
                    margin: 0,
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Schema.org FAQ */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }} />
      </div>
    </section>
  )
}

// ─── Sticky Mobile CTA ────────────────────────────────────────────────────────

function StickyMobileCTA() {
  const [visible, setVisible] = useState(true)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#fff',
      borderTop: '1px solid var(--sp-border)',
      padding: '12px 16px',
      boxShadow: '0 -4px 16px rgba(41,50,65,0.1)',
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s ease',
      zIndex: 20,
      display: 'none',
    }} className="sticky-mobile-cta" ref={footerRef}>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="sp-btn sp-btn-primary button button--primary"
        style={{ width: '100%', justifyContent: 'center', fontSize: '0.9375rem' }}
      >
        💬 Besoin d'aide ? Un pharmacien te répond
      </a>
    </div>
  )
}

// ─── SommeilPage ──────────────────────────────────────────────────────────────

export function SommeilPage() {
  useFadeIn()
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null)

  const handleHeroCTA = () => {
    const el = document.getElementById('solutions')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleFilter = (key: FilterKey) => {
    setActiveFilter((prev) => (prev === key ? null : key))
    setTimeout(() => {
      const el = document.getElementById('solutions')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <a href="#main-sommeil" className="skip-link">Aller au contenu principal</a>
      <Header />
      <Breadcrumb />
      <main id="main-sommeil">
        <HeroBloc onCTAClick={handleHeroCTA} />
        <SegmentBloc activeFilter={activeFilter} onFilter={handleFilter} />
        <PharmacistBloc />
        <ProductsBloc activeFilter={activeFilter} />
        <FAQBloc />
      </main>
      <Footer />
      <StickyMobileCTA />

      <style>{`
        @media (max-width: 768px) {
          .sticky-mobile-cta { display: block !important; }
          main#main-sommeil { padding-bottom: 72px; }
        }
      `}</style>
    </>
  )
}
