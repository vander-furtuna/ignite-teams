import { ButtonIcon } from '@components/buttons/ButtonIcon'
import { Container, Icon, Name } from './styles'

interface PalyerCardProps {
  name: string
  onRemove: () => void
}

export function PlayerCard({ name, onRemove }: PalyerCardProps) {
  return (
    <Container>
      <Icon name="person" />

      <Name>{name}</Name>

      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  )
}
