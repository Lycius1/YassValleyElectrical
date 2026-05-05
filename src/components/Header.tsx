"use client"

import { useState, useEffect } from "react"

const navLinks = [
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
]

function jumpTo(section: string) {
  window.dispatchEvent(new CustomEvent('yve-nav-jump', { detail: { section } }))
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 32px',
    transition: 'background 0.3s ease, border-bottom 0.3s ease',
    ...(scrolled ? {
      background: 'rgba(8, 5, 2, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '0.5px solid rgba(255, 200, 100, 0.08)',
    } : {
      background: 'transparent',
    }),
  }

  return (
    <header style={headerStyle}>
      {/* Logo */}
      <button
        onClick={() => jumpTo('hero')}
        style={{ display: 'flex', flexDirection: 'column', gap: '3px', border: 'none', background: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
        aria-label="Yass Valley Electrical — back to top"
      >
        <span style={{
          fontFamily: 'var(--font-body), system-ui, sans-serif',
          fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em',
          color: '#e8d8b8', textTransform: 'uppercase', lineHeight: 1,
        }}>
          Yass Valley
        </span>
        <span style={{
          fontFamily: 'var(--font-body), system-ui, sans-serif',
          fontSize: '9px', fontWeight: 400, letterSpacing: '0.2em',
          color: 'rgba(200,170,120,0.6)', textTransform: 'uppercase', lineHeight: 1,
        }}>
          Electrical
        </span>
      </button>

      {/* Desktop nav */}
      <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '32px' }} aria-label="Main navigation">
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => jumpTo(link.id)}
            style={{
              background: 'none', border: 'none',
              fontFamily: 'var(--font-body), system-ui, sans-serif',
              fontSize: '12px', fontWeight: 400, letterSpacing: '0.08em',
              color: 'rgba(200,180,140,0.7)', cursor: 'pointer', padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#d4903a' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,180,140,0.7)' }}
          >
            {link.label}
          </button>
        ))}
        <a href="tel:0412999842" className="btn-outline">Call Jack</a>
      </nav>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden"
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          gap: '5px', width: '32px', height: '32px', position: 'relative',
          zIndex: 60, border: 'none', background: 'none', cursor: 'pointer', padding: 0,
        }}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span style={{
          display: 'block', width: '24px', height: '1px', background: '#a09070',
          transition: 'all 0.3s', transformOrigin: 'center',
          transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
        }} />
        <span style={{
          display: 'block', width: '24px', height: '1px', background: '#a09070',
          transition: 'all 0.3s',
          opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none',
        }} />
        <span style={{
          display: 'block', width: '24px', height: '1px', background: '#a09070',
          transition: 'all 0.3s', transformOrigin: 'center',
          transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
        }} />
      </button>

      {/* Mobile menu */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(8, 5, 2, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 40,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '40px',
          transition: 'opacity 0.5s ease',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.id}
            onClick={() => { jumpTo(link.id); setMenuOpen(false) }}
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              fontSize: '2.5rem', fontWeight: 300,
              color: '#f0e8d8', letterSpacing: '0.05em',
              background: 'none', border: 'none', cursor: 'pointer',
              transition: `color 0.2s ${i * 60}ms`,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#d4903a' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#f0e8d8' }}
          >
            {link.label}
          </button>
        ))}
        <a href="tel:0412999842" className="btn-outline" style={{ marginTop: '16px' }}>
          Call Jack — 0412 999 842
        </a>
      </div>
    </header>
  )
}
