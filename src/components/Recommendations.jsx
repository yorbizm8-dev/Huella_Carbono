import { Lightbulb, PartyPopper, TrendingDown } from 'lucide-react'
import { formatTons, getImpactLabel } from '../lib/footprint'

export default function Recommendations({ items }) {
  const totalSavings = items.reduce((sum, item) => sum + item.savings, 0)

  return (
    <div className="glass animate-fade-up p-6 sm:p-8" style={{ animationDelay: '0.3s' }}>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow">
            <Lightbulb className="h-3.5 w-3.5" /> Plan de acción
          </span>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">Recomendaciones para ti</h3>
          <p className="mt-1 text-slate-400">Basadas en tus respuestas, ordenadas por su impacto.</p>
        </div>
        {items.length > 0 && (
          <div className="glass-soft flex items-center gap-3 px-5 py-3">
            <TrendingDown className="h-6 w-6 text-emerald-300" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ahorro potencial</p>
              <p className="text-xl font-extrabold text-emerald-300 tabular-nums">−{formatTons(totalSavings)} t/año</p>
            </div>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-emerald-400/10 p-8 text-center">
          <PartyPopper className="h-10 w-10 text-emerald-300" />
          <p className="text-lg font-bold">¡Tus hábitos ya son ejemplares!</p>
          <p className="max-w-md text-slate-300">Ahora el reto es contagiar a tu entorno: comparte esta calculadora y sé agente de cambio.</p>
        </div>
      ) : (
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item, i) => {
            const impact = getImpactLabel(item.savings)
            return (
              <li
                key={item.id}
                className="glass-soft group flex animate-fade-up gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30"
                style={{ animationDelay: `${0.4 + i * 0.08}s` }}
              >
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${item.accent}`}>
                  <item.icon className="h-6 w-6 text-slate-950" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{item.category}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${impact.className}`}>{impact.label}</span>
                  </div>
                  <h4 className="mt-1 font-bold text-white">{item.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.body}</p>
                  <p className="mt-2 text-sm font-bold text-emerald-300">Ahorra hasta −{formatTons(item.savings)} t CO₂/año</p>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
