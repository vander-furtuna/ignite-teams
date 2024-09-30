import { Highlight } from '@components/Highlight'
import { Container, Content, Icon } from './styles'
import { Header } from '@components/Header'
import { Button } from '@components/buttons/Button'
import { Input } from '@components/Input'
import { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { createGroup } from '@storage/group/createGroup'
import { AppError } from '@utils/AppError'
import { Alert, TextInput } from 'react-native'

interface NewGroupProps {
  // Defina suas props aqui
}

export function NewGroup({ ...props }: NewGroupProps) {
  const [group, setGroup] = useState('')

  const { navigate } = useNavigation()

  const newGroupInputRef = useRef<TextInput>(null)

  async function handleCreateNewGroup() {
    try {
      if (group.trim().length === 0) {
        Alert.alert('Novo Grupo', 'O nome do grupo não pode ser vazio')
      }

      const { id } = await createGroup(group.trim())
      newGroupInputRef.current?.blur()
      navigate('players', { groupId: id })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar o grupo')
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          inputRef={newGroupInputRef}
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
          onSubmitEditing={handleCreateNewGroup}
          returnKeyType="done"
        />
        <Button
          text="Criar"
          style={{ marginTop: 20 }}
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  )
}
