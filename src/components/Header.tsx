"use client"

import { useState, useEffect } from "react"

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: "smooth" })
}

const navLinks = [
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0d0805]/88 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex flex-col items-start leading-none gap-0.5"
          aria-label="Yass Valley Electrical — back to top"
        >
          <span className="font-display text-[1.1rem] font-light tracking-[0.3em] text-[#f5ede0] uppercase">
            Yass Valley
          </span>
          <span className="font-body text-[0.6rem] tracking-[0.35em] text-[#a89070] uppercase">
            Electrical
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-body text-sm text-[#a89070] hover:text-[#f5ede0] transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:0412999842"
            className="font-body text-sm px-5 py-2.5 border border-[#c4701a] text-[#e8973a] hover:bg-[#c4701a] hover:text-[#0d0805] transition-all duration-200 tracking-wide"
          >
            Call Jack
          </a>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 relative z-[60]"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-px bg-[#a89070] transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[#a89070] transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[#a89070] transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={`md:hidden fixed inset-0 bg-[#0d0805]/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-10 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.id}
            onClick={() => {
              scrollToSection(link.id)
              setMenuOpen(false)
            }}
            className="font-display text-4xl font-light text-[#f5ede0] tracking-wide hover:text-[#e8973a] transition-colors duration-200"
            style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
          >
            {link.label}
          </button>
        ))}
        <a
          href="tel:0412999842"
          className="mt-4 font-body text-sm px-8 py-3 border border-[#c4701a] text-[#e8973a] tracking-widest hover:bg-[#c4701a] hover:text-[#0d0805] transition-all duration-200"
        >
          Call Jack — 0412 999 842
        </a>
      </div>
    </header>
  )
}
