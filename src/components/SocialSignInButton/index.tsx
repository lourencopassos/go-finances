import React from 'react';
import { SvgProps } from 'react-native-svg';
import { RectButtonProps } from 'react-native-gesture-handler';


interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}
export function SocialSignInButton({ title, svg: Svg }: Props) {
  return null;
}
