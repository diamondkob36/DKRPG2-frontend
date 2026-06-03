# DKRPG II (Dragon Knight RPG 2)

เกม RPG สไตล์ Fantasy ที่พัฒนาด้วย Vue 3 + Vite + Supabase พร้อมระบบการต่อสู้และการจัดการตัวละครแบบเต็มรูปแบบ

## 🎮 ภาพรวมโปรเจกต์

DKRPG II เป็นเกม Web-based RPG ที่ผู้เล่นสามารถ:
- สร้างตัวละครและเลือกอาชีพ (Novice, Knight, Mage, Rogue)
- จัดการสเตตัส (HP, MP, STR, AGI, INT, DEF)
- ระบบต่อสู้ที่ซับซ้อนพร้อมการคำนวณดาเมจ, Block, Dodge, Critical
- ระบบไอเทมและอุปกรณ์ (Equipment System)
- ระบบสกิลพร้อมการอัพเกรด
- ระบบบัพ (Buff) และคูลดาวน์
- ระบบจัดการน้ำหนักและช่องกระเป๋า

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **Vue 3** - Framework หลักพร้อม Composition API
- **Vite** - Build tool สำหรับการพัฒนาที่รวดเร็ว
- **Tailwind CSS** - Utility-first CSS framework
- **@supabase/supabase-js** - Client library สำหรับเชื่อมต่อ Backend

### Backend
- **Supabase** - Backend-as-a-Service (Auth, Database, Storage)
- **PostgreSQL** - Database หลัก

### Game Logic
- **game-logic.js** - ไฟล์หลักที่จัดการ:
  - การคำนวณ EXP และการเลเวลอัพ
  - ระบบการอัพเกรดสเตตัส
  - ระบบต่อสู้และคำนวณดาเมจ
  - ระบบไอเทม/อุปกรณ์
  - ระบบสกิลและบัพ
  - ระบบร้านค้า (ซื้อ/ขาย)

## 📁 โครงสร้างโปรเจกต์

```
DKRPG2/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.vue          # ระบบเข้าสู่ระบบและสร้างตัวละคร
│   │   │   └── Game.vue          # หน้าจอเกมหลัก
│   │   ├── assets/               # รูปภาพและ icons
│   │   ├── App.vue               # Component หลัก
│   │   ├── main.js               # Entry point
│   │   ├── supabase.js           # Supabase client config
│   │   └── style.css             # Global styles
│   ├── public/
│   │   ├── icons.svg             # Icon sprites
│   │   └── favicon.svg
│   ├── .env                      # Supabase credentials
│   └── package.json
├── backend/                      # Go backend (อยู่ในระหว่างพัฒนา)
└── game-logic.js                 # ระบบเกมหลัก (Game mechanics)
```

## 🎯 ระบบเกมหลัก

### 1. ระบบอาชีพ (Class System)
- **Novice**: สมดุล (HP: 100, MP: 50)
- **Knight**: เน้นป้องกัน (HP: 150, DEF สูง)
- **Mage**: เน้นเวทย์ (MP: 120, INT: 20)
- **Rogue**: เน้นความเร็ว (AGI: 18, Dodge สูง)

### 2. ระบบการต่อสู้ (Battle System)
- คำนวณดาเมจตาม STR/INT
- ระบบ Dodge (หลบหลีก) ขึ้นอยู่กับ AGI
- ระบบ Block (ป้องกัน) ลดดาเมจ 50%
- ระบบ Critical Hit (ดาเมจพิเศษ)
- ระบบ Defense & Damage Reduction
- ระบบ Ignore Block (เจาะเกราะ)

### 3. ระบบไอเทม (Item System)
- ยารักษา (Potion)
- อุปกรณ์ (Equipment) - Weapon, Armor, Accessory
- บัพไอเทม (Buff Items)
- ระบบน้ำหนัก (Weight) และช่องกระเป๋า (Slots)

### 4. ระบบสกิล (Skill System)
- เรียนสกิลตามอาชีพ
- อัพเกรดเลเวลสกิล (ค่าใช้จ่าย: Level × 200 Gold)
- ติดตั้งสกิลลงช่อง (6 ช่อง)
- ระบบคูลดาวน์ (Cooldown)
- การคำนวณดาเมจสกิล (Skill Scaling)

### 5. ระบบบัพ (Buff System)
- เพิ่มค่าสเตตัสชั่วคราว
- มีระยะเวลาหมดอายุ
- แยกระหว่างบัพจากไอเทมและสกิล
- เช็คบัพหมดอายุอัตโนมัติ

## 🚀 การติดตั้งและรันโปรเจกต์

### 1. ติดตั้ง Dependencies
```bash
cd frontend
npm install
```

### 2. ตั้งค่า Environment Variables
สร้างไฟล์ `.env` ใน `frontend/`:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. รันโปรเจกต์
```bash
npm run dev
```

### 4. Build สำหรับ Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

## 🎨 UI/UX Design

- **Theme**: Medieval Fantasy สไตล์หินขรึม (Stone/Amber color palette)
- **Font**: Serif (เพื่อบรรยากาศยุคกลาง)
- **Responsive**: รองรับทั้ง Mobile และ Desktop
- **Animation**: Fade-in effects, Progress bars, Sprite animations

## 🔐 Authentication System

ใช้ Supabase Auth สำหรับ:
- ลงทะเบียนผู้เล่นใหม่
- เข้าสู่ระบบ
- จัดเก็บ Metadata ของตัวละคร
- จัดการ Session

## 📊 Database Schema (Supabase)

```sql
characters
├── id (uuid, primary key)
├── username (text)
├── class_key (text)
├── class_name (text)
├── lvl (int)
├── exp (int)
├── max_exp (int)
├── hp (int)
├── max_hp (int)
├── mp (int)
├── max_mp (int)
├── str (int)
├── agi (int)
├── int (int)
├── def (int)
├── gold (int)
├── stat_points (int)
├── inventory (jsonb)
├── equipment (jsonb)
├── skills (jsonb)
├── loadout (jsonb)
├── active_buffs (jsonb)
└── created_at (timestamp)
```

## 🧪 Features ที่กำลังพัฒนา

- [ ] ระบบดันเจี้ยน (Dungeon)
- [ ] ระบบ Quest
- [ ] ระบบ PvP
- [ ] ระบบ Guild
- [ ] ระบบ Crafting
- [ ] Mobile App Version

## 🤝 การพัฒนาต่อ

หากต้องการเพิ่มฟีเจอร์ใหม่:
1. เพิ่ม Logic ใน `game-logic.js`
2. อัพเดต Database Schema ใน Supabase
3. สร้าง/แก้ไข Vue Components
4. ทดสอบระบบ

## 📝 License

ยังไม่ได้ระบุ License (ติดต่อเจ้าของโปรเจกต์)

## 👨‍💻 ผู้พัฒนา

DKRPG Development Team

---

**สนุกกับการผจญภัย!** ⚔️✨
