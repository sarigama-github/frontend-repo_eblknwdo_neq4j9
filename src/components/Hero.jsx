import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Overlay gradients for casino neon vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,rgba(0,255,204,0.25),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs text-white/80 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Tournaments
        </div>
        <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight text-white">
          Predict The Next Crypto Move
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-white/80">
          Join high-energy, timeboxed tournaments. Pick up or down, lock your confidence, and climb the leaderboard.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#tournaments" className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 text-black font-semibold shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-105 transition-transform">
            Enter a Tournament
          </a>
          <a href="#create" className="px-6 py-3 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 transition">
            Create Your Own
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
