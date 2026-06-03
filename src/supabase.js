// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// ดึงค่าจากไฟล์ .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// สร้างตัวเชื่อมต่อ
export const supabase = createClient(supabaseUrl, supabaseAnonKey)