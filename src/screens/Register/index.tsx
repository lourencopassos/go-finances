import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
import {
  Container,
  Header,
  Title,
  Fields,
  TransactionTypes,
  Form,
} from './styles';
import { CategorySelect } from '../CategorySelect';

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState({key: 'category', name: 'Categoria'});

  const handleTransactionTypeSelect = (transactionTypeSelected: 'up' | 'down') => {
    setTransactionType(transactionTypeSelected)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
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
          <CategorySelectButton title={categorySelected.name} onPress={handleOpenSelectCategoryModal}/>
        </Fields>
        <Button title='Adicionar' />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={categorySelected}
          setCategory={setCategorySelected}
          closeSelectCategory={handleCloseSelectCategoryModal} />
      </Modal>
    </Container>
  );
}
