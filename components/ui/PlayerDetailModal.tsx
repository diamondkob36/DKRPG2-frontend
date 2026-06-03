interface PlayerDetailModalProps {
  isOpen: boolean
  playerName: string
  className: string
  level: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  exp: number
  maxExp: number
  str: number
  agi: number
  int: number
  def: number
  statPoints: number
  gold: number
  onClose: () => void
}

export default function PlayerDetailModal({
  isOpen,
  playerName,
  className,
  level,
  hp,
  maxHp,
  mp,
  maxMp,
  exp,
  maxExp,
  str,
  agi,
  int,
  def,
  statPoints,
  gold,
  onClose
}: PlayerDetailModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div className="bg-stone-900 border-2 border-amber-600/40 rounded-sm w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        
        <div className="bg-stone-950 border-b border-amber-600/30 p-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-amber-400">{playerName}</h2>
          <button 
            onClick={onClose}
            className="text-2xl text-stone-400 hover:text-stone-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          
          <div className="border-b border-stone-700 pb-3">
            <h3 className="text-lg text-amber-600 font-bold mb-2 flex items-center gap-2">
              <span>📜</span> ปูมหลัง
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-stone-950/60 p-2 border border-stone-800 rounded">
                <span className="text-stone-400 text-xs">สายอาชีพ</span>
                <p className="text-amber-100 font-bold">{className}</p>
              </div>
              <div className="bg-stone-950/60 p-2 border border-stone-800 rounded">
                <span className="text-stone-400 text-xs">เลเวล</span>
                <p className="text-amber-100 font-bold">{level}</p>
              </div>
            </div>
          </div>

          <div className="border-b border-stone-700 pb-3">
            <h3 className="text-lg text-amber-600 font-bold mb-2 flex items-center gap-2">
              <span>💪</span> สถานะพลัง
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-stone-950/60 p-2 border border-red-900/40 rounded text-center">
                <span className="text-red-400 text-xs block mb-1">❤️ HP</span>
                <span className="text-stone-200 font-bold text-sm">{hp}/{maxHp}</span>
              </div>
              <div className="bg-stone-950/60 p-2 border border-blue-900/40 rounded text-center">
                <span className="text-blue-400 text-xs block mb-1">✨ MP</span>
                <span className="text-stone-200 font-bold text-sm">{mp}/{maxMp}</span>
              </div>
              <div className="bg-stone-950/60 p-2 border border-emerald-900/40 rounded text-center">
                <span className="text-emerald-400 text-xs block mb-1">⭐ EXP</span>
                <span className="text-stone-200 font-bold text-sm">{exp}/{maxExp}</span>
              </div>
            </div>
          </div>

          <div className="border-b border-stone-700 pb-3">
            <h3 className="text-lg text-amber-600 font-bold mb-2 flex items-center gap-2">
              <span>⚔️</span> ค่าคุณลักษณะ
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-stone-950/60 p-2 border border-stone-800 rounded text-center">
                <span className="text-stone-500 text-xs block mb-1">พละกำลัง</span>
                <span className="text-xl font-bold text-stone-200">{str}</span>
              </div>
              <div className="bg-stone-950/60 p-2 border border-stone-800 rounded text-center">
                <span className="text-stone-500 text-xs block mb-1">ความว่องไว</span>
                <span className="text-xl font-bold text-stone-200">{agi}</span>
              </div>
              <div className="bg-stone-950/60 p-2 border border-stone-800 rounded text-center">
                <span className="text-stone-500 text-xs block mb-1">สติปัญญา</span>
                <span className="text-xl font-bold text-stone-200">{int}</span>
              </div>
              <div className="bg-stone-950/60 p-2 border border-stone-800 rounded text-center">
                <span className="text-stone-500 text-xs block mb-1">พลังป้องกัน</span>
                <span className="text-xl font-bold text-stone-200">{def}</span>
              </div>
            </div>
            {statPoints > 0 && (
              <div className="mt-2 p-2 border border-dashed border-amber-700/50 bg-amber-900/20 text-center rounded-sm text-amber-400 text-sm">
                💎 แต้มคงเหลือ: {statPoints} แต้ม
              </div>
            )}
          </div>

          <div className="pb-2">
            <h3 className="text-lg text-amber-600 font-bold mb-2 flex items-center gap-2">
              <span>🪙</span> ทรัพยากร
            </h3>
            <div className="bg-stone-950/60 p-2 border border-stone-800 rounded">
              <div className="flex justify-between items-center">
                <span className="text-stone-400 text-sm">ทอง</span>
                <span className="text-amber-400 font-bold text-lg">{gold} 🪙</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
