import { useMemo } from 'react'
import { Presentation, RotateCcw, TreePine } from 'lucide-react'
import { calculateFootprint, formatTons, getLevel, getRecommendations } from '../lib/footprint'
import { useCountUp } from '../hooks/useCountUp'
import ScoreBar from './ScoreBar'
import GlobalComparison from './GlobalComparison'
import Recommendations from './Recommendations'

export default function Results({ answers, onRestart, onPresent }) {
  const { total, byCategory, trees } = useMemo(() => calculateFootprint(answers), [answers])
  const level = getLevel(total)
  const recommendations = useMemo(() => getRecommendations(answers), [answers])
  const animatedTotal = useCountUp(total)

  return (
    <section className="space-y-8 py-4">
      {/* Puntaje principal */}
      <div className="glass relative animate-fade-up overflow-hidden p-6 text-center sm:p-12">
        <div className={`pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full ${level.bg} opacity-20 blur-[100px]`} />

        <span className="eyebrow">Tu huella de carbono anual</span>

        <p className="mt-6 flex items-baseline justify-center gap-3" aria-live="polite">
          <span className={`text-7xl font-extrabold tabular-nums tracking-tight sm:text-8xl lg:text-9xl ${level.text}`}>
            {formatTons(animatedTotal)}
          </span>
          <span className="text-xl font-bold text-slate-400 sm:text-2xl">t CO₂e</span>
        </p>

        <span className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold ring-1 ${level.ring} ${level.text} bg-white/5`}>
          <span className={`h-2.5 w-2.5 rounded-full ${level.bg}`} /> {level.label}
        </span>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">{level.message}</p>

        <ScoreBar total={total} />

        <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-3 text-left text-sm text-slate-300">
          <TreePine className="h-8 w-8 shrink-0 text-emerald-300" />
          <span>
            Se necesitarían <strong className="text-white">{trees.toLocaleString('es')} árboles</strong> creciendo durante un año
            para absorber tus emisiones.
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <GlobalComparison total={total} level={level} />

        {/* Desglose por categoría */}
        <div className="glass animate-fade-up p-6 sm:p-8" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-extrabold tracking-tight">¿De dónde viene tu huella?</h3>
          <p className="mt-1 text-sm text-slate-400">Distribución por categoría</p>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {byCategory.map((c) => {
              const share = total > 0 ? Math.round((c.total / total) * 100) : 0
              return (
                <li key={c.id} className="glass-soft p-4">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${c.accent}`}>
                    <c.icon className="h-5 w-5 text-slate-950" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-slate-400">{c.title}</p>
                  <p className="text-2xl font-extrabold tabular-nums">
                    {formatTons(c.total)} <span className="text-sm font-semibold text-slate-500">t</span>
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full bg-gradient-to-r ${c.accent}`} style={{ width: `${share}%` }} />
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{share}% del total</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <Recommendations items={recommendations} />

      <div className="flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '0.4s' }}>
        <button type="button" onClick={onRestart} className="btn-ghost w-full sm:w-auto">
          <RotateCcw className="h-5 w-5" /> Volver a calcular
        </button>
        <button type="button" onClick={onPresent} className="btn-primary w-full sm:w-auto">
          <Presentation className="h-5 w-5" /> Invitar a la audiencia
        </button>
      </div>
    </section>
  )
}
