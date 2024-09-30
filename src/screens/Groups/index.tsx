import { Header } from '@components/Header'
import { GroupsContainer } from './styles'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/buttons/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { GroupType } from 'src/@types/GroupType'
import { getAllGroups } from '@storage/group/getAllGroups'
import { Loading } from '@components/Loading'

export function Groups() {
  const [groups, setGroups] = useState<GroupType[]>([])
  const [loading, setLoading] = useState(false)

  const { navigate } = useNavigation()

  function handleNewGroup() {
    navigate('new')
  }

  function handleNavigateToPlayers(groupId: string) {
    navigate('players', { groupId })
  }

  useFocusEffect(
    useCallback(() => {
      async function loadGroups() {
        setLoading(true)
        const groups = await getAllGroups()
        setGroups(groups)
        setLoading(false)
      }
      loadGroups()
    }, []),
  )

  return (
    <GroupsContainer>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GroupCard
              title={item.name}
              onPress={() => handleNavigateToPlayers(item.id)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          }
        />
      )}

      <Button text="Criar nova turma" onPress={handleNewGroup} />
    </GroupsContainer>
  )
}
