/** URL que se comparte en el QR: variable de entorno o la URL actual sin query/hash. */
export function getShareUrl() {
  const fromEnv = import.meta.env.VITE_PUBLIC_URL
  if (fromEnv) return fromEnv
  const { origin, pathname } = window.location
  return `${origin}${pathname}`
}

export const isLocalUrl = (url) => /\/\/(localhost|127\.0\.0\.1|\[::1\]|192\.168\.|10\.)/.test(url)

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Respaldo para contextos sin Clipboard API (HTTP, iframes, Safari antiguo).
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '') // evita que iOS abra el teclado
    Object.assign(textarea.style, { position: 'fixed', top: '0', opacity: '0', fontSize: '16px' }) // 16px evita el zoom en iOS
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, text.length) // iOS ignora select() sin esto
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  }
}

/** Hoja de compartir nativa (iOS/Android). Devuelve false si no está disponible o se canceló. */
export const canNativeShare = () => typeof navigator !== 'undefined' && typeof navigator.share === 'function'

export async function nativeShare(url) {
  try {
    await navigator.share({
      title: 'EcoPulse · Calculadora de Huella de Carbono',
      text: '¿Cuánto pesa tu huella en el planeta? Descúbrelo en 2 minutos 🌱',
      url,
    })
    return true
  } catch {
    return false
  }
}

/** Pantalla completa con prefijo WebKit (iPad). El iPhone no la soporta. */
export const canFullscreen = () =>
  typeof document !== 'undefined' && Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled)

export const isFullscreen = () => Boolean(document.fullscreenElement || document.webkitFullscreenElement)

export function toggleFullscreen() {
  if (isFullscreen()) {
    ;(document.exitFullscreen || document.webkitExitFullscreen)?.call(document)
  } else {
    const el = document.documentElement
    ;(el.requestFullscreen || el.webkitRequestFullscreen)?.call(el)
  }
}
