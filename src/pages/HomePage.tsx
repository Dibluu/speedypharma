import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useFadeIn } from '../hooks/useFadeIn'

// ─── Data ───────────────────────────────────────────────────────────────────

const PROBLEMS = [
  { label: 'Je dors mal', img: '/assets/sommeil.png', slug: 'sommeil', href: '/sommeil' },
  { label: "J'ai mal à la tête", img: '/assets/douleur.png', slug: 'douleur', href: '#' },
  { label: 'Coup de mou', img: '/assets/energie-removebg-preview.png', slug: 'energie', href: '#', variant: 'blue' as const },
  { label: 'Rhume & grippe', img: '/assets/rhume-removebg-preview.png', slug: 'rhume', href: '#', variant: 'blue' as const },
  { label: 'Digestion', img: '/assets/digestion.png', slug: 'digestion', href: '#' },
  { label: 'Ma peau', img: '/assets/peau.png', slug: 'peau', href: '#' },
]

const PRODUCTS = [
  { name: 'Dafalgan 1g', sub: "L'indémodable contre la douleur", price: '€7,95', img: '/assets/produits/dafalgan.jpg', href: '/produit/dafalgan' },
  { name: 'Mélatonine 1mg', sub: 'Pour retrouver un vrai sommeil', price: '€9,50', img: '/assets/produits/melatonine.jpg', href: '#' },
  { name: 'Vitamine C 1000mg', sub: "Un boost quand t'en as besoin", price: '€6,90', img: '/assets/produits/vitamine-c.jpg', href: '#' },
  { name: 'Strepsils Miel & Citron', sub: 'Pour la gorge qui gratte', price: '€5,20', img: '/assets/produits/strepsil.jpg', href: '#' },
]

const REASSURANCE = [
  {
    title: 'Livraison le lendemain',
    desc: "Commande avant 16h, c'est chez toi demain.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Agréée AFMPS',
    desc: 'Une vraie pharmacie belge, pas un site louche.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Vrai conseil pharmacien',
    desc: "T'as une question ? On répond. Vrai pharmacien, vraie réponse.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Paiement tranquille',
    desc: "Bancontact, Visa, Mastercard. Tes données, c'est pas nos oignons.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
]

const HERO_QUICK = [
  { label: 'Coup de mou', img: '/assets/energie.png', href: '#problemes' },
  { label: 'Rhume & grippe', img: '/assets/rhume.png', href: '#problemes' },
  { label: 'Digestion', img: '/assets/digestion.png', href: '#problemes' },
  { label: 'Ma peau', img: '/assets/peau.png', href: '#problemes' },
]

// ─── SearchBar ────────────────────────────────────────────────────────────────

function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <div className="reveal">
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--sp-border)' }} />
        <span style={{
          fontSize: '0.8125rem', fontWeight: 600,
          color: 'var(--sp-text-muted)',
          textTransform: 'uppercase', letterSpacing: '0.6px',
          whiteSpace: 'nowrap',
        }}>ou</span>
        <div style={{ flex: 1, height: 1, background: 'var(--sp-border)' }} />
      </div>

      <h3 style={{
        textAlign: 'center',
        fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
        fontWeight: 700,
        color: 'var(--sp-primary)',
        marginBottom: 20,
      }}>
        Je sais déjà ce que je veux
      </h3>

      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}
      >
        <span style={{
          position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)',
          color: focused ? 'var(--sp-primary)' : 'var(--sp-text-muted)',
          pointerEvents: 'none',
          transition: 'color 0.2s ease',
          display: 'flex',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </span>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Dafalgan, Vitamine C, Strepsils, Imodium..."
          aria-label="Rechercher un produit"
          style={{
            width: '100%',
            padding: '20px 140px 20px 62px',
            fontSize: '1.0625rem',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--sp-text)',
            background: '#fff',
            border: `2px solid ${focused ? 'var(--sp-primary)' : 'var(--sp-border)'}`,
            borderRadius: 9999,
            outline: 'none',
            boxShadow: focused
              ? '0 0 0 4px rgba(61,90,128,0.1), var(--sp-shadow-md)'
              : 'var(--sp-shadow-sm)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        />

        <button
          type="submit"
          className="sp-btn sp-btn-primary button button--primary"
          style={{
            position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
            padding: '12px 24px',
            fontSize: '0.9375rem',
          }}
        >
          Rechercher
        </button>
      </form>

      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: 8, marginTop: 14,
      }}>
        {['Dafalgan', 'Mélatonine', 'Strepsils', 'Imodium', 'Vitamine C'].map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            style={{
              padding: '6px 14px',
              fontSize: '0.8125rem', fontWeight: 500,
              color: 'var(--sp-text-2)',
              background: 'var(--sp-bg-2)',
              border: '1px solid var(--sp-border)',
              borderRadius: 9999,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--sp-bg-accent)'
              e.currentTarget.style.borderColor = 'var(--sp-primary)'
              e.currentTarget.style.color = 'var(--sp-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--sp-bg-2)'
              e.currentTarget.style.borderColor = 'var(--sp-border)'
              e.currentTarget.style.color = 'var(--sp-text-2)'
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <>
      <section id="hero" style={{ background: '#fff', overflow: 'hidden' }}>
        <div className="hero-split">
          <div className="hero-split__left reveal">
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--sp-bg-accent)', color: 'var(--sp-primary)',
              padding: '5px 13px', borderRadius: 9999,
              fontSize: '0.8rem', fontWeight: 600,
              letterSpacing: '0.4px', textTransform: 'uppercase',
              marginBottom: 22,
            }}>
              🇧🇪 Pharmacie agréée AFMPS
            </span>

            <h1 style={{
              fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
              fontWeight: 700,
              lineHeight: 1.12,
              color: 'var(--sp-primary)',
              letterSpacing: '-0.5px',
              marginBottom: 18,
            }}>
              Ta santé,<br />sans prise de tête.
            </h1>

            <p style={{
              fontSize: '1.0625rem',
              lineHeight: 1.65,
              color: 'var(--sp-text-2)',
              maxWidth: 420,
              marginBottom: 36,
            }}>
              Livraison 24h. Vrai conseil de pharmacien. Les bons produits — sans se prendre la tête.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
              <a href="#problemes" className="sp-btn sp-btn-primary button button--primary">
                Trouver ma solution
              </a>
              <a href="#pharmacien" className="sp-btn sp-btn-secondary button button--secondary">
                Parler à un pharmacien
              </a>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--sp-text-muted)', marginBottom: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span>✓ Livraison le lendemain</span>
              <span>✓ Conseil pharmacien gratuit</span>
              <span>✓ Paiement 100% sécurisé</span>
            </p>

            <div className="hero-quick-grid reveal delay-1" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 10,
            }}>
              {HERO_QUICK.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                    padding: '12px 12px 12px 14px',
                    background: '#fff',
                    border: '1px solid var(--sp-border)',
                    borderRadius: 12,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease',
                  }}
                  className="hero-quick-card"
                >
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--sp-text)',
                    lineHeight: 1.3,
                    flex: 1,
                  }}>
                    {p.label}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                      <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--sp-text-muted)', flexShrink: 0 }}>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="hero-split__right">
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src="https://res.cloudinary.com/dtc4y0ba9/video/upload/Speedy_video_Hero_FINAL_uutzag.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <div style={{ background: '#fff', borderBottom: '1px solid var(--sp-border)' }}>
        <div className="sp-container" style={{ paddingTop: 56, paddingBottom: 72 }}>
          <SearchBar />
        </div>
      </div>

      <style>{`
        .hero-split {
          display: grid;
          grid-template-columns: 42fr 58fr;
          min-height: 640px;
        }
        .hero-split__left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px clamp(32px, 4vw, 60px) 80px max(24px, calc((100vw - 1200px) / 2 + 24px));
        }
        .hero-split__right {
          position: relative;
          overflow: hidden;
        }
        .hero-quick-card:hover {
          border-color: var(--sp-primary) !important;
          background: var(--sp-bg-accent) !important;
          box-shadow: var(--sp-shadow-sm);
        }
        .hero-quick-card:hover span { color: var(--sp-primary) !important; }

        @media (max-width: 900px) {
          .hero-split {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .hero-split__right {
            height: 320px;
            order: -1;
          }
          .hero-split__left {
            padding: 40px 16px 48px;
          }
          .hero-quick-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .hero-split__right { height: 240px; }
          .hero-quick-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

// ─── Problems ─────────────────────────────────────────────────────────────────

function ProblemsSection() {
  return (
    <section id="problemes" style={{ background: '#fff', borderTop: '1px solid var(--sp-border)', padding: '120px 0' }}>
      <div className="sp-container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--sp-primary)', marginBottom: 10 }}>
            Qu'est-ce qui ne va pas ?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--sp-text-2)', maxWidth: 440, margin: '0 auto' }}>
            Dis-nous ce qui ne va pas, on s'occupe du reste.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
        }} className="problems-grid reveal-stagger">
          {PROBLEMS.map((p, i) =>
            p.slug === 'sommeil' ? (
              <Link
                key={p.slug}
                to="/sommeil"
                className={`problem-card reveal delay-${(i % 4) + 1}`}
                aria-label={p.label}
              >
                <img
                  src={p.img}
                  alt={p.label}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className="problem-card__overlay">
                  <div className="problem-card__label">{p.label}</div>
                  <div className="problem-card__arrow">Voir les solutions →</div>
                </div>
              </Link>
            ) : (p as any).variant === 'blue' ? (
              <a
                key={p.slug}
                href={p.href}
                className={`problem-card problem-card--blue reveal delay-${(i % 4) + 1}`}
                aria-label={p.label}
                style={{ background: 'linear-gradient(135deg, #2C4A6E 0%, #3D5A80 60%, #4A6D96 100%)' }}
              >
                {/* Title — top left */}
                <div style={{
                  position: 'absolute', top: 18, left: 18, zIndex: 2,
                }}>
                  <div className="problem-card__label">{p.label}</div>
                  <div className="problem-card__arrow">Voir les solutions →</div>
                </div>
                {/* Person image — centered, large */}
                <img
                  src={p.img}
                  alt={p.label}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '105%',
                    height: 'auto',
                    filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.5))',
                  }}
                  loading="lazy"
                />
              </a>
            ) : (
              <a
                key={p.slug}
                href={p.href}
                className={`problem-card reveal delay-${(i % 4) + 1}`}
                aria-label={p.label}
              >
                <img
                  src={p.img}
                  alt={p.label}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className="problem-card__overlay">
                  <div className="problem-card__label">{p.label}</div>
                  <div className="problem-card__arrow">Voir les solutions →</div>
                </div>
              </a>
            )
          )}
        </div>

        <SearchBar />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .problems-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─── Essentials ───────────────────────────────────────────────────────────────

function ProductCard({ product, delay }: { product: typeof PRODUCTS[0]; delay?: number }) {
  const [added, setAdded] = useState(false)
  const isLinked = product.href && product.href !== '#'
  const nameEl = isLinked
    ? <Link to={product.href} className="product-card__name" style={{ textDecoration: 'none', color: 'inherit' }}>{product.name}</Link>
    : <div className="product-card__name">{product.name}</div>

  return (
    <div className={`product-card${delay ? ` reveal delay-${delay}` : ''}`}>
      <div className="product-card__img" style={{ background: '#F8F9FA', cursor: isLinked ? 'pointer' : 'default' }}
        onClick={() => isLinked && (window.location.href = product.href)}
      >
        <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }} loading="lazy" />
      </div>
      {nameEl}
      <div className="product-card__sub">{product.sub}</div>
      <div className="product-card__price">{product.price}</div>
      <button
        className="product-card__btn button button--add-cart"
        onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1800) }}
        style={added ? { background: '#28A745' } : {}}
      >
        {added ? '✓ Ajouté !' : 'Ajouter au panier'}
      </button>
    </div>
  )
}

function EssentialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / 244)
      setActiveIndex(Math.min(idx, PRODUCTS.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const scrollTo = (idx: number) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ left: idx * 244, behavior: 'smooth' })
    setActiveIndex(idx)
  }

  return (
    <section id="essentiels" style={{ background: '#fff', borderTop: '1px solid var(--sp-border)', padding: '120px 0' }}>
      <div className="sp-container">
        <div className="reveal" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 40, flexWrap: 'wrap', gap: 8,
        }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--sp-primary)' }}>
            Les classiques qui marchent
          </h2>
          <a href="#" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
            textDecoration: 'none',
            padding: '10px 18px',
            border: '1.5px solid var(--sp-primary)',
            borderRadius: 12,
            gap: 2,
            transition: 'background 0.15s ease',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--sp-bg-accent)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
          >
            <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--sp-primary)' }}>
              Tout le catalogue
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--sp-text-2)', fontWeight: 400 }}>
              Parcourir tous nos produits
            </span>
          </a>
        </div>

        {!isMobile ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <ProductCard key={p.name} product={p} delay={i + 1} />
            ))}
          </div>
        ) : (
          <>
            <div ref={scrollRef} className="products-scroll products-carousel">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
              {PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === activeIndex ? ' active' : ''}`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Produit ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// ─── Pharmacist ───────────────────────────────────────────────────────────────

function PharmacistSection() {
  return (
    <section id="pharmacien" style={{ background: '#fff', borderTop: '1px solid var(--sp-border)', padding: '120px 0' }}>
      <div className="sp-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: 64,
          alignItems: 'center',
        }} className="pharmacist-grid">

          <div className="reveal pharmacist-image" style={{ order: 1 }}>
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              aspectRatio: '4/3',
              boxShadow: 'var(--sp-shadow-md)',
              position: 'relative',
            }}>
              <img
                src="/assets/pharmacien.png"
                alt="Notre pharmacien"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="reveal delay-1" style={{ order: 2 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--sp-bg-accent)', color: 'var(--sp-primary)',
              padding: '5px 12px', borderRadius: 9999,
              fontSize: '0.8125rem', fontWeight: 600,
              letterSpacing: '0.4px', textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              💬 Ton pharmacien de confiance
            </span>

            <h2 style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
              fontWeight: 700,
              color: 'var(--sp-primary)',
              lineHeight: 1.25,
              marginBottom: 14,
            }}>
              T'as une question ?<br />Le pharmacien est là.
            </h2>

            <p style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: 'var(--sp-text-2)',
              marginBottom: 28,
            }}>
              Pas d'IA, pas de copier-coller. Tu poses ta question, notre pharmacien te répond — vraiment. Clair, honnête, sans jargon.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {['Vrai pharmacien diplômé', 'Disponible 7j/7', 'Réponse en moins de 2h'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9375rem', color: 'var(--sp-text-2)' }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'var(--sp-bg-accent)',
                    border: '1.5px solid var(--sp-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.6875rem', color: 'var(--sp-primary)', fontWeight: 700, flexShrink: 0,
                  }}>✓</span>
                  {item}
                </div>
              ))}
            </div>

            <a href="#" className="sp-btn sp-btn-secondary button button--secondary">
              Lui poser une question
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pharmacist-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─── Reassurance ──────────────────────────────────────────────────────────────

function ReassuranceSection() {
  return (
    <section id="reassurance" style={{
      background: '#fff',
      padding: '100px 0',
      borderTop: '1px solid var(--sp-border)',
    }}>
      <div className="sp-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32,
        }} className="reassurance-grid">
          {REASSURANCE.map((item, i) => (
            <div key={item.title} className={`reassurance-item reveal delay-${i + 1}`}>
              <div className="reassurance-item__icon">
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--sp-text)', marginBottom: 4 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--sp-text-2)', lineHeight: 1.55 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .reassurance-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─── Announcement Bar ─────────────────────────────────────────────────────────

const ANNOUNCEMENTS = [
  'Livraison offerte dès 50 € d\'achat',
  'Livraison en 24h — commandez avant 16h',
  'Conseil pharmacien gratuit avec chaque commande',
]

function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((c) => (c + 1) % ANNOUNCEMENTS.length)
        setVisible(true)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      background: 'var(--sp-primary-dark)',
      color: '#fff',
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.72rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <span style={{
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-6px)',
        display: 'inline-block',
      }}>
        {ANNOUNCEMENTS[current]}
      </span>
      {/* Dots */}
      <div style={{
        position: 'absolute', right: 16,
        display: 'flex', gap: 5, alignItems: 'center',
      }}>
        {ANNOUNCEMENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Annonce ${i + 1}`}
            style={{
              width: i === current ? 16 : 5,
              height: 5,
              borderRadius: 3,
              background: i === current ? '#fff' : 'rgba(255,255,255,0.35)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export function HomePage() {
  useFadeIn()

  return (
    <>
      <a href="#main" className="skip-link">Aller au contenu principal</a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <HeroSection />
        <EssentialsSection />
        <ProblemsSection />
        <PharmacistSection />
        <ReassuranceSection />
      </main>
      <Footer />
    </>
  )
}
