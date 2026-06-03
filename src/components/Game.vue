<!-- src/components/Game.vue -->
<template>
  <!-- พื้นหลังหลัก โทนสีหินขรึมๆ ฟอนต์เซริฟให้ดูคลาสสิกยุคกลาง -->
  <div class="min-h-screen bg-stone-950 text-stone-300 p-4 sm:p-8 font-serif">
    
    <div v-if="loading" class="flex h-64 items-center justify-center text-amber-600 animate-pulse text-xl">
      จุดตะเกียงเวทมนตร์ กำลังโหลดข้อมูล...
    </div>

    <!-- กระดานข้อมูลตัวละคร (Character Sheet) -->
    <div v-else-if="character" class="max-w-4xl mx-auto bg-stone-900 border-[3px] border-stone-700 shadow-2xl rounded-sm overflow-hidden">
      
      <!-- ส่วนหัว (Header) สไตล์ป้ายประกาศ -->
      <div class="bg-stone-950 border-b border-stone-700 p-4 sm:p-6 flex justify-between items-center relative overflow-hidden">
        <div class="relative z-10">
          <h1 class="text-3xl sm:text-4xl font-bold text-amber-500 tracking-wider drop-shadow-md">
            {{ character.username }}
          </h1>
          <p class="text-stone-400 mt-1 text-lg">นักผจญภัยแห่งอาณาจักร</p>
        </div>
        <div class="flex flex-col items-end relative z-10">
          <div class="flex items-center gap-2 bg-stone-800 px-4 py-2 border border-amber-700/50 rounded shadow-inner">
            <span class="text-amber-400 font-bold text-xl">🪙 {{ character.gold }}</span>
          </div>
          <button @click="handleLogout" class="mt-4 text-sm text-stone-500 hover:text-red-400 transition-colors underline decoration-stone-600">
            ออกจากการผจญภัย
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-700">
        
        <!-- ซีกซ้าย: ปูมหลังและสถานะพลัง -->
        <div class="bg-stone-900 p-6">
          <div class="mb-6 border-b border-stone-800 pb-4">
            <h2 class="text-xl text-amber-600 font-bold mb-3 flex items-center gap-2">
              <span>📜</span> ปูมหลัง (Origins)
            </h2>
            <div class="flex justify-between items-center bg-stone-950 p-3 border border-stone-800 rounded">
              <span class="text-stone-400">สายอาชีพ</span>
              <span class="text-amber-100 font-bold text-lg">{{ character.class_name }}</span>
            </div>
            <div class="flex justify-between items-center bg-stone-950 p-3 border border-stone-800 rounded mt-2">
              <span class="text-stone-400">เลเวล</span>
              <span class="text-amber-100 font-bold text-lg">{{ character.lvl }}</span>
            </div>
          </div>

          <!-- หลอดพลัง (Resource Bars) -->
          <div class="space-y-4">
            <!-- HP Bar -->
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-red-400 font-bold">HP</span>
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
                <span class="text-blue-400 font-bold">MP</span>
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
                <span class="text-emerald-500 font-bold">EXP</span>
                <span class="text-stone-300">{{ character.exp }} / {{ character.max_exp }}</span>
              </div>
              <div class="h-2 bg-stone-950 border border-stone-800 rounded-sm overflow-hidden">
                <div class="h-full bg-emerald-600 transition-all duration-500" :style="{ width: expPercent + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- ซีกขวา: คุณลักษณะพื้นฐาน (Attributes) -->
        <div class="bg-stone-900 p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl text-amber-600 font-bold flex items-center gap-2">
              <span>⚔️</span> ค่าคุณลักษณะ
            </h2>
            <div v-if="character.stat_points > 0" class="text-xs bg-amber-600/20 text-amber-400 px-2 py-1 rounded border border-amber-600/50 animate-pulse">
              แต้มคงเหลือ: {{ character.stat_points }}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="bg-stone-950 p-4 border border-stone-800 rounded-sm flex flex-col items-center justify-center">
              <span class="text-stone-500 text-sm mb-1">พละกำลัง (STR)</span>
              <span class="text-2xl text-stone-200">{{ character.str }}</span>
            </div>
            <div class="bg-stone-950 p-4 border border-stone-800 rounded-sm flex flex-col items-center justify-center">
              <span class="text-stone-500 text-sm mb-1">ความว่องไว (AGI)</span>
              <span class="text-2xl text-stone-200">{{ character.agi }}</span>
            </div>
            <div class="bg-stone-950 p-4 border border-stone-800 rounded-sm flex flex-col items-center justify-center">
              <span class="text-stone-500 text-sm mb-1">สติปัญญา (INT)</span>
              <span class="text-2xl text-stone-200">{{ character.int }}</span>
            </div>
            <div class="bg-stone-950 p-4 border border-stone-800 rounded-sm flex flex-col items-center justify-center">
              <span class="text-stone-500 text-sm mb-1">พลังป้องกัน (DEF)</span>
              <span class="text-2xl text-stone-200">{{ character.def }}</span>
            </div>
          </div>

          <!-- พื้นที่เผื่อสำหรับปุ่มอัปสเตตัสในอนาคต -->
          <div v-if="character.stat_points > 0" class="mt-6 p-4 border border-dashed border-amber-700/50 bg-amber-900/10 text-center rounded-sm text-stone-400 text-sm">
            คุณมีแต้มคุณลักษณะที่สามารถจัดสรรได้
            <!-- TODO: Add stat allocation buttons here -->
          </div>
        </div>

      </div>
    </div>
    
    <div v-else class="text-center text-red-500 mt-10">
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