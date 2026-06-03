<!-- src/App.vue -->
<template>
  <div v-if="loadingSession" class="min-h-screen bg-gray-900 flex items-center justify-center text-white">
    <p>Loading...</p>
  </div>
  
  <Game v-else-if="session" :session="session" />
  
  <Auth v-else />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'
import Auth from './components/Auth.vue'
import Game from './components/Game.vue'

const session = ref(null)
const loadingSession = ref(true)

onMounted(() => {
  // ดึง Session ปัจจุบันเมื่อโหลดหน้าเว็บ (เพื่อไม่ให้หลุดตอนรีเฟรช)
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
    loadingSession.value = false
  })

  // ดักจับเหตุการณ์เวลา Login, Logout หรือ Token หมดอายุ
  supabase.auth.onAuthStateChange((_event, _session) => {
    session.value = _session
  })
})
</script>