import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
import { FormInput } from '../../components/Form/FormInput';
import {
  Container,
  Header,
  Title,
  Fields,
  TransactionTypes,
  Form,
} from './styles';
import { CategorySelect } from '../CategorySelect';

export type FormData = {
  [name: string]: any;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState({key: 'category', name: 'Categoria'});
  const { control, handleSubmit } = useForm();

  const handleTransactionTypeSelect = (transactionTypeSelected: 'up' | 'down') => {
    setTransactionType(transactionTypeSelected)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      category: categorySelected,
      transactionType,
    };

    console.log(data);
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <FormInput placeholder='Nome' name='name' control={control} />
          <FormInput placeholder='Preço' name='price' control={control} />
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
          <CategorySelectButton
            title={categorySelected.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button title='Adicionar' onPress={handleSubmit(handleRegister)}     />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={categorySelected}
          setCategory={setCategorySelected}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
