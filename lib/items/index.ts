// lib/items/index.ts
import { BaseItem } from './types'
import { weapons } from './weapons'
// import { armors } from './armors'
// import { consumables } from './consumables'
// import { materials } from './materials'

// รวมไอเทมทุกประเภทไว้ใน Array เดียว
export const allItems = [
  ...weapons,
  // ...armors,
  // ...consumables,
  // ...materials
]

/**
 * ฟังก์ชันคำนวณราคาขายของไอเทม
 * @param item ข้อมูลไอเทม
 * @returns ราคาขายสุทธิ (Gold)
 */

export const getItemSellPrice = (item: BaseItem): number => {
  // 1. ถ้าไอเทมนี้ถูกตั้งราคาขายตายตัวไว้ ให้ใช้ราคานั้นเลย
  if (item.sellPrice !== undefined) {
    return item.sellPrice
  }
  
  // 2. ถ้าไม่ได้ตั้งไว้ ให้คำนวณ 40% จากราคาเต็ม (price * 0.4)
  // ใช้ Math.floor เพื่อปัดเศษทศนิยมทิ้งให้เป็นจำนวนเต็มเสมอ
  return Math.floor(item.price * 0.4)
}

// ฟังก์ชันสำหรับค้นหาข้อมูลไอเทมจาก ID (ใช้บ่อยมากตอนดึงข้อมูลมาแสดงใน Inventory)
export const getItemById = (id: string) => {
  return allItems.find(item => item.id === id)
}