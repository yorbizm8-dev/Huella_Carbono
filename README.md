# 🌱 EcoPulse · Calculadora de Huella de Carbono

Calculadora interactiva de huella de carbono diseñada para **romper el hielo en presentaciones en vivo**.
La audiencia escanea un QR, responde 8 preguntas en 4 pasos y obtiene su huella en toneladas de CO₂ al año,
una comparativa global y recomendaciones personalizadas.

**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · lucide-react · qrcode.react

## ✨ Funcionalidades

- **Bienvenida** con hero animado y llamada a la acción.
- **Cuestionario de 4 pasos** (Transporte, Alimentación, Energía en casa, Residuos) con barra e indicador de progreso.
- **Resultados**: puntaje animado en t CO₂e, barra semáforo (verde / amarillo / rojo), marcadores de referencia,
  desglose por categoría y equivalente en árboles.
- **Comparativa global** frente a la meta de París, promedio mundial, UE y EE. UU.
- **Recomendaciones personalizadas**, ordenadas por el ahorro potencial de cada hábito.
- **Modo Presentación**: modal con código QR real de la URL actual, botón para copiar el enlace y pantalla completa.
  Atajo de teclado: **P** para abrir/cerrar, **Esc** para cerrar.

## 🚀 Ejecutar en local

Requiere [Node.js 18+](https://nodejs.org/).

```bash
npm install
npm run dev
```

Abre <http://localhost:5173>. Como el servidor usa `--host`, también verás una URL de red (ej. `http://192.168.x.x:5173`)
que puedes abrir desde el celular si está en la misma Wi‑Fi.

| Script            | Descripción                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en caliente |
| `npm run build`   | Build de producción en `dist/`                |
| `npm run preview` | Sirve el build de producción localmente       |

## ☁️ Subir a GitHub y desplegar en Vercel

```bash
git init
git add .
git commit -m "feat: EcoPulse carbon footprint calculator"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/ecopulse-calculator.git
git push -u origin main
```

1. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio.
2. Vercel detecta Vite automáticamente (también está definido en `vercel.json`). Pulsa **Deploy**.
3. Cada `git push` a `main` redepliega la app.

### URL personalizada para el QR (opcional)

Por defecto el QR apunta a la URL actual del navegador. Si quieres fijar otra (por ejemplo, un dominio propio),
crea la variable de entorno `VITE_PUBLIC_URL` en Vercel (*Settings → Environment Variables*) o en un archivo `.env`
local (ver `.env.example`).

## 📁 Estructura

```
ecopulse-calculator/
├── public/favicon.svg
├── src/
│   ├── components/
│   │   ├── Background.jsx         # Gradientes animados de fondo
│   │   ├── Header.jsx
│   │   ├── Welcome.jsx            # Pantalla de bienvenida
│   │   ├── Quiz.jsx               # Cuestionario por pasos
│   │   ├── ProgressSteps.jsx      # Indicador de progreso
│   │   ├── OptionCard.jsx
│   │   ├── Results.jsx            # Pantalla de resultados
│   │   ├── ScoreBar.jsx           # Barra semáforo
│   │   ├── GlobalComparison.jsx
│   │   ├── Recommendations.jsx
│   │   └── PresentationModal.jsx  # QR + copiar enlace
│   ├── data/questions.js          # Preguntas, factores de emisión y referencias
│   ├── hooks/useCountUp.js
│   ├── lib/footprint.js           # Cálculo, niveles y recomendaciones
│   ├── lib/share.js               # URL compartida y portapapeles
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## 🧮 Metodología

Los factores de emisión en `src/data/questions.js` son **estimaciones simplificadas** con fines divulgativos,
inspiradas en datos de Our World in Data y el Global Carbon Project. Ajusta los valores `value` (t CO₂e/año)
para adaptarlos a tu país o audiencia.

- **Verde** < 4 t · **Amarillo** 4–8 t · **Rojo** > 8 t
