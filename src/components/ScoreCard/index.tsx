import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, Content, ScoreCardText } from './styles';

interface ScoreCardProps extends RectButtonProperties {
  selected: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  children,
  selected,
  ...rest
}) => {
  return (
    <Container selected={selected} {...rest}>
      <Content selected={selected}>
        <ScoreCardText selected={selected}>{children}</ScoreCardText>
      </Content>
    </Container>
  );
};

export default ScoreCard;
