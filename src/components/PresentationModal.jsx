import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { AlertTriangle, Check, Copy, Maximize2, Minimize2, Smartphone, X } from 'lucide-react'
import { copyToClipboard, getShareUrl, isLocalUrl } from '../lib/share'

export default function PresentationModal({ open, onClose }) {
  const [copied, setCopied] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const closeRef = useRef(null)
  const url = open ? getShareUrl() : ''
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement))
    window.addEventListener('keydown', onKey)
    document.addEventListener('fullscreenchange', onFullscreen)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('fullscreenchange', onFullscreen)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(id)
  }, [copied])

  if (!open) return null

  const handleCopy = async () => setCopied(await copyToClipboard(url))

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else document.documentElement.requestFullscreen?.()
  }

  return (
    <div
      className="fixed inset-0 z-50 grid animate-fade-in place-items-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-2xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="presentation-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass relative w-full max-w-4xl animate-scale-in p-6 sm:p-12">
        <div className="absolute right-4 top-4 flex gap-2">
          <button type="button" onClick={toggleFullscreen} className="btn-ghost p-2.5" aria-label="Pantalla completa">
            {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          <button ref={closeRef} type="button" onClick={onClose} className="btn-ghost p-2.5" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto">
            <div className="absolute -inset-4 animate-pulse rounded-[2rem] bg-emerald-400/30 blur-2xl" />
            <div className="relative rounded-3xl bg-white p-5 shadow-glow-lg">
              <QRCodeSVG
                value={url}
                size={260}
                level="M"
                bgColor="#ffffff"
                fgColor="#020617"
                className="h-56 w-56 sm:h-64 sm:w-64"
                imageSettings={{
                  src: '/favicon.svg',
                  height: 44,
                  width: 44,
                  excavate: true,
                }}
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <span className="eyebrow">
              <Smartphone className="h-3.5 w-3.5" /> Modo presentación
            </span>
            <h2 id="presentation-title" className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Escanea y descubre <span className="text-gradient">tu huella</span>
            </h2>
            <p className="mt-4 text-lg text-slate-300">Apunta la cámara de tu celular al código QR. Solo toma 2 minutos. 🌱</p>

            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-2 sm:flex-row sm:items-center">
              <span className="min-w-0 flex-1 truncate px-3 py-2 text-lg font-bold text-emerald-300 sm:text-xl" title={url}>
                {displayUrl}
              </span>
              <button type="button" onClick={handleCopy} className="btn-primary shrink-0 py-3" aria-live="polite">
                {copied ? (
                  <>
                    <Check className="h-5 w-5" /> ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" /> Copiar enlace
                  </>
                )}
              </button>
            </div>

            {isLocalUrl(url) && (
              <p className="mt-4 flex items-start gap-2 text-left text-sm text-yellow-300/90">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                Estás en un entorno local: despliega en Vercel (o define VITE_PUBLIC_URL) para que el QR funcione en otros dispositivos.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
