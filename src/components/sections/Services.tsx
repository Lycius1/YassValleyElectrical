const services = [
  {
    title: "General Electrical",
    description:
      "Wiring, outlets, lighting circuits, fault finding and repairs. Any job, any size.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c4701a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M9 21h6M9 18h6" />
        <path d="M12 2C8.69 2 6 4.69 6 8c0 2.23 1.22 4.16 3 5.23V15h6v-1.77C16.78 12.16 18 10.23 18 8c0-3.31-2.69-6-6-6z" />
      </svg>
    ),
  },
  {
    title: "Switchboard Upgrades",
    description:
      "Safety switches, circuit breakers and full switchboard replacements to current standards.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c4701a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="8" cy="8" r="0.5" fill="#c4701a" />
        <circle cx="8" cy="12" r="0.5" fill="#c4701a" />
        <circle cx="8" cy="16" r="0.5" fill="#c4701a" />
        <line x1="12" y1="8" x2="18" y2="8" />
        <line x1="12" y1="12" x2="18" y2="12" />
        <line x1="12" y1="16" x2="18" y2="16" />
      </svg>
    ),
  },
  {
    title: "EV Charger Installation",
    description:
      "Home EV charging stations for all vehicle types. Fast, clean and code-compliant.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c4701a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Smart Home",
    description:
      "Automated lighting, data points, home theatre wiring and system integration.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c4701a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <circle cx="12" cy="7" r="0.5" fill="#c4701a" />
        <path d="M9.5 4.5a4 4 0 015 0" />
      </svg>
    ),
  },
  {
    title: "Hot Water Systems",
    description:
      "Electric and heat pump hot water installation, repair and replacement.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c4701a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
        <path d="M10 14.5a2 2 0 104 0c0-1.1-.9-2-2-3-1.1 1-2 1.9-2 3z" />
      </svg>
    ),
  },
  {
    title: "Emergency Callouts",
    description:
      "Rapid response for faults and after-hours emergencies. Call Jack — he picks up.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c4701a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section
      id="services"
      data-flame-section
      className="relative z-10 py-24 md:py-32 px-6 md:px-10"
      style={{ willChange: "opacity" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-4">What we do</p>
          <h2
            className="font-display font-light text-[#f5ede0] leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Every Job.<br />
            Done Right.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c4701a10]">
          {services.map((service) => (
            <div
              key={service.title}
              data-flame-card
              className="flame-card bg-[#1a1208] p-8 md:p-10 flex flex-col gap-5"
            >
              <div className="flex-shrink-0">{service.icon}</div>
              <div>
                <h3 className="font-display text-[1.4rem] font-light text-[#f5ede0] mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-[#a89070] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
