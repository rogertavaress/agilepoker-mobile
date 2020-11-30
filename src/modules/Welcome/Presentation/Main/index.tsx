import React from 'react';
import { PresentationScreenProps } from '..';
import Button from '../../../../components/Button';

import { Container, Text } from './styles';

const Main: React.FC<PresentationScreenProps> = ({ goTo }) => {
  return (
    <Container>
      <Button
        text="Entrar em uma reunião"
        onPress={() => goTo && goTo('run')}
      />
      <Text>ou</Text>
      <Button text="Criar uma reunião" onPress={() => goTo && goTo('create')} />
    </Container>
  );
};

export default Main;
