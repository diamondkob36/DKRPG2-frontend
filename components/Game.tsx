'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Character } from '@/lib/types'
import PlayerHUD from './ui/PlayerHUD'
import GameMenu from './ui/GameMenu'
import PlayerDetailModal from './ui/PlayerDetailModal'
import type { Session } from '@supabase/supabase-js'

interface GameProps {
  session: Session
}

export default function Game({ session }: GameProps) {
  const [loading, setLoading] = useState(true)
  const [character, setCharacter] = useState<Character | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    fetchCharacter()
  }, [])

  const fetchCharacter = async () => {
    setLoading(true)
    try {
      const { user } = session
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      setCharacter(data)
    } catch (error: any) {
      console.error('Error fetching character:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleMenuClick = (menuId: string) => {
    switch (menuId) {
      case 'combat':
        console.log('เปิดระบบต่อสู้')
        break
      case 'shop':
        console.log('เปิดร้านค้า')
        break
      case 'skills':
        console.log('เปิดหน้าสกิล')
        break
      case 'logout':
        handleLogout()
        break
    }
  }

  if (loading) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat text-stone-300 p-4 sm:p-6 font-serif relative"
        style={{ backgroundImage: "url('https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Bg/Town1.webp')" }}
      >
        <div className="absolute inset-0 bg-stone-950/50 pointer-events-none"></div>
        <div className="relative z-10 flex h-64 items-center justify-center text-amber-600 animate-pulse text-xl">
          จุดตะเกียงเวทมนตร์ กำลังโหลดข้อมูล...
        </div>
      </div>
    )
  }

  if (!character) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat text-stone-300 p-4 sm:p-6 font-serif relative"
        style={{ backgroundImage: "url('https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Bg/Town1.webp')" }}
      >
        <div className="absolute inset-0 bg-stone-950/50 pointer-events-none"></div>
        <div className="relative z-10 text-center text-red-500 mt-10">
          ไม่พบร่างสถิตของท่านในมิตินี้...
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat text-stone-300 p-4 sm:p-6 font-serif relative"
      style={{ backgroundImage: "url('https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Bg/Town1.webp')" }}
    >
      <div className="absolute inset-0 bg-stone-950/50 pointer-events-none"></div>

      <div className="relative z-10">
        <PlayerHUD
          playerName={character.username}
          className={character.class_name}
          level={character.lvl}
          gold={character.gold}
          hp={character.hp}
          maxHp={character.max_hp}
          mp={character.mp}
          maxMp={character.max_mp}
          exp={character.exp}
          maxExp={character.max_exp}
          onShowDetails={() => setShowDetailModal(true)}
        />

        <GameMenu onMenuClick={handleMenuClick} />

        <PlayerDetailModal
          isOpen={showDetailModal}
          playerName={character.username}
          className={character.class_name}
          level={character.lvl}
          hp={character.hp}
          maxHp={character.max_hp}
          mp={character.mp}
          maxMp={character.max_mp}
          exp={character.exp}
          maxExp={character.max_exp}
          str={character.str}
          agi={character.agi}
          int={character.int}
          def={character.def}
          statPoints={character.stat_points}
          gold={character.gold}
          onClose={() => setShowDetailModal(false)}
        />
      </div>
    </div>
  )
}
