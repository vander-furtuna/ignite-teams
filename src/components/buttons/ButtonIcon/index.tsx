import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ButtonIconTypeStyleProps, Container, Icon } from './styles'

interface ButtonIconProps extends TouchableOpacityProps {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({
  icon,
  type = 'PRIMARY',
  ...props
}: ButtonIconProps) {
  return (
    <Container {...props}>
      <Icon name={icon} type={type} />
    </Container>
  )
}
