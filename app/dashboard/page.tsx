'use client'
import { useState } from 'react'
import { 
  BookOpen, Clock, Trophy, Flame, 
  ChevronRight, Bell, User, Home,
  Brain, Calculator, Swords, Star
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')

  const stats = [
    { icon: BookOpen, label: 'Courses', value: '12', color: 'from-teal-500 to-teal-700' },
    { icon: Clock, label: 'Tests Taken', value: '8', color: 'from-indigo-500 to-indigo-700' },
    { icon: Trophy, label: 'Avg Score', value: '74%', color: 'from-amber-500 to-amber-700' },
    { icon: Flame, label: 'Day Streak', value: '5', color: 'from-rose-500 to-rose-700' },
  ]

  const features = [
    { icon: Brain, label: 'Mock CBT Test', desc: 'Simulate real exam', href: '/mock-test', color: 'from-teal-500/20 to-teal-700/20', border: 'border-teal-500/30' },
    { icon: BookOpen, label: 'Past Questions', desc: 'Practice by course', href: '/past-questions', color: 'from-indigo-500/20 to-indigo-700/20', border: 'border-indigo-500/30' },
    { icon: Swords, label: 'Quiz Battle', desc: 'Challenge friends', href: '/quiz-battle', color: 'from-rose-500/20 to-rose-700/20', border: 'border-rose-500/30' },
    { icon: Calculator, label: 'CGPA Calculator', desc: 'Track your GPA', href: '/cgpa', color: 'from-amber-500/20 to-amber-700/20', border: 'border-amber-500/30' },
    { icon: Trophy, label: 'Leaderboard', desc: 'See top students', href: '/leaderboard', color: 'from-purple-500/20 to-purple-700/20', border: 'border-purple-500/30' },
    { icon: Star, label: 'AI Assistant', desc: 'Get instant help', href: '/ai-assistant', color: 'from-pink-500/20 to-pink-700/20', border: 'border-pink-500/30' },
  ]

  const recentActivity = [
    { course: 'MTH 101', action: 'Mock Test', score: '68%', time: '2 hours ago' },
    { course: 'PHY 101', action: 'Past Questions', score: '82%', time: 'Yesterday' },
    { course: 'CHE 101', action: 'Mock Test', score: '71%', time: '2 days ago' },
  ]

  return (
    <main className="min-h-screen bg-navy-900 pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Good morning 👋</p>
          <h1 className="text-2xl font-bold text-white">John Doe</h1>
          <p className="text-primary-400 text-xs mt-1">Computer Science • 200L</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center relative">
            <Bell size={18} className="text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
          </button>
          <button className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
            <User size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="mx-6 mb-6 rounded-2xl p-6 bg-gradient-to-br from-primary-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8" />
        <p className="text-white/80 text-sm mb-1">Next exam in</p>
        <h2 className="text-3xl font-bold text-white mb-1">12 Days</h2>
        <p className="text-white/70 text-sm mb-4">Keep pushing! You're doing great 💪</p>
        <button className="bg-white text-primary-700 text-sm font-semibold px-4 py-2 rounded-xl">
          Start Studying →
        </button>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-xs">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="px-6 mb-6">
        <h2 className="text-white font-semibold mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3">
          {features.map((f) => (
            <a
              key={f.label}
              href={f.href}
              className={`glass border ${f.border} rounded-2xl p-4 bg-gradient-to-br ${f.color} hover:scale-95 transition`}
            >
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                <f.icon size={20} className="text-white" />
              </div>
              <p className="text-white font-semibold text-sm">{f.label}</p>
              <p className="text-gray-400 text-xs mt-1">{f.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6">
        <h2 className="text-white font-semibold mb-3">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="glass rounded-2xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                  <BookOpen size={16} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{item.course}</p>
                  <p className="text-gray-400 text-xs">{item.action} • {item.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-400 font-semibold text-sm">{item.score}</span>
                <ChevronRight size={14} className="text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-6 py-4">
        <div className="flex items-center justify-around">
          {[
            { icon: Home, label: 'Home', tab: 'home' },
            { icon: BookOpen, label: 'Courses', tab: 'courses' },
            { icon: Trophy, label: 'Ranks', tab: 'ranks' },
            { icon: User, label: 'Profile', tab: 'profile' },
          ].map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center gap-1 ${activeTab === item.tab ? 'text-primary-400' : 'text-gray-500'}`}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
