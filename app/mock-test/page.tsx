'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, CheckCircle, XCircle, ArrowLeft, RotateCcw } from 'lucide-react'
import { questionBank, courses } from '@/lib/questions'

const MODES = [
  { id: 'exam', label: 'Exam Mode', desc: '30 mins • No feedback until end', time: 1800, icon: '🎓' },
  { id: 'practice', label: 'Practice Mode', desc: '15 mins • Instant feedback', time: 900, icon: '📝' },
  { id: 'endless', label: 'Endless Mode', desc: 'No timer • Loops forever', time: 0, icon: '♾️' },
]

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function MockTest() {
  const router = useRouter()
  const [stage, setStage] = useState<'select' | 'mode' | 'test' | 'result'>('select')
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [selectedMode, setSelectedMode] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [endlessPool, setEndlessPool] = useState<any[]>([])
  const [endlessIndex, setEndlessIndex] = useState(0)
  const [endlessAnswer, setEndlessAnswer] = useState<number | null>(null)
  const [endlessScore, setEndlessScore] = useState({ correct: 0, total: 0 })

  useEffect(() => {
    if (stage !== 'test' || selectedMode?.id === 'endless' || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timer); finishTest(); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [stage, selectedMode])

  const startTest = (mode: any) => {
    const allQ = questionBank[selectedCourse.code] || []
    if (mode.id === 'endless') {
      setEndlessPool(shuffle(allQ))
      setEndlessIndex(0)
      setEndlessAnswer(null)
      setEndlessScore({ correct: 0, total: 0 })
      setSelectedMode(mode)
      setStage('test')
      return
    }
    const q = shuffle(allQ).slice(0, 20)
    setSelectedMode(mode)
    setQuestions(q)
    setAnswers(new Array(q.length).fill(null))
    setCurrent(0)
    setTimeLeft(mode.time)
    setShowExplanation(false)
    setStage('test')
  }

  const handleSelect = (index: number) => {
    const newAnswers = [...answers]
    newAnswers[current] = index
    setAnswers(newAnswers)
    if (selectedMode?.id !== 'exam') setShowExplanation(true)
  }

  const handleNext = () => {
    setShowExplanation(false)
    if (current < questions.length - 1) setCurrent(current + 1)
    else finishTest()
  }

  const finishTest = () => {
    let s = 0
    answers.forEach((ans, i) => { if (ans === questions[i]?.answer) s++ })
    setScore(s)
    setStage('result')
  }

  const handleEndlessSelect = (index: number) => {
    if (endlessAnswer !== null) return
    setEndlessAnswer(index)
    const correct = index === endlessPool[endlessIndex % endlessPool.length]?.answer
    setEndlessScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }))
  }

  const handleEndlessNext = () => {
    const nextIndex = endlessIndex + 1
    if (nextIndex % endlessPool.length === 0) {
      setEndlessPool(shuffle(endlessPool))
    }
    setEndlessIndex(nextIndex)
    setEndlessAnswer(null)
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const getBlockColor = (i: number) => {
    if (i === current) return 'bg-blue-600 text-white'
    if (selectedMode?.id === 'exam') {
      if (answers[i] !== null) return 'bg-red-500 text-white'
      return 'bg-gray-200 text-gray-700'
    } else {
      if (answers[i] === null) return 'bg-gray-200 text-gray-700'
      if (answers[i] === questions[i]?.answer) return 'bg-green-500 text-white'
      return 'bg-red-500 text-white'
    }
  }

  const getGrade = (score: number, total: number) => {
    const pct = (score / total) * 100
    if (pct >= 70) return { grade: 'A', label: 'Excellent!', color: 'text-green-600' }
    if (pct >= 60) return { grade: 'B', label: 'Good job!', color: 'text-blue-600' }
    if (pct >= 50) return { grade: 'C', label: 'Fair', color: 'text-yellow-600' }
    if (pct >= 45) return { grade: 'D', label: 'Keep studying', color: 'text-orange-600' }
    return { grade: 'F', label: 'Needs improvement', color: 'text-red-600' }
  }

  // LOADING
  if (stage === 'select' && !courses.length) return (
    <main className="min-h-screen bg-navy-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-2">FUTA IQ</h1>
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </main>
  )

  // SELECT COURSE
  if (stage === 'select') return (
    <main className="min-h-screen bg-navy-900">
      <div className="glass border-b border-white/10 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => router.push('/dashboard')} className="text-gray-400"><ArrowLeft size={20} /></button>
        <div>
          <h1 className="text-white font-bold">Mock CBT Test</h1>
          <p className="text-primary-400 text-xs">Select a course to begin</p>
        </div>
      </div>
      <div className="px-4 py-6 max-w-lg mx-auto space-y-3">
        {courses.map(course => (
          <button key={course.code} onClick={() => { setSelectedCourse(course); setStage('mode') }}
            className="w-full glass rounded-2xl p-4 text-left hover:border-primary-500/50 transition active:scale-95">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${course.color} rounded-xl flex items-center justify-center text-white font-bold text-xs`}>
                {course.code.split(' ')[0]}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{course.code}</p>
                <p className="text-gray-400 text-xs">{course.name}</p>
              </div>
              <div className="ml-auto text-gray-500 text-xs">{questionBank[course.code]?.length} Qs →</div>
            </div>
          </button>
        ))}
      </div>
    </main>
  )

  // SELECT MODE
  if (stage === 'mode') return (
    <main className="min-h-screen bg-navy-900">
      <div className="glass border-b border-white/10 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => setStage('select')} className="text-gray-400"><ArrowLeft size={20} /></button>
        <div>
          <h1 className="text-white font-bold">{selectedCourse?.code}</h1>
          <p className="text-primary-400 text-xs">Select test mode</p>
        </div>
      </div>
      <div className="px-4 py-6 max-w-lg mx-auto space-y-4">
        {MODES.map(mode => (
          <button key={mode.id} onClick={() => startTest(mode)}
            className="w-full glass rounded-2xl p-5 text-left hover:border-primary-500/50 transition active:scale-95">
            <div className="text-3xl mb-2">{mode.icon}</div>
            <p className="text-white font-bold">{mode.label}</p>
            <p className="text-gray-400 text-sm mt-1">{mode.desc}</p>
          </button>
        ))}
      </div>
    </main>
  )

  // ENDLESS MODE
  if (stage === 'test' && selectedMode?.id === 'endless') {
    const q = endlessPool[endlessIndex % endlessPool.length]
    const isAnswered = endlessAnswer !== null
    const isCorrect = endlessAnswer === q?.answer

    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <p className="text-gray-800 font-bold text-sm">{selectedCourse?.code} — Endless Mode ♾️</p>
            <p className="text-gray-500 text-xs">Question {endlessIndex + 1} • {endlessScore.correct}/{endlessScore.total} correct</p>
          </div>
          <button onClick={() => setStage('select')} className="text-gray-400 text-xs border border-gray-200 px-3 py-1 rounded-full">Exit</button>
        </div>

        <div className="flex-1 px-4 py-5 max-w-lg mx-auto w-full">
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
            <p className="text-gray-400 text-xs mb-2">Question {endlessIndex + 1}</p>
            <p className="text-gray-800 font-semibold leading-relaxed">{q?.question}</p>
          </div>

          <div className="space-y-3 mb-4">
            {q?.options.map((opt: string, i: number) => {
              let style = 'bg-white border-gray-200 text-gray-700'
              if (isAnswered) {
                if (i === q.answer) style = 'bg-green-50 border-green-500 text-green-700 font-semibold'
                else if (endlessAnswer === i) style = 'bg-red-50 border-red-400 text-red-700'
              }
              return (
                <button key={i} onClick={() => handleEndlessSelect(i)}
                  className={`w-full border-2 rounded-xl px-4 py-3 text-left transition text-sm ${style}`}>
                  <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][i]}.</span>{opt}
                </button>
              )
            })}
          </div>

          {isAnswered && (
            <div className={`rounded-xl p-4 mb-4 text-sm ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                {isCorrect ? <CheckCircle size={16} className="text-green-600" /> : <XCircle size={16} className="text-red-600" />}
                <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-600">{q?.explanation}</p>
            </div>
          )}

          {isAnswered && (
            <button onClick={handleEndlessNext}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm">
              Next Question →
            </button>
          )}
        </div>
      </main>
    )
  }

  // EXAM / PRACTICE TEST
  if (stage === 'test') {
    const q = questions[current]
    const userAnswer = answers[current]
    const isAnswered = userAnswer !== null

    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <p className="text-gray-800 font-bold text-sm">{selectedCourse?.code} — {selectedMode?.label}</p>
            <p className="text-gray-500 text-xs">Question {current + 1} of {questions.length}</p>
          </div>
          {selectedMode?.id !== 'endless' && (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full font-mono font-bold text-sm ${timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              <Clock size={14} />
              {formatTime(timeLeft)}
            </div>
          )}
        </div>

        <div className="h-1 bg-gray-200">
          <div className="h-1 bg-blue-600 transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>

        <div className="flex-1 px-4 py-5 max-w-lg mx-auto w-full">
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
            <p className="text-gray-400 text-xs mb-2">Question {current + 1}</p>
            <p className="text-gray-800 font-semibold leading-relaxed">{q?.question}</p>
          </div>

          <div className="space-y-3 mb-4">
            {q?.options.map((opt: string, i: number) => {
              let style = 'bg-white border-gray-200 text-gray-700'
              if (selectedMode?.id === 'exam') {
                if (userAnswer === i) style = 'bg-red-50 border-red-400 text-red-700 font-semibold'
              } else {
                if (isAnswered) {
                  if (i === q.answer) style = 'bg-green-50 border-green-500 text-green-700 font-semibold'
                  else if (userAnswer === i) style = 'bg-red-50 border-red-400 text-red-700'
                }
              }
              return (
                <button key={i} onClick={() => handleSelect(i)}
                  className={`w-full border-2 rounded-xl px-4 py-3 text-left transition text-sm ${style}`}>
                  <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][i]}.</span>{opt}
                </button>
              )
            })}
          </div>

          {showExplanation && selectedMode?.id !== 'exam' && (
            <div className={`rounded-xl p-4 mb-4 text-sm ${userAnswer === q?.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                {userAnswer === q?.answer
                  ? <CheckCircle size={16} className="text-green-600" />
                  : <XCircle size={16} className="text-red-600" />}
                <span className={`font-semibold ${userAnswer === q?.answer ? 'text-green-700' : 'text-red-700'}`}>
                  {userAnswer === q?.answer ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-600">{q?.explanation}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => { setShowExplanation(false); setCurrent(c => Math.max(0, c - 1)) }}
              disabled={current === 0}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm disabled:opacity-40">
              ← Previous
            </button>
            <button onClick={current === questions.length - 1 ? finishTest : handleNext}
              disabled={selectedMode?.id !== 'exam' && !isAnswered}
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm disabled:opacity-40">
              {current === questions.length - 1 ? 'Submit →' : 'Next →'}
            </button>
          </div>
        </div>

        <div className="bg-white border-t px-4 py-3 shadow-inner">
          <p className="text-gray-400 text-xs mb-2">Question Navigator</p>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, i) => (
              <button key={i} onClick={() => { setShowExplanation(false); setCurrent(i) }}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition ${getBlockColor(i)}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  // RESULT
  const grade = getGrade(score, questions.length)
  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-gray-800 font-bold">Test Results</h1>
        <p className="text-gray-500 text-xs">{selectedCourse?.code} — {selectedMode?.label}</p>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center mb-6">
          <p className="text-gray-500 text-sm mb-1">Your Score</p>
          <p className="text-6xl font-bold text-gray-800">{score}<span className="text-2xl text-gray-400">/{questions.length}</span></p>
          <p className={`text-xl font-bold mt-2 ${grade.color}`}>{grade.grade} — {grade.label}</p>
          <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-3 bg-blue-600 rounded-full transition-all"
              style={{ width: `${(score / questions.length) * 100}%` }} />
          </div>
          <p className="text-gray-400 text-sm mt-2">{Math.round((score / questions.length) * 100)}%</p>
        </div>

        <h2 className="text-gray-700 font-bold mb-3">Review Answers</h2>
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${answers[i] === q.answer ? 'border-green-500' : 'border-red-500'}`}>
              <div className="flex items-start gap-2 mb-2">
                {answers[i] === q.answer
                  ? <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  : <XCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />}
                <p className="text-gray-700 text-sm font-medium">{q.question}</p>
              </div>
              <p className="text-green-600 text-xs ml-6">✓ {q.options[q.answer]}</p>
              {answers[i] !== q.answer && answers[i] !== null && (
                <p className="text-red-500 text-xs ml-6">✗ Your answer: {q.options[answers[i]!]}</p>
              )}
              <p className="text-gray-400 text-xs ml-6 mt-1 italic">{q.explanation}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={() => { setStage('mode'); setAnswers([]) }}
            className="flex-1 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-sm flex items-center justify-center gap-2">
            <RotateCcw size={16} /> Retry
          </button>
          <button onClick={() => router.push('/dashboard')}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm">
            Dashboard
          </button>
        </div>
      </div>
    </main>
  )
}
