import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function PredictionPanel() {
  const [tournaments, setTournaments] = useState([])
  const [form, setForm] = useState({ tournament_id: '', user_name: '', direction: 'up', confidence: 60 })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`${BACKEND}/api/tournaments`)
        const data = await r.json()
        setTournaments(data)
        if (data.length && !form.tournament_id) setForm((f)=>({...f, tournament_id: data[0].id}))
      } catch (e) { console.error(e) }
    }
    load()
  }, [])

  const update = (k,v)=> setForm((f)=>({...f,[k]: v}))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const res = await fetch(`${BACKEND}/api/predictions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      setStatus(`Prediction locked (#${data.id})`)
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_10%_50%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
          <h3 className="text-2xl font-bold text-white">Make a Prediction</h3>
          <p className="text-white/70 mt-1">Choose a tournament, call the move, set your confidence.</p>
          <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm text-white/70">Tournament</label>
              <select value={form.tournament_id} onChange={(e)=>update('tournament_id', e.target.value)} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white">
                {tournaments.map(t => <option key={t.id} value={t.id}>{t.title} • {t.symbol}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-white/70">Your Name</label>
              <input value={form.user_name} onChange={(e)=>update('user_name', e.target.value)} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white" placeholder="Satoshi" required />
            </div>
            <div>
              <label className="text-sm text-white/70">Direction</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {['up','down'].map(dir => (
                  <button key={dir} type="button" onClick={()=>update('direction', dir)} className={`px-3 py-2 rounded-lg border ${form.direction===dir? 'bg-emerald-400 text-black border-transparent' : 'bg-black/40 text-white border-white/10'}`}>{dir.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Confidence: {form.confidence}%</label>
              <input type="range" min="1" max="100" value={form.confidence} onChange={(e)=>update('confidence', Number(e.target.value))} className="w-full" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 text-black font-semibold shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-105 transition-transform" type="submit">Lock It In</button>
              <div className="text-white/80 text-sm">{status}</div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PredictionPanel
