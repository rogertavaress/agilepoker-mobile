import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonComponentText } from './styles';

interface IButton extends RectButtonProperties {
  text: string;
  disabled?: boolean;
}

const Button: React.FC<IButton> = ({ text, disabled, ...rest }) => {
  return (
    <Container disabled={disabled} {...rest}>
      <ButtonComponentText>{text}</ButtonComponentText>
    </Container>
  );
};

export default Button;
