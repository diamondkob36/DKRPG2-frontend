'use client'

import { useEffect, useState } from 'react'
import Auth from '@/components/Auth'
import Game from '@/components/Game'

export default function Home() {
  const [player, setPlayer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedPlayer = localStorage.getItem('player')
    if (savedPlayer) {
      setPlayer(JSON.parse(savedPlayer))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    )
  }

  return player ? <Game player={player} /> : <Auth />
}
