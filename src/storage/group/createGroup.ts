import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfigs'
import { getAllGroups } from './getAllGroups'
import { GroupType } from 'src/@types/GroupType'

import uuid from 'react-native-uuid'
import { AppError } from '@utils/AppError'

export async function createGroup(newGroup: string) {
  try {
    const storedGroups = await getAllGroups()

    if (storedGroups.some((group) => group.name === newGroup)) {
      throw new AppError('Turma já cadastrada')
    }

    const newGroupModel: GroupType = {
      name: newGroup,
      id: String(uuid.v4()),
      players: {
        teamA: [],
        teamB: [],
      },
    }

    const storage = JSON.stringify([...storedGroups, newGroupModel])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)

    return newGroupModel
  } catch (error) {
    console.error(error)
    throw new Error('Não foi possível criar a turma')
  }
}
