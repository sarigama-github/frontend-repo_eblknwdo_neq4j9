import Hero from './components/Hero'
import Tournaments from './components/Tournaments'
import CreateTournament from './components/CreateTournament'
import PredictionPanel from './components/PredictionPanel'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Neon casino gradient ribbons */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 left-[-10%] h-96 w-[120%] bg-gradient-to-r from-fuchsia-500/20 via-cyan-400/20 to-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] h-80 w-[120%] bg-gradient-to-r from-emerald-400/10 via-blue-400/10 to-fuchsia-500/10 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 via-cyan-400 to-fuchsia-400 shadow-[0_0_20px_rgba(34,197,94,0.6)]" />
          <span className="font-semibold tracking-wide">NeonPredict</span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-white/80">
          <a href="#tournaments" className="hover:text-white">Tournaments</a>
          <a href="#create" className="hover:text-white">Create</a>
          <a href="/test" className="hover:text-white">System</a>
        </nav>
      </header>

      <main className="relative z-10">
        <Hero />
        <Tournaments />
        <PredictionPanel />
        <CreateTournament />
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-white/60">
        Built for crypto degens. Play responsibly.
      </footer>
    </div>
  )
}

export default App
