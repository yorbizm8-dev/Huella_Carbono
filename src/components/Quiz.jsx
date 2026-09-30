import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BarChart3 } from 'lucide-react'
import { STEPS } from '../data/questions'
import ProgressSteps from './ProgressSteps'
import OptionCard from './OptionCard'

export default function Quiz({ answers, onAnswer, onExit, onFinish }) {
  const [stepIndex, setStepIndex] = useState(0)
  const step = STEPS[stepIndex]
  const isLast = stepIndex === STEPS.length - 1
  const stepComplete = step.questions.every((q) => answers[q.id])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stepIndex])

  const goNext = () => (isLast ? onFinish() : setStepIndex((i) => i + 1))
  const goBack = () => (stepIndex === 0 ? onExit() : setStepIndex((i) => i - 1))

  return (
    <section className="mx-auto max-w-4xl py-4">
      <ProgressSteps steps={STEPS} current={stepIndex} answers={answers} />

      <div key={step.id} className="glass mt-8 animate-fade-up p-6 sm:p-10">
        <header className="flex items-center gap-4">
          <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${step.accent} shadow-glow`}>
            <step.icon className="h-7 w-7 text-slate-950" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Paso {stepIndex + 1} de {STEPS.length}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{step.title}</h2>
          </div>
        </header>
        <p className="mt-3 text-slate-400">{step.tagline}</p>

        <div className="mt-8 space-y-10">
          {step.questions.map((question, qi) => (
            <fieldset key={question.id} className="animate-fade-up" style={{ animationDelay: `${0.1 + qi * 0.12}s` }}>
              <legend className="mb-4 text-lg font-bold text-slate-100 sm:text-xl">{question.label}</legend>
              <div
                className={`grid gap-3 sm:grid-cols-2 ${question.options.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}
              >
                {question.options.map((option) => (
                  <OptionCard
                    key={option.id}
                    name={question.id}
                    option={option}
                    selected={answers[question.id] === option.id}
                    onSelect={() => onAnswer(question.id, option.id)}
                  />
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        <footer className="mt-10 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={goBack} className="btn-ghost">
            <ArrowLeft className="h-5 w-5" /> {stepIndex === 0 ? 'Inicio' : 'Anterior'}
          </button>
          <button type="button" onClick={goNext} disabled={!stepComplete} className="btn-primary group">
            {isLast ? (
              <>
                Ver mis resultados <BarChart3 className="h-5 w-5" />
              </>
            ) : (
              <>
                Siguiente <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </footer>
      </div>
    </section>
  )
}
