import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { HighLightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import * as Styled from './styles';
import { LoadingContainer } from './styles';
import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  value: string;
  lastTransactionDate: string;
}
interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({
    entries: { value: '', lastTransactionDate: '' },
    expenses: { value: '', lastTransactionDate: '' },
    total: { value: '', lastTransactionDate: '' },
  });

  async function fetchTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    if (!response) {
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    let entriesTotalSum = 0;
    let totalExpenses = 0;
    let total = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        if (item.type === 'positive') {
          entriesTotalSum += Number(item.amount);
        } else {
          totalExpenses += Number(item.amount);
        }
        total = entriesTotalSum - totalExpenses;

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
    setTransactions(transactionsFormatted);

    const lastTransactionsEntries = getLastTransactionDate(
      transactions,
      'positive'
    );
    const lastTransactionsExpenses = getLastTransactionDate(
      transactions,
      'negative'
    );

    const totalInterval = `01 a ${lastTransactionsExpenses}`;

    setHighlightData({
      entries: {
        value: entriesTotalSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransactionDate: `??ltima entrada dia ${lastTransactionsEntries}`,
      },
      expenses: {
        value: totalExpenses.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransactionDate: `??ltima sa??da dia ${lastTransactionsExpenses}`,
      },
      total: {
        value: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransactionDate: totalInterval,
      },
    });
    setIsLoading(false);
  }

  function getLastTransactionDate(
    transactionCollection: DataListProps[],
    type: 'positive' | 'negative'
  ): string {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        transactionCollection
          .filter((transaction: DataListProps) => transaction.type === type)
          .map((transaction: DataListProps) =>
            new Date(transaction.date).getTime()
          )
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      { month: 'long' }
    )}`;
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  const theme = useTheme();

  return (
    <Styled.Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size='large' />
        </LoadingContainer>
      ) : (
        <>
          <Styled.Header>
            <Styled.UserWrapper>
              <Styled.UserInfo>
                <Styled.Photo
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/62480134?v=4',
                  }}
                />
                <Styled.User>
                  <Styled.UserGreeting>Ol??, </Styled.UserGreeting>
                  <Styled.UserName>Louren??o</Styled.UserName>
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
              amount={highlightData.entries.value}
              lastTransaction='??ltima entrada dia 13 de abril'
              type='up'
            />
            <HighLightCard
              title='Sa??da'
              amount={highlightData.expenses.value}
              lastTransaction='??ltima entrada dia 13 de abril'
              type='down'
            />
            <HighLightCard
              title='Total'
              amount={highlightData.total.value}
              lastTransaction='01 a 16 de abril'
              type='total'
            />
          </Styled.HighlightCards>
          <Styled.Transactions>
            <Styled.Title>Listagem</Styled.Title>
            <Styled.TransactionsList
              data={transactions}
              keyExtractor={(item: DataListProps) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Styled.Transactions>
        </>
      )}
    </Styled.Container>
  );
}
