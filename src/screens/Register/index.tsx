import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { Input } from '../../components/Form/Input';
import { Container, Header, Title, Fields, TransactionTypes } from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const handleTransactionTypeSelect = (transactionTypeSelected: 'up' | 'down') => {
    setTransactionType(transactionTypeSelected)
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Fields>
        <Input placeholder='Nome' />
        <Input placeholder='Preço' />
        <TransactionTypes>
          <TransactionTypeButton
            type='up'
            title='Income'
            onPress={() => handleTransactionTypeSelect('up')}
            isActive={transactionType === 'up'}
          />
          <TransactionTypeButton
            type='down'
            title='Outcome'
            onPress={() => handleTransactionTypeSelect('down')}
            isActive={transactionType === 'down'}
          />
        </TransactionTypes>
      </Fields>
      <Button title='Adicionar' />
    </Container>
  );
}
