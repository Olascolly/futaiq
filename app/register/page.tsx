'use client'
import { useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', matric: '', department: '', password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(userCredential.user, { displayName: form.name })
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: form.name,
        email: form.email,
        matric: form.matric,
        department: form.department,
        createdAt: new Date().toISOString()
      })
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const departments = [
    '-- SAAT: Agriculture & Agricultural Technology --',
    'Agricultural Resource Economics',
    'Agricultural Extension & Communication',
    'Animal Production & Health',
    'Crop, Soil & Pest Management',
    'Ecotourism & Wildlife Management',
    'Fisheries & Aquaculture Technology',
    'Food Science & Technology',
    'Forestry & Wood Technology',
    '-- SET: Environmental Technology --',
    'Architecture',
    'Building Technology',
    'Estate Management',
    'Industrial Design',
    'Quantity Surveying',
    'Surveying & Geoinformatics',
    'Urban & Regional Planning',
    '-- SEMS: Earth & Mineral Sciences --',
    'Applied Geology',
    'Applied Geophysics',
    'Marine Science & Technology',
    'Meteorology & Climate Science',
    'Remote Sensing & Geoinformatics',
    '-- SLS: Life Sciences --',
    'Biochemistry',
    'Biology',
    'Biotechnology',
    'Microbiology',
    '-- SPS: Physical Sciences --',
    'Chemistry',
    'Mathematical Sciences',
    'Physics',
    'Statistics',
    '-- SOC: School of Computing --',
    'Computer Science',
    'Cybersecurity',
    'Information Technology',
    'Information Systems',
    'Software Engineering',
    'Data Science',
    '-- SESE: Electrical Systems Engineering --',
    'Electrical & Electronics Engineering',
    'Computer Engineering',
    '-- SIMME: Infrastructure, Minerals & Manufacturing --',
    'Civil Engineering',
    'Mechanical Engineering',
    'Materials & Metallurgical Engineering',
    'Mining Engineering',
    '-- Health Sciences --',
    'Biomedical Technology',
    'Human Anatomy',
    'Physiology',
    'Medical Biochemistry',
    'Medical Microbiology',
    '-- SLIT: Logistics & Innovation Technology --',
    'Project Management Technology',
    'Logistics & Transport Management',
    '-- SMAT: School of Management Technology --',
    'Accounting',
    'Business Administration',
    'Economics',
    'Entrepreneurship Management',
    'Project Management',
    'Transport Management',
  ]

  return (
    <main className="min-h-screen bg-navy-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">FUTA IQ</h1>
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@futa.edu.ng"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Matric Number</label>
            <input
              name="matric"
              type="text"
              placeholder="FUT/SET/21/0001"
              value={form.matric}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                dept.startsWith('--') ? (
                  <option key={dept} disabled className="text-gray-500 font-bold">
                    {dept}
                  </option>
                ) : (
                  <option key={dept} value={dept}>{dept}</option>
                )
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl transition glow mt-2 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-primary-400 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </main>
  )
    }
