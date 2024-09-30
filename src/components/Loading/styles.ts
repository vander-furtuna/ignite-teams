import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const LoadIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: 'large',
  color: theme.COLORS.GREEN_700,
}))``
