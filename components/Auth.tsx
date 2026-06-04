'use client'

import { useState, type FormEvent } from 'react'
import { classOptions } from '@/lib/classData'

type Mode = 'welcome' | 'login' | 'register-step1' | 'register-step2'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export default function Auth() {
  const [mode, setMode] = useState<Mode>('welcome')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [classKey, setClassKey] = useState('novice')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    
    try {
      const response = await fetch(`${API_URL}/api/character/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'เข้าสู่ระบบไม่สำเร็จ')
      }

      localStorage.setItem('player', JSON.stringify(result.data))
      window.location.reload()
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    setErrorMessage('')

    const selectedClass = classOptions.find(c => c.key === classKey)
    if (!selectedClass) {
      setErrorMessage('ไม่พบข้อมูลอาชีพ')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/character/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          username,
          password,
          class_key: classKey,
          stats: {
            hp: selectedClass.stats.maxHp,
            mp: selectedClass.stats.baseMp,
            str: selectedClass.stats.str,
            agi: selectedClass.stats.agi,
            int: selectedClass.stats.int,
            def: selectedClass.stats.def,
          },
          combat_stats: {
            hp_regen: selectedClass.stats.hpRegen,
            mp_regen: selectedClass.stats.mpRegen,
            acc: selectedClass.stats.acc,
            block: selectedClass.stats.block,
            dmg_red: selectedClass.stats.dmgRed,
            crit_rate: selectedClass.stats.critRate,
            crit_dmg: selectedClass.stats.critDmg,
            dodge: selectedClass.stats.dodge,
            ignore_block: selectedClass.stats.ignoreBlock,
          },
        }),
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'สร้างตัวละครไม่สำเร็จ')
      }
      
      alert('สร้างตัวละครสำเร็จ! ยินดีต้อนรับสู่ต่างโลก')
      setMode('login')
      setPassword('')
      
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen text-stone-300 font-serif flex items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Bg/indexBg.webp')" }}
    >
      <div className="absolute inset-0 bg-stone-950/60 pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[120px] -top-10 -left-10 pointer-events-none"></div>
      <div className="absolute w-[400px] h-[400px] bg-amber-700/10 rounded-full blur-[100px] -bottom-10 -right-10 pointer-events-none"></div>

      <div className="w-full max-w-4xl bg-stone-950/40 backdrop-blur-xl border-[2px] border-amber-600/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-md overflow-hidden relative">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-500/40"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500/40"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500/40"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-500/40"></div>

        <div className="p-4 sm:p-6">
          {mode === 'welcome' && (
            <div className="max-w-md mx-auto text-center animate-fade-in">
              <p className="text-stone-300 mb-8 leading-relaxed text-base sm:text-lg drop-shadow-md">
                ยินดีต้อนรับสู่อาณาจักรแฟนตาซี ที่ซึ่งคุณสามารถสวมบทบาทเป็นนักผจญภัย เลือกสายอาชีพที่คุณชื่นชอบ และออกเดินทางเพื่อสร้างตำนานของตัวคุณเอง
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setMode('login')}
                  className="px-8 py-3 bg-stone-900/80 hover:bg-stone-800 text-stone-200 font-bold border border-stone-700/60 rounded-sm transition-all duration-200 hover:border-amber-500/40 shadow-md w-full sm:w-auto backdrop-blur-sm"
                >
                  เข้าสู่ระบบ
                </button>
                <button 
                  onClick={() => setMode('register-step1')}
                  className="px-8 py-3 bg-amber-700/80 hover:bg-amber-600/90 text-stone-100 font-bold border border-amber-500/50 rounded-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(217,119,6,0.4)] w-full sm:w-auto backdrop-blur-sm"
                >
                  สร้างตัวละครใหม่
                </button>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="max-w-sm mx-auto animate-fade-in">
              <h2 className="text-2xl text-amber-500/90 font-bold mb-6 text-center border-b border-amber-600/10 pb-2 drop-shadow-md">
                ลงชื่อเข้าสู่ระบบ
              </h2>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-stone-300 text-sm mb-1 drop-shadow-md">จดหมายเวทมนตร์ (Email)</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="w-full px-4 py-2 bg-stone-950/60 border border-stone-700/80 rounded-sm text-stone-100 focus:outline-none focus:border-amber-500/70 transition-colors backdrop-blur-sm shadow-inner" 
                  />
                </div>
                <div>
                  <label className="block text-stone-300 text-sm mb-1 drop-shadow-md">รหัสลับ (Password)</label>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="w-full px-4 py-2 bg-stone-950/60 border border-stone-700/80 rounded-sm text-stone-100 focus:outline-none focus:border-amber-500/70 transition-colors backdrop-blur-sm shadow-inner" 
                  />
                </div>
                
                <div className="flex gap-4 pt-2">
                  <button 
                    type="button"
                    onClick={() => setMode('welcome')}
                    className="w-1/3 py-3 bg-stone-900/60 hover:bg-stone-800 text-stone-300 border border-stone-700/80 rounded-sm transition-colors font-bold backdrop-blur-sm"
                  >
                    กลับ
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-2/3 py-3 bg-amber-700/80 hover:bg-amber-600 text-stone-100 font-bold rounded-sm shadow-md transition-colors border border-amber-500/40 backdrop-blur-sm"
                  >
                    {loading ? 'กำลังร่ายเวท...' : 'เข้าสู่โลกต่างมิติ'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {mode === 'register-step1' && (
            <div className="max-w-sm mx-auto animate-fade-in">
              <h2 className="text-2xl text-amber-500/90 font-bold mb-6 text-center border-b border-amber-600/10 pb-2 drop-shadow-md">
                จารึกนามนักผจญภัย
              </h2>
              
              <form onSubmit={(e) => { e.preventDefault(); setMode('register-step2') }} className="space-y-5">
                <div>
                  <label className="block text-stone-300 text-sm mb-1 drop-shadow-md">นามแฝง (Username)</label>
                  <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                    className="w-full px-4 py-2 bg-stone-950/60 border border-stone-700/80 rounded-sm text-stone-100 focus:outline-none focus:border-amber-500/70 backdrop-blur-sm shadow-inner" 
                  />
                </div>
                <div>
                  <label className="block text-stone-300 text-sm mb-1 drop-shadow-md">จดหมายเวทมนตร์ (Email)</label>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="w-full px-4 py-2 bg-stone-950/60 border border-stone-700/80 rounded-sm text-stone-100 focus:outline-none focus:border-amber-500/70 backdrop-blur-sm shadow-inner" 
                  />
                </div>
                <div>
                  <label className="block text-stone-300 text-sm mb-1 drop-shadow-md">รหัสลับ (Password)</label>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    minLength={6}
                    className="w-full px-4 py-2 bg-stone-950/60 border border-stone-700/80 rounded-sm text-stone-100 focus:outline-none focus:border-amber-500/70 backdrop-blur-sm shadow-inner" 
                  />
                </div>
                
                <div className="flex gap-4 pt-2">
                  <button 
                    type="button"
                    onClick={() => setMode('welcome')}
                    className="w-1/3 py-2 bg-stone-900/60 hover:bg-stone-800 text-stone-300 border border-stone-700/80 rounded-sm transition-colors font-bold backdrop-blur-sm"
                  >
                    กลับ
                  </button>
                  <button 
                    type="submit"
                    className="w-2/3 py-2 bg-amber-700/80 hover:bg-amber-600 text-stone-100 font-bold border border-amber-500/40 rounded-sm transition-colors backdrop-blur-sm"
                  >
                    เลือกสายอาชีพ ➔
                  </button>
                </div>
              </form>
            </div>
          )}

          {mode === 'register-step2' && (
            <div className="animate-fade-in">
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl text-amber-500/90 font-bold text-center drop-shadow-md mb-1">
                  เลือกเส้นทางแห่งโชคชะตา
                </h2>
                <p className="text-center text-stone-300 text-sm sm:text-base drop-shadow-md">
                  &quot;{username}&quot;
                </p>
              </div>
                
              <div className="max-h-[60vh] overflow-y-auto px-2">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto">
                  {classOptions.map((cls) => (
                    <div 
                      key={cls.key}
                      onClick={() => setClassKey(cls.key)}
                      className={`relative p-3 border rounded-sm cursor-pointer transition-all duration-300 backdrop-blur-md flex flex-col ${
                        classKey === cls.key 
                          ? 'border-amber-500 bg-amber-950/30 shadow-[0_0_20px_rgba(217,119,6,0.4)]' 
                          : 'border-stone-700/60 bg-stone-950/50 hover:border-amber-500/50 hover:bg-stone-900/60'
                      }`}
                    >
                      {classKey === cls.key && (
                        <div className="absolute top-2 right-2 text-amber-500 text-sm drop-shadow-md">✨</div>
                      )}
                      
                      <div className="h-24 flex items-center justify-center mb-2 bg-stone-950/60 border border-stone-800/80 rounded overflow-hidden shadow-inner">
                        {cls.isSprite ? (
                          <div className="sprite-md" style={{ '--frames': cls.frames } as any}>
                            <img src={cls.image} alt={cls.name} className="sprite-image-md" style={{ width: `${cls.frames * 100}%` }} />
                          </div>
                        ) : (
                          <img src={cls.image} alt={cls.name} className="max-h-full p-2 object-contain filter drop-shadow-md" />
                        )}
                      </div>
                      
                      <h3 className="text-sm font-bold text-amber-400 text-center mb-2 drop-shadow-md">
                        {cls.name}
                      </h3>
                      <p className="text-xs text-stone-300 text-center mb-2 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                        {cls.desc}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-1 text-xs bg-stone-950/70 p-2 border border-stone-800/80 rounded-sm shadow-inner mt-auto">
                        <div className="text-red-400/90">HP: {cls.stats.maxHp}</div>
                        <div className="text-blue-400/90">MP: {cls.stats.baseMp}</div>
                        <div className="text-stone-300">STR: {cls.stats.str}</div>
                        <div className="text-stone-300">AGI: {cls.stats.agi}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setMode('register-step1')}
                  className="px-4 sm:px-6 py-2 bg-stone-900/60 hover:bg-stone-800 text-stone-300 border border-stone-700/80 rounded-sm transition-colors font-bold text-sm backdrop-blur-sm"
                >
                  ย้อนกลับ
                </button>
                <button 
                  onClick={handleRegister}
                  disabled={loading}
                  className="px-6 sm:px-8 py-2 bg-amber-700/80 hover:bg-amber-600 text-stone-100 font-bold border border-amber-500/40 rounded-sm shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-colors text-sm backdrop-blur-sm"
                >
                  {loading ? 'กำลังร่ายเวท...' : 'เริ่มการผจญภัย ⚔️'}
                </button>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-950/60 backdrop-blur-md border border-red-900/50 rounded-sm text-red-300 text-sm text-center shadow-md">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
