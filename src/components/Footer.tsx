export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#c4701a20] py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <span className="font-display text-lg font-light tracking-[0.3em] text-[#f5ede0] uppercase">
              Yass Valley
            </span>
            <span className="font-body text-[0.6rem] tracking-[0.35em] text-[#a89070] uppercase">
              Electrical
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {["services", "about", "reviews", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-body text-xs text-[#a89070] hover:text-[#e8973a] transition-colors tracking-wider capitalize"
              >
                {id}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/yassvalleyelectrical/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#a89070] hover:text-[#e8973a] transition-colors duration-200"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/yassvalleyelectrical/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#a89070] hover:text-[#e8973a] transition-colors duration-200"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-[#c4701a10] pt-6">
          <p className="font-body text-xs text-center text-[#a89070]/60 tracking-wide">
            © 2025 Yass Valley Electrical · Jack Tilley · NSW &amp; ACT Licensed · ABN pending
          </p>
        </div>
      </div>
    </footer>
  )
}
