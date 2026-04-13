import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-20 left-20 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo and Title */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-50"></div>
              <div className="relative w-24 h-24 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-5xl">🎲</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-4 bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient">
            LUDO
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            The Classic Board Game
          </p>
        </div>

        {/* Game mode buttons */}
        <div className="flex flex-wrap justify-between gap-6 w-full animate-slide-up">
          {/* Local Multiplayer */}
          <Link 
            href="/local" 
            className="group relative flex-1 min-w-100"
          >
            <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-full bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-300 border border-white/20">
              <div className="flex flex-col items-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-2">Local</h2>
                <p className="text-white/80 text-center">Play with friends on the same device</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">2-4 Players</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Online Multiplayer */}
          <Link 
            href="/online" 
            className="group relative flex-1 min-w-100"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-full bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-300 border border-white/20">
              <div className="flex flex-col items-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-2">Online</h2>
                <p className="text-white/80 text-center">Play with players worldwide</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Coming Soon</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Computer */}
          <Link 
            href="/computer" 
            className="group relative flex-1 min-w-100"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-full bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-300 border border-white/20">
              <div className="flex flex-col items-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-2">Computer</h2>
                <p className="text-white/80 text-center">Play against AI opponents</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Coming Soon</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features section */}
        <div className="mt-10 flex flex-wrap gap-6 w-full justify-evenly animate-fade-in-up">
          <div className="text-center text-white/70">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold mb-1">Multiple Modes</h3>
            <p className="text-sm text-white/50">Local, online & AI opponents</p>
          </div>
          <div className="text-center text-white/70">
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="font-semibold mb-1">Beautiful Design</h3>
            <p className="text-sm text-white/50">Modern & responsive interface</p>
          </div>
          <div className="text-center text-white/70">
            <div className="text-2xl mb-2">🏆</div>
            <h3 className="font-semibold mb-1">Fair Play</h3>
            <p className="text-sm text-white/50">Classic rules & balanced gameplay</p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 mt-3 text-white/30 text-sm">
          © 2024 Ludo Game • All rights reserved
        </div>
      </div>
    </div>
  );
}