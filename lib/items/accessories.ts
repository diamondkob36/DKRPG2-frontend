// lib/items/accessories.ts
import { EquipmentItem } from './types'

export const accessories: EquipmentItem[] = [
  {
    id: 'ring_of_strength',
    name: 'แหวนแห่งพละกำลัง',
    description: 'แหวนที่เพิ่มพลังโจมตีอย่างมหาศาล (ใส่ได้ 2 วง)',
    type: 'accessory',
    equipSlot: 'ring', // 👈 บอกว่าไอเทมชิ้นนี้คือ "แหวน"
    image: 'https://...',
    weight: 1,
    price: 500,
    isStackable: false,
    reqLevel: 5,
    statsBonus: { str: 5, atk: 10 },
    canUpgrade: true,
    baseDurability: 100,
  },
  /* sellPrice: สำหรับอยากตั้งราคาขายเอง*/
  {
    id: 'leather_belt',
    name: 'เข็มขัดหนัง',
    description: 'เข็มขัดนักผจญภัยทั่วไป (ใส่ได้ 1 เส้น)',
    type: 'accessory',
    equipSlot: 'belt', // 👈 บอกว่าไอเทมชิ้นนี้คือ "เข็มขัด"
    image: 'https://...',
    weight: 1,
    price: 500,
    isStackable: false,
    reqLevel: 5,
    statsBonus: { str: 5, atk: 10 },
    canUpgrade: true,
    baseDurability: 100,
  }
]