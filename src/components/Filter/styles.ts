import { css } from 'styled-components'
import styled from 'styled-components/native'

export type FilterStyleProps = {
  isActive?: boolean
}

export const Container = styled.TouchableOpacity<FilterStyleProps>`
  width: 100%;

  ${({ isActive = false, theme }) =>
    isActive &&
    css`
      border: 1px solid ${theme.COLORS.GREEN_700};
    `}

  border-radius: 8px;
  margin-right: 12px;

  height: 38px;
  width: 70px;

  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`
