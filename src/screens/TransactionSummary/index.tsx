import React from 'react';
import { Container, Title } from './styles';

interface Props {
  color: string;
  amount: string;
  title: string;
}

export function TransactionSummary({ color, amount, title }: Props) {
  return (
    <Container>
      <Title>Resumo por Categoria</Title>
    </Container>
  );
}
