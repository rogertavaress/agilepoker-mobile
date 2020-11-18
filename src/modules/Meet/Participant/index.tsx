import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from './styles';

const Participant: React.FC = () => {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#222533" />
    </Container>
  );
};

export default Participant;
