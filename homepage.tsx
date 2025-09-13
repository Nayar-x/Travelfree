// 1. Landing / Home Page → Intro, signup/login options.

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#AE75DA] via-[#E9E294] to-[#FFFCB8] text-black px-4">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center">
        {/* Header */}
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#9112BC] via-[#AE75DA] to-[#E9E294] bg-clip-text text-transparent">
          Travelfree
        </h1>
        <p className="text-lg mb-10 leading-relaxed">
          A travel community that connects travelers with hosts offering free stays.  
          Explore the world, make friends, and share cultures.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <a href="/auth">
            <button className="px-8 py-3 rounded-2xl font-semibold bg-[#9112BC] text-white hover:scale-105 hover:bg-[#AE75DA] transition transform shadow-md">
              Sign Up
            </button>
          </a>
          <a href="/auth">
            <button className="px-8 py-3 rounded-2xl font-semibold bg-[#E9E294] hover:bg-[#AE75DA] hover:text-white hover:scale-105 transition transform shadow-md">
              Login
            </button>
          </a>
        </div>
      </div>
    </main>
  )
}
