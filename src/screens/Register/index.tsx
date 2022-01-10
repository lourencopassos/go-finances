import React from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Form/Input';
import { Container, Header, Title, Fields } from './styles';

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Fields>
        <Input placeholder='Nome' />
        <Input placeholder='Preço' />
      </Fields>
      <Button title='Adicionar' />
    </Container>
  );
}
