function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.48c-.36-.17-.6-.52-.6-.92V1.44c0-.4.24-.75.6-.93l11.18 11.49L3.18 23.48zm1.4.96l12.24-7.07-2.72-2.8-9.52 9.87zm15.38-11.61l-3.22-1.86-3.02 3.1 3.02 3.03 3.22-1.86c.6-.35.6-1.06 0-1.41zM4.58.56l9.52 9.87 2.72-2.8L4.58.56z" />
    </svg>
  );
}

export default function DownloadSection() {
  return (
    <section id="download" className="relative bg-white py-16 sm:py-20 overflow-hidden">
      {/* Subtle decorative blob */}
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-rose-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#F46A6A] bg-rose-50 px-3 py-1 rounded-full mb-3">
              Mobile App
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Take MamaConnect Everywhere
            </h2>
            <p className="text-gray-500 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
              Download our mobile app and keep tracking your pregnancy on the go.
              Available on iOS and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2.5 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <AppleIcon />
                <div className="text-left leading-tight">
                  <p className="text-[10px] font-normal opacity-80">Download on the</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2.5 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <PlayStoreIcon />
                <div className="text-left leading-tight">
                  <p className="text-[10px] font-normal opacity-80">Get it on</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-56 sm:w-64">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-200 p-3">
                <div className="bg-rose-50 rounded-4xl overflow-hidden">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-5 py-2 bg-white/60">
                    <span className="text-[10px] font-medium text-gray-500">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-3.5 h-2 bg-gray-400 rounded-sm" />
                      <div className="w-1.5 h-2 bg-gray-400 rounded-sm" />
                    </div>
                  </div>
                  {/* App mockup */}
                  <div className="px-4 py-4 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="/logo-mamaconnect.png" alt="MamaConnect" className="w-5 h-5 object-contain" />
                      <span className="text-xs font-bold text-gray-900">MamaConnect</span>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm space-y-2">
                      <div className="h-2 bg-[#F46A6A]/20 rounded-full w-full" />
                      <div className="h-2 bg-[#F46A6A]/40 rounded-full w-3/4" />
                      <div className="h-2 bg-[#F46A6A]/60 rounded-full w-1/2" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-xl p-2 shadow-sm text-center">
                        <p className="text-lg">📅</p>
                        <p className="text-[9px] text-gray-500 mt-1">Schedule</p>
                      </div>
                      <div className="bg-white rounded-xl p-2 shadow-sm text-center">
                        <p className="text-lg">💬</p>
                        <p className="text-[9px] text-gray-500 mt-1">Chat</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-2.5 shadow-sm">
                      <p className="text-[9px] text-gray-400">Quick Note</p>
                      <p className="text-[10px] text-gray-600 mt-0.5">Feeling great today!</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow */}
              <div className="absolute -inset-4 bg-[#F46A6A]/8 rounded-[3rem] blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
