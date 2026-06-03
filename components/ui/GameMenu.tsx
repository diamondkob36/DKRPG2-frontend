'use client'

import { useState } from 'react'

interface MenuItem {
  id: string
  icon: string
  label: string
  bgClass?: string
  borderClass?: string
}

interface GameMenuProps {
  onMenuClick: (id: string) => void
  menuItems?: MenuItem[]
}

export default function GameMenu({ onMenuClick, menuItems }: GameMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const defaultMenuItems: MenuItem[] = [
    { id: 'combat', icon: '⚔️', label: 'ต่อสู้' },
    { id: 'shop', icon: '🏪', label: 'ร้านค้า' },
    { id: 'skills', icon: '📚', label: 'สกิล' },
    { 
      id: 'logout', 
      icon: '🚪', 
      label: 'ออกจากระบบ',
      bgClass: 'bg-red-900/90 hover:bg-red-800',
      borderClass: 'border border-red-700/60'
    }
  ]

  const items = menuItems || defaultMenuItems

  const handleMenuClick = (id: string) => {
    onMenuClick(id)
    setIsOpen(false)
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-20">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-amber-900/90 border border-amber-700/60 backdrop-blur-md rounded-sm shadow-lg flex flex-col items-center justify-center gap-1 hover:bg-amber-800 transition-colors group relative"
        >
          <span className="w-5 h-0.5 bg-amber-400 rounded"></span>
          <span className="w-5 h-0.5 bg-amber-400 rounded"></span>
          <span className="w-5 h-0.5 bg-amber-400 rounded"></span>
          <span className="absolute bottom-full mb-2 right-0 px-2 py-1 bg-stone-900 text-stone-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            เมนู
          </span>
        </button>

        {isOpen && (
          <div className="absolute bottom-0 right-14 flex flex-row-reverse gap-2">
            {items.map((item, index) => (
              <button 
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-12 h-12 backdrop-blur-md rounded-sm transition-all shadow-lg flex items-center justify-center text-xl group relative animate-slide-in ${
                  item.bgClass || 'bg-stone-800/90 hover:bg-stone-700'
                } ${
                  item.borderClass || 'border border-stone-700/60'
                }`}
                style={{ animationDelay: `${(index + 1) * 0.05}s` }}
              >
                {item.icon}
                <span className="absolute bottom-full mb-2 px-2 py-1 bg-stone-900 text-stone-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-10"
        />
      )}
    </>
  )
}
