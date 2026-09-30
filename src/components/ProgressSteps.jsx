import { Check } from 'lucide-react'
import { TOTAL_QUESTIONS } from '../data/questions'

export default function ProgressSteps({ steps, current, answers }) {
  const answered = Object.keys(answers).length
  const percent = Math.round((answered / TOTAL_QUESTIONS) * 100)

  return (
    <div className="animate-fade-in">
      <div className="mb-3 flex items-center justify-between text-sm font-semibold">
        <span className="text-slate-400">Tu progreso</span>
        <span className="text-emerald-300 tabular-nums">{percent}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-[length:200%_100%] animate-shimmer transition-[width] duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="mt-5 grid grid-cols-4 gap-2">
        {steps.map((step, i) => {
          const done = i < current
          const active = i === current
          return (
            <li key={step.id} className="flex flex-col items-center gap-2 text-center">
              <span
                className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-bold transition-all duration-500 ${
                  done
                    ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                    : active
                      ? 'border-emerald-400 bg-emerald-400/15 text-emerald-300 shadow-glow'
                      : 'border-white/15 bg-white/5 text-slate-500'
                }`}
              >
                {done ? <Check className="h-5 w-5" strokeWidth={3} /> : <step.icon className="h-[18px] w-[18px]" />}
              </span>
              <span className={`text-xs font-semibold sm:text-sm ${active ? 'text-white' : 'text-slate-500'}`}>{step.title}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
