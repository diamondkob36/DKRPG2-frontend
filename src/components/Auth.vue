<!-- src/components/Auth.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <div class="w-full max-w-xs p-8 bg-gray-800 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">DKRPG2 Login</h2>

      <form @submit.prevent="handleAuth" class="space-y-4">
        <!-- ฟิลด์สำหรับ Register (รับข้อมูลเพิ่มเติม) -->
        <div v-if="isRegistering">
          <label class="block text-sm font-medium mb-1">Username</label>
          <input v-model="username" type="text" required class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <div v-if="isRegistering">
          <label class="block text-sm font-medium mb-1">Class</label>
          <select v-model="classKey" class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="novice">Novice</option>
            <option value="mage">Mage</option>
            <option value="rogue">Rogue</option>
          </select>
        </div>

        <!-- ฟิลด์พื้นฐาน Email & Password -->
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input v-model="password" type="password" required class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <!-- ปุ่ม Action -->
        <button type="submit" :disabled="loading" class="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold transition-colors">
          {{ loading ? 'Loading...' : (isRegistering ? 'Register' : 'Login') }}
        </button>

        <p class="text-center text-sm mt-4">
          <span class="text-gray-400">
            {{ isRegistering ? 'Already have an account?' : 'Need an account?' }}
          </span>
          <button type="button" @click="toggleMode" class="ml-2 text-blue-400 hover:text-blue-300 underline">
            {{ isRegistering ? 'Login' : 'Sign Up' }}
          </button>
        </p>

        <!-- แสดง Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { supabase } from '../supabase' // อ้างอิงไฟล์ที่เราสร้างไว้

const email = ref('')
const password = ref('')
const username = ref('')
const classKey = ref('novice')

const isRegistering = ref(false)
const loading = ref(false)
const errorMessage = ref('')

// สำหรับแปลง Class Key เป็น Class Name ให้ฐานข้อมูล
const classNames = {
  novice: 'Novice',
  mage: 'Mage',
  rogue: 'Rogue'
}

const toggleMode = () => {
  isRegistering.value = !isRegistering.value
  errorMessage.value = ''
}

const handleAuth = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    if (isRegistering.value) {
      // 1. กระบวนการสมัครสมาชิก (Register)
      // ส่งข้อมูล username, class_key, class_name แนบไปกับ user_metadata เพื่อให้ Trigger ที่เราเขียนไว้บนฐานข้อมูลทำงาน
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            username: username.value,
            class_key: classKey.value,
            class_name: classNames[classKey.value]
          }
        }
      })
      if (error) throw error
      alert('Registration successful! Please login.')
      toggleMode() // กลับไปหน้า Login
      
    } else {
      // 2. กระบวนการล็อกอิน (Login)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      alert('Login successful!')
      // TODO: Redirect ไปหน้าเกมหลัก หรือ โหลดข้อมูลตัวละคร
    }
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}
</script>