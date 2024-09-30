import { findUniqueGroup } from '@storage/group/findUniqueGroup'
import { updateGroup } from '@storage/group/updateGroup'
import uuid from 'react-native-uuid'

interface CreatePlayerParams {
  name: string
  groupId: string
  team: 'teamA' | 'teamB'
}

export async function createPlayer({
  name,
  groupId,
  team,
}: CreatePlayerParams) {
  try {
    const group = await findUniqueGroup(groupId)

    if (!group) {
      throw new Error('Turma não encontrada')
    }

    const newPlayer = { id: String(uuid.v4()), name }

    const newGroup = {
      ...group,
      players: {
        ...group.players,
        [team]: [...group.players[team], newPlayer],
      },
    }

    await updateGroup(newGroup)
  } catch (error) {
    console.error(error)
    throw new Error('Não foi possível criar o jogador')
  }
}
