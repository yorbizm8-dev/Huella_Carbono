import { Check } from 'lucide-react'

export default function OptionCard({ name, option, selected, onSelect }) {
  return (
    <label
      className={`group relative flex cursor-pointer flex-col gap-2 rounded-2xl border p-5 transition-all duration-300 ${
        selected
          ? 'border-emerald-400/70 bg-emerald-400/10 shadow-glow'
          : 'border-white/10 bg-white/[0.03] hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.06]'
      } has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-300`}
    >
      <input type="radio" name={name} value={option.id} checked={selected} onChange={onSelect} className="sr-only" />

      <span
        className={`absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full border transition-all duration-300 ${
          selected ? 'scale-100 border-emerald-400 bg-emerald-400 text-slate-950' : 'scale-90 border-white/20 text-transparent'
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
      </span>

      <span className="text-3xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
        {option.emoji}
      </span>
      <span className="font-bold text-slate-100">{option.label}</span>
      <span className="text-sm leading-snug text-slate-400">{option.hint}</span>
    </label>
  )
}
