import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighLightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

import * as Styled from './styles';

export function Dashboard() {
  const data = [
    {
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000',
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: '13/04/2020',
    },
    {
      type: 'negative',
      title: 'Pizzaria',
      amount: 'R$ 65',
      category: { name: 'Vendas', icon: 'coffee' },
      date: '13/04/2020',
    },
    {
      type: 'negative',
      title: 'Pagamento Aluguel',
      amount: 'R$ 1.200',
      category: { name: 'Vendas', icon: 'shopping-bag' },
      date: '13/04/2020',
    },
  ];
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
          <Styled.Icon name='power' />
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
          renderItem={({ item }: any) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: getBottomSpace()}}
        />
      </Styled.Transactions>
    </Styled.Container>
  );
}
