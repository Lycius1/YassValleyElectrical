"use client"

export default function Hero() {
  return (
    <section
      id="hero"
      data-flame-section
      className="relative z-10 min-h-screen flex items-center px-6 md:px-10 pt-20"
      style={{ willChange: "opacity" }}
    >
      <div className="max-w-7xl mx-auto w-full py-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="section-label mb-8 text-[#a89070]/70">
            Yass · Murrumbateman · Canberra · ACT
          </p>

          {/* H1 */}
          <h1
            className="font-display font-light leading-[0.92] text-[#f5ede0] mb-8"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
          >
            Switched On.<br />
            <span className="text-flame-gradient">Every Time.</span>
          </h1>

          {/* Subtext */}
          <p className="font-body text-[#a89070] text-base md:text-lg leading-relaxed max-w-lg mb-10">
            Licensed electrician serving the Yass Valley and Canberra region.
            Residential, commercial, EV charging and smart home — both sides of
            the border.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a
              href="tel:0412999842"
              className="font-body text-sm px-7 py-3.5 border border-[#c4701a] text-[#e8973a] hover:bg-[#c4701a] hover:text-[#0d0805] transition-all duration-200 tracking-wide"
            >
              Call Jack — 0412 999 842
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById("contact")
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80
                  window.scrollTo({ top, behavior: "smooth" })
                }
              }}
              className="font-body text-sm text-[#a89070] hover:text-[#f5ede0] transition-colors duration-200 tracking-wide flex items-center gap-2"
            >
              Get a Quote <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              "Licensed NSW & ACT",
              "Fully Insured",
              "Yass Valley Local",
            ].map((item) => (
              <span
                key={item}
                className="font-body text-[0.65rem] tracking-widest text-[#a89070]/50 uppercase"
              >
                ✦ {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
