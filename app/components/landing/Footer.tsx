const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "#", label: "Help Center" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/articles", label: "Articles" },
      { href: "/chat", label: "Community" },
      { href: "/download", label: "Download App" },
    ],
  },
];

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9A12.13 12.13 0 0 1 3.1 4.9a4.28 4.28 0 0 0 1.32 5.71 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.19 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.59 8.59 0 0 1 2 19.54a12.08 12.08 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.72 8.72 0 0 0 22.46 6z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="more" className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex items-center gap-2 mb-4 select-none">
              <img src="/logo-mamaconnect.png" alt="MamaConnect" className="w-8 h-8 object-contain" />
              <span className="font-bold text-xl text-white tracking-tight">
                Mama<span className="text-[#F46A6A]">Connect</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Supporting mothers through every step of their pregnancy journey
              with personalised care and a warm community.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#F46A6A] hover:text-white transition-colors duration-200" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#F46A6A] hover:text-white transition-colors duration-200" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#F46A6A] hover:text-white transition-colors duration-200" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-gray-800 mb-8" />

        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} MamaConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
