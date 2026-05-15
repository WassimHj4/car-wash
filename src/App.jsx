import { useState, useEffect, useRef } from 'react'
import './App.css'

// ─── Intersection Observer Hook ──────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [threshold])
  return [ref, inView]
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__logo">Infinity Clean</a>
        <nav className={`nav__menu${open ? ' nav__menu--open' : ''}`}>
          <a href="#services" onClick={close}>Services</a>
          <a href="#tarifs" onClick={close}>Tarifs</a>
          <a href="#avant-apres" onClick={close}>Avant/Après</a>
          <a href="#avis" onClick={close}>Avis</a>
          <a href="#faq" onClick={close}>FAQ</a>
          <a href="https://www.instagram.com/Infinityclean.ch" target="_blank" rel="noreferrer" className="nav__instagram" onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0" />
            </svg>
            Instagram
          </a>
          <a href="tel:+393515162288" className="btn btn--dark nav__menu-cta" onClick={close}>Nous appeler</a>
        </nav>
        <a href="tel:+393515162288" className="btn btn--dark nav__cta">Nous appeler</a>
        <button
          className={`nav__burger${open ? ' nav__burger--open' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__overlay" />
      <div className="hero__inner container">
        <div className="hero__badge">
          <span className="hero__stars" aria-hidden="true">★★★★★</span>{' '}
          5.0 Google &nbsp;·&nbsp; Canton Vaud &amp; Suisse Romande
        </div>
        <h1 className="hero__title">
          Nettoyage voiture<br />
          <em>à domicile</em><br />
          dans le Canton Vaud.
        </h1>
        <p className="hero__sub">
          Un soin professionnel, directement chez vous.<br />
          Résultat visible immédiatement.
        </p>
        <div className="hero__actions">
          <a href="tel:+393515162288" className="btn btn--light btn--lg">
            Nous appeler · dès CHF 75.–
          </a>
          <a href="#services" className="btn btn--ghost btn--lg">
            Découvrir nos services
          </a>
        </div>
        <div className="hero__trust">
          <span>✓ Sans engagement</span>
          <span>✓ Paiement après prestation</span>
          <span>✓ Résultat garanti</span>
        </div>
      </div>
      <a href="#features" className="hero__scroll" aria-label="Défiler">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l4 4 4-4" />
        </svg>
      </a>
    </section>
  )
}

// ─── Features ────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Intervention à domicile',
    desc: "Nous venons directement chez vous, à l'heure convenue. Aucun déplacement de votre part.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Produits professionnels',
    desc: 'Produits certifiés Gtechniq & Gyeon, adaptés à chaque matériau pour un résultat optimal.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Travail méticuleux',
    desc: 'Chaque détail compte. Nous ne faisons aucun compromis sur la qualité du travail rendu.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Résultat immédiat',
    desc: "Votre véhicule retrouve l'état neuf en quelques heures. Résultat visible dès la fin de l'intervention.",
  },
]

function Features() {
  const [ref, inView] = useInView()
  return (
    <section className="features section" id="features" ref={ref}>
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Notre approche</span>
          <h2>Un soin appliqué,<br />sans compromis.</h2>
        </div>
        <div className={`features__grid${inView ? ' visible' : ''}`}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="feature-card" style={{ '--delay': `${i * 0.1}s` }}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const [ref, inView] = useInView()
  return (
    <div className={`stats-bar${inView ? ' visible' : ''}`} ref={ref}>
      <div className="container stats-bar__inner">
        {[
          { num: '200+', label: 'Véhicules traités' },
          { num: '5.0 ★', label: 'Note Google' },
          { num: '100%', label: 'Satisfaction clients' },
          { num: '<2h', label: 'Confirmation rapide' },
        ].map((s, i) => (
          <div key={s.label} className="stat" style={{ '--delay': `${i * 0.08}s` }}>
            <span className="stat__num">{s.num}</span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Services / Pricing ───────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'Basic',
    duration: '~1h30',
    desc: 'Nettoyage intérieur soigné pour redonner à votre voiture une propreté parfaite.',
    features: [
      "Aspiration complète de l'habitacle",
      'Nettoyage du tableau de bord & coffre',
      'Vitres intérieures',
      'Dégraissage des plastiques',
    ],
    sizes: [
      { label: 'Petite voiture', price: 'CHF 75.–' },
      { label: 'Moyenne voiture', price: 'CHF 90.–' },
      { label: 'Grande voiture', price: 'CHF 110.–' },
    ],
    cta: 'Demander le Basic',
    featured: false,
  },
  {
    name: 'Detailing',
    duration: '~3h',
    desc: 'Traitement complet avec produits professionnels pour un résultat showroom.',
    features: [
      'Tout le contenu du Basic',
      'Shampoing sièges & tapis en profondeur',
      'Traitement cuir & alcantara',
      'Nettoyage vapeur des vitres',
      'Désinfection & parfum durable',
    ],
    sizes: [
      { label: 'Petite voiture', price: 'CHF 100.–' },
      { label: 'Moyenne voiture', price: 'CHF 120.–' },
      { label: 'Grande voiture', price: 'CHF 150.–' },
    ],
    cta: 'Demander le Detailing',
    featured: true,
  },
]

function Services() {
  const [ref, inView] = useInView()
  return (
    <section className="services section section--grey" id="tarifs" ref={ref}>
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Nos formules</span>
          <h2>Choisissez votre<br />niveau de soin.</h2>
          <p className="section__sub">
            Tarifs selon la taille du véhicule. Chaque formule est réalisée à domicile avec des produits professionnels.
          </p>
        </div>
        <div className={`plans__grid plans__grid--2${inView ? ' visible' : ''}`}>
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`plan${plan.featured ? ' plan--featured' : ''}`}
              style={{ '--delay': `${i * 0.15}s` }}
            >
              {plan.featured && <div className="plan__badge">Le plus choisi</div>}
              <div className="plan__top">
                <h3>{plan.name}</h3>
                <p>{plan.desc}</p>
              </div>
              <div className="plan__sizes">
                {plan.sizes.map((s) => (
                  <div key={s.label} className="plan__size-row">
                    <span className="plan__size-label">{s.label}</span>
                    <span className="plan__size-price">{s.price}</span>
                  </div>
                ))}
                <small>Durée estimée {plan.duration}</small>
              </div>
              <ul className="plan__features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="tel:+393515162288"
                className={`btn ${plan.featured ? 'btn--dark' : 'btn--outline'} btn--full`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
        <div className="services__trust">
          <span>✓ Paiement après intervention</span>
          <span>✓ Confirmation sous 2h</span>
          <span>✓ Intervention à domicile</span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{verticalAlign:'middle', marginRight:'5px'}}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Canton Vaud &amp; Suisse Romande
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── Before / After ───────────────────────────────────────────────────────────
function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const isDragging = useRef(false)
  const sliderRef = useRef(null)
  const [ref, inView] = useInView()

  const getPos = (clientX) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    setPos(Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)))
  }

  useEffect(() => {
    const onMove = (e) => { if (isDragging.current) getPos(e.clientX) }
    const onUp = () => { isDragging.current = false }
    const onTouchMove = (e) => {
      if (isDragging.current) { e.preventDefault(); getPos(e.touches[0].clientX) }
    }
    const onTouchEnd = () => { isDragging.current = false }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', onTouchEnd)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <section className="ba section" id="avant-apres" ref={ref}>
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Avant / Après</span>
          <h2>Le résultat parle<br />de lui-même.</h2>
        </div>
        <div className={`ba__wrap${inView ? ' visible' : ''}`}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            className="ba__slider"
            ref={sliderRef}
            onMouseDown={(e) => { isDragging.current = true; getPos(e.clientX) }}
            onTouchStart={(e) => { isDragging.current = true; getPos(e.touches[0].clientX) }}
          >
            <div className="ba__img ba__before">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80"
                alt="Avant nettoyage"
                draggable="false"
              />
              <span className="ba__tag">AVANT</span>
            </div>
            <div className="ba__img ba__after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
                alt="Après nettoyage"
                draggable="false"
              />
              <span className="ba__tag ba__tag--after">APRÈS</span>
            </div>
            <div className="ba__line" style={{ left: `${pos}%` }}>
              <button
                className="ba__handle"
                aria-label="Déplacer le curseur de comparaison"
                onMouseDown={(e) => { e.stopPropagation(); isDragging.current = true }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                  <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
          <p className="ba__hint">← Faites glisser pour comparer →</p>
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    title: 'Choisissez votre formule',
    desc: "Appelez-nous ou envoyez un message. Nous vous conseillons la formule adaptée à votre véhicule et votre budget.",
  },
  {
    num: '02',
    title: 'Nous intervenons chez vous',
    desc: "À l'heure convenue, notre équipe arrive avec tout le matériel professionnel. Vous n'avez rien à prévoir.",
  },
  {
    num: '03',
    title: 'Profitez du résultat',
    desc: "Votre voiture retrouve l'état neuf. Vous payez uniquement après votre entière satisfaction.",
  },
]

function HowItWorks() {
  const [ref, inView] = useInView()
  return (
    <section className="steps section section--grey" id="services" ref={ref}>
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Comment ça fonctionne</span>
          <h2>Simple, rapide<br />et sans contrainte.</h2>
        </div>
        <div className={`steps__grid${inView ? ' visible' : ''}`}>
          {STEPS.map((step, i) => (
            <div key={step.num} className="step" style={{ '--delay': `${i * 0.15}s` }}>
              <span className="step__num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
const API_BASE = 'https://carwash-backend-fsvi.onrender.com'

function Reviews() {
  const [ref, inView] = useInView()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Submit-a-review form state
  const [form, setForm] = useState({ name: '', rating: 5, text: '' })
  const [submitStatus, setSubmitStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/api/reviews`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur serveur')
        return res.json()
      })
      .then(data => setReviews(data))
      .catch(() => setError('Impossible de charger les avis.'))
      .finally(() => setLoading(false))
  }, [refreshKey])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name === 'rating' ? Number(value) : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitStatus('success')
      setForm({ name: '', rating: 5, text: '' })
      setShowForm(false)
      setRefreshKey(k => k + 1)
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <section className="reviews section" id="avis" ref={ref}>
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Avis clients</span>
          <h2>Noté 5★ par<br />nos clients.</h2>
          <p className="section__sub">5.0 / 5 · Canton Vaud &amp; Suisse Romande</p>
        </div>
        {loading && <p className="reviews__status">Chargement des avis…</p>}
        {error && <p className="reviews__status">{error}</p>}
        {!loading && !error && reviews.length === 0 && (
          <p className="reviews__status">Aucun avis pour le moment.</p>
        )}
        <div className={`reviews__grid${inView ? ' visible' : ''}`}>
          {reviews.map((r, i) => {
            const initials = r.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
            return (
              <div key={r.id} className="review" style={{ '--delay': `${i * 0.08}s` }}>
                <div className="review__header">
                  <div className="review__avatar">{initials}</div>
                  <div>
                    <strong className="review__name">{r.name}</strong>
                    <div className="review__stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                  </div>
                  <svg className="review__badge" viewBox="0 0 24 24" width="20" height="20" aria-label="Client vérifié">
                    <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
                  </svg>
                </div>
                <p className="review__text">&ldquo;{r.text}&rdquo;</p>
              </div>
            )
          })}
        </div>

        <div className="reviews__cta">
          <button className="btn btn--dark" onClick={() => setShowForm(v => !v)}>
            {showForm ? 'Annuler' : 'Laisser un avis'}
          </button>
        </div>

        {showForm && (
          <form className="review-form" onSubmit={handleSubmit} noValidate>
            <div className="contact__field">
              <label htmlFor="review-name">Nom *</label>
              <input
                id="review-name"
                name="name"
                type="text"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
              />
            </div>
            <div className="contact__field">
              <label htmlFor="review-rating">Note *</label>
              <div className="review-form__stars">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    className={`review-form__star${form.rating >= n ? ' active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, rating: n }))}
                    aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
                  >★</button>
                ))}
              </div>
            </div>
            <div className="contact__field">
              <label htmlFor="review-text">Votre avis *</label>
              <textarea
                id="review-text"
                name="text"
                rows={4}
                placeholder="Décrivez votre expérience…"
                value={form.text}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={1000}
              />
            </div>
            {submitStatus === 'success' && (
              <p className="contact__feedback contact__feedback--success">
                ✓ Merci ! Votre avis sera publié après validation.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="contact__feedback contact__feedback--error">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}
            <button className="btn btn--dark" type="submit" disabled={submitStatus === 'loading'}>
              {submitStatus === 'loading' ? 'Envoi…' : 'Envoyer mon avis'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Combien de temps dure l'intervention ?",
    a: "La durée varie selon la formule. Le nettoyage Simple dure environ 1 heure, l'Entretien Premium environ 3 heures. Nous vous donnons une estimation précise lors de la réservation.",
  },
  {
    q: "Dois-je être présent pendant l'intervention ?",
    a: "Non, votre présence n'est pas obligatoire. Il suffit de nous laisser accès au véhicule. Nous vous prévenons dès que le travail est terminé.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Le paiement s'effectue uniquement après l'intervention et votre satisfaction. Nous acceptons Twint, virement bancaire ou espèces.",
  },
  {
    q: "Dans quelle zone intervenez-vous ?",
    a: "Nous intervenons dans le Canton de Vaud et toute la Suisse Romande. Pour les zones éloignées, des frais de déplacement peuvent s'appliquer selon la distance.",
  },
  {
    q: "Faut-il une prise électrique ou de l'eau ?",
    a: "Idéalement oui, mais nous pouvons nous adapter. Pour le nettoyage intérieur, nous n'avons généralement pas besoin d'eau. Pour l'extérieur, une prise d'eau facilite le travail.",
  },
  {
    q: "Le nettoyage est-il adapté à tous les véhicules ?",
    a: "Oui, nous traitons tous types de véhicules : citadines, SUV, berlines et sportives. Nos produits sont adaptés à chaque type de matériau et revêtement.",
  },
]

function FaqSection() {
  const [open, setOpen] = useState(null)
  const [ref, inView] = useInView()
  return (
    <section className="faq section section--grey" id="faq" ref={ref}>
      <div className="container">
        <div className="section__header">
          <span className="section__tag">FAQ</span>
          <h2>Questions<br />fréquentes.</h2>
        </div>
        <div className={`faq__list${inView ? ' visible' : ''}`}>
          {FAQS.map((item, i) => (
            <div key={item.q} className={`faq__item${open === i ? ' faq__item--open' : ''}`}>
              <button className="faq__q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{item.q}</span>
                <svg className="faq__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="faq__a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactSection() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact section section--grey" id="contact" ref={ref}>
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Nous contacter</span>
          <h2>Envoyez-nous<br />un message.</h2>
          <p className="section__sub">Nous vous répondons dans les plus brefs délais.</p>
        </div>
        <form
          className={`contact__form${inView ? ' visible' : ''}`}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="name">Nom *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
              />
            </div>
            <div className="contact__field">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="contact__field">
            <label htmlFor="phone">Téléphone (optionnel)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+41 79 000 00 00"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="contact__field">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Décrivez votre besoin…"
              value={form.message}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={2000}
            />
          </div>
          {status === 'success' && (
            <p className="contact__feedback contact__feedback--success">
              ✓ Message envoyé ! Nous vous répondrons rapidement.
            </p>
          )}
          {status === 'error' && (
            <p className="contact__feedback contact__feedback--error">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
          <button className="btn btn--dark" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
          </button>
        </form>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CtaSection() {
  const [ref, inView] = useInView()
  return (
    <section className="cta" ref={ref}>
      <div className={`cta__inner container${inView ? ' visible' : ''}`}>
        <h2>Prêt à redonner de l&apos;éclat<br />à votre véhicule ?</h2>
        <p>Appelez-nous ou envoyez un message.<br />Déjà plus de 200 véhicules traités à Zurich.</p>
        <a href="tel:+393515162288" className="btn btn--light btn--lg">
          Nous contacter
        </a>
        <p className="cta__note">Disponibilités limitées chaque semaine.</p>
        <div className="cta__trust">
          <span>✓ Paiement après intervention</span>
          <span>✓ Confirmation rapide</span>
          <span>✓ Intervention à domicile</span>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Infinity Clean</span>
          <p>Service premium de nettoyage voiture à domicile à Zurich et ses alentours.</p>
          <a href="tel:+393515162288" className="footer__phone">+39 351 516 2288</a>
          <div className="footer__socials">
            <a href="https://www.instagram.com/Infinityclean.ch" target="_blank" rel="noreferrer" className="footer__social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0" />
              </svg>
              @Infinityclean.ch
            </a>
            <a href="https://www.tiktok.com/@infinity.clean7" target="_blank" rel="noreferrer" className="footer__social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
              </svg>
              @infinity.clean7
            </a>
            <a href="mailto:infinityclean.ch@gmail.com" className="footer__social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              infinityclean.ch@gmail.com
            </a>
          </div>
        </div>
        <div className="footer__nav">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#features">Notre approche</a></li>
            <li><a href="#tarifs">Tarifs</a></li>
            <li><a href="#avant-apres">Avant / Après</a></li>
            <li><a href="#avis">Avis clients</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer__nav">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+393515162288">Appeler</a></li>
            <li><a href="mailto:infinityclean.ch@gmail.com">infinityclean.ch@gmail.com</a></li>
            <li><a href="https://www.instagram.com/Infinityclean.ch" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@infinity.clean7" target="_blank" rel="noreferrer">TikTok</a></li>
            <li><span>Zurich, Suisse</span></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© 2026 Infinity Clean. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <StatsBar />
        <Services />
        <BeforeAfter />
        <HowItWorks />
        <Reviews />
        <FaqSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
