'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash2, Calculator } from 'lucide-react'

interface Course {
  id: number
  name: string
  unit: string
  grade: string
}

const gradePoints: Record<string, number> = {
  'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0
}

export default function CGPACalculator() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', unit: '', grade: '' },
    { id: 2, name: '', unit: '', grade: '' },
    { id: 3, name: '', unit: '', grade: '' },
  ])
  const [cgpa, setCgpa] = useState<number | null>(null)
  const [prevCGPA, setPrevCGPA] = useState('')
  const [prevUnits, setPrevUnits] = useState('')

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', unit: '', grade: '' }])
  }

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id))
    }
  }

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const calculate = () => {
    const valid = courses.filter(c => c.unit && c.grade)
    if (valid.length === 0) return

    let totalPoints = 0
    let totalUnits = 0

    valid.forEach(c => {
      const units = parseFloat(c.unit)
      const points = gradePoints[c.grade] || 0
      totalPoints += units * points
      totalUnits += units
    })

    if (prevCGPA && prevUnits) {
      const prev = parseFloat(prevCGPA)
      const prevU = parseFloat(prevUnits)
      totalPoints += prev * prevU
      totalUnits += prevU
    }

    const result = totalPoints / totalUnits
    setCgpa(Math.round(result * 100) / 100)
  }

  const getClass = (gpa: number) => {
    if (gpa >= 4.5) return { label: 'First Class', color: 'text-emerald-400' }
    if (gpa >= 3.5) return { label: 'Second Class Upper', color: 'text-blue-400' }
    if (gpa >= 2.5) return { label: 'Second Class Lower', color: 'text-yellow-400' }
    if (gpa >= 1.5) return { label: 'Third Class', color: 'text-orange-400' }
    return { label: 'Pass', color: 'text-red-400' }
  }

  return (
    <main className="min-h-screen bg-navy-900 pb-12">
      {/* Header */}
      <div className="glass border-b border-white/10 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => router.push('/dashboard')} className="text-gray-400">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-white font-semibold">CGPA Calculator</h1>
          <p className="text-primary-400 text-xs">Calculate your grade point average</p>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Previous CGPA */}
        <div className="glass rounded-2xl p-4 mb-4">
          <h2 className="text-white font-semibold mb-3 text-sm">Previous CGPA (Optional)</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Previous CGPA</label>
              <input
                type="number"
                placeholder="e.g. 3.50"
                value={prevCGPA}
                onChange={e => setPrevCGPA(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Total Units Done</label>
              <input
                type="number"
                placeholder="e.g. 60"
                value={prevUnits}
                onChange={e => setPrevUnits(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="space-y-3 mb-4">
          <h2 className="text-white font-semibold text-sm">Current Semester Courses</h2>
          {courses.map((course, index) => (
            <div key={course.id} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-xs">Course {index + 1}</span>
                <button onClick={() => removeCourse(course.id)} className="text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Course name (e.g. MTH 101)"
                value={course.name}
                onChange={e => updateCourse(course.id, 'name', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500 mb-3"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Credit Units</label>
                  <select
                    value={course.unit}
                    onChange={e => updateCourse(course.id, 'unit', e.target.value)}
                    className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    <option value="">Units</option>
                    {[1,2,3,4,5,6].map(u => (
                      <option key={u} value={u}>{u} unit{u > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Grade</label>
                  <select
                    value={course.grade}
                    onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500"
                  >
                    <option value="">Grade</option>
                    {['A','B','C','D','E','F'].map(g => (
                      <option key={g} value={g}>{g} ({gradePoints[g]} pts)</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Course */}
        <button
          onClick={addCourse}
          className="w-full border border-dashed border-white/20 rounded-2xl py-3 text-gray-400 text-sm flex items-center justify-center gap-2 mb-6 hover:border-primary-500/50 transition"
        >
          <Plus size={16} /> Add Course
        </button>

        {/* Calculate */}
        <button
          onClick={calculate}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 rounded-2xl transition glow flex items-center justify-center gap-2"
        >
          <Calculator size={20} /> Calculate CGPA
        </button>

        {/* Result */}
        {cgpa !== null && (
          <div className="mt-6 glass rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Your CGPA</p>
            <p className="text-6xl font-bold text-white mb-2">{cgpa.toFixed(2)}</p>
            <p className={`text-lg font-semibold ${getClass(cgpa).color}`}>
              {getClass(cgpa).label}
            </p>
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${(cgpa / 5) * 100}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-2">{cgpa.toFixed(2)} / 5.00</p>
          </div>
        )}
      </div>
    </main>
  )
  }
