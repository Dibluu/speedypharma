import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { PRODUCTS_CATALOG } from '../data/products'

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = i <= Math.floor(rating) ? '#F5A623' : i - 0.5 <= rating ? '#F5A623' : '#DDD'
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )
      })}
    </span>
  )
}

// ─── Accordion item ───────────────────────────────────────────────────────────

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderBottom: '1px solid var(--sp-border)',
    }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '18px 0', background: 'none',
          border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--sp-text)' }}>
          {title}
        </span>
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="var(--sp-text-2)" strokeWidth="2" strokeLinecap="round"
          style={{ flexShrink: 0, transition: 'transform 0.2s ease', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div style={{
        maxHeight: open ? '600px' : 0,
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        <div style={{ paddingBottom: 20, fontSize: '0.9rem', color: 'var(--sp-text-2)', lineHeight: 1.7 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Sticky mobile CTA ────────────────────────────────────────────────────────

function StickyMobileCTA({ price, onAdd }: { price: string; onAdd: () => void }) {
  return (
    <div className="product-sticky-cta" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#fff', borderTop: '1px solid var(--sp-border)',
      padding: '12px 20px', display: 'none',
      alignItems: 'center', justifyContent: 'space-between', gap: 12,
      zIndex: 40,
    }}>
      <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--sp-primary)' }}>{price}</span>
      <button
        onClick={onAdd}
        className="sp-btn sp-btn-primary button button--primary"
        style={{ flex: 1, justifyContent: 'center', fontSize: '0.9375rem' }}
      >
        Ajouter au panier
      </button>
      <style>{`
        @media (max-width: 768px) {
          .product-sticky-cta { display: flex !important; }
        }
      `}</style>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const product = slug ? PRODUCTS_CATALOG[slug] : null

  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!product) {
    return (
      <>
        <Header />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--sp-primary)' }}>Produit introuvable</h1>
          <button onClick={() => navigate('/')} className="sp-btn sp-btn-primary button button--primary">
            Retour à l'accueil
          </button>
        </main>
        <Footer />
      </>
    )
  }

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Header />
      <main style={{ background: '#fff', paddingBottom: 80 }}>

        {/* ── Breadcrumb ── */}
        <div style={{ borderBottom: '1px solid var(--sp-border)', background: '#fff' }}>
          <div className="sp-container" style={{ paddingTop: 12, paddingBottom: 12 }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--sp-text-muted)', flexWrap: 'wrap' }}>
              <Link to="/" style={{ color: 'var(--sp-text-muted)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--sp-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--sp-text-muted)')}
              >Accueil</Link>
              <span>›</span>
              <a href={product.categoryHref} style={{ color: 'var(--sp-text-muted)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--sp-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--sp-text-muted)')}
              >{product.category}</a>
              <span>›</span>
              <span style={{ color: 'var(--sp-text-2)', fontWeight: 500 }}>{product.name}</span>
            </nav>
          </div>
        </div>

        {/* ── Above the fold ── */}
        <section style={{ padding: 'clamp(32px, 5vw, 56px) 0' }}>
          <div className="sp-container">
            <div className="product-atf-grid">

              {/* Left — Gallery */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  background: '#F8F9FA', borderRadius: 16,
                  border: '1px solid var(--sp-border)',
                  overflow: 'hidden', aspectRatio: '1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img
                    src={product.images[activeImg]}
                    alt={product.name}
                    style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                  />
                </div>
                {/* Thumbnails */}
                <div style={{ display: 'flex', gap: 10 }}>
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      style={{
                        width: 72, height: 72, padding: 4,
                        background: '#F8F9FA', borderRadius: 10,
                        border: `2px solid ${activeImg === i ? 'var(--sp-primary)' : 'var(--sp-border)'}`,
                        cursor: 'pointer', flexShrink: 0, overflow: 'hidden',
                        transition: 'border-color 0.15s ease',
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right — Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Badge */}
                {product.badge && (
                  <span style={{
                    display: 'inline-flex', alignSelf: 'flex-start',
                    padding: '4px 12px', borderRadius: 50,
                    background: 'var(--sp-bg-accent)', color: 'var(--sp-primary)',
                    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {product.badge}
                  </span>
                )}

                {/* Name */}
                <div>
                  <h1 style={{ fontSize: 'clamp(1.375rem, 3vw, 1.875rem)', fontWeight: 800, color: 'var(--sp-text)', lineHeight: 1.2, marginBottom: 6 }}>
                    {product.name}
                  </h1>
                  <p style={{ fontSize: '0.9rem', color: 'var(--sp-text-2)' }}>
                    {product.subtitle}
                  </p>
                </div>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Stars rating={product.rating} size={18} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--sp-text)' }}>{product.rating}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--sp-text-muted)' }}>({product.reviewCount} avis)</span>
                </div>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--sp-text)' }}>{product.price}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--sp-text-muted)' }}>/ {product.unit}</span>
                </div>

                {/* Stock */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: product.stock === 'in_stock' ? '#28A745' : product.stock === 'low_stock' ? '#FFC107' : '#DC3545',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: product.stock === 'in_stock' ? '#28A745' : '#FFC107' }}>
                    {product.stock === 'in_stock' ? 'En stock — Livré demain' : product.stock === 'low_stock' ? 'Stock limité' : 'Rupture de stock'}
                  </span>
                </div>

                {/* Qty + CTA */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Quantity */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 0,
                    border: '1.5px solid var(--sp-border)', borderRadius: 12, overflow: 'hidden',
                  }}>
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      style={{ width: 44, height: 52, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: 'var(--sp-text-2)' }}
                    >−</button>
                    <span style={{ width: 36, textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: 'var(--sp-text)' }}>{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      style={{ width: 44, height: 52, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: 'var(--sp-text-2)' }}
                    >+</button>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={handleAdd}
                    className="sp-btn sp-btn-primary button button--primary"
                    style={{
                      flex: 1, justifyContent: 'center', fontSize: '1rem',
                      height: 52, minWidth: 180,
                      background: added ? '#28A745' : undefined,
                      transition: 'background 0.2s ease',
                    }}
                  >
                    {added ? '✓ Ajouté au panier !' : 'Ajouter au panier'}
                  </button>
                </div>

                {/* Trust signals */}
                <div style={{
                  display: 'flex', gap: 16, flexWrap: 'wrap',
                  padding: '12px 16px', background: 'var(--sp-bg-2)',
                  borderRadius: 10, fontSize: '0.8125rem', color: 'var(--sp-text-2)',
                }}>
                  <span>🚚 Livraison 24h</span>
                  <span>✓ Pharmacie agréée</span>
                  <span>💬 Conseil dispo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Infos clés ── */}
        <section style={{ background: 'var(--sp-bg-2)', borderTop: '1px solid var(--sp-border)', padding: 'clamp(32px, 4vw, 48px) 0' }}>
          <div className="sp-container">
            <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sp-text-muted)', marginBottom: 20 }}>
              Infos clés
            </h2>
            <div className="product-key-infos">
              {product.keyInfos.map((info) => (
                <div key={info.label} style={{
                  background: '#fff', borderRadius: 12,
                  border: '1px solid var(--sp-border)',
                  padding: '16px 20px',
                  display: 'flex', flexDirection: 'column', gap: 4,
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--sp-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {info.label}
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--sp-text)' }}>
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Conseil pharmacien ── */}
        <section style={{ background: '#fff', borderTop: '1px solid var(--sp-border)', padding: 'clamp(32px, 4vw, 56px) 0' }}>
          <div className="sp-container" style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <img
                src="/assets/pharmacien.png"
                alt="Thomas, pharmacien SpeedyPharma"
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  objectFit: 'cover', objectPosition: 'top center',
                  border: '2px solid var(--sp-primary)', flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sp-primary)', marginBottom: 4 }}>
                  Le conseil de Thomas
                </div>
                <div style={{ width: 32, height: 2, background: 'var(--sp-primary)', marginBottom: 12, borderRadius: 2 }} />
                <blockquote style={{
                  fontSize: '0.9375rem', color: 'var(--sp-text)', lineHeight: 1.7,
                  fontStyle: 'italic', margin: 0,
                }}>
                  "{product.pharmacistAdvice}"
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── Détails — Accordéon ── */}
        <section style={{ background: 'var(--sp-bg-2)', borderTop: '1px solid var(--sp-border)', padding: 'clamp(32px, 4vw, 56px) 0' }}>
          <div className="sp-container" style={{ maxWidth: 720 }}>
            <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)', fontWeight: 700, color: 'var(--sp-primary)', marginBottom: 8 }}>
              Tout savoir sur ce produit
            </h2>
            <div style={{ marginTop: 8 }}>
              <AccordionItem title="Description complète">
                {product.description}
              </AccordionItem>
              <AccordionItem title="Notice et contre-indications">
                {product.notice}
              </AccordionItem>
              <AccordionItem title="Composition">
                {product.composition}
              </AccordionItem>
            </div>
          </div>
        </section>

        {/* ── Avis clients ── */}
        <section style={{ background: '#fff', borderTop: '1px solid var(--sp-border)', padding: 'clamp(32px, 4vw, 56px) 0' }}>
          <div className="sp-container">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)', fontWeight: 700, color: 'var(--sp-primary)', marginBottom: 4 }}>
                  Avis clients
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Stars rating={product.rating} size={20} />
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--sp-text)' }}>{product.rating}/5</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--sp-text-muted)' }}>({product.reviewCount} avis)</span>
                </div>
              </div>
            </div>

            {/* Reviews grid */}
            <div className="product-reviews-grid">
              {product.reviews.map((review, i) => (
                <div key={i} style={{
                  background: 'var(--sp-bg-2)', borderRadius: 12,
                  border: '1px solid var(--sp-border)', padding: '20px',
                }}>
                  <Stars rating={5} size={14} />
                  <p style={{ margin: '10px 0 12px', fontSize: '0.9rem', color: 'var(--sp-text)', lineHeight: 1.6, fontStyle: 'italic' }}>
                    "{review.text}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--sp-text-muted)' }}>
                    <span style={{ fontWeight: 600 }}>{review.author}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cross-sell ── */}
        <section style={{ background: 'var(--sp-bg-2)', borderTop: '1px solid var(--sp-border)', padding: 'clamp(32px, 4vw, 56px) 0' }}>
          <div className="sp-container">
            <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)', fontWeight: 700, color: 'var(--sp-primary)', marginBottom: 24 }}>
              Souvent achetés ensemble
            </h2>
            <div className="product-cross-sell-grid">
              {product.crossSell.map((p) => (
                <div key={p.slug} style={{
                  background: '#fff', borderRadius: 12,
                  border: '1px solid var(--sp-border)', padding: '16px',
                  display: 'flex', flexDirection: 'column', gap: 10,
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--sp-shadow-md)'
                    ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ background: '#F8F9FA', borderRadius: 8, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={p.img} alt={p.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sp-text)' }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 'auto' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--sp-primary)' }}>{p.price}</span>
                    <button className="sp-btn sp-btn-primary button button--primary" style={{ padding: '7px 14px', fontSize: '0.8rem' }}>
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <StickyMobileCTA price={product.price} onAdd={handleAdd} />

      <style>{`
        .product-atf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .product-key-infos {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .product-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .product-cross-sell-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .product-atf-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .product-key-infos {
            grid-template-columns: repeat(2, 1fr);
          }
          .product-reviews-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .product-cross-sell-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
        }
        @media (max-width: 600px) {
          .product-key-infos {
            grid-template-columns: repeat(2, 1fr);
          }
          .product-reviews-grid {
            grid-template-columns: 1fr;
          }
          .product-cross-sell-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          main { padding-bottom: 80px; }
        }
      `}</style>
    </>
  )
}
