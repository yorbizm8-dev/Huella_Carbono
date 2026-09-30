/** Fondo decorativo: gradientes animados + cuadrícula sutil. */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0f2a24_0%,_#020617_55%)]" />

      <div className="absolute -left-32 -top-32 h-[520px] w-[520px] animate-blob rounded-full bg-emerald-500/20 blur-[120px]" />
      <div
        className="absolute -right-40 top-1/3 h-[480px] w-[480px] animate-blob rounded-full bg-teal-500/15 blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[420px] w-[420px] animate-blob rounded-full bg-slate-500/20 blur-[120px]"
        style={{ animationDelay: '-12s' }}
      />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
    </div>
  )
}
