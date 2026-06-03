<!-- src/components/Game.vue -->
<template>
  <!-- พื้นหลังเกมพร้อม overlay -->
  <div 
    class="min-h-screen bg-cover bg-center bg-no-repeat text-stone-300 p-4 sm:p-6 font-serif relative"
    style="background-image: url('https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Bg/indexBg.webp');"
  >
    <!-- overlay สีดำโปร่งแสง -->
    <div class="absolute inset-0 bg-stone-950/50 pointer-events-none"></div>

    <div v-if="loading" class="relative z-10 flex h-64 items-center justify-center text-amber-600 animate-pulse text-xl">
      จุดตะเกียงเวทมนตร์ กำลังโหลดข้อมูล...
    </div>

    <!-- ข้อมูลตัวละครในมุมซ้ายบน (Compact View) -->
    <div v-else-if="character" class="relative z-10">
      <!-- HUD ตัวละคร (มุมซ้ายบน) - สไตล์เกมจริงๆ -->
      <div class="fixed top-3 left-3 w-80 bg-stone-900/95 border-2 border-amber-700/60 backdrop-blur-md rounded-sm shadow-2xl p-3">
        
        <!-- ชื่อและลำดับที่ + เงิน -->
        <div class="flex justify-between items-start mb-2">
          <div>
            <h1 class="text-lg font-bold text-amber-400 drop-shadow-md">{{ character.username }}</h1>
            <p class="text-xs text-stone-400">{{ character.class_name }} • Lv. {{ character.lvl }}</p>
          </div>
          <div class="flex items-center gap-1.5 bg-amber-900/80 px-2.5 py-1 rounded text-xs border border-amber-700/40">
            <span class="text-amber-300 text-lg">🪙</span>
            <span class="text-amber-300 font-bold">{{ character.gold }}</span>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-b border-amber-700/40 mb-2"></div>

        <!-- HP Bar -->
        <div class="mb-1.5">
          <div class="flex justify-between items-center mb-0.5">
            <span class="text-red-400 font-bold text-sm">❤️ HP</span>
            <span class="text-red-300 text-xs font-bold">{{ character.hp }} / {{ character.max_hp }}</span>
          </div>
          <div class="h-4 bg-stone-950/80 border border-stone-700/60 rounded-sm overflow-hidden shadow-inner">
            <div class="h-full bg-red-600 transition-all duration-300" :style="{ width: hpPercent + '%' }">
              <div class="h-full bg-gradient-to-b from-red-400/60 to-transparent"></div>
            </div>
          </div>
        </div>

        <!-- MP Bar -->
        <div class="mb-1.5">
          <div class="flex justify-between items-center mb-0.5">
            <span class="text-blue-400 font-bold text-sm">✨ MP</span>
            <span class="text-blue-300 text-xs font-bold">{{ character.mp }} / {{ character.max_mp }}</span>
          </div>
          <div class="h-4 bg-stone-950/80 border border-stone-700/60 rounded-sm overflow-hidden shadow-inner">
            <div class="h-full bg-blue-600 transition-all duration-300" :style="{ width: mpPercent + '%' }">
              <div class="h-full bg-gradient-to-b from-blue-400/60 to-transparent"></div>
            </div>
          </div>
        </div>

        <!-- EXP Bar -->
        <div class="mb-2.5">
          <div class="flex justify-between items-center mb-0.5">
            <span class="text-emerald-400 font-bold text-sm">⭐ EXP</span>
            <span class="text-emerald-300 text-xs font-bold">{{ character.exp }} / {{ character.max_exp }}</span>
          </div>
          <div class="h-3 bg-stone-950/80 border border-stone-700/60 rounded-sm overflow-hidden shadow-inner">
            <div class="h-full bg-emerald-600 transition-all duration-300" :style="{ width: expPercent + '%' }">
              <div class="h-full bg-gradient-to-b from-emerald-400/60 to-transparent"></div>
            </div>
          </div>
        </div>

        <!-- ปุ่มรายละเอียด -->
        <button @click="showDetailModal = true" class="w-full px-2 py-1.5 bg-amber-700/90 hover:bg-amber-600 text-stone-100 font-bold text-xs rounded-sm transition-colors border border-amber-600/40 shadow-lg">
          📋 รายละเอียด
        </button>
      </div>

      <!-- Menu Button (มุมล่างขวา) - Hamburger -->
      <div class="fixed bottom-4 right-4 z-20">
        <button @click="showStatsMenu = !showStatsMenu" class="w-10 h-10 bg-amber-900/90 border border-amber-700/60 backdrop-blur-md rounded-sm shadow-lg flex flex-col items-center justify-center gap-1 hover:bg-amber-800 transition-colors">
          <span class="w-4 h-0.5 bg-amber-400 rounded"></span>
          <span class="w-4 h-0.5 bg-amber-400 rounded"></span>
          <span class="w-4 h-0.5 bg-amber-400 rounded"></span>
        </button>

        <!-- Menu Slide-out (ซ้าย) -->
        <div v-if="showStatsMenu" class="fixed bottom-0 left-0 h-full w-56 bg-stone-900/97 border-r-2 border-amber-700/60 backdrop-blur-md shadow-2xl p-4 space-y-2 overflow-y-auto animate-slide-left z-30">
          <!-- Header -->
          <div class="flex justify-between items-center border-b border-amber-700/40 pb-2 mb-3">
            <h3 class="text-sm font-bold text-amber-400">เมนู</h3>
            <button @click="showStatsMenu = false" class="text-xl text-stone-400 hover:text-stone-200 transition-colors">✕</button>
          </div>

          <!-- Menu Items (ตัวอย่าง - เพิ่มได้ตามต้องการ) -->
          <button class="w-full px-3 py-1.5 bg-stone-800/80 hover:bg-stone-700 text-stone-300 font-bold text-xs rounded-sm transition-colors border border-stone-700/40 text-left">
            ⚔️ ต่อสู้
          </button>
          
          <button class="w-full px-3 py-1.5 bg-stone-800/80 hover:bg-stone-700 text-stone-300 font-bold text-xs rounded-sm transition-colors border border-stone-700/40 text-left">
            🏪 ร้านค้า
          </button>

          <button class="w-full px-3 py-1.5 bg-stone-800/80 hover:bg-stone-700 text-stone-300 font-bold text-xs rounded-sm transition-colors border border-stone-700/40 text-left">
            📚 สกิล
          </button>

          <div class="border-t border-stone-700/40 my-2"></div>

          <!-- Logout Button -->
          <button @click="handleLogout" class="w-full px-3 py-1.5 bg-red-900/80 hover:bg-red-800 text-stone-300 font-bold text-xs rounded-sm transition-colors border border-red-700/40">
            🚪 ออกจากระบบ
          </button>
        </div>
      </div>

      <!-- ปิด Menu Overlay (คลิกข้างนอก) -->
      <div v-if="showStatsMenu" @click="showStatsMenu = false" class="fixed inset-0 z-10"></div>

      <!-- เนื้อหาหลักของเกม (ตรงกลาง) -->
      <div class="max-w-4xl mx-auto mt-8 ml-auto mr-0">
        <div class="text-center text-stone-400 text-lg py-20">
          🏰 อาณาจักรแฟนตาซี 🏰<br>
          <span class="text-sm">เรื่องราวของคุณจะเริ่มต้นที่นี่...</span>
        </div>
      </div>

      <!-- Modal รายละเอียดเพิ่มเติม -->
      <div v-if="showDetailModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
        <div class="bg-stone-900 border-2 border-amber-600/40 rounded-sm w-full max-w-2xl max-h-screen overflow-y-auto shadow-2xl">
          
          <!-- Header -->
          <div class="bg-stone-950 border-b border-amber-600/30 p-4 sm:p-6 flex justify-between items-center sticky top-0">
            <h2 class="text-2xl font-bold text-amber-400">{{ character.username }}</h2>
            <button @click="showDetailModal = false" class="text-2xl text-stone-400 hover:text-stone-200 transition-colors">✕</button>
          </div>

          <!-- เนื้อหา Modal -->
          <div class="p-4 sm:p-6 space-y-6">
            
            <!-- ปูมหลัง -->
            <div class="border-b border-stone-700 pb-4">
              <h3 class="text-xl text-amber-600 font-bold mb-3 flex items-center gap-2">
                <span>📜</span> ปูมหลัง (Origins)
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-stone-950/60 p-3 border border-stone-800 rounded">
                  <span class="text-stone-400 text-sm">สายอาชีพ</span>
                  <p class="text-amber-100 font-bold text-lg">{{ character.class_name }}</p>
                </div>
                <div class="bg-stone-950/60 p-3 border border-stone-800 rounded">
                  <span class="text-stone-400 text-sm">เลเวล</span>
                  <p class="text-amber-100 font-bold text-lg">{{ character.lvl }}</p>
                </div>
              </div>
            </div>

            <!-- หลอดพลัง (Resource Bars) -->
            <div class="border-b border-stone-700 pb-4">
              <h3 class="text-xl text-amber-600 font-bold mb-3 flex items-center gap-2">
                <span>💪</span> สถานะพลัง
              </h3>
              <div class="space-y-4">
                <!-- HP Bar -->
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-red-400 font-bold">❤️ HP (เลือด)</span>
                    <span class="text-stone-300">{{ character.hp }} / {{ character.max_hp }}</span>
                  </div>
                  <div class="h-4 bg-stone-950 border border-stone-800 rounded-sm overflow-hidden">
                    <div class="h-full bg-red-700 transition-all duration-500 relative" :style="{ width: hpPercent + '%' }">
                      <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                    </div>
                  </div>
                </div>

                <!-- MP Bar -->
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-blue-400 font-bold">✨ MP (เวท)</span>
                    <span class="text-stone-300">{{ character.mp }} / {{ character.max_mp }}</span>
                  </div>
                  <div class="h-4 bg-stone-950 border border-stone-800 rounded-sm overflow-hidden">
                    <div class="h-full bg-blue-700 transition-all duration-500 relative" :style="{ width: mpPercent + '%' }">
                      <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                    </div>
                  </div>
                </div>

                <!-- EXP Bar -->
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-emerald-500 font-bold">⭐ EXP (ประสบการณ์)</span>
                    <span class="text-stone-300">{{ character.exp }} / {{ character.max_exp }}</span>
                  </div>
                  <div class="h-2 bg-stone-950 border border-stone-800 rounded-sm overflow-hidden">
                    <div class="h-full bg-emerald-600 transition-all duration-500" :style="{ width: expPercent + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- คุณลักษณะพื้นฐาน -->
            <div class="border-b border-stone-700 pb-4">
              <h3 class="text-xl text-amber-600 font-bold mb-3 flex items-center gap-2">
                <span>⚔️</span> ค่าคุณลักษณะ
              </h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div class="bg-stone-950/60 p-4 border border-stone-800 rounded-sm text-center">
                  <span class="text-stone-500 text-sm block mb-2">พละกำลัง (STR)</span>
                  <span class="text-2xl font-bold text-stone-200">{{ character.str }}</span>
                </div>
                <div class="bg-stone-950/60 p-4 border border-stone-800 rounded-sm text-center">
                  <span class="text-stone-500 text-sm block mb-2">ความว่องไว (AGI)</span>
                  <span class="text-2xl font-bold text-stone-200">{{ character.agi }}</span>
                </div>
                <div class="bg-stone-950/60 p-4 border border-stone-800 rounded-sm text-center">
                  <span class="text-stone-500 text-sm block mb-2">สติปัญญา (INT)</span>
                  <span class="text-2xl font-bold text-stone-200">{{ character.int }}</span>
                </div>
                <div class="bg-stone-950/60 p-4 border border-stone-800 rounded-sm text-center">
                  <span class="text-stone-500 text-sm block mb-2">พลังป้องกัน (DEF)</span>
                  <span class="text-2xl font-bold text-stone-200">{{ character.def }}</span>
                </div>
              </div>
              <div v-if="character.stat_points > 0" class="mt-4 p-3 border border-dashed border-amber-700/50 bg-amber-900/20 text-center rounded-sm text-amber-400 text-sm">
                💎 แต้มคงเหลือ: {{ character.stat_points }} แต้ม
              </div>
            </div>

            <!-- ข้อมูลอื่น ๆ -->
            <div class="pb-4">
              <h3 class="text-xl text-amber-600 font-bold mb-3 flex items-center gap-2">
                <span>🪙</span> ทรัพยากร
              </h3>
              <div class="bg-stone-950/60 p-4 border border-stone-800 rounded-sm">
                <div class="flex justify-between items-center">
                  <span class="text-stone-400 text-lg">ทอง (Gold)</span>
                  <span class="text-amber-400 font-bold text-2xl">{{ character.gold }} 🪙</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    
    <div v-else class="relative z-10 text-center text-red-500 mt-10">
      ไม่พบร่างสถิตของท่านในมิตินี้...
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'

const props = defineProps(['session'])
const loading = ref(true)
const character = ref(null)
const showDetailModal = ref(false)
const showStatsMenu = ref(false)

// คำนวณเปอร์เซ็นต์สำหรับหลอดพลังต่างๆ
const hpPercent = computed(() => {
  if (!character.value) return 0
  return Math.min(100, Math.max(0, (character.value.hp / character.value.max_hp) * 100))
})

const mpPercent = computed(() => {
  if (!character.value) return 0
  return Math.min(100, Math.max(0, (character.value.mp / character.value.max_mp) * 100))
})

const expPercent = computed(() => {
  if (!character.value) return 0
  return Math.min(100, Math.max(0, (character.value.exp / character.value.max_exp) * 100))
})

const fetchCharacter = async () => {
  loading.value = true
  try {
    const { user } = props.session
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    character.value = data
  } catch (error) {
    console.error('Error fetching character:', error.message)
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  await supabase.auth.signOut()
}

onMounted(() => {
  fetchCharacter()
})
</script>

<style scoped>
@keyframes slide-left {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-left {
  animation: slide-left 0.3s ease-out;
}
</style>