import { useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function CreateTournament() {
  const [form, setForm] = useState({
    title: '',
    symbol: 'BTC',
    description: '',
    prize_pool: 1000,
    entry_fee: 0,
    starts_at: '',
    ends_at: ''
  })
  const [status, setStatus] = useState(null)

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Creating...')
    try {
      const res = await fetch(`${BACKEND}/api/tournaments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      setStatus(`Created tournament #${data.id}`)
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <section id="create" className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(0,255,204,0.12),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Create a Tournament</h2>
        <p className="text-white/70 mt-2">Spin up a quick market challenge.</p>

        <form onSubmit={submit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm text-white/70">Title</label>
            <input value={form.title} onChange={(e)=>update('title', e.target.value)} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-white/40" placeholder="BTC 24h Sprint" required />
          </div>
          <div>
            <label className="text-sm text-white/70">Symbol</label>
            <select value={form.symbol} onChange={(e)=>update('symbol', e.target.value)} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white">
              {['BTC','ETH','SOL','XRP','ADA'].map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-white/70">Prize Pool (USDT)</label>
            <input type="number" value={form.prize_pool} onChange={(e)=>update('prize_pool', Number(e.target.value))} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="text-sm text-white/70">Entry Fee (USDT)</label>
            <input type="number" value={form.entry_fee} onChange={(e)=>update('entry_fee', Number(e.target.value))} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="text-sm text-white/70">Starts At</label>
            <input type="datetime-local" value={form.starts_at} onChange={(e)=>update('starts_at', e.target.value)} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white" required />
          </div>
          <div>
            <label className="text-sm text-white/70">Ends At</label>
            <input type="datetime-local" value={form.ends_at} onChange={(e)=>update('ends_at', e.target.value)} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white" required />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-white/70">Description</label>
            <textarea value={form.description} onChange={(e)=>update('description', e.target.value)} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white" rows={3} placeholder="Predict if BTC closes higher in 24h." />
          </div>
          <div className="md:col-span-2 flex items-center justify-between">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 text-black font-semibold shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-105 transition-transform" type="submit">Create</button>
            <div className="text-white/80 text-sm">{status}</div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreateTournament
