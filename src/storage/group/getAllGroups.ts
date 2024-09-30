import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfigs'
import { GroupType } from 'src/@types/GroupType'

export async function getAllGroups() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)

    const groups: GroupType[] = storage ? JSON.parse(storage) : []

    return groups
  } catch (error) {
    console.log(error)
    throw new Error('Não foi possível buscar as turmas')
  }
}
