import React from 'react';
import { Container } from './styles';
import { Input } from '../Input';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

interface Props extends TextInputProps {
  control: Control;
  name: string;
}

export function FormInput({ control, name, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input {...rest} onChangeText={onChange} />
        )}
        name={name}
      />
    </Container>
  );
}
