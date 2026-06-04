import React from 'react'

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
  // คำนวณสัดส่วนเปอร์เซ็นต์ของหลอดต่างๆ
  const hpPercent = maxHp > 0 ? (hp / maxHp) * 100 : 0;
  const mpPercent = maxMp > 0 ? (mp / maxMp) * 100 : 0;
  const expPercent = maxExp > 0 ? (exp / maxExp) * 100 : 0;

  return (
    // 🔹 กรอบนอกสุดกดได้ (มี onClick และ hover เอฟเฟกต์)
    <div 
      onClick={onShowDetails}
      className="fixed top-3 left-3 w-[340px] bg-[#2b2118] border-2 border-[#5c3a21] hover:border-[#eba363] hover:shadow-[0_0_15px_rgba(235,163,99,0.25)] rounded-xl p-3 shadow-2xl font-sans select-none z-50 flex gap-3 cursor-pointer transition-all active:scale-[0.98] group"
    >
      
      {/* 🔹 ส่วนซ้าย: รูปโปรไฟล์ */}
      <div className="w-[80px] h-[80px] bg-[#1a140f] border-2 border-[#4a2e15] rounded-lg shrink-0 flex items-center justify-center shadow-inner relative overflow-hidden">
        <span className="text-4xl opacity-80 group-hover:scale-110 transition-transform duration-300">👤</span>
        
        {/* ป้ายอาชีพ */}
        <div className="absolute bottom-0 w-full bg-[#4a2e15]/90 text-center text-[10px] text-[#f5c746] py-0.5 font-bold uppercase tracking-wider">
          {className}
        </div>
      </div>

      {/* 🔹 ส่วนขวา: ข้อมูลสเตตัส */}
      <div className="flex flex-col flex-1 justify-between py-0.5">
        
        {/* 🔹 แถวข้อมูล: จัด Name ไว้บนสุด / Level กับ Gold อยู่บรรทัดเดียวกัน */}
        <div className="flex flex-col mb-1.5">
          <h1 className="text-lg font-serif font-bold text-[#f5c746] drop-shadow-sm leading-none tracking-wide mb-1.5">
            {playerName}
          </h1>
          
          <div className="flex justify-between items-center">
            {/* เลเวล (ซ้าย) */}
            <span className="text-[#a39c93] text-[11px] font-bold leading-none">
              Lv. {level}
            </span>
            
            {/* ป้ายเงิน (ขวา) */}
            <div className="flex items-center gap-1 bg-[#1a140f] border border-[#6b4423] rounded px-1.5 py-0.5 shadow-inner">
              <span className="text-yellow-500 text-[10px] leading-none">🪙</span>
              <span className="text-[#f5c746] font-bold text-[11px] leading-none mt-[1px]">{gold}</span>
            </div>
          </div>
        </div>

        {/* 🔹 กลุ่มหลอดสเตตัส (HP, MP, EXP) */}
        <div className="flex flex-col gap-1.5">
          {/* หลอด HP */}
          <div className="relative h-4 w-full rounded bg-[#1a140f] border border-[#4a1c1c] overflow-hidden shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-300" 
              style={{ width: `${hpPercent}%` }} 
            />
            <div className="absolute inset-0 flex items-center justify-between px-2 text-white font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)] text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px]">❤️</span>
                <span className="tracking-wider">HP</span>
              </div>
              <span>{hp}/{maxHp}</span>
            </div>
          </div>

          {/* หลอด MP */}
          <div className="relative h-4 w-full rounded bg-[#1a140f] border border-[#1c2e4a] overflow-hidden shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-300" 
              style={{ width: `${mpPercent}%` }} 
            />
            <div className="absolute inset-0 flex items-center justify-between px-2 text-white font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)] text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px]">✨</span>
                <span className="tracking-wider">MP</span>
              </div>
              <span>{mp}/{maxMp}</span>
            </div>
          </div>

          {/* หลอด EXP */}
          <div className="relative h-4 w-full rounded bg-[#1a140f] border border-[#1a2e1c] overflow-hidden shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-700 to-green-500 transition-all duration-300" 
              style={{ width: `${expPercent}%` }} 
            />
            <div className="absolute inset-0 flex items-center justify-between px-2 text-white font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)] text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-yellow-400">⭐</span>
                <span className="tracking-wider text-[#aedbaf]">EXP</span>
              </div>
              <span className="text-gray-200">{exp}/{maxExp}</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}