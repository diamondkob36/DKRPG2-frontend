<!-- src/components/Auth.vue -->
<template>
  <!-- เปลี่ยนพื้นหลังเป็นรูปภาพ พร้อมตั้งค่าให้ขยายเต็มหน้าจอ (bg-cover) -->
  <div 
    class="min-h-screen text-stone-300 font-serif flex items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-cover bg-center bg-no-repeat"
    style="background-image: url('https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Bg/indexBg.webp');"
  >
    
    <!-- แผ่นฟิล์มสีดำโปร่งแสง (Overlay) ปูทับภาพพื้นหลัง เพื่อขับให้กรอบกระจกเด่นขึ้น -->
    <div class="absolute inset-0 bg-stone-950/60 pointer-events-none"></div>

    <!-- รอยแสงเรืองเวทมนตร์จางๆ (สร้างมิติความลึก) -->
    <div class="absolute w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[120px] -top-10 -left-10 pointer-events-none"></div>
    <div class="absolute w-[400px] h-[400px] bg-amber-700/10 rounded-full blur-[100px] -bottom-10 -right-10 pointer-events-none"></div>

    <!-- กรอบหน้าต่าง UI หลักสไตล์กระจกฝ้า (Glassmorphism) -->
    <div class="w-full max-w-4xl bg-stone-950/40 backdrop-blur-xl border-[2px] border-amber-600/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-md overflow-hidden relative">
      
      <!-- เส้นขอบประดับมุมสไตล์แฟนตาซีโบราณ -->
      <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-500/40"></div>
      <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500/40"></div>
      <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500/40"></div>
      <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-500/40"></div>

      <div class="p-4 sm:p-6">

        <!-- ================= [ โหมด WELCOME (หน้าแรก) ] ================= -->
        <div v-if="mode === 'welcome'" class="max-w-md mx-auto text-center animate-fade-in">
          <p class="text-stone-300 mb-8 leading-relaxed text-base sm:text-lg drop-shadow-md">
            ยินดีต้อนรับสู่อาณาจักรแฟนตาซี ที่ซึ่งคุณสามารถสวมบทบาทเป็นนักผจญภัย เลือกสายอาชีพที่คุณชื่นชอบ และออกเดินทางเพื่อสร้างตำนานของตัวคุณเอง
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="mode = 'login'" class="px-8 py-3 bg-stone-900/80 hover:bg-stone-800 text-stone-200 font-bold border border-stone-700/60 rounded-sm transition-all duration-200 hover:border-amber-500/40 shadow-md w-full sm:w-auto backdrop-blur-sm">
              เข้าสู่ระบบ
            </button>
            <button @click="mode = 'register-step1'" class="px-8 py-3 bg-amber-700/80 hover:bg-amber-600/90 text-stone-100 font-bold border border-amber-500/50 rounded-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(217,119,6,0.4)] w-full sm:w-auto backdrop-blur-sm">
              สร้างตัวละครใหม่
            </button>
          </div>
        </div>
        
        <!-- ================= [ โหมด LOG IN ] ================= -->
        <div v-else-if="mode === 'login'" class="max-w-sm mx-auto animate-fade-in">
          <h2 class="text-2xl text-amber-500/90 font-bold mb-6 text-center border-b border-amber-600/10 pb-2 drop-shadow-md">ลงชื่อเข้าสู่ระบบ</h2>
          
          <form @submit.prevent="handleLogin" class="space-y-5">
            <div>
              <label class="block text-stone-300 text-sm mb-1 drop-shadow-md">จดหมายเวทมนตร์ (Email)</label>
              <input v-model="email" type="email" required class="w-full px-4 py-2 bg-stone-950/60 border border-stone-700/80 rounded-sm text-stone-100 focus:outline-none focus:border-amber-500/70 transition-colors backdrop-blur-sm shadow-inner" />
            </div>
            <div>
              <label class="block text-stone-300 text-sm mb-1 drop-shadow-md">รหัสลับ (Password)</label>
              <input v-model="password" type="password" required class="w-full px-4 py-2 bg-stone-950/60 border border-stone-700/80 rounded-sm text-stone-100 focus:outline-none focus:border-amber-500/70 transition-colors backdrop-blur-sm shadow-inner" />
            </div>
            
            <div class="flex gap-4 pt-2">
              <button type="button" @click="mode = 'welcome'" class="w-1/3 py-3 bg-stone-900/60 hover:bg-stone-800 text-stone-300 border border-stone-700/80 rounded-sm transition-colors font-bold backdrop-blur-sm">
                กลับ
              </button>
              <button type="submit" :disabled="loading" class="w-2/3 py-3 bg-amber-700/80 hover:bg-amber-600 text-stone-100 font-bold rounded-sm shadow-md transition-colors border border-amber-500/40 backdrop-blur-sm">
                {{ loading ? 'กำลังร่ายเวท...' : 'เข้าสู่โลกต่างมิติ' }}
              </button>
            </div>
          </form>
        </div>

        <!-- ================= [ โหมด REGISTER - STEP 1 ] ================= -->
        <div v-else-if="mode === 'register-step1'" class="max-w-sm mx-auto animate-fade-in">
          <h2 class="text-2xl text-amber-500/90 font-bold mb-6 text-center border-b border-amber-600/10 pb-2 drop-shadow-md">จารึกนามนักผจญภัย</h2>
          
          <form @submit.prevent="mode = 'register-step2'" class="space-y-5">
            <div>
              <label class="block text-stone-300 text-sm mb-1 drop-shadow-md">นามแฝง (Username)</label>
              <input v-model="username" type="text" required class="w-full px-4 py-2 bg-stone-950/60 border border-stone-700/80 rounded-sm text-stone-100 focus:outline-none focus:border-amber-500/70 backdrop-blur-sm shadow-inner" />
            </div>
            <div>
              <label class="block text-stone-300 text-sm mb-1 drop-shadow-md">จดหมายเวทมนตร์ (Email)</label>
              <input v-model="email" type="email" required class="w-full px-4 py-2 bg-stone-950/60 border border-stone-700/80 rounded-sm text-stone-100 focus:outline-none focus:border-amber-500/70 backdrop-blur-sm shadow-inner" />
            </div>
            <div>
              <label class="block text-stone-300 text-sm mb-1 drop-shadow-md">รหัสลับ (Password)</label>
              <input v-model="password" type="password" required minlength="6" class="w-full px-4 py-2 bg-stone-950/60 border border-stone-700/80 rounded-sm text-stone-100 focus:outline-none focus:border-amber-500/70 backdrop-blur-sm shadow-inner" />
            </div>
            
            <div class="flex gap-4 pt-2">
              <button type="button" @click="mode = 'welcome'" class="w-1/3 py-2 bg-stone-900/60 hover:bg-stone-800 text-stone-300 border border-stone-700/80 rounded-sm transition-colors font-bold backdrop-blur-sm">
                กลับ
              </button>
              <button type="submit" class="w-2/3 py-2 bg-amber-700/80 hover:bg-amber-600 text-stone-100 font-bold border border-amber-500/40 rounded-sm transition-colors backdrop-blur-sm">
                เลือกสายอาชีพ ➔
              </button>
            </div>
          </form>
        </div>

        <!-- ================= [ โหมด REGISTER - STEP 2 ] ================= -->
        <div v-else-if="mode === 'register-step2'" class="animate-fade-in flex flex-col justify-between">
          <div class="flex-1 flex flex-col min-h-0">
            <h2 class="text-xl sm:text-2xl text-amber-500/90 font-bold text-center drop-shadow-md mb-1">เลือกเส้นทางแห่งโชคชะตา</h2>
            <p class="text-center text-stone-300 text-sm sm:text-base drop-shadow-md mb-4">"{{ username }}"</p>
            
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto w-full">
              <div 
                v-for="cls in classOptions" :key="cls.key"
                @click="classKey = cls.key"
                :class="['relative p-3 border rounded-sm cursor-pointer transition-all duration-300 backdrop-blur-md flex flex-col h-fit', 
                         classKey === cls.key ? 'border-amber-500 bg-amber-950/30 shadow-[0_0_20px_rgba(217,119,6,0.4)]' : 'border-stone-700/60 bg-stone-950/50 hover:border-amber-500/50 hover:bg-stone-900/60']"
              >
                <div v-if="classKey === cls.key" class="absolute top-2 right-2 text-amber-500 text-sm drop-shadow-md">✨</div>
                
                <div class="h-24 sm:h-28 flex items-center justify-center mb-3 bg-stone-950/60 border border-stone-800/80 rounded overflow-hidden shadow-inner flex-shrink-0">
                  <div v-if="cls.isSprite" class="sprite-md" :style="{ '--frames': cls.frames }">
                    <img :src="cls.image" :alt="cls.name" class="sprite-image-md" />
                  </div>
                  <img v-else :src="cls.image" :alt="cls.name" class="max-h-full p-2 object-contain filter drop-shadow-md" />
                </div>
                
                <h3 class="text-sm sm:text-base font-bold text-amber-400 text-center mb-2 drop-shadow-md line-clamp-2">{{ cls.name }}</h3>
                <p class="text-[11px] sm:text-xs text-stone-300 text-center mb-3 line-clamp-3 leading-relaxed">{{ cls.desc }}</p>
                
                <div class="grid grid-cols-2 gap-1 text-[10px] sm:text-xs bg-stone-950/70 p-2 border border-stone-800/80 rounded-sm shadow-inner">
                  <div class="text-red-400/90">HP: {{ cls.stats.hp }}</div>
                  <div class="text-blue-400/90">MP: {{ cls.stats.mp }}</div>
                  <div class="text-stone-300">STR: {{ cls.stats.str }}</div>
                  <div class="text-stone-300">AGI: {{ cls.stats.agi }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center gap-3 mt-4 flex-shrink-0">
            <button type="button" @click="mode = 'register-step1'" class="px-4 sm:px-6 py-2 bg-stone-900/60 hover:bg-stone-800 text-stone-300 border border-stone-700/80 rounded-sm transition-colors font-bold text-sm backdrop-blur-sm">
              ย้อนกลับ
            </button>
            <button @click="handleRegister" :disabled="loading" class="px-6 sm:px-8 py-2 bg-amber-700/80 hover:bg-amber-600 text-stone-100 font-bold border border-amber-500/40 rounded-sm shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-colors text-sm backdrop-blur-sm">
              {{ loading ? 'กำลังร่ายเวท...' : 'เริ่มการผจญภัย ⚔️' }}
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="mt-4 p-3 bg-red-950/60 backdrop-blur-md border border-red-900/50 rounded-sm text-red-300 text-sm text-center shadow-md">
          {{ errorMessage }}
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const mode = ref('welcome') 
const loading = ref(false)
const errorMessage = ref('')

const email = ref('')
const password = ref('')
const username = ref('')
const classKey = ref('novice') 

const classOptions = [
  {
    key: 'novice',
    name: 'ผู้ฝึกหัด (Novice)',
    desc: 'นักผจญภัยหน้าใหม่ ไร้ประสบการณ์แต่เต็มไปด้วยศักยภาพแฝงเร้น',
    stats: { hp: 100, mp: 50, str: 10, agi: 10, int: 10 },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Novice_stand.webp',
    isSprite: true,
    frames: 4
  },
  {
    key: 'knight',
    name: 'อัศวิน (Knight)',
    desc: 'แข็งแกร่งดั่งหินผา ทนทานต่อการโจมตีทางกายภาพ',
    stats: { hp: 150, mp: 30, str: 15, agi: 5, int: 5 },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Knight_stand2.webp',
    isSprite: true,
    frames: 4
  },
  {
    key: 'mage',
    name: 'จอมเวท (Mage)',
    desc: 'ผู้ควบคุมพลังธาตุ พลังทำลายล้างสูงแต่ร่างกายบอบบาง',
    stats: { hp: 80, mp: 120, str: 3, agi: 7, int: 20 },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Knight_stand2.webp',
    isSprite: true,
    frames: 4
  },
  {
    key: 'rogue',
    name: 'นักฆ่า (Rogue)',
    desc: 'ว่องไวดั่งสายลม เน้นการหลบหลีกและโจมตีจุดตาย',
    stats: { hp: 100, mp: 50, str: 10, agi: 18, int: 5 },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Knight_stand2.webp',
    isSprite: true,
    frames: 4
  }
]

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
  } catch (error) {
    errorMessage.value = 'รหัสผ่านไม่ถูกต้อง หรือ พลังเวทขัดข้อง: ' + error.message
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''
  
  const selectedClass = classOptions.find(c => c.key === classKey.value)

  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value,
          class_key: classKey.value,
          class_name: selectedClass.name,
          hp: selectedClass.stats.hp,
          mp: selectedClass.stats.mp,
          str: selectedClass.stats.str,
          agi: selectedClass.stats.agi,
          int: selectedClass.stats.int,
          avatar_url: selectedClass.image 
        }
      }
    })
    if (error) throw error
    
    alert('สร้างตัวละครสำเร็จ! ยินดีต้อนรับสู่ต่างโลก')
    mode.value = 'welcome' 
    
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.sprite-box {
  width: 96px;  
  height: 96px;
  background-repeat: no-repeat;
  background-size: calc(100% * var(--frames)) 100%;
  background-position: 0 0;
  margin: 0 auto;
  image-rendering: pixelated; 
  animation: runSprite 0.8s steps(var(--frames)) infinite;
}

.sprite-sm {
  width: 60px;  
  height: 60px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

.sprite-image-sm {
  height: 100%;
  max-width: none;
  width: calc(100% * var(--frames));
  position: absolute;
  left: 0;
  top: 0;
  image-rendering: pixelated;
  animation: runSpriteSmall 0.8s steps(var(--frames)) infinite;
}

.sprite-md {
  width: 80px;  
  height: 80px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

.sprite-image-md {
  height: 100%;
  max-width: none;
  width: calc(100% * var(--frames));
  position: absolute;
  left: 0;
  top: 0;
  image-rendering: pixelated;
  animation: runSpriteMedium 0.8s steps(var(--frames)) infinite;
}

@keyframes runSprite {
  to { background-position: -100% 0; }
}

@keyframes runSpriteSmall {
  to { transform: translateX(-100%); }
}

@keyframes runSpriteMedium {
  to { transform: translateX(-100%); }
}
</style>