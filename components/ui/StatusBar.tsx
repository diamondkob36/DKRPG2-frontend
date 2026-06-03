interface StatusBarProps {
  label: string
  icon?: string
  current: number
  max: number
  type?: 'hp' | 'mp' | 'exp'
  containerClass?: string
}

export default function StatusBar({
  label,
  icon = '',
  current,
  max,
  type = 'hp',
  containerClass = 'mb-1'
}: StatusBarProps) {
  const percent = Math.min(100, Math.max(0, (current / max) * 100))

  const borderClasses = {
    hp: 'border border-red-800/60',
    mp: 'border border-blue-800/60',
    exp: 'border border-emerald-800/60'
  }

  const bgClasses = {
    hp: 'bg-red-600',
    mp: 'bg-blue-600',
    exp: 'bg-emerald-600'
  }

  const labelColors = {
    hp: 'text-red-300',
    mp: 'text-blue-300',
    exp: 'text-emerald-300'
  }

  return (
    <div className={containerClass}>
      <div 
        className={`h-4 bg-stone-950/80 rounded-sm overflow-hidden shadow-inner relative ${borderClasses[type]}`}
      >
        <div 
          className={`h-full transition-all duration-300 ${bgClasses[type]}`}
          style={{ width: `${percent}%` }}
        >
          <div className="h-full bg-gradient-to-b from-white/30 to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex items-center px-1.5 pointer-events-none">
          <span className={`font-bold text-[10px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${labelColors[type]}`}>
            {icon} {label}
          </span>
          <span className="ml-auto text-white font-bold text-[10px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {current}/{max}
          </span>
        </div>
      </div>
    </div>
  )
}
