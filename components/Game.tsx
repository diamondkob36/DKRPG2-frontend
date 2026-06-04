'use client'

import { useState, useEffect } from 'react'
import PlayerHUD from './ui/PlayerHUD'
import GameMenu from './ui/GameMenu'
import PlayerDetailModal from './ui/PlayerDetailModal'

interface GameProps {
  player: any
}

export default function Game({ player }: GameProps) {
  const [character, setCharacter] = useState(player)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('player')
    window.location.reload()
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

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat text-stone-300 p-4 sm:p-6 font-serif relative"
      style={{ backgroundImage: "url('https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Bg/Town1.webp')" }}
    >
      <div className="absolute inset-0 bg-stone-950/50 pointer-events-none"></div>

      <div className="relative z-10">
        <PlayerHUD
          playerName={character.username}
          className={character.class_key}
          level={character.level}
          gold={character.gold}
          hp={character.base_stats.hp}
          maxHp={character.base_stats.max_hp}
          mp={character.base_stats.mp}
          maxMp={character.base_stats.max_mp}
          exp={character.exp}
          maxExp={character.max_exp}
          onShowDetails={() => setShowDetailModal(true)}
        />

        <GameMenu onMenuClick={handleMenuClick} />

        <PlayerDetailModal
          isOpen={showDetailModal}
          playerName={character.username}
          className={character.class_key}
          level={character.level}
          hp={character.base_stats.hp}
          maxHp={character.base_stats.max_hp}
          mp={character.base_stats.mp}
          maxMp={character.base_stats.max_mp}
          exp={character.exp}
          maxExp={character.max_exp}
          str={character.base_stats.str}
          agi={character.base_stats.agi}
          int={character.base_stats.int}
          def={character.secondary_stats.def}
          statPoints={character.stat_points}
          gold={character.gold}
          onClose={() => setShowDetailModal(false)}
        />
      </div>
    </div>
  )
}
