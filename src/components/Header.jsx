import { Leaf, Presentation } from 'lucide-react'

export default function Header({ onHome, onPresent }) {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onHome}
        className="group flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        aria-label="Volver al inicio"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-glow transition-transform duration-300 group-hover:rotate-12">
          <Leaf className="h-5 w-5 text-slate-950" strokeWidth={2.5} />
        </span>
        <span className="text-lg font-extrabold tracking-tight">
          Eco<span className="text-gradient">Pulse</span>
        </span>
      </button>

      <button type="button" onClick={onPresent} className="btn-ghost px-4 py-2.5 text-sm">
        <Presentation className="h-4 w-4" />
        <span className="hidden sm:inline">Modo presentación</span>
      </button>
    </header>
  )
}
