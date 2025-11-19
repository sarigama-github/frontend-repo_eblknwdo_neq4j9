import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString()
}

function Tournaments() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`${BACKEND}/api/tournaments`)
        const data = await r.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="tournaments" className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(255,0,153,0.15),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Live & Upcoming</h2>
        <p className="text-white/70 mt-2">Pick a market, lock your call, and compete.</p>

        {loading ? (
          <div className="mt-12 text-white/70">Loading tournaments...</div>
        ) : items.length === 0 ? (
          <div className="mt-12 text-white/70">No tournaments yet. Be the first to create one below.</div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((t) => (
              <div key={t.id} className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-emerald-400/40 transition relative overflow-hidden">
                <div className="absolute -inset-px bg-gradient-to-br from-emerald-400/10 via-cyan-400/10 to-fuchsia-400/10 opacity-0 group-hover:opacity-100 transition pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70 px-2 py-1 rounded-full border border-white/10">{t.symbol}</span>
                    <span className="text-xs text-white/60">{t.status?.toUpperCase() || 'UPCOMING'}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{t.title}</h3>
                  {t.description && <p className="mt-2 text-sm text-white/70">{t.description}</p>}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/80">
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="text-white/50">Starts</div>
                      <div className="font-medium">{formatDate(t.starts_at)}</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="text-white/50">Ends</div>
                      <div className="font-medium">{formatDate(t.ends_at)}</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="text-white/50">Prize Pool</div>
                      <div className="font-medium">${t.prize_pool?.toLocaleString?.() || 0} USDT</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="text-white/50">Entry</div>
                      <div className="font-medium">{t.entry_fee ? `$${t.entry_fee}` : 'Free'}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Tournaments
