import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { Input } from '@components/Input'
import { ButtonIcon } from '@components/buttons/ButtonIcon'
import { Filter } from '@components/Filter'
import { Alert, FlatList, TextInput } from 'react-native'
import { useCallback, useMemo, useRef, useState } from 'react'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/buttons/Button'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { findUniqueGroup } from '@storage/group/findUniqueGroup'
import { GroupType } from 'src/@types/GroupType'
import { createPlayer } from '@storage/player/createPlayer'
import { deletePlayer } from '@storage/player/deletePlayer'
import { deleteGroup } from '@storage/group/deleteGroup'
import { Loading } from '@components/Loading'

export function Players() {
  const [loading, setLoading] = useState(false)
  const [team, setTeam] = useState('Time A')
  const [group, setGroup] = useState<GroupType>()
  const [player, setPlayer] = useState('')

  const { params } = useRoute()
  const { navigate } = useNavigation()
  const newPlayerNameInputRef = useRef<TextInput>(null)

  const groupId = params?.groupId
  const numberOfPlayers = useMemo(
    () => (group ? group.players.teamA.length + group.players.teamB.length : 0),
    [group],
  )

  const loadGroup = useCallback(async () => {
    setLoading(true)
    const group = await findUniqueGroup(groupId)
    setGroup(group)
    setLoading(false)
  }, [groupId])

  async function handleCreatePlayer() {
    const newTeam = team === 'Time A' ? 'teamA' : 'teamB'

    if (player.trim().length === 0) {
      return Alert.alert('Novo Jogador', 'O nome do jogador não pode ser vazio')
    }

    try {
      await createPlayer({ name: player.trim(), groupId, team: newTeam })
      newPlayerNameInputRef.current?.blur()
      loadGroup()
      setPlayer('')
    } catch (error) {
      console.error(error)
      throw new Error('Não foi possível criar o jogador')
    }
  }

  async function removePlayer(playerId: string) {
    try {
      await deletePlayer({ groupId, playerId })
      loadGroup()
    } catch (error) {
      console.error(error)
      throw new Error('Não foi possível remover o jogador')
    }
  }

  function handleRemovePlayer(playerId: string) {
    Alert.alert(
      'Remover jogador',
      'Tem certeza que deseja remover o jogador?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => removePlayer(playerId),
        },
      ],
    )
  }

  async function removeGroup() {
    try {
      await deleteGroup(groupId)
      navigate('groups')
    } catch (error) {
      console.error(error)
      throw new Error('Não foi possível remover a turma')
    }
  }

  function handleDeleteGroup() {
    Alert.alert('Remover turma', 'Tem certeza que deseja remover a turma?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        onPress: removeGroup,
      },
    ])
  }

  useFocusEffect(
    useCallback(() => {
      loadGroup()
    }, [loadGroup]),
  )

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group?.name || 'Turma'}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setPlayer}
          value={player}
          onSubmitEditing={handleCreatePlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleCreatePlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{numberOfPlayers}</NumberOfPlayers>
      </HeaderList>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={team === 'Time A' ? group?.players.teamA : group?.players.teamB}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.id)}
            />
          )}
          ListEmptyComponent={
            <ListEmpty message="Não há pessoas nessa turma :(" />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            !numberOfPlayers && { flex: 1 },
          ]}
        />
      )}

      <Button
        text="Remover Turma"
        type="SECONDARY"
        style={{ marginTop: 20 }}
        onPress={handleDeleteGroup}
      />
    </Container>
  )
}
