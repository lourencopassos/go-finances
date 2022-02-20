import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../../utils/categories';
import {
  Container,
  Title,
  Header,
  Content,
  ChartContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
} from './styles';
import { HistoryCard } from '../../components/HistoryCard';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface TransactionData {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function TransactionSummary() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();
  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const expenses = transactions.filter(
      (transaction: TransactionData) => transaction.type === 'negative'
    );

    const totalExpenses = expenses.reduce(
      (accumulattor: number, expense: TransactionData) => {
        return accumulattor + Number(expense.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });
      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${(categorySum / totalExpenses) * 100}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted,
          color: category.color,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }
  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      <MonthSelect>
        <MonthSelectButton>
          <MonthSelectIcon name='chevron-left' />
        </MonthSelectButton>
        <Month></Month>
        <MonthSelectButton>
          <MonthSelectIcon name='chevron-right' />
        </MonthSelectButton>
      </MonthSelect>
      <ChartContainer>
        <VictoryPie
          data={totalByCategories}
          x={'name'}
          y={'percent'}
          style={{
            labels: {
              fontSize: RFValue(18),
              fontWeight: 'bold',
              fill: theme.colors.shape,
            },
          }}
          labelRadius={50}
          colorScale={totalByCategories.map((category) => category.color)}
        />
      </ChartContainer>
      <Content
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
        showsVerticalScrollIndicator={false}
      >
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
