import { GroupType } from 'src/@types/GroupType'
import { getAllGroups } from './getAllGroups'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfigs'

export async function updateGroup(group: GroupType) {
  const storedGroups = await getAllGroups()
  const updatedGroups = storedGroups.map((storedGroup) => {
    if (storedGroup.id === group.id) {
      return group
    }
    return storedGroup
  })

  const storage = JSON.stringify(updatedGroups)
  await AsyncStorage.setItem(GROUP_COLLECTION, storage)
}
