'use client'
import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import {
  BookOpen, Clock, Trophy, Flame,
  ChevronRight, Bell, User, Home,
  Brain, Calculator, Swords, Star
} from 'lucide-react'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('home')
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }
    if (user) {
      getDoc(doc(db, 'users', user.uid)).then(snap => {
        if (snap.exists()) setUserData(snap.data())
      })
    }
  }, [user, loading])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const stats = [
    { icon: BookOpen, label: 'Courses', value: '12', color: 'from-teal-500 to-teal-700' },
    { icon: Clock, label: 'Tests Taken', value: '0', color: 'from-indigo-500 to-indigo-700' },
    { icon: Trophy, label: 'Avg Score', value: '0%', color: 'from-amber-500 to-amber-700' },
    { icon: Flame, label: 'Day Streak', value: '1', color: 'from-rose-500 to-rose-700' },
  ]

  const features = [
    { icon: Brain, label: 'Mock CBT Test', desc: 'Simulate real exam', href: '/mock-test', color: 'from-teal-500/20 to-teal-700/20', border: 'border-teal-500/30' },
    { icon: BookOpen, label: 'Past Questions', desc: 'Practice by course',
