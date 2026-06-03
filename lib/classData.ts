import { ClassOption } from './types'

export const classOptions: ClassOption[] = [
  {
    key: 'novice',
    name: 'ผู้ฝึกหัด (Novice)',
    desc: 'นักผจญภัยหน้าใหม่ ไร้ประสบการณ์แต่เต็มไปด้วยศักยภาพแฝงเร้น',
    stats: { hp: 100, mp: 50, str: 10, agi: 10, int: 10 },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Novice_stand.webp',
    isSprite: true,
    frames: 4
  },
  {
    key: 'knight',
    name: 'อัศวิน (Knight)',
    desc: 'แข็งแกร่งดั่งหินผา ทนทานต่อการโจมตีทางกายภาพ',
    stats: { hp: 150, mp: 30, str: 15, agi: 5, int: 5 },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Knight_stand2.webp',
    isSprite: true,
    frames: 4
  },
  {
    key: 'mage',
    name: 'จอมเวท (Mage)',
    desc: 'ผู้ควบคุมพลังธาตุ พลังทำลายล้างสูงแต่ร่างกายบอบบาง',
    stats: { hp: 80, mp: 120, str: 3, agi: 7, int: 20 },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Mage_stand.webp',
    isSprite: true,
    frames: 4
  },
  {
    key: 'rogue',
    name: 'นักฆ่า (Rogue)',
    desc: 'ว่องไวดั่งสายลม เน้นการหลบหลีกและโจมตีจุดตาย',
    stats: { hp: 100, mp: 50, str: 10, agi: 18, int: 5 },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Knight_stand2.webp',
    isSprite: true,
    frames: 4
  }
]
