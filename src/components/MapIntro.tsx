'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''
const MAP_URL = MAPBOX_TOKEN
  ? `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/148.9116,-34.8422,13,0/1920x1080?access_token=${MAPBOX_TOKEN}`
  : ''
const FALLBACK_URL =
  'https://maps.googleapis.com/maps/api/staticmap?center=Yass,NSW,Australia&zoom=13&size=1920x1080&maptype=satellite'

export default function MapIntro() {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const mapRef      = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const overlay  = overlayRef.current
    const mapEl    = mapRef.current
    const vignette = vignetteRef.current
    if (!overlay || !mapEl || !vignette) return

    function runTimeline(bgUrl: string | null) {
      if (bgUrl) mapEl!.style.backgroundImage = `url(${bgUrl})`

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'unset'
          window.dispatchEvent(new CustomEvent('yve-intro-complete'))
          setVisible(false)
        },
      })

      // Phase 1 (0–0.5s): map div fades in
      tl.to(mapEl, { opacity: 1, duration: 0.5, ease: 'power1.out' })
      // Phase 2 (0.5–2.5s): zoom into Yass
      tl.to(mapEl, { scale: 8, duration: 2.2, ease: 'power2.in' }, 0.5)
      // Phase 2b (1.2–2.5s): vignette darkens
      tl.to(vignette, { opacity: 1, duration: 1.3, ease: 'power1.in' }, 1.2)
      // Phase 3 (2.0–2.8s): entire overlay fades out
      tl.to(overlay, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 2.0)
    }

    // Try Mapbox, fall back to Google, then to gradient-only
    const tryFallback = () => {
      const img2 = new Image()
      img2.onload  = () => runTimeline(FALLBACK_URL)
      img2.onerror = () => runTimeline(null)
      img2.src = FALLBACK_URL
    }
    if (MAP_URL) {
      const img1 = new Image()
      img1.onload  = () => runTimeline(MAP_URL)
      img1.onerror = tryFallback
      img1.src = MAP_URL
    } else {
      tryFallback()
    }

    return () => {
      document.body.style.overflow = 'unset'
      gsap.killTweensOf([overlay, mapEl, vignette])
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: '#0a0804',
        overflow: 'hidden',
      }}
    >
      {/* Map image — fades in and zooms */}
      <div
        ref={mapRef}
        style={{
          position: 'absolute', inset: 0,
          opacity: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          /* fallback dark gradient if image fails */
          background: 'radial-gradient(circle at center, #1a2030 0%, #0a0d14 50%, #050608 100%)',
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
      />

      {/* Vignette — darkens edges as zoom accelerates */}
      <div
        ref={vignetteRef}
        style={{
          position: 'absolute', inset: 0,
          opacity: 0,
          background: 'radial-gradient(circle, transparent 20%, rgba(8,5,2,0.95) 100%)',
          pointerEvents: 'none',
          willChange: 'opacity',
        }}
      />

      {/* Location pin — visible during zoom */}
      <div
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          zIndex: 1,
        }}
      >
        {/* Pulsing dot + ripple */}
        <div style={{ position: 'relative', width: '12px', height: '12px' }}>
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            background: 'rgba(255,180,60,0.8)',
            zIndex: 1,
          }} />
          {/* Ripple ring */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            background: 'rgba(255,180,60,0.4)',
            animation: 'pinRipple 1.5s ease-out infinite',
          }} />
        </div>
        <p style={{
          fontFamily: 'var(--font-body), system-ui, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#d4903a',
          margin: 0,
        }}>
          Yass, NSW
        </p>
      </div>
    </div>
  )
}
