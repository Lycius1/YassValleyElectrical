"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

export default function GSAPProvider() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    ScrollTrigger.normalizeScroll(true)

    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      // Flame bloom on load: rises from 80% → 20%
      gsap.fromTo(
        document.documentElement,
        { "--flame-y": "80%" },
        { "--flame-y": "20%", duration: 2.5, ease: "power2.out", delay: 0.3 }
      )

      // Scroll-driven flame: 20% → 120% over full page
      gsap.to(document.documentElement, {
        "--flame-y": "120%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      })

      // Section illuminate-in and dim-out
      gsap.utils
        .toArray<HTMLElement>("section[data-flame-section]")
        .forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0.08 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                scrub: 0.8,
              },
            }
          )
          gsap.fromTo(
            section,
            { opacity: 1 },
            {
              opacity: 0.15,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "bottom 80%",
                end: "bottom 20%",
                scrub: 0.8,
              },
            }
          )
        })

      // Hero is always fully visible — override opacity scrub
      gsap.set("#hero", { opacity: 1 })

      // Card glow batch
      ScrollTrigger.batch("[data-flame-card]", {
        onEnter: (els) =>
          (els as HTMLElement[]).forEach((el) => el.classList.add("lit")),
        onLeave: (els) =>
          (els as HTMLElement[]).forEach((el) => el.classList.remove("lit")),
        onEnterBack: (els) =>
          (els as HTMLElement[]).forEach((el) => el.classList.add("lit")),
        onLeaveBack: (els) =>
          (els as HTMLElement[]).forEach((el) => el.classList.remove("lit")),
        start: "top 75%",
        end: "bottom 25%",
      })

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    })

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        document.documentElement,
        { "--flame-y": "80%" },
        { "--flame-y": "20%", duration: 2.0, ease: "power2.out", delay: 0.3 }
      )
      gsap.to(document.documentElement, {
        "--flame-y": "120%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 2.0,
        },
      })

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    })

    return () => {
      mm.revert()
      gsap.killTweensOf(document.documentElement)
    }
  }, [])

  return null
}
