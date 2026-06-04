// lib/items/types.ts

// ประเภทของไอเทมทั้งหมดในเกม
export type ItemType = 'weapon' | 'armor' | 'accessory' | 'consumable' | 'material' | 'quest'

// ตำแหน่งการสวมใส่ (สำหรับอาวุธและชุดเกราะ)
export type EquipSlot = 'head' | 'body' | 'legs' | 'feet' | 'mainHand' | 'offHand' | 'ring' | 'necklace' | 'belt' | 'earring'

// โครงสร้างพื้นฐานของไอเทมทุกชิ้น
export interface BaseItem {
  id: string;
  name: string;
  description: string;
  type: ItemType;       
  image: string;
  weight: number;
  price: number;
  sellPrice?: number;
  isStackable: boolean;
  maxStack?: number;
  canUpgrade: boolean;  
  baseDurability?: number;
}

// โครงสร้างสำหรับไอเทมสวมใส่ (อาวุธ, ชุดเกราะ)
export interface EquipmentItem extends BaseItem {
  type: 'weapon' | 'armor' | 'accessory'; // บังคับว่าถ้าเป็นของสวมใส่ ต้องเป็น weapon หรือ armor เท่านั้น
  equipSlot: EquipSlot;
  reqLevel: number;
  reqClass?: string[];

  statsBonus?: {
    hp?: number;
    mp?: number;
    str?: number;
    agi?: number;
    int?: number;
    def?: number;
    atk?: number;
    matk?: number;
  }
}

// โครงสร้างสำหรับไอเทมใช้งาน (ยา, ใบวาร์ป)
export interface ConsumableItem extends BaseItem {
  type: 'consumable';
  // ผลลัพธ์เมื่อกดใช้
  effect?: {
    healHp?: number;
    healMp?: number;
    buffType?: string; // เช่น 'increase_atk'
    buffDuration?: number;
  }
}

// โครงสร้างสำหรับรับข้อมูลไอเทมจาก Backend (ItemInstance)
export interface InventoryItem {
  uid: string
  item_ref_id: string
  quantity: number
  upgrade_level: number
  durability: number
  max_durability: number
  slot_index: number
}