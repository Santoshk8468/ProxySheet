"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 border-b border-gray-200 shadow-sm">
      <div className="max-w-container mx-auto px-6 py-4 flex items-center justify-center">
        {/* Brand */}
        <div className="flex items-center gap-3 font-semibold tracking-wide">
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-strong text-white font-extrabold text-sm shadow-btn-primary">
            IP
          </span>
          <span className="text-text-main text-lg font-bold">Proxy Dashboard</span>
        </div>
      </div>
    </header>
  );
}
