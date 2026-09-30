import { Car, Utensils, Zap, Recycle } from 'lucide-react'

/**
 * Cada opción tiene un `value` en toneladas de CO2e por año (estimaciones
 * aproximadas y simplificadas para fines divulgativos).
 * `tip` en una opción sobreescribe el consejo general de la pregunta.
 */
export const STEPS = [
  {
    id: 'transport',
    title: 'Transporte',
    tagline: '¿Cómo te mueves por el mundo?',
    icon: Car,
    accent: 'from-emerald-400 to-teal-500',
    questions: [
      {
        id: 'commute',
        label: '¿Cuál es tu medio de transporte principal?',
        tip: {
          title: 'Cambia tu forma de moverte',
          body: 'Reemplaza 2 o 3 trayectos semanales en auto por transporte público, bicicleta o caminata.',
        },
        options: [
          {
            id: 'car',
            emoji: '🚗',
            label: 'Auto propio',
            hint: 'Casi siempre manejo',
            value: 3.2,
            tip: 'Compartir auto o combinarlo con transporte público puede reducir tus emisiones de movilidad a la mitad.',
          },
          {
            id: 'mixed',
            emoji: '🚕',
            label: 'Mixto',
            hint: 'Auto compartido, taxi o híbrido',
            value: 1.6,
          },
          {
            id: 'public',
            emoji: '🚌',
            label: 'Transporte público',
            hint: 'Bus, metro o tren',
            value: 0.7,
            tip: 'Para trayectos cortos (< 3 km), la bici o caminar son cero emisiones y suman salud.',
          },
          {
            id: 'active',
            emoji: '🚲',
            label: 'Bici o a pie',
            hint: 'Movilidad activa',
            value: 0.05,
          },
        ],
      },
      {
        id: 'flights',
        label: '¿Cuántos vuelos tomas al año?',
        tip: {
          title: 'Vuela menos, vuela mejor',
          body: 'Agrupa viajes, elige vuelos directos en clase económica y prefiere el tren o bus en distancias cortas.',
        },
        options: [
          { id: 'none', emoji: '🏡', label: 'Ninguno', hint: 'Prefiero quedarme en tierra', value: 0 },
          { id: 'few', emoji: '✈️', label: '1 a 2 vuelos', hint: 'Trayectos cortos', value: 0.5 },
          { id: 'some', emoji: '🧳', label: '3 a 5 vuelos', hint: 'Algunos internacionales', value: 1.5 },
          {
            id: 'frequent',
            emoji: '🌍',
            label: 'Frecuentes',
            hint: 'Varios de larga distancia',
            value: 3.5,
            tip: 'Un solo vuelo de ida y vuelta transatlántico emite ~1.6 t de CO₂. Sustituir uno por una videollamada es un gran ahorro.',
          },
        ],
      },
    ],
  },
  {
    id: 'food',
    title: 'Alimentación',
    tagline: 'Lo que llega a tu plato también cuenta.',
    icon: Utensils,
    accent: 'from-lime-400 to-emerald-500',
    questions: [
      {
        id: 'diet',
        label: '¿Cómo describirías tu dieta?',
        tip: {
          title: 'Más plantas en tu plato',
          body: 'Prueba “lunes sin carne” y sustituye la carne roja por legumbres, huevo o pollo algunos días.',
        },
        options: [
          {
            id: 'meat',
            emoji: '🥩',
            label: 'Mucha carne',
            hint: 'Carne roja casi a diario',
            value: 3.3,
            tip: 'La carne de res emite hasta 10 veces más que el pollo. Reducirla a 2 veces por semana marca una gran diferencia.',
          },
          { id: 'omnivore', emoji: '🍗', label: 'Omnívora', hint: 'Carne algunas veces', value: 2.5 },
          { id: 'vegetarian', emoji: '🥗', label: 'Vegetariana', hint: 'Sin carne, con lácteos', value: 1.7 },
          { id: 'vegan', emoji: '🌱', label: 'Vegana', hint: '100% vegetal', value: 1.3 },
        ],
      },
      {
        id: 'sourcing',
        label: '¿De dónde vienen tus alimentos?',
        tip: {
          title: 'Compra local y de temporada',
          body: 'Los mercados locales reducen transporte y empaques. Planifica menús para no desperdiciar comida.',
        },
        options: [
          { id: 'processed', emoji: '📦', label: 'Procesados', hint: 'Ultraprocesados o importados', value: 0.6 },
          { id: 'mixed', emoji: '🛒', label: 'Supermercado', hint: 'Una mezcla de todo', value: 0.35 },
          { id: 'local', emoji: '🧺', label: 'Local y de temporada', hint: 'Mercados y productores', value: 0.15 },
        ],
      },
    ],
  },
  {
    id: 'energy',
    title: 'Energía en casa',
    tagline: 'La electricidad invisible que usamos cada día.',
    icon: Zap,
    accent: 'from-teal-400 to-cyan-500',
    questions: [
      {
        id: 'source',
        label: '¿De dónde viene la energía de tu hogar?',
        tip: {
          title: 'Pásate a energía limpia',
          body: 'Consulta tarifas verdes con tu proveedor o evalúa paneles solares si tu vivienda lo permite.',
        },
        options: [
          { id: 'fossil', emoji: '🏭', label: 'Red convencional', hint: 'Principalmente fósil', value: 2.4 },
          { id: 'mixed', emoji: '🔌', label: 'Mixta', hint: 'Red con algo de renovables', value: 1.6 },
          { id: 'partial', emoji: '🌤️', label: 'Parcialmente renovable', hint: 'Algún panel o tarifa verde', value: 0.8 },
          { id: 'renewable', emoji: '☀️', label: '100% renovable', hint: 'Solar, eólica o hidro', value: 0.2 },
        ],
      },
      {
        id: 'usage',
        label: '¿Cómo es tu consumo de energía?',
        tip: {
          title: 'Eficiencia en casa',
          body: 'Cambia a LED, desconecta aparatos en standby y ajusta el aire acondicionado 1–2 °C.',
        },
        options: [
          {
            id: 'high',
            emoji: '🔥',
            label: 'Alto',
            hint: 'Aire/calefacción constante',
            value: 1.2,
            tip: 'Climatizar a 24 °C en verano (y 20 °C en invierno) puede recortar hasta un 20% del consumo.',
          },
          { id: 'moderate', emoji: '💡', label: 'Moderado', hint: 'Uso normal', value: 0.6 },
          { id: 'efficient', emoji: '🍃', label: 'Eficiente', hint: 'LED, apago todo', value: 0.25 },
        ],
      },
    ],
  },
  {
    id: 'waste',
    title: 'Residuos',
    tagline: 'Todo lo que tiramos tiene una historia.',
    icon: Recycle,
    accent: 'from-cyan-400 to-emerald-500',
    questions: [
      {
        id: 'recycling',
        label: '¿Separas y reciclas tus residuos?',
        tip: {
          title: 'Separa, recicla y composta',
          body: 'Separa plástico, papel y vidrio. Compostar los restos orgánicos evita metano en los rellenos.',
        },
        options: [
          { id: 'never', emoji: '🗑️', label: 'Nunca', hint: 'Todo va al mismo tacho', value: 0.9 },
          { id: 'sometimes', emoji: '♻️', label: 'A veces', hint: 'Cuando me acuerdo', value: 0.6 },
          { id: 'always', emoji: '✅', label: 'Siempre', hint: 'Separo todo', value: 0.3 },
          { id: 'zero', emoji: '🌿', label: 'Residuo cero', hint: 'Reciclo y composto', value: 0.1 },
        ],
      },
      {
        id: 'shopping',
        label: '¿Con qué frecuencia compras cosas nuevas?',
        tip: {
          title: 'Consume con intención',
          body: 'Antes de comprar, pregúntate si lo necesitas. Reparar, alquilar o comprar de segunda mano ahorra mucho CO₂.',
        },
        options: [
          {
            id: 'frequent',
            emoji: '🛍️',
            label: 'Muy seguido',
            hint: 'Ropa y tecnología nuevas',
            value: 1.5,
            tip: 'Producir un solo jean requiere ~33 kg de CO₂. Extender la vida de tu ropa y dispositivos es clave.',
          },
          { id: 'moderate', emoji: '🧾', label: 'Moderado', hint: 'Solo lo necesario', value: 0.8 },
          { id: 'minimal', emoji: '🔁', label: 'Mínimo', hint: 'Segunda mano y reparo', value: 0.3 },
        ],
      },
    ],
  },
]

/** Referencias aproximadas de emisiones de CO₂ per cápita (t/año). */
export const BENCHMARKS = [
  { id: 'paris', label: 'Meta París 2030', short: 'París', value: 2.3 },
  { id: 'world', label: 'Promedio mundial', short: 'Mundo', value: 4.7 },
  { id: 'eu', label: 'Unión Europea', value: 6.2 },
  { id: 'usa', label: 'Estados Unidos', value: 14.3 },
]

export const TOTAL_QUESTIONS = STEPS.reduce((n, step) => n + step.questions.length, 0)
