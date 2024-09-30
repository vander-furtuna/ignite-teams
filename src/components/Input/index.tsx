import { TextInputProps, TextInput } from 'react-native'
import { Container } from './styles'
import { RefObject } from 'react'

interface InputProps extends TextInputProps {
  inputRef?: RefObject<TextInput>
}

export function Input({ inputRef, ...props }: InputProps) {
  return <Container {...props} ref={inputRef} />
}
