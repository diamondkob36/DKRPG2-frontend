'use client'

import React, { useState } from 'react'
import { InventoryItem } from '@/lib/types'

interface InventoryModalProps {
  isOpen: boolean
  onClose: () => void
  inventory: InventoryItem[]
  equipment: Record<string, string>
  maxSlots?: number
  maxWeight?: number
}

// ข้อมูลตำแหน่งช่องสวมใส่ 3x4 (12 ช่อง)
const EQUIPMENT_SLOTS = [
  { id: 'earring1', label: 'ต่างหู', row: 1, col: 1, icon: '✨' },
  { id: 'head', label: 'ศีรษะ', row: 1, col: 2, icon: '🧢' },
  { id: 'earring2', label: 'ต่างหู', row: 1, col: 3, icon: '✨' },
  
  { id: 'necklace', label: 'สร้อย', row: 2, col: 1, icon: '📿' },
  { id: 'body', label: 'ลำตัว', row: 2, col: 2, icon: '👕' },
  { id: 'belt', label: 'เข็มขัด', row: 2, col: 3, icon: '➰' },
  
  { id: 'mainHand', label: 'อาวุธ', row: 3, col: 1, icon: '🗡️' },
  { id: 'legs', label: 'กางเกง', row: 3, col: 2, icon: '👖' },
  { id: 'offHand', label: 'มือซ้าย', row: 3, col: 3, icon: '🛡️' },
  
  { id: 'ring1', label: 'แหวน', row: 4, col: 1, icon: '💍' },
  { id: 'feet', label: 'รองเท้า', row: 4, col: 2, icon: '🥾' },
  { id: 'ring2', label: 'แหวน', row: 4, col: 3, icon: '💍' },
]

const TABS = ['ทั้งหมด', 'อาวุธ', 'ชุดเกราะ', 'ยา', 'พิเศษ', 'ขยะ']

export default function InventoryModal({ 
  isOpen, 
  onClose, 
  inventory = [], 
  equipment = {},
  maxSlots = 32,
  maxWeight = 60
}: InventoryModalProps) {
  const [activeTab, setActiveTab] = useState('ทั้งหมด')

  if (!isOpen) return null

  const slots = Array.from({ length: maxSlots }, (_, i) => i)
  const currentItemsCount = inventory.length
  const currentWeight = 11.1

  // คลาสมาตรฐานสำหรับ "ช่อง" เพื่อให้ขนาดเท่ากันทั้งสองฝั่ง (64x64 px)
  const slotBaseClass = "w-16 h-16 rounded flex flex-col items-center justify-center relative cursor-pointer transition-all border"
  const emptySlotClass = `${slotBaseClass} bg-stone-900/40 border-dashed border-stone-700 hover:bg-stone-800`
  const filledSlotClass = `${slotBaseClass} bg-stone-800 border-solid border-stone-600 hover:border-amber-500 shadow-sm`

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans">
      
      {/* Container หลัก: จำกัดความสูงไว้ที่ 85vh เพื่อไม่ให้ล้นจอ และใช้ flex-col */}
      <div className="bg-[#1a1816] border border-stone-700 rounded-lg shadow-2xl w-full max-w-5xl flex flex-col h-[85vh]">
        
        {/* Header (ยึดติดด้านบน) */}
        <div className="flex justify-between items-center p-4 border-b border-stone-800 bg-[#141311] rounded-t-lg shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎒</span>
            <h2 className="text-xl font-bold text-amber-500 tracking-wide">ตัวละคร & กระเป๋า</h2>
          </div>
          <button onClick={onClose} className="text-stone-500 hover:text-red-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body: ใส่ min-h-0 เพื่อให้ลูกข้างในทำการ Scroll ได้ */}
        <div className="flex flex-col md:flex-row p-5 gap-6 flex-1 min-h-0">
          
          {/* ---------------- ฝั่งซ้าย: สวมใส่ (ฟิกซ์ขนาด ไม่ต้อง Scroll) ---------------- */}
          <div className="bg-[#201e1c] p-5 rounded-lg border border-stone-800 flex-shrink-0 h-fit">
            <h3 className="text-lg font-bold text-stone-200 mb-5 text-left">สวมใส่</h3>
            
            <div className="grid grid-cols-3 grid-rows-4 gap-3 w-max">
              {EQUIPMENT_SLOTS.map((slot) => {
                const equippedItemRef = equipment[slot.id]
                const isEquipped = !!equippedItemRef

                return (
                  <div 
                    key={slot.id}
                    className={isEquipped ? filledSlotClass : emptySlotClass}
                    style={{ gridRow: slot.row, gridColumn: slot.col }}
                  >
                    {isEquipped ? (
                      <div className="text-[10px] text-stone-300 truncate w-full text-center px-1">
                        {equippedItemRef.substring(0, 5)}
                      </div>
                    ) : (
                      <>
                        <span className="text-xl opacity-30 mb-0.5">{slot.icon}</span>
                        <span className="text-[10px] text-stone-500 font-medium">{slot.label}</span>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ---------------- ฝั่งขวา: กระเป๋า ---------------- */}
          <div className="flex-1 flex flex-col min-h-0">
            
            {/* Status Bar (ยึดติด) */}
            <div className="bg-[#201e1c] rounded-md p-3 mb-4 text-stone-300 text-sm flex flex-col gap-2 border border-stone-800 shrink-0">
              <div className="flex justify-between px-1">
                <span>🎒 ช่อง: {currentItemsCount} / {maxSlots}</span>
                <span>⚖️ นน.รวม: {currentWeight} / {maxWeight} kg</span>
              </div>
              <div className="w-full h-2.5 bg-stone-900 rounded-full overflow-hidden flex">
                <div className="h-full bg-cyan-500" style={{ width: '20%' }}></div>
                <div className="h-full bg-emerald-500" style={{ width: '5%' }}></div>
              </div>
            </div>

            {/* Tabs (ยึดติด) */}
            <div className="flex flex-wrap gap-2 mb-4 border-b border-stone-800 pb-3 shrink-0">
              {TABS.map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-4 py-1.5 rounded text-xs font-medium transition-colors
                    ${activeTab === tab 
                      ? 'bg-amber-600/20 text-amber-500 border border-amber-600/50' 
                      : 'bg-stone-900/50 text-stone-400 border border-stone-800 hover:bg-stone-800'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 🔽 กริด 32 ช่อง (สามารถ Scroll ขึ้นลงได้ตรงนี้) 🔽 */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-8 gap-3 auto-rows-max pb-4">
                {slots.map((slotIndex) => {
                  const itemInSlot = inventory.find(item => item.slot_index === slotIndex)

                  return (
                    <div 
                      key={slotIndex} 
                      className={itemInSlot ? filledSlotClass : emptySlotClass}
                    >
                      {itemInSlot ? (
                        <>
                          <div className="text-[10px] text-stone-300 truncate w-full text-center px-1">
                            {itemInSlot.item_ref_id.substring(0, 5)}
                          </div>
                          
                          {itemInSlot.quantity > 1 && (
                            <span className="absolute bottom-0.5 right-1 text-amber-400 text-[10px] font-bold">
                              {itemInSlot.quantity}
                            </span>
                          )}
                          
                          {itemInSlot.upgrade_level > 0 && (
                            <span className="absolute top-0.5 left-1 text-[10px] font-bold text-amber-400">
                              +{itemInSlot.upgrade_level}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-stone-700/50 text-xs">{slotIndex + 1}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}