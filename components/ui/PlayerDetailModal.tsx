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
  classImageUrl?: string
  classprofileImage?: string
  secStats?: any
  maxSlots?: number
  maxWeight?: number
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
  classImageUrl,
  classprofileImage,
  secStats,
  maxSlots = 32,
  maxWeight = 60,
  onClose
}: PlayerDetailModalProps) {
  if (!isOpen) return null

  const hpRegen = secStats?.hp_regen ?? 0
  const mpRegen = secStats?.mp_regen ?? 0
  const critRate = secStats?.crit_rate ?? 0
  const critDmg = secStats?.crit_dmg ?? 150
  const acc = secStats?.acc ?? 0
  const eva = secStats?.eva ?? 0
  const block = secStats?.block ?? 0
  const dmgRed = secStats?.dmg_red ?? 0
  const ignoreBlock = secStats?.ignore_block ?? 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-xl bg-stone-900/95 border-2 border-amber-600/40 backdrop-blur-md rounded-md shadow-2xl"
      >
        {/* Header */}
        <div className="p-3 flex items-center gap-3 border-b border-amber-600/30 bg-stone-950/80">
          <span className="text-xl">📜</span>
          <h2 className="text-lg font-bold text-amber-400 drop-shadow-md">
            ข้อมูลตัวละคร
          </h2>
          <button 
            onClick={onClose}
            className="ml-auto text-2xl text-stone-400 hover:text-stone-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <div 
              className="w-20 h-20 rounded-full border-3 flex items-center justify-center overflow-hidden bg-stone-950/60 flex-shrink-0"
              style={{ borderColor: "#DAA520" }}
            >
              {classImageUrl ? (
                <img src={classprofileImage} alt={className} className="w-full h-full object-center object-contain" />
              ) : (
                <span className="text-4xl">⚔️</span>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-400">{playerName}</h1>
              <p className="text-sm text-stone-400">{className} • Lv.{level}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-amber-300 text-sm">🪙</span>
                <span className="text-amber-300 font-bold text-sm">{gold}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs bg-stone-950/40 p-3 rounded border border-stone-700/60">
            {/* HP */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">❤️</span>
              <span className="text-stone-300">HP:</span>
              <span className="font-bold text-red-400">{hp}/{maxHp}</span>
            </div>
            {/* HP Regen */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">🌱</span>
              <span className="text-stone-300">Regen:</span>
              <span className="font-bold text-green-400">+{hpRegen}/3T</span>
            </div>

            {/* MP */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">💧</span>
              <span className="text-stone-300">MP:</span>
              <span className="font-bold text-blue-400">{mp}/{maxMp}</span>
            </div>
            {/* MP Regen */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">🔥</span>
              <span className="text-stone-300">Regen:</span>
              <span className="font-bold text-orange-400">+{mpRegen}/3T</span>
            </div>

            {/* STR */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">⚔️</span>
              <span className="text-stone-300">STR:</span>
              <span className="font-bold text-red-400">{str}</span>
            </div>
            {/* INT */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">🔮</span>
              <span className="text-stone-300">INT:</span>
              <span className="font-bold text-purple-400">{int}</span>
            </div>

            {/* AGI */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">💨</span>
              <span className="text-stone-300">AGI:</span>
              <span className="font-bold text-green-400">{agi}</span>
            </div>
            {/* DEF */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">🛡️</span>
              <span className="text-stone-300">DEF:</span>
              <span className="font-bold text-blue-400">{def}</span>
            </div>
          </div>

          {/* Combat Stats */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs bg-stone-950/40 p-3 rounded border border-stone-700/60">
            <div className="flex items-center gap-1.5">
              <span className="text-base">⚡</span>
              <span className="text-stone-300">Crit Rate:</span>
              <span className="font-bold text-yellow-400">{critRate}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">✨</span>
              <span className="text-stone-300">Crit Dmg:</span>
              <span className="font-bold text-orange-400">{critDmg}%</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-base">🎯</span>
              <span className="text-stone-300">Acc:</span>
              <span className="font-bold text-blue-400">{acc}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">💨</span>
              <span className="text-stone-300">Dodge:</span>
              <span className="font-bold text-green-400">{eva}%</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-base">🛡️</span>
              <span className="text-stone-300">Block:</span>
              <span className="font-bold text-cyan-400">{block}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">💎</span>
              <span className="text-stone-300">Dmg Red:</span>
              <span className="font-bold text-purple-400">{dmgRed}%</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-base">⭐</span>
              <span className="text-stone-300">Pierce:</span>
              <span className="font-bold text-pink-400">{ignoreBlock}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">⚖️</span>
              <span className="text-stone-300">น.น.:</span>
              <span className="font-bold text-stone-300">0/{maxWeight}</span>
            </div>
          </div>

          {/* Stat Points Button */}
          {statPoints > 0 && (
            <button 
              className="w-full py-2 rounded bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 font-bold text-white text-sm shadow-lg transition-all border border-purple-500/50"
            >
              ✨ อัปเกรดสเตตัส ({statPoints})
            </button>
          )}

          {/* Buffs Section */}
          <div className="bg-stone-950/40 p-3 rounded border border-stone-700/60">
            <h3 className="text-center text-sm font-bold mb-1 text-amber-400">
              สถานะ (Buffs)
            </h3>
            <p className="text-center text-xs text-stone-400">- ไม่มีบัพ -</p>
          </div>
        </div>
      </div>
    </div>
  )
}
