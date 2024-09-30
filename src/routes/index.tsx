import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import { useTheme } from 'styled-components/native'

export function Routes() {
  const { COLORS } = useTheme()
  setBackgroundColorAsync(COLORS.GRAY_600)

  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.GRAY_600,
    },
  }

  return (
    <NavigationContainer theme={myTheme}>
      <AppRoutes />
    </NavigationContainer>
  )
}
