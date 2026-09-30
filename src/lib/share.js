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
    // Respaldo para navegadores o contextos sin Clipboard API (HTTP, iframes).
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  }
}
