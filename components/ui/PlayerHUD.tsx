import StatusBar from './StatusBar'

interface PlayerHUDProps {
  playerName: string
  className: string
  level: number
  gold: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  exp: number
  maxExp: number
  onShowDetails: () => void
}

export default function PlayerHUD({
  playerName,
  className,
  level,
  gold,
  hp,
  maxHp,
  mp,
  maxMp,
  exp,
  maxExp,
  onShowDetails
}: PlayerHUDProps) {
  return (
    <div className="fixed top-3 left-3 w-56 bg-stone-900/95 border-2 border-amber-700/60 backdrop-blur-md rounded-sm shadow-2xl p-2">
      <div className="flex justify-between items-center mb-1.5">
        <div>
          <h1 className="text-base font-bold text-amber-400 drop-shadow-md">{playerName}</h1>
          <p className="text-[10px] text-stone-400">{className} • Lv. {level}</p>
        </div>
        <div className="flex items-center gap-1 bg-amber-900/80 px-2 py-0.5 rounded text-xs border border-amber-700/40">
          <span className="text-amber-300 text-sm">🪙</span>
          <span className="text-amber-300 font-bold text-xs">{gold}</span>
        </div>
      </div>

      <StatusBar 
        label="HP"
        icon="❤️"
        current={hp}
        max={maxHp}
        type="hp"
      />

      <StatusBar 
        label="MP"
        icon="✨"
        current={mp}
        max={maxMp}
        type="mp"
      />

      <StatusBar 
        label="EXP"
        icon="⭐"
        current={exp}
        max={maxExp}
        type="exp"
        containerClass="mb-1.5"
      />

      <button 
        onClick={onShowDetails}
        className="w-full px-2 py-1 bg-amber-700/90 hover:bg-amber-600 text-stone-100 font-bold text-[10px] rounded-sm transition-colors border border-amber-600/40 shadow-lg"
      >
        📋 รายละเอียด
      </button>
    </div>
  )
}
