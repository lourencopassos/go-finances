import React from 'react';
import AppleLogo from '../../assets/apple.svg';
import GoFinancesLogo from '../../assets/logo.svg';
import GoogleLogo from '../../assets/google.svg';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

export function SignIn() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <GoFinancesLogo width={RFValue(200)} heigth={RFValue(200)} />
          <Title>
            Controle suas finanças {'\n'}
            de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {'\n'} uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer></Footer>
    </Container>
  );
}
