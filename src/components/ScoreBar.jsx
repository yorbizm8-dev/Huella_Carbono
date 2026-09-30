import { useEffect, useState } from 'react'
import { BENCHMARKS } from '../data/questions'
import { SCALE_MAX, formatTons } from '../lib/footprint'

const toPercent = (value) => `${Math.min(value / SCALE_MAX, 1) * 100}%`
const MARKERS = BENCHMARKS.filter((b) => b.id === 'paris' || b.id === 'world')

/** Barra semáforo (verde → amarillo → rojo) con el marcador del usuario. */
export default function ScoreBar({ total }) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="mx-auto mt-10 max-w-3xl text-left">
      <div className="relative pt-10">
        {/* Marcador del usuario */}
        <div
          className="absolute top-0 -translate-x-1/2 transition-[left] duration-[1800ms] ease-out"
          style={{ left: shown ? toPercent(total) : '0%' }}
        >
          <span className="block whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-xs font-extrabold text-slate-950 shadow-lg">
            Tú
          </span>
          <span className="mx-auto block h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-white" />
        </div>

        <div className="relative h-4 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-red-500 shadow-[0_0_30px_-6px_rgba(250,204,21,0.5)]">
          {MARKERS.map((m) => (
            <span
              key={m.id}
              className="absolute top-1/2 h-7 w-0.5 -translate-y-1/2 rounded-full bg-slate-950/70"
              style={{ left: toPercent(m.value) }}
            />
          ))}
          <span
            className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-slate-950 shadow-glow transition-[left] duration-[1800ms] ease-out"
            style={{ left: shown ? toPercent(total) : '0%' }}
          />
        </div>

        <div className="relative mt-3 h-10 text-[11px] font-semibold text-slate-400 sm:text-xs">
          {MARKERS.map((m) => (
            <span key={m.id} className="absolute -translate-x-1/2 text-center leading-tight" style={{ left: toPercent(m.value) }}>
              {m.short}
              <br />
              <span className="text-slate-500">{formatTons(m.value)} t</span>
            </span>
          ))}
        </div>

        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
          <span className="text-emerald-300">Bajo</span>
          <span className="text-yellow-300">Moderado</span>
          <span className="text-red-300">Alto · {SCALE_MAX}+ t</span>
        </div>
      </div>
    </div>
  )
}
