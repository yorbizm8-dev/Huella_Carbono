import { useEffect, useState } from 'react'
import { Globe2 } from 'lucide-react'
import { BENCHMARKS } from '../data/questions'
import { formatTons } from '../lib/footprint'

export default function GlobalComparison({ total, level }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setShown(true), 300)
    return () => clearTimeout(id)
  }, [])

  const rows = [{ id: 'you', label: 'Tú', value: total, isUser: true }, ...BENCHMARKS].sort((a, b) => a.value - b.value)
  const max = Math.max(...rows.map((r) => r.value))
  const world = BENCHMARKS.find((b) => b.id === 'world').value
  const diff = Math.round(((total - world) / world) * 100)

  return (
    <div className="glass animate-fade-up p-6 sm:p-8" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight">Comparativa global</h3>
          <p className="mt-1 text-sm text-slate-400">Toneladas de CO₂ per cápita al año</p>
        </div>
        <Globe2 className="h-8 w-8 shrink-0 text-emerald-300/70" />
      </div>

      <ul className="mt-6 space-y-4">
        {rows.map((row, i) => (
          <li key={row.id}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className={row.isUser ? 'font-extrabold text-white' : 'font-medium text-slate-300'}>{row.label}</span>
              <span className={`font-bold tabular-nums ${row.isUser ? level.text : 'text-slate-400'}`}>{formatTons(row.value)} t</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`h-full rounded-full transition-[width] duration-1000 ease-out ${
                  row.isUser ? `${level.bg} ${level.glow}` : 'bg-slate-500/60'
                }`}
                style={{ width: shown ? `${(row.value / max) * 100}%` : '0%', transitionDelay: `${i * 90}ms` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
        {diff <= 0 ? (
          <>
            Tu huella es <strong className="text-emerald-300">{Math.abs(diff)}% menor</strong> que el promedio mundial. 🌍
          </>
        ) : (
          <>
            Tu huella es <strong className={level.text}>{diff}% mayor</strong> que el promedio mundial.
          </>
        )}
      </p>
      <p className="mt-3 text-[11px] text-slate-500">Fuente aproximada: Our World in Data / Global Carbon Project.</p>
    </div>
  )
}
