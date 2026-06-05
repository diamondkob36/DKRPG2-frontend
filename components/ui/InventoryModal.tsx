'use client'

import React, { useState, MouseEvent } from 'react'
import { InventoryItem } from '@/lib/types'

interface InventoryModalProps {
  isOpen: boolean
  onClose: () => void
  inventory: InventoryItem[]
  equipment: Record<string, string>
  maxSlots?: number
  maxWeight?: number
}

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

export default function InventoryModal({ isOpen, onClose, inventory = [], equipment = {}, maxSlots = 32, maxWeight = 60 }: InventoryModalProps) {
  const [activeTab, setActiveTab] = useState('ทั้งหมด')
  
  const [hoveredItem, setHoveredItem] = useState<{
    instance: InventoryItem, 
    x: number, 
    y: number 
  } | null>(null)

  const [actionItem, setActionItem] = useState<{
    instance: InventoryItem, 
    source: 'inventory' | 'equipment',
    slotId: string | number
  } | null>(null)

  if (!isOpen) return null

  const slots = Array.from({ length: maxSlots }, (_, i) => i)
  const currentItemsCount = inventory.length
  const currentWeight = 11.1

  const slotBaseClass = "w-16 h-16 rounded flex flex-col items-center justify-center relative cursor-pointer transition-all border"
  const emptySlotClass = `${slotBaseClass} bg-stone-900/40 border-dashed border-stone-700 hover:bg-stone-800`
  const filledSlotClass = `${slotBaseClass} bg-stone-800 border-solid border-stone-600 hover:border-amber-500 shadow-sm`

  const handleMouseEnter = (e: MouseEvent, item: InventoryItem) => {
    setHoveredItem({ instance: item, x: e.clientX, y: e.clientY })
  }
  const handleMouseMove = (e: MouseEvent) => {
    if (hoveredItem) {
      setHoveredItem(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)
    }
  }
  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans">
      
      {/* 💡 เปลี่ยน h-[85vh] เป็น h-auto max-h-[90vh] เพื่อให้หน้าต่างกระชับพอดีกับเนื้อหา */}
      <div className="bg-[#1a1816] border border-stone-700 rounded-lg shadow-2xl w-full max-w-5xl flex flex-col h-auto max-h-[90vh] relative">
        
        {/* Header */}
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

        <div className="flex flex-col md:flex-row p-5 gap-6 flex-1 min-h-0">
          
          {/* ---------------- ฝั่งซ้าย: สวมใส่ ---------------- */}
          {/* 💡 ให้ความสูง h-fit หดพอดีกับตาราง */}
          <div className="bg-[#201e1c] p-5 rounded-lg border border-stone-800 flex-shrink-0 h-fit">
            <h3 className="text-lg font-bold text-stone-200 mb-5 text-left">สวมใส่</h3>
            <div className="grid grid-cols-3 grid-rows-4 gap-3 w-max">
              {EQUIPMENT_SLOTS.map((slot) => {
                const equippedItemRef = equipment[slot.id]
                const isEquipped = !!equippedItemRef
                const dummyInstance = isEquipped ? { item_ref_id: equippedItemRef, quantity: 1, upgrade_level: 0 } as InventoryItem : null

                return (
                  <div 
                    key={slot.id}
                    className={isEquipped ? filledSlotClass : emptySlotClass}
                    style={{ gridRow: slot.row, gridColumn: slot.col }}
                    onMouseEnter={(e) => dummyInstance && handleMouseEnter(e, dummyInstance)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      if (dummyInstance) {
                        setActionItem({ instance: dummyInstance, source: 'equipment', slotId: slot.id })
                        setHoveredItem(null)
                      }
                    }}
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

            {/* 💡 ตัว Grid จะหดตามจำนวนช่อง ถ้าช่องเกินถึงจะเกิด Scrollbar */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-8 gap-3 auto-rows-max pb-1">
                {slots.map((slotIndex) => {
                  const itemInSlot = inventory.find(item => item.slot_index === slotIndex)

                  return (
                    <div 
                      key={slotIndex} 
                      className={itemInSlot ? filledSlotClass : emptySlotClass}
                      onMouseEnter={(e) => itemInSlot && handleMouseEnter(e, itemInSlot)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => {
                        if (itemInSlot) {
                          setActionItem({ instance: itemInSlot, source: 'inventory', slotId: slotIndex })
                          setHoveredItem(null)
                        }
                      }}
                    >
                      {itemInSlot ? (
                        <>
                          <div className="text-[10px] text-stone-300 truncate w-full text-center px-1">
                            {itemInSlot.item_ref_id.substring(0, 5)}
                          </div>
                          {itemInSlot.quantity > 1 && (
                            <span className="absolute bottom-0.5 right-1 text-amber-400 text-[10px] font-bold">{itemInSlot.quantity}</span>
                          )}
                          {itemInSlot.upgrade_level > 0 && (
                            <span className="absolute top-0.5 left-1 text-[10px] font-bold text-amber-400">+{itemInSlot.upgrade_level}</span>
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

        {/* ---------------- 🎯 1. Tooltip ตอนเอาเมาส์ชี้ (Hover) ---------------- */}
        {hoveredItem && !actionItem && (
          <div 
            className="fixed z-[60] bg-stone-900/95 backdrop-blur-md border border-stone-600 rounded-lg p-3 shadow-xl w-64 pointer-events-none"
            style={{ top: hoveredItem.y + 15, left: hoveredItem.x + 15 }}
          >
            {/* 🆕 ส่วนหัว: รูปไอเทม + ชื่อ */}
            <div className="flex gap-3 mb-3">
              {/* กรอบรูปไอเทม (ตอนนี้ใส่คำว่า IMG ไว้ก่อน เดี๋ยวเราค่อยดึงรูปจริงมาใส่) */}
              <div className="w-12 h-12 bg-stone-800 border border-stone-600 rounded shrink-0 flex items-center justify-center">
                <span className="text-xs text-stone-400">
                  {hoveredItem.instance.item_ref_id.substring(0, 3)}
                </span>
              </div>
              
              {/* ชื่อและประเภท */}
              <div className="flex-1">
                <h4 className="text-amber-400 font-bold text-sm leading-tight border-b border-stone-700 pb-1 mb-1">
                  {hoveredItem.instance.item_ref_id} {hoveredItem.instance.upgrade_level > 0 ? `+${hoveredItem.instance.upgrade_level}` : ''}
                </h4>
                <p className="text-[10px] text-stone-400">ประเภท: อุปกรณ์สวมใส่</p>
              </div>
            </div>

            {/* ส่วนรายละเอียดสเตตัส */}
            <div className="text-xs text-stone-300 space-y-1 bg-stone-950/50 p-2 rounded border border-stone-800">
              <p className="text-stone-400 italic mb-2 text-[10px]">"คำอธิบายไอเทมจะแสดงตรงนี้..."</p>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <span>พลังโจมตี:</span> <span className="text-white text-right">+10</span>
                <span>ความทนทาน:</span> <span className="text-green-400 text-right">50/50</span>
                <span>น้ำหนัก:</span> <span className="text-stone-400 text-right">2.5 kg</span>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 🎯 2. Action Popup (หน้าต่างยืนยันเมื่อคลิก) ---------------- */}
        {actionItem && (
          <div className="absolute inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg">
            <div className="bg-[#1a1816] border-2 border-stone-600 rounded-lg shadow-2xl p-5 w-80 text-center animate-in zoom-in-95 duration-200">
              
              <div className="w-16 h-16 bg-stone-800 border border-stone-600 rounded mx-auto mb-3 flex items-center justify-center">
                 <span className="text-xs text-stone-300">{actionItem.instance.item_ref_id.substring(0, 5)}</span>
              </div>
              
              <h3 className="text-lg font-bold text-amber-500 mb-1">
                จัดการไอเทม
              </h3>
              <p className="text-sm text-stone-400 mb-5 border-b border-stone-700 pb-3">
                {actionItem.instance.item_ref_id}
              </p>

              <div className="flex flex-col gap-2">
                {actionItem.source === 'inventory' ? (
                  <>
                    <button className="w-full py-2 bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 border border-amber-600/50 rounded font-bold transition-colors">
                      สวมใส่ / ใช้งาน
                    </button>
                    <button className="w-full py-2 bg-red-900/20 hover:bg-red-900/50 text-red-400 border border-red-900/50 rounded font-medium transition-colors">
                      ทิ้งไอเทม
                    </button>
                  </>
                ) : (
                  <button className="w-full py-2 bg-stone-700/50 hover:bg-stone-700 text-stone-200 border border-stone-600 rounded font-bold transition-colors">
                    ถอดออก
                  </button>
                )}
                
                <button 
                  onClick={() => setActionItem(null)}
                  className="w-full py-2 mt-2 bg-transparent hover:bg-stone-800 text-stone-500 hover:text-stone-300 rounded font-medium transition-colors"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}