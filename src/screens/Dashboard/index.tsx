import React from 'react';
import { HighLightCard } from '../../components/HighlightCard';

import * as Styled from './styles';

export function Dashboard() {
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
    </Styled.Container>
  );
}
