import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonComponentText } from './styles';

interface IButton extends RectButtonProperties {
  text?: string;
  disabled?: boolean;
}

const ButtonAlternative: React.FC<IButton> = ({
  text,
  enabled = true,
  ...rest
}) => {
  return (
    <Container enabled={enabled} {...rest}>
      {text ? (
        <>
          <ButtonComponentText>{text}</ButtonComponentText>
        </>
      ) : (
        <>{rest.children}</>
      )}
    </Container>
  );
};

export default ButtonAlternative;
