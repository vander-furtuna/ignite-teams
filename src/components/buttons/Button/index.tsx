import { TouchableOpacityProps } from 'react-native'
import { ButtonTypeStyleProps, Container, Text } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  text: string
  type?: ButtonTypeStyleProps
}

export function Button({ text, type = 'PRIMARY', ...props }: ButtonProps) {
  return (
    <Container type={type} {...props}>
      <Text>{text}</Text>
    </Container>
  )
}
