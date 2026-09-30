import { ArrowRight, Leaf, QrCode, Sparkles } from 'lucide-react'
import { STEPS, TOTAL_QUESTIONS } from '../data/questions'

export default function Welcome({ onStart, onPresent }) {
  return (
    <section className="grid items-center gap-12 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
      <div className="text-center lg:text-left">
        <span className="eyebrow animate-fade-up">
          <Sparkles className="h-3.5 w-3.5" /> Rompehielos interactivo · 2 min
        </span>

        <h1
          className="mt-6 animate-fade-up text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ animationDelay: '0.1s' }}
        >
          ¿Cuánto pesa tu <span className="text-gradient">huella</span> en el planeta?
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-300 lg:mx-0"
          style={{ animationDelay: '0.2s' }}
        >
          Responde {TOTAL_QUESTIONS} preguntas rápidas sobre tu día a día y descubre tus toneladas de CO₂ al año,
          cómo te comparas con el mundo y qué puedes cambiar desde hoy.
        </p>

        <div
          className="mt-9 flex animate-fade-up flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          style={{ animationDelay: '0.3s' }}
        >
          <button type="button" onClick={onStart} className="btn-primary group w-full px-8 py-4 text-lg sm:w-auto">
            Calcular mi huella
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button type="button" onClick={onPresent} className="btn-ghost w-full px-6 py-4 sm:w-auto">
            <QrCode className="h-5 w-5" /> Compartir con la audiencia
          </button>
        </div>

        <ul
          className="mt-10 flex animate-fade-up flex-wrap justify-center gap-3 lg:justify-start"
          style={{ animationDelay: '0.4s' }}
        >
          {STEPS.map(({ id, title, icon: Icon }) => (
            <li key={id} className="glass-soft flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300">
              <Icon className="h-4 w-4 text-emerald-300" /> {title}
            </li>
          ))}
        </ul>
      </div>

      <HeroOrb />
    </section>
  )
}

function HeroOrb() {
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-md animate-scale-in sm:block" style={{ animationDelay: '0.2s' }}>
      <div className="absolute inset-8 rounded-full border border-emerald-400/30 animate-ring" />
      <div className="absolute inset-8 rounded-full border border-emerald-400/30 animate-ring" style={{ animationDelay: '1s' }} />
      <div className="absolute inset-8 rounded-full border border-emerald-400/30 animate-ring" style={{ animationDelay: '2s' }} />

      <div className="absolute inset-12 grid animate-float place-items-center rounded-full bg-gradient-to-br from-emerald-400/25 via-teal-500/10 to-slate-900/40 shadow-glow-lg backdrop-blur-xl">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="text-center">
          <Leaf className="mx-auto h-20 w-20 text-emerald-300 drop-shadow-[0_0_24px_rgba(52,211,153,0.8)]" strokeWidth={1.5} />
          <p className="mt-4 text-5xl font-extrabold tracking-tight">4.7 t</p>
          <p className="mt-1 text-sm font-medium text-slate-400">CO₂ promedio por persona / año</p>
        </div>
      </div>

      <FloatingChip className="left-0 top-10" delay="0s" label="🚲 Movilidad" />
      <FloatingChip className="right-0 top-24" delay="-2s" label="🥗 Comida" />
      <FloatingChip className="bottom-16 left-4" delay="-4s" label="☀️ Energía" />
      <FloatingChip className="bottom-6 right-6" delay="-3s" label="♻️ Residuos" />
    </div>
  )
}

function FloatingChip({ className, delay, label }) {
  return (
    <span
      className={`glass-soft absolute animate-float px-4 py-2 text-sm font-semibold text-slate-200 shadow-glass ${className}`}
      style={{ animationDelay: delay }}
    >
      {label}
    </span>
  )
}
