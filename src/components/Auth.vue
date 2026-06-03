<!-- src/components/Auth.vue -->
<template>
  <div class="min-h-screen bg-stone-950 text-stone-300 font-serif flex items-center justify-center p-4 sm:p-8">
    
    <div class="w-full max-w-5xl bg-stone-900 border-[3px] border-stone-700 shadow-2xl rounded-sm overflow-hidden relative">
      
      <div class="bg-stone-950 border-b border-stone-800 p-6 text-center">
        <h1 class="text-3xl sm:text-4xl font-bold text-amber-500 tracking-widest drop-shadow-md">
          DKRPG II
        </h1>
        <p class="text-stone-500 mt-2 text-sm italic">ประตูสู่มิติแห่งการผจญภัย</p>
      </div>

      <div class="p-6 sm:p-10">

        <!-- [ โหมด WELCOME ] -->
        <div v-if="mode === 'welcome'" class="max-w-md mx-auto text-center animate-fade-in">
          <p class="text-stone-400 mb-8 leading-relaxed text-lg">
            ยินดีต้อนรับสู่อาณาจักรแฟนตาซี ที่ซึ่งคุณสามารถสวมบทบาทเป็นนักผจญภัย เลือกสายอาชีพที่คุณชื่นชอบ และออกเดินทางเพื่อสร้างตำนานของตัวคุณเอง
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="mode = 'login'" class="px-8 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold border border-stone-600 rounded-sm transition-colors shadow-md w-full sm:w-auto">
              เข้าสู่ระบบ
            </button>
            <button @click="mode = 'register-step1'" class="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-stone-100 font-bold border border-amber-500 rounded-sm transition-colors shadow-md w-full sm:w-auto">
              สร้างตัวละครใหม่
            </button>
          </div>
        </div>
        
        <!-- [ โหมด LOG IN ] -->
        <div v-else-if="mode === 'login'" class="max-w-sm mx-auto animate-fade-in">
          <h2 class="text-2xl text-amber-600 font-bold mb-6 text-center border-b border-stone-700 pb-2">ลงชื่อเข้าสู่ระบบ</h2>
          
          <form @submit.prevent="handleLogin" class="space-y-5">
            <div>
              <label class="block text-stone-400 text-sm mb-1">จดหมายเวทมนตร์ (Email)</label>
              <input v-model="email" type="email" required class="w-full px-4 py-2 bg-stone-950 border border-stone-700 rounded-sm text-stone-200 focus:outline-none focus:border-amber-600 transition-colors" />
            </div>
            <div>
              <label class="block text-stone-400 text-sm mb-1">รหัสลับ (Password)</label>
              <input v-model="password" type="password" required class="w-full px-4 py-2 bg-stone-950 border border-stone-700 rounded-sm text-stone-200 focus:outline-none focus:border-amber-600 transition-colors" />
            </div>
            
            <div class="flex gap-4 pt-2">
              <button type="button" @click="mode = 'welcome'" class="w-1/3 py-3 bg-stone-800 hover:bg-stone-700 text-stone-400 border border-stone-600 rounded-sm transition-colors font-bold">
                กลับ
              </button>
              <button type="submit" :disabled="loading" class="w-2/3 py-3 bg-amber-700 hover:bg-amber-600 text-stone-100 font-bold rounded-sm shadow-md transition-colors border border-amber-500">
                {{ loading ? 'กำลังร่ายเวท...' : 'เข้าสู่โลกต่างมิติ' }}
              </button>
            </div>
          </form>
        </div>

        <!-- [ โหมด REGISTER - STEP 1 ] -->
        <div v-else-if="mode === 'register-step1'" class="max-w-sm mx-auto animate-fade-in">
          <h2 class="text-2xl text-amber-600 font-bold mb-6 text-center border-b border-stone-700 pb-2">จารึกนามนักผจญภัย</h2>
          
          <form @submit.prevent="mode = 'register-step2'" class="space-y-5">
            <div>
              <label class="block text-stone-400 text-sm mb-1">นามแฝง (Username)</label>
              <input v-model="username" type="text" required class="w-full px-4 py-2 bg-stone-950 border border-stone-700 rounded-sm text-stone-200 focus:outline-none focus:border-amber-600" />
            </div>
            <div>
              <label class="block text-stone-400 text-sm mb-1">จดหมายเวทมนตร์ (Email)</label>
              <input v-model="email" type="email" required class="w-full px-4 py-2 bg-stone-950 border border-stone-700 rounded-sm text-stone-200 focus:outline-none focus:border-amber-600" />
            </div>
            <div>
              <label class="block text-stone-400 text-sm mb-1">รหัสลับ (Password)</label>
              <input v-model="password" type="password" required minlength="6" class="w-full px-4 py-2 bg-stone-950 border border-stone-700 rounded-sm text-stone-200 focus:outline-none focus:border-amber-600" />
            </div>
            
            <div class="flex gap-4 pt-2">
              <button type="button" @click="mode = 'welcome'" class="w-1/3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-400 border border-stone-600 rounded-sm transition-colors font-bold">
                กลับ
              </button>
              <button type="submit" class="w-2/3 py-2 bg-amber-700 hover:bg-amber-600 text-stone-100 font-bold border border-amber-500 rounded-sm transition-colors">
                เลือกสายอาชีพ ➔
              </button>
            </div>
          </form>
        </div>

        <!-- [ โหมด REGISTER - STEP 2 ] -->
        <div v-else-if="mode === 'register-step2'" class="animate-fade-in">
          <h2 class="text-2xl text-amber-600 font-bold mb-2 text-center">เลือกเส้นทางแห่งโชคชะตา</h2>
          <p class="text-center text-stone-500 mb-8">โปรดเลือกสายอาชีพที่ต้องการสำหรับ "{{ username }}"</p>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div 
              v-for="cls in classOptions" :key="cls.key"
              @click="classKey = cls.key"
              :class="['relative p-4 border-2 rounded-sm cursor-pointer transition-all duration-300', 
                       classKey === cls.key ? 'border-amber-500 bg-stone-800 shadow-[0_0_15px_rgba(217,119,6,0.3)]' : 'border-stone-700 bg-stone-950 hover:border-stone-500']"
            >
              <div v-if="classKey === cls.key" class="absolute top-2 right-2 text-amber-500">✨</div>
              
              <div class="h-32 flex items-center justify-center mb-4 bg-stone-900 border border-stone-800 rounded overflow-hidden">
                
                <!-- 🖼️ ระบบ Spritesheet ที่แก้ไขแล้ว -->
                <div v-if="cls.isSprite" class="sprite-container" :style="{ '--frames': cls.frames }">
                  <img :src="cls.image" :alt="cls.name" class="sprite-image" />
                </div>
                
                <!-- 🖼️ กรณีเป็นภาพนิ่งธรรมดา -->
                <img v-else :src="cls.image" :alt="cls.name" class="max-h-full p-2 object-contain filter drop-shadow-lg" />
              </div>
              
              <h3 class="text-lg font-bold text-amber-400 text-center mb-2">{{ cls.name }}</h3>
              <p class="text-xs text-stone-400 text-center h-12 mb-4">{{ cls.desc }}</p>
              
              <div class="grid grid-cols-2 gap-1 text-[10px] bg-stone-950 p-2 border border-stone-800 rounded">
                <div class="text-red-400">HP: {{ cls.stats.hp }}</div>
                <div class="text-blue-400">MP: {{ cls.stats.mp }}</div>
                <div class="text-stone-300">STR: {{ cls.stats.str }}</div>
                <div class="text-stone-300">AGI: {{ cls.stats.agi }}</div>
                <div class="text-stone-300 col-span-2">INT: {{ cls.stats.int }}</div>
              </div>
            </div>
          </div>

          <div class="flex justify-center gap-4">
            <button type="button" @click="mode = 'register-step1'" class="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-400 border border-stone-600 rounded-sm transition-colors font-bold">
              ย้อนกลับ
            </button>
            <button @click="handleRegister" :disabled="loading" class="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-stone-100 font-bold border border-amber-500 rounded-sm shadow-md transition-colors">
              {{ loading ? 'กำลังร่ายเวท...' : 'ยืนยันและเริ่มต้นการผจญภัย ⚔️' }}
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="mt-4 p-3 bg-red-900/30 border border-red-700 rounded text-red-400 text-sm text-center">
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
    image: '/image/knight.png',
    isSprite: false
  },
  {
    key: 'mage',
    name: 'จอมเวท (Mage)',
    desc: 'ผู้ควบคุมพลังธาตุ พลังทำลายล้างสูงแต่ร่างกายบอบบาง',
    stats: { hp: 80, mp: 120, str: 3, agi: 7, int: 20 },
    image: '/image/mage.png',
    isSprite: false
  },
  {
    key: 'rogue',
    name: 'นักฆ่า (Rogue)',
    desc: 'ว่องไวดั่งสายลม เน้นการหลบหลีกและโจมตีจุดตาย',
    stats: { hp: 100, mp: 50, str: 10, agi: 18, int: 5 },
    image: '/image/rogue.png',
    isSprite: false
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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 🌟 ระบบแสดงผล Spritesheet CSS 🌟 */
.sprite-container {
  width: 96px;  /* ขนาดกล่องตัวละคร กำหนดให้ใหญ่พอดีตา */
  height: 96px; 
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

.sprite-image {
  height: 100%;
  max-width: none;
  width: calc(100% * var(--frames));
  position: absolute;
  left: 0;
  top: 0;
  image-rendering: pixelated; /* ทำให้ขอบภาพ Pixel คมชัด */
  animation: runSprite 0.8s steps(var(--frames)) infinite;
}

@keyframes runSprite {
  to { transform: translateX(-100%); }
}
</style>