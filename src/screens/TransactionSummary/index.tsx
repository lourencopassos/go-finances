import React, { useCallback, useState } from 'react';
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
  LoadingContainer,
} from './styles';
import { HistoryCard } from '../../components/HistoryCard';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const bottomHeigth = useBottomTabBarHeight();

  function handleSelectedDateChange(action: 'next' | 'previous') {
    setIsLoading(true);
    let newDate: Date;
    if (action === 'next') {
      newDate = addMonths(selectedDate, 1);
    } else {
      newDate = subMonths(selectedDate, 1);
    }
    setSelectedDate(newDate);
  }

  const theme = useTheme();

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const expenses = transactions.filter(
      (transaction: TransactionData) =>
        transaction.type === 'negative' &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
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

        const percent = `${((categorySum / totalExpenses) * 100).toFixed(0)}%`;

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
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size='large' />
        </LoadingContainer>
      ) : (
        <>
          <MonthSelect>
            <MonthSelectButton
              onPress={() => handleSelectedDateChange('previous')}
            >
              <MonthSelectIcon name='chevron-left' />
            </MonthSelectButton>
            <Month>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </Month>
            <MonthSelectButton onPress={() => handleSelectedDateChange('next')}>
              <MonthSelectIcon name='chevron-right' />
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x={'percent'}
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
              paddingBottom: bottomHeigth,
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
        </>
      )}
    </Container>
  );
}
