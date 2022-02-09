import React, { useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const navigation = useNavigation();

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

  function resetForm() {
    reset();
    setTransactionType('');
    setCategorySelected({key: 'category', name: 'Categoria'})
  }

  async function handleRegister(form: FormData) {
    const dataKey = '@gofinances:transactions';
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      category: categorySelected,
      transactionType,
      date: new Date()
    };

    if (!newTransaction.transactionType) {
      return Alert.alert('Selecione o tipo de transação');
    }

    if (newTransaction.category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction,
      ];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      resetForm();
      navigation.navigate('Listagem');
    } catch (error) {
      Alert.alert('Não foi possível salvar');
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
