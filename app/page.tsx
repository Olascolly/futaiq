export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 glass sticky top-0 z-50">
        <h1 className="text-2xl font-bold gradient-text">FUTA IQ</h1>
        <div className="flex gap-3">
          <a href="/login" className="px-4 py-2 text-sm text-white border border-white/20 rounded-lg hover:bg-white/10 transition">
            Login
          </a>
          <a href="/register" className="px-4 py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="inline-block px-4 py-1 mb-6 text-xs text-primary-400 border border-primary-400/30 rounded-full bg-primary-400/10">
          Built for FUTA Students 🎓
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Study Smarter with{' '}
          <span className="gradient-text">FUTA IQ</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          Practice past questions, take mock CBT tests, battle friends, and boost your CGPA — all in one platform.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <a href="/register" className="px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition glow">
            Start Free
          </a>
          <a href="/login" className="px-8 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition">
            Login
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-white mb-12">Everything you need to excel</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '📝', title: 'Mock CBT Tests', desc: 'Simulate real FUTA exam conditions with timed tests.' },
            { icon: '📚', title: 'Past Questions', desc: 'Access years of past questions across all your courses.' },
            { icon: '⚔️', title: 'Quiz Battle', desc: 'Challenge your friends and see who scores higher.' },
            { icon: '📊', title: 'CGPA Calculator', desc: 'Calculate and track your GPA every semester.' },
            { icon: '🏆', title: 'Leaderboard', desc: 'Compete with other FUTA students nationwide.' },
            { icon: '🤖', title: 'AI Study Assistant', desc: 'Get instant explanations for any question.' },
          ].map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 hover:glow transition">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="text-white font-semibold mb-2">{f.title}</h4>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        © 2026 FUTA IQ. Built for FUTA students, by FUTA students.
      </footer>
    </main>
  )
          }
