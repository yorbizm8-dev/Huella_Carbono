import { STEPS } from '../data/questions'

/** Valor máximo de la escala visual (t CO₂/año). */
export const SCALE_MAX = 16

/** Kg de CO₂ que absorbe un árbol adulto al año (aprox.). */
const KG_PER_TREE = 22

const findOption = (question, answers) => question.options.find((o) => o.id === answers[question.id])

export function calculateFootprint(answers) {
  const byCategory = STEPS.map((step) => ({
    id: step.id,
    title: step.title,
    icon: step.icon,
    accent: step.accent,
    total: step.questions.reduce((sum, q) => sum + (findOption(q, answers)?.value ?? 0), 0),
  }))
  const total = byCategory.reduce((sum, c) => sum + c.total, 0)

  return {
    total,
    byCategory,
    trees: Math.round((total * 1000) / KG_PER_TREE),
  }
}

export function getLevel(total) {
  if (total < 4) {
    return {
      id: 'low',
      label: 'Bajo impacto',
      message: 'Estás por debajo del promedio mundial. ¡Eres parte de la solución!',
      text: 'text-emerald-300',
      bg: 'bg-emerald-400',
      ring: 'ring-emerald-400/40',
      glow: 'shadow-[0_0_60px_-10px_rgba(52,211,153,0.7)]',
    }
  }
  if (total < 8) {
    return {
      id: 'medium',
      label: 'Impacto moderado',
      message: 'Vas por buen camino, pero hay margen para bajar tu huella.',
      text: 'text-yellow-300',
      bg: 'bg-yellow-400',
      ring: 'ring-yellow-400/40',
      glow: 'shadow-[0_0_60px_-10px_rgba(250,204,21,0.6)]',
    }
  }
  return {
    id: 'high',
    label: 'Impacto alto',
    message: 'Tu huella supera ampliamente el promedio global. ¡Pequeños cambios suman mucho!',
    text: 'text-red-300',
    bg: 'bg-red-500',
    ring: 'ring-red-400/40',
    glow: 'shadow-[0_0_60px_-10px_rgba(239,68,68,0.6)]',
  }
}

/** Recomendaciones ordenadas por el ahorro potencial respecto a la mejor opción. */
export function getRecommendations(answers, limit = 5) {
  return STEPS.flatMap((step) =>
    step.questions.map((question) => {
      const chosen = findOption(question, answers)
      if (!chosen) return null

      const best = Math.min(...question.options.map((o) => o.value))
      const savings = chosen.value - best
      if (savings < 0.1) return null

      return {
        id: question.id,
        category: step.title,
        icon: step.icon,
        accent: step.accent,
        title: question.tip.title,
        body: chosen.tip ?? question.tip.body,
        savings,
      }
    }),
  )
    .filter(Boolean)
    .sort((a, b) => b.savings - a.savings)
    .slice(0, limit)
}

export function getImpactLabel(savings) {
  if (savings >= 1) return { label: 'Impacto alto', className: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30' }
  if (savings >= 0.4) return { label: 'Impacto medio', className: 'bg-teal-400/15 text-teal-300 border-teal-400/30' }
  return { label: 'Impacto bajo', className: 'bg-slate-400/10 text-slate-300 border-slate-400/20' }
}

export const formatTons = (value, digits = 1) =>
  value.toLocaleString('es', { minimumFractionDigits: digits, maximumFractionDigits: digits })
