import styled, { css } from 'styled-components/native'

export const Container = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.GRAY_300,
}))`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    background-color: ${theme.COLORS.GRAY_700};
  `}

  border-radius: 8px;
  padding: 16px;
`
