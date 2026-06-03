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
    hp: number
    mp: number
    str: number
    agi: number
    int: number
  }
  image: string
  isSprite: boolean
  frames: number
}
