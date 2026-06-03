# DKRPG - Fantasy RPG Game

เกม RPG แฟนตาซีออนไลน์ที่สร้างด้วย Next.js และ Supabase

## ฟีเจอร์หลัก

### ระบบผู้เล่น
- **ระบบสมัครสมาชิก**: สร้างตัวละครใหม่พร้อมเลือกอาชีพ (Novice, Knight, Mage, Rogue)
- **ระบบเข้าสู่ระบบ**: เข้าเล่นด้วย Email และ Password
- **ระบบตัวละคร**: แสดงสถานะ HP, MP, EXP พร้อมระดับและทอง

### UI/UX
- **หน้า Auth**: UI แบบแฟนตาซีสไตล์ Glassmorphism พร้อมพื้นหลังภาพและเอฟเฟกต์แสง
- **หน้า Game**: แสดงตัวละครพร้อม HUD ที่มุมบนซ้าย
- **PlayerHUD**: แสดงข้อมูลพื้นฐานผู้เล่น (ชื่อ, อาชีพ, เลเวล, ทอง, HP/MP/EXP Bar)
- **PlayerDetailModal**: แสดงรายละเอียดตัวละครแบบเต็ม (สถานะ, ค่าคุณลักษณะ, ทรัพยากร)
- **GameMenu**: เมนูแบบ Hamburger ที่มุมล่างขวา (ต่อสู้, ร้านค้า, สกิล, ออกจากระบบ)

### ระบบอาชีพ
แต่ละอาชีพมีค่าสถานะเริ่มต้นต่างกัน:
- **Novice**: พลังสมดุล เหมาะกับผู้เริ่มต้น
- **Knight**: HP สูง ป้องกันดี เหมาะกับสายถัง
- **Mage**: MP และ INT สูง พลังเวทแรง
- **Rogue**: AGI สูง หลบคล่อง โจมตีเร็ว

## เทคโนโลยี

- **Frontend**: Next.js 15 + React + TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)

## การติดตั้ง

```bash
# ติดตั้ง dependencies
npm install

# รันโปรเจค (Development)
npm run dev

# Build (Production)
npm run build
npm start
```

เปิดบราวเซอร์ที่: http://localhost:3000

## การตั้งค่า

สร้างไฟล์ `.env.local` และเพิ่ม:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
