import { findUniqueGroup } from '@storage/group/findUniqueGroup'
import { updateGroup } from '@storage/group/updateGroup'

interface DeletePlayerParams {
  groupId: string
  playerId: string
}

export async function deletePlayer({ groupId, playerId }: DeletePlayerParams) {
  try {
    const group = await findUniqueGroup(groupId)

    if (!group) {
      throw new Error('Turma não encontrada')
    }

    const newGroup = {
      ...group,
      players: {
        teamA: group.players.teamA.filter((player) => player.id !== playerId),
        teamB: group.players.teamB.filter((player) => player.id !== playerId),
      },
    }

    await updateGroup(newGroup)
  } catch (error) {
    console.error(error)
    throw new Error('Não foi possível criar o jogador')
  }
}
