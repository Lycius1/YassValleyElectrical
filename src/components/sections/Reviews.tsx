const reviews = [
  {
    quote:
      "Jack was fantastic — on time, professional, and the work was immaculate. He explained everything clearly and the price was exactly what he quoted. Will absolutely use again.",
    author: "Rebecca T.",
    location: "Yass NSW",
  },
  {
    quote:
      "Had Jack install an EV charger and rewire part of our kitchen. Couldn't fault him. Knows his stuff, works clean and was done ahead of schedule.",
    author: "Michael R.",
    location: "Murrumbateman",
  },
  {
    quote:
      "Called Jack for an emergency fault and he was there within the hour. Fixed it fast and charged a fair price. Exactly what you want from a local tradie.",
    author: "Christine B.",
    location: "Gundaroo",
  },
]

export default function Reviews() {
  return (
    <section
      id="reviews"
      data-flame-section
      className="relative z-10 py-24 md:py-32 px-6 md:px-10"
      style={{ willChange: "opacity" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-4">Reviews</p>
          <h2
            className="font-display font-light text-[#f5ede0] leading-[0.95] mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Don&apos;t Take<br />
            Our Word For It.
          </h2>
          <p className="font-body text-sm text-[#a89070] tracking-wide">
            5.0 stars · Yass Valley&apos;s most trusted electrician
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#c4701a10]">
          {reviews.map((review) => (
            <div
              key={review.author}
              data-flame-card
              className="flame-card bg-[#120c06] p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden"
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-4 right-6 font-display text-8xl text-[#c4701a08] leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-1" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#e8973a] text-sm">
                    ✦
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-display italic text-[1.1rem] font-light text-[#f5ede0] leading-relaxed flex-1">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              {/* Reviewer */}
              <div className="border-t border-[#c4701a15] pt-4">
                <p className="font-body text-sm font-medium text-[#f5ede0]">
                  {review.author}
                </p>
                <p className="font-body text-xs text-[#a89070] mt-0.5 tracking-wide">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
