import React, { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';

import {
  Container,
  HeaderView,
  HelloText,
  Card,
  CardTitle,
  CardTable,
  CardTableHeader,
  CardTableColumn,
  CardTableHeaderTitle,
  CardTableSection,
  CardTableLine,
  CardTableSectionName,
  CardTableSectionText,
  CardTableSectionDescription,
  CardTableSectionScore,
  CardTableSectionScoreText,
  Space,
} from '../styles';

import { ScoreCardsArea, ScoreCardLine } from './styles';
import { useMeet } from '../../../hooks/meet';
import ScoreCard from '../../../components/ScoreCard';

const Participant: React.FC = () => {
  const { name } = useMeet();
  const [cardSelected, setCardSelected] = useState<number>();
  const [canVote, setCanVote] = useState(true);

  const selectCard = useCallback((value: number) => {
    setCardSelected(value);
  }, []);

  return (
    <Container contentContainerStyle={{ paddingBottom: 100 }}>
      <StatusBar barStyle="light-content" backgroundColor="#222533" />
      <HeaderView>
        <HelloText>Olá, {name}!</HelloText>
      </HeaderView>
      <Card>
        <CardTitle>Meus votos</CardTitle>
        <CardTable>
          <CardTableHeader>
            <CardTableColumn flex={3}>
              <CardTableHeaderTitle>História</CardTableHeaderTitle>
            </CardTableColumn>
            <CardTableColumn flex={1}>
              <CardTableHeaderTitle>Pontuação</CardTableHeaderTitle>
            </CardTableColumn>
          </CardTableHeader>
          <CardTableSection>
            <CardTableLine>
              <CardTableColumn flex={3}>
                <CardTableSectionName>
                  <CardTableSectionText>Criar um botão</CardTableSectionText>
                  <CardTableSectionDescription>Bug</CardTableSectionDescription>
                </CardTableSectionName>
              </CardTableColumn>
              <CardTableColumn flex={1}>
                <CardTableSectionScore>
                  <CardTableSectionScoreText>5</CardTableSectionScoreText>
                </CardTableSectionScore>
              </CardTableColumn>
            </CardTableLine>
          </CardTableSection>
        </CardTable>
      </Card>
      <Card>
        <CardTitle>Cartas</CardTitle>
        <ScoreCardsArea>
          <ScoreCardLine>
            <ScoreCard
              enabled={canVote}
              selected={cardSelected === 0}
              onPress={() => selectCard(0)}
            >
              00
            </ScoreCard>
            <Space />
            <ScoreCard
              enabled={canVote}
              selected={cardSelected === 1}
              onPress={() => selectCard(1)}
            >
              01
            </ScoreCard>
            <Space />
            <ScoreCard
              enabled={canVote}
              selected={cardSelected === 3}
              onPress={() => selectCard(3)}
            >
              03
            </ScoreCard>
          </ScoreCardLine>
          <ScoreCardLine>
            <ScoreCard
              enabled={canVote}
              selected={cardSelected === 5}
              onPress={() => selectCard(5)}
            >
              05
            </ScoreCard>
            <Space />
            <ScoreCard
              enabled={canVote}
              selected={cardSelected === 8}
              onPress={() => selectCard(8)}
            >
              08
            </ScoreCard>
            <Space />
            <ScoreCard
              enabled={canVote}
              selected={cardSelected === 13}
              onPress={() => selectCard(13)}
            >
              13
            </ScoreCard>
          </ScoreCardLine>
          <ScoreCardLine>
            <ScoreCard
              enabled={canVote}
              selected={cardSelected === 20}
              onPress={() => selectCard(20)}
            >
              20
            </ScoreCard>
            <Space />
            <ScoreCard
              enabled={canVote}
              selected={cardSelected === 40}
              onPress={() => selectCard(40)}
            >
              40
            </ScoreCard>
            <Space />
            <ScoreCard
              enabled={canVote}
              selected={cardSelected === 100}
              onPress={() => selectCard(100)}
            >
              100
            </ScoreCard>
          </ScoreCardLine>
        </ScoreCardsArea>
      </Card>
    </Container>
  );
};

export default Participant;
