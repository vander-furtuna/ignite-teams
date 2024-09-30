import { GROUP_COLLECTION } from '@storage/storageConfigs'
import { getAllGroups } from './getAllGroups'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function deleteGroup(groupId: string) {
  console.log('deleteGroup', groupId)
  try {
    const storedGroups = await getAllGroups()
    const newGroups = storedGroups.filter((group) => group.id !== groupId)
    const storage = JSON.stringify(newGroups)
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    console.error(error)
    throw new Error('Não foi possível remover a turma')
  }
}
