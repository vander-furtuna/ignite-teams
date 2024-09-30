type Player = {
  name: string
  id: string
}

export type GroupType = {
  name: string
  id: string
  players: {
    teamA: Player[]
    teamB: Player[]
  }
}
