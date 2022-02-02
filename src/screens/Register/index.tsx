import React, { useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
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
import { Keyboard } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type FormData = {
  [name: string]: any;
};

const formSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .required('Valor obrigatório')
    .positive('Valor positivo'),
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleTransactionTypeSelect = (
    transactionTypeSelected: 'up' | 'down'
  ) => {
    setTransactionType(transactionTypeSelected);
  };

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

    validateForm(data);

    console.log(data);
  }

  function validateForm(form: FormData) {
    if (!form.transactionType) {
      return Alert.alert('Selecione o tipo de transação');
    }

    if (form.category === 'category') {
      return Alert.alert('Selecione a categoria');
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <FormInput
              placeholder='Nome'
              name='name'
              control={control}
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors?.name?.message}
            />
            <FormInput
              placeholder='Preço'
              name='amount'
              control={control}
              keyboardType='numeric'
              error={errors?.amount?.message}
            />
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
          <Button title='Adicionar' onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={categorySelected}
            setCategory={setCategorySelected}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
