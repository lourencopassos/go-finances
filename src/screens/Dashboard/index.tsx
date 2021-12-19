import React from 'react';

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
    </Styled.Container>
  );
}
