import styled from 'styled-components/native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Props } from '.';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.seconday};
  border-radius: 5px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.shape};
  padding: 18px;
`;
