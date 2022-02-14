import React, { useState, useEffect, useCallback } from 'react';
import { HighLightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import * as Styled from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function fetchTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));
        
        return {
          id: item.id,
          date,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
        };
      }
    );
    setData(transactionsFormatted);
  }

  useEffect(() => {
    fetchTransactions();
  });

  useFocusEffect(useCallback(() => {
    fetchTransactions();
  }, []))

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.UserWrapper>
          <Styled.UserInfo>
            <Styled.Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/62480134?v=4',
              }}
            />
            <Styled.User>
              <Styled.UserGreeting>Olá, </Styled.UserGreeting>
              <Styled.UserName>Lourenço</Styled.UserName>
            </Styled.User>
          </Styled.UserInfo>
          <Styled.LogoutButton onPress={() => {}}>
            <Styled.Icon name='power' />
          </Styled.LogoutButton>
        </Styled.UserWrapper>
      </Styled.Header>

      <Styled.HighlightCards>
        <HighLightCard
          title='Entrada'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
          type='up'
        />
        <HighLightCard
          title='Saída'
          amount='R$ 2.000'
          lastTransaction='Última entrada dia 13 de abril'
          type='down'
        />
        <HighLightCard
          title='Entrada'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
          type='total'
        />
      </Styled.HighlightCards>
      <Styled.Transactions>
        <Styled.Title>Listagem</Styled.Title>
        <Styled.TransactionsList
          data={data}
          keyExtractor={(item: DataListProps) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Styled.Transactions>
    </Styled.Container>
  );
}
