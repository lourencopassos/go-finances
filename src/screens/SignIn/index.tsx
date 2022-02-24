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
  FooterWrapper,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { SocialSignInButton } from '../../components/SocialSignInButton';

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
      <Footer>
        <FooterWrapper>
          <SocialSignInButton title='Entrar com o Google' svg={GoogleLogo} />
          <SocialSignInButton title='Entrar com Apple' svg={AppleLogo} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
