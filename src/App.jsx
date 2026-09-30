import { useCallback, useEffect, useState } from 'react'
import Background from './components/Background'
import Header from './components/Header'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'
import Results from './components/Results'
import PresentationModal from './components/PresentationModal'

export default function App() {
  const [screen, setScreen] = useState('welcome') // 'welcome' | 'quiz' | 'results'
  const [answers, setAnswers] = useState({})
  const [presenting, setPresenting] = useState(false)

  const openPresentation = useCallback(() => setPresenting(true), [])

  // Atajo de teclado: "P" abre/cierra el Modo Presentación.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'p' || e.key === 'P') setPresenting((open) => !open)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [screen])

  const restart = () => {
    setAnswers({})
    setScreen('welcome')
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Header onHome={restart} onPresent={openPresentation} />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {screen === 'welcome' && <Welcome onStart={() => setScreen('quiz')} onPresent={openPresentation} />}
        {screen === 'quiz' && (
          <Quiz
            answers={answers}
            onAnswer={(questionId, optionId) => setAnswers((prev) => ({ ...prev, [questionId]: optionId }))}
            onExit={() => setScreen('welcome')}
            onFinish={() => setScreen('results')}
          />
        )}
        {screen === 'results' && <Results answers={answers} onRestart={restart} onPresent={openPresentation} />}
      </main>

      <footer className="relative z-10 pb-8 text-center text-xs text-slate-500">
        Estimaciones aproximadas con fines divulgativos · Presiona <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-semibold text-slate-300">P</kbd> para el Modo Presentación
      </footer>

      <PresentationModal open={presenting} onClose={() => setPresenting(false)} />
    </div>
  )
}
