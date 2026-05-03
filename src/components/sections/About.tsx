const areas = [
  "Yass",
  "Murrumbateman",
  "Canberra",
  "Binalong",
  "Bowning",
  "Gundaroo",
  "Sutton",
  "ACT",
]

export default function About() {
  return (
    <section
      id="about"
      data-flame-section
      className="relative z-10 py-24 md:py-32 px-6 md:px-10"
      style={{ willChange: "opacity" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — typographic monogram */}
          <div className="flex flex-col items-start justify-center">
            <div
              className="font-display font-light leading-none text-flame-gradient select-none"
              style={{ fontSize: "clamp(6rem, 15vw, 14rem)" }}
              aria-hidden="true"
            >
              J.T.
            </div>
            <div
              className="mt-4 border border-[#c4701a15] px-3 py-1.5"
            >
              <p className="font-body text-[0.6rem] tracking-[0.25em] text-[#a89070]/60 uppercase">
                Licensed Electrician · NSW &amp; ACT
              </p>
            </div>
          </div>

          {/* Right — copy */}
          <div className="flex flex-col gap-7">
            <p className="section-label">About Jack</p>

            <h2
              className="font-display font-light text-[#f5ede0] leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              Jack Shows Up.<br />
              Jack Gets It Done.
            </h2>

            <div className="space-y-5 text-[#a89070] font-body text-base leading-relaxed">
              <p>
                Yass Valley Electrical is Jack Tilley — a licensed electrician
                working across New South Wales and the ACT. When you call, you
                get Jack. He turns up when he says he will, quotes honestly,
                and backs his work completely. No subcontractors, no surprises,
                no runaround.
              </p>
              <p>
                Jack specialises in residential work across the Yass Valley and
                Canberra region, with particular expertise in EV charger
                installation and smart home systems — the kind of work most
                local sparkies don&apos;t touch.
              </p>
            </div>

            {/* Coverage area pills */}
            <div>
              <p className="section-label mb-3">Service area</p>
              <div className="flex flex-wrap gap-2">
                {areas.map((area) => (
                  <span
                    key={area}
                    className="font-body text-xs px-3 py-1 border border-[#c4701a30] text-[#c4701a] tracking-wide"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
