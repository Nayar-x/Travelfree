// 2. Signup / Login Page → Email/Google authentication.

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#AE75DA] via-[#E9E294] to-[#FFFCB8] text-black px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#9112BC] via-[#AE75DA] to-[#E9E294] bg-clip-text text-transparent">
          Welcome to Travelfree
        </h1>
        
        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9112BC] shadow-sm"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9112BC] shadow-sm"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#9112BC] text-white font-semibold hover:bg-[#AE75DA] hover:scale-105 transition transform shadow-md"
          >
            Sign Up / Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <hr className="flex-1 border-black/40" />
          <span className="text-sm font-medium">OR</span>
          <hr className="flex-1 border-black/40" />
        </div>

        {/* Google Auth Button (UI only) */}
        <button className="w-full py-3 rounded-xl bg-white border border-black font-medium hover:bg-[#AE75DA] hover:text-white hover:scale-105 transition transform shadow-md">
          Continue with Google
        </button>
      </div>
    </main>
  )
}
