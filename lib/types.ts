export interface Character {
  id: string
  username: string
  class_key: string
  class_name: string
  lvl: number
  exp: number
  max_exp: number
  gold: number
  hp: number
  max_hp: number
  mp: number
  max_mp: number
  str: number
  agi: number
  int: number
  def: number
  stat_points: number
  avatar_url?: string
}

export interface ClassOption {
  key: string
  name: string
  desc: string
  stats: {
    // Base Stats
    hp: number
    maxHp: number
    baseMp: number
    str: number
    int: number
    agi: number
    def: number
    
    // Regen Stats (สำหรับฟื้นฟูทุกๆ 3 เทิร์น)
    hpRegen: number
    mpRegen: number

    // Combat Stats
    acc: number
    block: number
    dmgRed: number
    critRate: number
    critDmg: number
    dodge: number
    ignoreBlock: number
  }
  image: string
  isSprite: boolean
  frames: number
}