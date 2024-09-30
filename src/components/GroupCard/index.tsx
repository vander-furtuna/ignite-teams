import { TouchableOpacityProps } from 'react-native'
import { Container, Icon, Title } from './styles'

interface GroupCardProps extends TouchableOpacityProps {
  title: string
}

export function GroupCard({ title, ...props }: GroupCardProps) {
  return (
    <Container {...props}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}
