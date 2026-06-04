// lib/items/weapons.ts
import { EquipmentItem } from './types'

export const weapons: EquipmentItem[] = [
{
    id: 'wooden_sword',
    name: 'ดาบไม้',
    description: 'ดาบไม้สำหรับฝึกหัด',
    type: 'weapon',
    equipSlot: 'mainHand',
    image: 'https://your-supabase-url.com/items/wooden_sword.png',
    weight: 2,
    price: 10,
    isStackable: false,
    reqLevel: 1,
    statsBonus: {
      atk: 5,
    },
    // 🆕 เพิ่ม 2 บรรทัดนี้ เพื่อบอกว่าตีบวกได้ และมีความทนทาน 50
    canUpgrade: true,
    baseDurability: 50,
  },
  {
    id: 'novice_staff',
    name: 'ไม้เท้าผุพัง',
    description: 'ไม้เท้าเวทมนตร์ระดับเริ่มต้น',
    type: 'weapon',
    equipSlot: 'mainHand',
    image: 'https://your-supabase-url.com/items/novice_staff.png',
    weight: 1,
    price: 10,
    isStackable: false,
    reqLevel: 1,
    reqClass: ['mage', 'novice'],
    statsBonus: {
      matk: 8,
      int: 2
    },
    // 🆕 เพิ่ม 2 บรรทัดนี้เช่นกัน
    canUpgrade: true,
    baseDurability: 40,
  }
]