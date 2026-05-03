# Plan: Yass Valley Electrical — Full Site Build

## Context
Empty project directory. Build complete production-grade Next.js 14 static site from scratch for Jack Tilley's electrician business. Defining feature: cinematic torch flame scroll effect using GSAP + CSS custom property. Sales demo mockup, deployed to Vercel static export.

---

## Phase 1 — Scaffold & Install

Run from `/home/louay/projects/YassValleyElectrical/`:

```bash
# 1. Next.js 14 with App Router, TypeScript, Tailwind, src/ dir
npx create-next-app@14 . --typescript --tailwind --app --src-dir --import-alias "@/*" --eslint --yes

# 2. shadcn/ui init
npx shadcn@latest init --yes

# 3. Add needed shadcn components
npx shadcn@latest add button input textarea select badge label

# 4. GSAP with ScrollTrigger + ScrollToPlugin
npm install gsap
```

---

## Phase 2 — Configuration Files

### `next.config.ts`
```ts
const nextConfig = { output: 'export', images: { unoptimized: true }, trailingSlash: true }
```

### `vercel.json`
```json
{ "buildCommand": "npm run build", "outputDirectory": "out", "framework": "nextjs" }
```

### `tailwind.config.ts`
Extend with `fontFamily: { display: ['var(--font-display)', 'Georgia', 'serif'], body: ['var(--font-body)', 'system-ui', 'sans-serif'] }` and custom colour tokens.

---

## Phase 3 — File Creation Order

Build in this sequence (each depends on previous):

1. **`src/app/globals.css`** — CSS variables, `#flame-overlay` gradient definition, `.flame-card`/`.flame-card.lit` styles, shadcn compat layer
2. **`src/app/layout.tsx`** — Fonts (Cormorant Garamond + DM Sans via next/font), static `#flame-overlay` div, `dynamic(() => import GSAPProvider, { ssr: false })`
3. **`src/components/GSAPProvider.tsx`** — Full GSAP engine (see below)
4. **`src/components/Header.tsx`**
5. **`src/components/Footer.tsx`**
6. **`src/components/MobileCallCTA.tsx`**
7. **`src/components/sections/Hero.tsx`**
8. **`src/components/sections/Services.tsx`**
9. **`src/components/sections/About.tsx`**
10. **`src/components/sections/Reviews.tsx`**
11. **`src/components/sections/Contact.tsx`**
12. **`src/app/page.tsx`** — assembles all sections

---

## Phase 4 — Critical Implementation Details

### CSS Variables (`globals.css`)
```css
:root {
  --bg: #0d0805; --surface: #120c06; --card: #1a1208;
  --flame-peak: #e8973a; --flame-warm: #c4701a;
  --text: #f5ede0; --text-muted: #a89070;
  --border: #c4701a15; --border-lit: #c4701a50;
  --flame-y: 80%; /* GSAP-controlled, initial below fold */
}

html, body { background-color: var(--bg); color: var(--text); }

#flame-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse 600px 500px at 50% var(--flame-y),
    #e8973a18 0%, #c4701a0a 35%, #8b4a1205 60%, transparent 80%);
  will-change: background;
}
@media (max-width: 767px) {
  #flame-overlay { /* reduce gradient size for mobile performance */
    background: radial-gradient(ellipse 350px 300px at 50% var(--flame-y),
      #e8973a18 0%, #c4701a0a 35%, #8b4a1205 60%, transparent 80%);
  }
}

.flame-card {
  border: 1px solid var(--border);
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
}
.flame-card.lit {
  border-color: var(--border-lit);
  box-shadow: 0 0 40px #c4701a08;
}
```

Also add shadcn compat tokens: `--background`, `--foreground`, `--primary: #e8973a`, `--primary-foreground: #0d0805`, `--ring: #c4701a50`, `--radius: 0rem` (sharp corners).

### GSAPProvider.tsx (`'use client'`, renders null)
Key architecture: GSAP tweens `--flame-y` on `document.documentElement`. CSS cascade propagates to `#flame-overlay` automatically. Zero per-frame DOM writes.

```tsx
'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export default function GSAPProvider() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    ScrollTrigger.normalizeScroll(true)

    const mm = gsap.matchMedia()

    // Desktop
    mm.add('(min-width: 768px)', () => {
      // Flame bloom on load: 80% → 20% over 2.5s
      gsap.fromTo(document.documentElement,
        { '--flame-y': '80%' },
        { '--flame-y': '20%', duration: 2.5, ease: 'power2.out', delay: 0.3 }
      )
      // Flame follows scroll: 20% → 120%
      gsap.to(document.documentElement, {
        '--flame-y': '120%', ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.5 }
      })
      // Section illuminate-in (two triggers per section: in + out)
      gsap.utils.toArray<HTMLElement>('section[data-flame-section]').forEach((section) => {
        gsap.fromTo(section, { opacity: 0.08 }, {
          opacity: 1, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 20%', scrub: 0.8 }
        })
        gsap.fromTo(section, { opacity: 1 }, {
          opacity: 0.15, ease: 'none',
          scrollTrigger: { trigger: section, start: 'bottom 80%', end: 'bottom 20%', scrub: 0.8 }
        })
      })
      // Hero always starts visible (override the above)
      gsap.set('#hero', { opacity: 1 })
      // Card glow batch
      ScrollTrigger.batch('[data-flame-card]', {
        onEnter: (els) => els.forEach(el => el.classList.add('lit')),
        onLeave: (els) => els.forEach(el => el.classList.remove('lit')),
        onEnterBack: (els) => els.forEach(el => el.classList.add('lit')),
        onLeaveBack: (els) => els.forEach(el => el.classList.remove('lit')),
        start: 'top 75%', end: 'bottom 25%',
      })
      return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
    })

    // Mobile (reduced)
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(document.documentElement,
        { '--flame-y': '80%' },
        { '--flame-y': '20%', duration: 2.0, ease: 'power2.out', delay: 0.3 }
      )
      gsap.to(document.documentElement, {
        '--flame-y': '120%', ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2.0 }
      })
      return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
    })

    return () => { mm.revert(); gsap.killTweensOf(document.documentElement) }
  }, [])

  return null
}
```

### Layout (`src/app/layout.tsx`)
```tsx
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import dynamic from 'next/dynamic'
const GSAPProvider = dynamic(() => import('@/components/GSAPProvider'), { ssr: false })

const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['300','400','600'], style: ['normal','italic'],
  variable: '--font-display', display: 'swap'
})
const dmSans = DM_Sans({
  subsets: ['latin'], weight: ['400','500'],
  variable: '--font-body', display: 'swap'
})

// In body:
// <div id="flame-overlay" aria-hidden="true" />
// <GSAPProvider />
// All page content at z-index: 10 (relative)
```

### Section markup pattern
Every section: `<section id="X" data-flame-section className="relative z-10 ...">`.  
Every card: `data-flame-card` attribute + `flame-card` class.

### Header scroll behaviour
- Transparent at top
- On `scrollY > 50`: add `bg-[#0d0805]/85 backdrop-blur-md` via `useState` + scroll listener
- "Call Jack" → `href="tel:0412999842"`
- Nav smooth scroll uses `gsap.to(window, { scrollTo: target, duration: 0.8, ease: 'power2.inOut' })`

### Contact form
`'use client'` component with `useState` for fields + submit state. Simulate submit with `setTimeout(800ms)`. shadcn `Input`, `Textarea`, `Select`, `Label`, `Button`. No external form service needed (demo).

### Mobile CTA
`'use client'`, `useState(false)`, scroll listener: show when `scrollY > 300`. `fixed bottom-0 inset-x-0 md:hidden`. Amber bg (`--flame-peak`). `z-50` (above flame overlay).

---

## Phase 5 — Services Section Content

Six cards per spec:
1. General Electrical — wiring, outlets, lighting, fault finding
2. Switchboard Upgrades — safety switches, circuit breakers, full replacements
3. EV Charger Installation — home EV charging stations, all vehicle types
4. Smart Home — automated lighting, data points, home theatre wiring
5. Hot Water Systems — electric and heat pump installation and repair
6. Emergency Callouts — rapid response, fault finding, after-hours

SVG icons: inline, `stroke="currentColor"`, `strokeWidth="1.5"`, amber colour, thin line-art style. No external icon library — custom inline SVG paths per service theme.

---

## Phase 6 — Verification

1. `npm run build` → zero errors, `out/` directory generated
2. Devtools: watch `<html>` styles → `--flame-y` animates on scroll
3. Inspect `#flame-overlay` computed background → confirms radial-gradient at correct position
4. Services section: cards toggle `.lit` class on scroll through
5. Mobile (375px): flame effect smooth, MobileCallCTA appears after 300px scroll
6. Console: no hydration errors, no TypeScript errors
7. All nav anchors scroll correctly with 80px header offset
8. Contact form: submit shows success state "Thanks — Jack will be in touch shortly."

---

## Key Risk: GSAP CSS Variable Tween

GSAP must have explicit `fromVars` matching the CSS initial value (`'80%'`). If `--flame-y` is unset when GSAP runs, interpolation fails silently. Fix: always use `gsap.fromTo()` with explicit `{ '--flame-y': '80%' }` start value, AND set `--flame-y: 80%` in `:root` CSS. Both guards needed.
