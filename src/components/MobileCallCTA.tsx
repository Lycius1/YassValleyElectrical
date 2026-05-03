"use client"

import { useState, useEffect } from "react"

export default function MobileCallCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href="tel:0412999842"
        className="flex items-center justify-center gap-2 w-full py-4 bg-[#c4701a] text-[#0d0805] font-body font-medium tracking-wider text-sm"
      >
        <span>⚡</span>
        <span>Call Jack — 0412 999 842</span>
      </a>
    </div>
  )
}
