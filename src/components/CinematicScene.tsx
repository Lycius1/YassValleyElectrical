'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// ─── Data ──────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: 'General Electrical',
    desc: 'Wiring, outlets, lighting circuits, fault finding and repairs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#d4903a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M9 21h6M9 18h6" />
        <path d="M12 2C8.69 2 6 4.69 6 8c0 2.23 1.22 4.16 3 5.23V15h6v-1.77C16.78 12.16 18 10.23 18 8c0-3.31-2.69-6-6-6z" />
      </svg>
    ),
  },
  {
    title: 'Switchboard Upgrades',
    desc: 'Safety switches, circuit breakers, full replacements.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#d4903a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="8" cy="8" r="0.5" fill="#d4903a" />
        <circle cx="8" cy="12" r="0.5" fill="#d4903a" />
        <circle cx="8" cy="16" r="0.5" fill="#d4903a" />
        <line x1="12" y1="8" x2="18" y2="8" />
        <line x1="12" y1="12" x2="18" y2="12" />
        <line x1="12" y1="16" x2="18" y2="16" />
      </svg>
    ),
  },
  {
    title: 'EV Charger Install',
    desc: 'Home charging stations for all vehicles. Fast, code-compliant.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#d4903a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Smart Home',
    desc: 'Automated lighting, data points, home theatre wiring.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#d4903a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <circle cx="12" cy="7" r="0.5" fill="#d4903a" />
      </svg>
    ),
  },
  {
    title: 'Hot Water Systems',
    desc: 'Electric and heat pump installation, repair, replacement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#d4903a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    ),
  },
  {
    title: 'Emergency Callouts',
    desc: 'Rapid response. Faults and after-hours. Jack picks up.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#d4903a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
]

// Phase 1 featured cards — EV Charging, Smart Home, Emergency
const FEATURED = [
  { svc: SERVICES[2], right: '8vw',  top: '18vh' },
  { svc: SERVICES[3], right: '4vw',  top: '44vh' },
  { svc: SERVICES[5], right: '12vw', top: '68vh' },
]

const REVIEWS = [
  {
    quote: "Jack was on time, professional, immaculate work. Price was exactly what he quoted.",
    author: 'Rebecca T.', location: 'Yass NSW',
  },
  {
    quote: "EV charger and kitchen rewire — couldn't fault him. Ahead of schedule.",
    author: 'Michael R.', location: 'Murrumbateman',
  },
  {
    quote: "Emergency fault, there within the hour. Fast fix, fair price.",
    author: 'Christine B.', location: 'Gundaroo',
  },
]

// ─── Helpers ───────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }
function invLerp(a: number, b: number, v: number) { return b === a ? 0 : (v - a) / (b - a) }
function mapRange(inA: number, inB: number, outA: number, outB: number, v: number) {
  return lerp(outA, outB, clamp(invLerp(inA, inB, v), 0, 1))
}

// ─── CSS Pendant Light ────────────────────────────────────────────────────
function PendantLight({ left, pendantRef }: { left: string; pendantRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={pendantRef}
      style={{
        position: 'absolute', top: 0, left,
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        pointerEvents: 'none',
        transformOrigin: 'top center',
      }}
    >
      <div style={{
        width: '1px', height: '80px', flexShrink: 0,
        background: 'linear-gradient(180deg, #3a2510, #2a1a08)',
      }} />
      <div style={{
        position: 'relative',
        width: '52px', height: '38px', flexShrink: 0,
        background: 'radial-gradient(ellipse at 50% 20%, #e8a030, #c47818 40%, #8a4a08)',
        borderRadius: '50% 50% 65% 65%',
        boxShadow: '0 2px 8px rgba(200,120,20,0.4), inset 0 -4px 8px rgba(255,180,60,0.3)',
      }}>
        <div style={{
          position: 'absolute', bottom: '-9px', left: '50%',
          transform: 'translateX(-50%)',
          width: '18px', height: '18px', borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, #fff8e0, #ffcc44 50%, #e8980a)',
          boxShadow: [
            '0 0 12px 6px rgba(255,200,60,0.6)',
            '0 0 40px 16px rgba(220,140,20,0.3)',
            '0 0 80px 30px rgba(180,100,10,0.15)',
            '0 0 160px 60px rgba(150,80,5,0.08)',
          ].join(', '),
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute', top: '38px', left: '50%',
          transform: 'translateX(-50%)',
          width: '300px', height: '400px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,180,60,0.12) 0%, rgba(220,140,20,0.06) 30%, rgba(180,100,10,0.02) 60%, transparent 80%)',
        }} />
        <div style={{
          position: 'absolute', top: '430px', left: '50%',
          transform: 'translateX(-50%)',
          width: '200px', height: '60px',
          background: 'radial-gradient(ellipse at center, rgba(200,120,20,0.08), transparent 70%)',
        }} />
      </div>
    </div>
  )
}

// ─── Contact form ─────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', suburb: '', jobType: '', description: '' })
  const [submitted, setSubmitted] = useState(false)

  function setField(k: string, v: string) { setForm(p => ({ ...p, [k]: v })) }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTimeout(() => setSubmitted(true), 600)
  }

  if (submitted) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0' }}>
      <span style={{ color: '#d4903a', fontSize: '20px' }}>✦</span>
      <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '18px', fontWeight: 300, color: '#f0e8d8', margin: 0 }}>
        Thanks — Jack will be in touch.
      </p>
    </div>
  )

  const inputCls: React.CSSProperties = {
    width: '100%', background: 'rgba(10,8,4,0.6)',
    border: '1px solid rgba(212,144,58,0.15)',
    color: '#f0e8d8', padding: '8px 12px', fontSize: '12px',
    outline: 'none', borderRadius: 0, boxSizing: 'border-box',
    fontFamily: 'var(--font-body), system-ui, sans-serif',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <input value={form.name} onChange={e => setField('name', e.target.value)} required placeholder="Name" style={inputCls} />
        <input value={form.phone} onChange={e => setField('phone', e.target.value)} required placeholder="Phone" style={inputCls} />
      </div>
      <input value={form.suburb} onChange={e => setField('suburb', e.target.value)} placeholder="Suburb" style={inputCls} />
      <select value={form.jobType} onChange={e => setField('jobType', e.target.value)}
        style={{ ...inputCls, colorScheme: 'dark' as React.CSSProperties['colorScheme'] }}>
        <option value="">Job type...</option>
        {['General Electrical','Switchboard Upgrade','EV Charger','Smart Home','Hot Water','Emergency'].map(t => (
          <option key={t} value={t} style={{ background: '#0a0804' }}>{t}</option>
        ))}
      </select>
      <textarea value={form.description} onChange={e => setField('description', e.target.value)}
        rows={3} placeholder="Brief description..." style={{ ...inputCls, resize: 'none' }} />
      <button type="submit" className="btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '12px 20px' }}>
        Send Request →
      </button>
    </form>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function CinematicScene() {
  const bgRef              = useRef<HTMLDivElement>(null)
  const heroRef            = useRef<HTMLDivElement>(null)
  const cardRefs           = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const servicesRef        = useRef<HTMLDivElement>(null)
  const aboutRef           = useRef<HTMLDivElement>(null)
  const reviewsRef         = useRef<HTMLDivElement>(null)
  const contactRef         = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const pendant1Ref        = useRef<HTMLDivElement>(null)
  const pendant2Ref        = useRef<HTMLDivElement>(null)
  const pendant3Ref        = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    ScrollTrigger.normalizeScroll(true)

    // ── Phase-driven scene update ───────────────────────────────
    function updateScene(p: number) {
      // Background: parallax + slow zoom inward
      if (bgRef.current) {
        const offset = window.scrollY * 0.12
        const scale  = 1 + mapRange(0.25, 0.65, 0, 0.10, p)
        bgRef.current.style.backgroundPosition = `center calc(30% + ${offset}px)`
        bgRef.current.style.transform = `scale(${scale})`
      }

      // Phase 1 — Hero: visible 0–0.25, fades out 0.25–0.33
      if (heroRef.current) {
        const o = clamp(mapRange(0.25, 0.33, 1, 0, p), 0, 1)
        heroRef.current.style.opacity = String(o)
        heroRef.current.style.pointerEvents = o > 0.05 ? 'auto' : 'none'
      }

      // Scroll indicator fades at first scroll
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = String(mapRange(0, 0.04, 1, 0, p))
      }

      // Phase 2 — Card split (0.25–0.50) then fade (0.43–0.52)
      if (p >= 0.25) {
        const splitT  = clamp(mapRange(0.25, 0.48, 0, 1, p), 0, 1)
        const cardO   = clamp(mapRange(0.43, 0.52, 1, 0, p), 0, 1)
        // Card 0 flies left, card 1 stays, card 2 flies right
        const splitXs = [lerp(0, -160, splitT), lerp(0, 10, splitT), lerp(0, 160, splitT)]
        const splitYs = [lerp(0, -50,  splitT), lerp(0,  20, splitT), lerp(0,  50, splitT)]
        cardRefs.current.forEach((el, i) => {
          if (!el) return
          el.style.transform    = `translateX(${splitXs[i]}px) translateY(${splitYs[i]}px)`
          el.style.opacity      = String(cardO)
          el.style.pointerEvents = cardO > 0.1 ? 'auto' : 'none'
        })
      }

      // Phase 3 — Services (0.50–0.65)
      if (servicesRef.current) {
        const inO  = mapRange(0.50, 0.58, 0, 1, p)
        const outO = mapRange(0.62, 0.67, 1, 0, p)
        const o    = clamp(Math.min(inO, outO), 0, 1)
        servicesRef.current.style.opacity      = String(o)
        servicesRef.current.style.pointerEvents = o > 0.05 ? 'auto' : 'none'
      }

      // Phase 4 — About (0.65–0.80)
      if (aboutRef.current) {
        const inO  = mapRange(0.65, 0.73, 0, 1, p)
        const outO = mapRange(0.77, 0.83, 1, 0, p)
        const o    = clamp(Math.min(inO, outO), 0, 1)
        aboutRef.current.style.opacity      = String(o)
        aboutRef.current.style.pointerEvents = o > 0.05 ? 'auto' : 'none'
      }

      // Phase 5 — Reviews (0.83–0.96)
      if (reviewsRef.current) {
        const inO  = mapRange(0.83, 0.89, 0, 1, p)
        const outO = mapRange(0.93, 0.97, 1, 0, p)
        const o    = clamp(Math.min(inO, outO), 0, 1)
        reviewsRef.current.style.opacity      = String(o)
        reviewsRef.current.style.pointerEvents = o > 0.05 ? 'auto' : 'none'
      }

      // Phase 5 — Contact (0.88–1.0)
      if (contactRef.current) {
        const o = clamp(mapRange(0.88, 0.95, 0, 1, p), 0, 1)
        contactRef.current.style.opacity      = String(o)
        contactRef.current.style.pointerEvents = o > 0.05 ? 'auto' : 'none'
      }
    }

    // ── ScrollTrigger — scrub across full 600vh ─────────────────
    ScrollTrigger.create({
      trigger: '#scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
      onUpdate: (self) => updateScene(self.progress),
    })

    updateScene(0)

    // ── Pendant sway ─────────────────────────────────────────────
    if (pendant1Ref.current) {
      gsap.fromTo(pendant1Ref.current,
        { rotate: -1 },
        { rotate: 1, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: 'top center' }
      )
    }
    if (pendant2Ref.current) {
      gsap.fromTo(pendant2Ref.current,
        { rotate: 1 },
        { rotate: -1, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: 'top center' }
      )
    }
    if (pendant3Ref.current) {
      gsap.fromTo(pendant3Ref.current,
        { rotate: -0.5 },
        { rotate: 0.8, duration: 4.5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: 'top center' }
      )
    }

    // ── Nav jump ─────────────────────────────────────────────────
    const progressMap: Record<string, number> = {
      hero: 0, services: 0.53, about: 0.68, reviews: 0.85, contact: 0.90,
    }
    function handleNavJump(e: Event) {
      const section = (e as CustomEvent<{ section: string }>).detail.section
      const target  = progressMap[section] ?? 0
      const container = document.getElementById('scroll-container')
      if (!container) return
      const maxScroll = container.offsetHeight - window.innerHeight
      gsap.to(window, { scrollTo: { y: target * maxScroll }, duration: 1.4, ease: 'power2.inOut' })
    }
    window.addEventListener('yve-nav-jump', handleNavJump)

    // ── Card stagger after map intro ──────────────────────────────
    function runCardIntro() {
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
      gsap.fromTo(cards,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
      )
      ScrollTrigger.refresh()
    }
    window.addEventListener('yve-intro-complete', runCardIntro, { once: true })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('yve-nav-jump', handleNavJump)
      window.removeEventListener('yve-intro-complete', runCardIntro)
    }
  }, [])

  // ─── Shared glass style ─────────────────────────────────────
  const glass: React.CSSProperties = {
    background: 'rgba(15,10,5,0.45)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '0.5px solid rgba(255,200,100,0.15)',
    borderRadius: '16px',
    color: '#f0e8d8',
  }

  return (
    <>
      {/* ── Fixed background photo ──────────────────────────── */}
      <div
        ref={bgRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
          transformOrigin: 'center center',
          willChange: 'transform, background-position',
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, rgba(8,5,2,0.82) 0%, rgba(12,8,3,0.65) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── CSS Pendant Lights ────────────────────────────────── */}
      <div className="hidden md:block" style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 0,
        zIndex: 1, pointerEvents: 'none', overflow: 'visible',
      }}>
        <PendantLight left="32%" pendantRef={pendant1Ref} />
        <PendantLight left="58%" pendantRef={pendant2Ref} />
        <PendantLight left="76%" pendantRef={pendant3Ref} />
      </div>

      {/* ── Scroll height provider ────────────────────────────── */}
      <div id="scroll-container" style={{ height: '600vh', position: 'relative', zIndex: 2, pointerEvents: 'none' }} />

      {/* ── Phase 1: Hero panel (left) ────────────────────────── */}
      <div
        ref={heroRef}
        style={{
          ...glass,
          position: 'fixed', left: '5vw', top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(480px, 42vw)', minWidth: '280px',
          padding: '40px', zIndex: 10,
          background: 'rgba(10, 6, 2, 0.55)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '0.5px solid rgba(255, 200, 100, 0.12)',
        }}
      >
        <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#d4903a', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          Yass · Murrumbateman · Canberra · ACT
        </p>
        <h1 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 300, fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', lineHeight: 0.92, margin: '0 0 16px' }}>
          Switched On.<br />
          <span style={{ fontStyle: 'italic', color: '#d4903a' }}>Every Time.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a09070', lineHeight: 1.7, margin: '0 0 28px', maxWidth: '360px' }}>
          Licensed electrician serving the Yass Valley and Canberra region. EV charging, smart home — both sides of the border.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
          <a
            href="tel:0412999842"
            style={{
              background: 'transparent', border: '1px solid rgba(212, 144, 58, 0.7)',
              borderRadius: '2px', color: '#d4903a', padding: '10px 20px',
              fontSize: '13px', fontFamily: 'var(--font-body), system-ui, sans-serif',
              fontWeight: 500, letterSpacing: '0.06em', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap',
              textDecoration: 'none', transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212, 144, 58, 0.08)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            Call Jack — 0412 999 842
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('yve-nav-jump', { detail: { section: 'contact' } }))}
            className="btn-text-link"
          >
            Get a Quote →
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          {['Licensed NSW & ACT', 'Fully Insured', 'Yass Valley Local'].map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(160,144,112,0.5)' }}>
              ✦ {t}
            </span>
          ))}
        </div>
        <div ref={scrollIndicatorRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '8px', transition: 'opacity 0.3s' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4903a' }}>Scroll</span>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            border: '1px solid rgba(212,144,58,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#d4903a', fontSize: '14px',
            animation: 'scrollBounce 2s ease-in-out infinite',
          }}>↓</div>
        </div>
      </div>

      {/* ── Phase 1: Featured service cards (right, staggered) ─── */}
      {FEATURED.map(({ svc, right, top }, i) => (
        <div
          key={svc.title}
          ref={el => { cardRefs.current[i] = el }}
          style={{
            ...glass,
            position: 'fixed', right, top,
            width: '200px', padding: '20px',
            opacity: 0, zIndex: 10,
            willChange: 'transform, opacity',
          }}
        >
          <div style={{ marginBottom: '10px' }}>{svc.icon}</div>
          <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '17px', fontWeight: 600, margin: '0 0 6px' }}>
            {svc.title}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#a09070', lineHeight: 1.6, margin: '0 0 10px' }}>
            {svc.desc}
          </p>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(212,144,58,0.8)' }}>
            Learn more →
          </span>
        </div>
      ))}

      {/* ── Phase 3: Services panel (all 6 cards, centre) ─────── */}
      <div
        ref={servicesRef}
        style={{
          ...glass,
          position: 'fixed', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(920px, 88vw)', padding: '40px',
          opacity: 0, pointerEvents: 'none', zIndex: 10,
        }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a09070', marginBottom: '8px' }}>
          What We Do
        </p>
        <h2 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.0, margin: '0 0 28px' }}>
          Electrical Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {SERVICES.map(svc => (
            <div key={svc.title} style={{ borderTop: '1px solid rgba(212,144,58,0.2)', paddingTop: '16px' }}>
              <div style={{ marginBottom: '8px' }}>{svc.icon}</div>
              <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '15px', fontWeight: 600, margin: '0 0 5px' }}>
                {svc.title}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#a09070', lineHeight: 1.6, margin: '0 0 8px' }}>
                {svc.desc}
              </p>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(212,144,58,0.8)' }}>
                Learn more →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Phase 4: About panel (right) ─────────────────────── */}
      <div
        ref={aboutRef}
        style={{
          ...glass,
          position: 'fixed',
          right: 'clamp(20px, 6vw, 80px)', top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(380px, 40vw)', minWidth: '260px',
          padding: '36px 32px',
          opacity: 0, pointerEvents: 'none', zIndex: 10,
        }}
      >
        <div style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 300, fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1, background: 'linear-gradient(135deg, #d4903a, #c07018)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '12px' }}>
          J.T.
        </div>
        <div style={{ border: '1px solid rgba(196,112,26,0.15)', display: 'inline-block', padding: '4px 10px', marginBottom: '20px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(160,144,112,0.6)' }}>
            Licensed Electrician · NSW &amp; ACT
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.1, margin: '0 0 16px' }}>
          Jack Shows Up.<br />Jack Gets It Done.
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#a09070', lineHeight: 1.7, margin: '0 0 12px' }}>
          Yass Valley Electrical is Jack Tilley — licensed across NSW and the ACT. When you call, you get Jack. He turns up on time, quotes honestly, backs his work.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#a09070', lineHeight: 1.7, margin: 0 }}>
          Specialist in EV charger installation and smart home systems — the kind of work most local sparkies won&apos;t touch.
        </p>
      </div>

      {/* ── Phase 5: Reviews panel (bottom centre) ───────────── */}
      <div
        ref={reviewsRef}
        style={{
          ...glass,
          position: 'fixed', left: '50%', bottom: '12%',
          transform: 'translateX(-50%)',
          width: 'min(860px, 90vw)', padding: '32px',
          opacity: 0, pointerEvents: 'none', zIndex: 10,
        }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a09070', marginBottom: '20px' }}>
          Reviews · 5.0 stars
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map(r => (
            <div key={r.author} style={{ borderLeft: '1px solid rgba(212,144,58,0.2)', paddingLeft: '16px' }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#d4903a', fontSize: '10px' }}>✦</span>)}
              </div>
              <blockquote style={{ fontFamily: 'var(--font-display), Georgia, serif', fontStyle: 'italic', fontSize: '14px', fontWeight: 300, lineHeight: 1.6, color: '#f0e8d8', margin: '0 0 12px' }}>
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#f0e8d8', margin: '0 0 2px' }}>{r.author}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#a09070', margin: 0 }}>{r.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Phase 5: Contact panel (left) ────────────────────── */}
      <div
        ref={contactRef}
        style={{
          ...glass,
          position: 'fixed',
          left: 'clamp(20px, 5vw, 80px)', top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(400px, 44vw)', minWidth: '280px',
          padding: '36px 32px',
          opacity: 0, pointerEvents: 'none', zIndex: 10,
        }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a09070', marginBottom: '12px' }}>
          Get in touch
        </p>
        <h2 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', lineHeight: 1.0, margin: '0 0 8px' }}>
          Let&apos;s Get<br />You Sorted.
        </h2>
        <a href="tel:0412999842" style={{ display: 'block', fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', background: 'linear-gradient(135deg, #d4903a, #c07018)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textDecoration: 'none', marginBottom: '24px', lineHeight: 1.2 }}>
          0412 999 842
        </a>
        <ContactForm />
      </div>
    </>
  )
}
