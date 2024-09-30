import { getAllGroups } from './getAllGroups'

export async function findUniqueGroup(groupId: string) {
  try {
    const groups = await getAllGroups()

    const group = groups.find((group) => group.id === groupId)

    return group
  } catch (error) {
    console.log(error)
    throw new Error('Não foi possível buscar as turmas')
  }
}
