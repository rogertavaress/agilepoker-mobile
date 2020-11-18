import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonComponentText } from './styles';

interface IButton extends RectButtonProperties {
  text: string;
  disabled?: boolean;
}

const ButtonAlternative: React.FC<IButton> = ({ text, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonComponentText>{text}</ButtonComponentText>
    </Container>
  );
};

export default ButtonAlternative;
