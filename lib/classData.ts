import { ClassOption } from './types'

export const classOptions: ClassOption[] = [
  {
    key: 'novice',
    name: 'ผู้ฝึกหัด (Novice)',
    desc: 'นักผจญภัยหน้าใหม่ สเตตัสสมดุล พร้อมเติบโตไปในทุกเส้นทาง',
    stats: { 
      // Base Stats
      hp: 100, maxHp: 100, baseMp: 10, 
      str: 5, int: 5, agi: 5, def: 5,
      // Regen Stats
      hpRegen: 5, mpRegen: 2,
      // Combat Stats
      acc: 0, block: 0, dmgRed: 0, 
      critRate: 5, critDmg: 150, dodge: 0, ignoreBlock: 0
    },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Novice_stand.webp',
    isSprite: true,
    frames: 4
  },
  {
    key: 'knight',
    name: 'อัศวิน (Knight)',
    desc: 'รถถังเดินได้: เกราะหนา ทนทาน และมีโอกาสบล็อกการโจมตีสูง',
    stats: { 
      // Base Stats
      hp: 200, maxHp: 200, baseMp: 20, 
      str: 10, int: 2, agi: 3, def: 8,
      // Regen Stats
      hpRegen: 10, mpRegen: 2,
      // Combat Stats
      acc: 0, block: 15, dmgRed: 2, 
      critRate: 5, critDmg: 150, dodge: 0, ignoreBlock: 0
    },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Knight_stand2.webp',
    isSprite: true,
    frames: 4
  },
  {
    key: 'mage',
    name: 'จอมเวท (Mage)',
    desc: 'พลังทำลายล้าง: คริติคอลเวทมนตร์รุนแรงและสามารถเจาะเกราะศัตรูได้',
    stats: { 
      // Base Stats
      hp: 80, maxHp: 80, baseMp: 50, 
      str: 2, int: 15, agi: 4, def: 1,
      // Regen Stats
      hpRegen: 2, mpRegen: 10,
      // Combat Stats
      acc: 5, block: 0, dmgRed: 0, 
      critRate: 10, critDmg: 200, dodge: 5, ignoreBlock: 15
    },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Mage_stand.webp',
    isSprite: true,
    frames: 4
  },
  {
    key: 'rogue',
    name: 'นักฆ่า (Rogue)',
    desc: 'เงามรณะ: ว่องไวดั่งสายลม เน้นการหลบหลีกและโจมตีจุดตาย (คริติคอลสูง)',
    stats: { 
      // Base Stats
      hp: 120, maxHp: 120, baseMp: 30, 
      str: 7, int: 3, agi: 12, def: 3,
      // Regen Stats
      hpRegen: 5, mpRegen: 4,
      // Combat Stats
      acc: 10, block: 5, dmgRed: 0, 
      critRate: 25, critDmg: 170, dodge: 15, ignoreBlock: 10
    },
    image: 'https://qvxbofhorjjdoohhhbgd.supabase.co/storage/v1/object/public/Npc/Knight_stand2.webp',
    isSprite: true,
    frames: 4
  }
]