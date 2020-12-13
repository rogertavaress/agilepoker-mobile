import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import History from '../../../entities/History';

interface MyHistoryVoteItemProps {
  id: number;
  name: string;
  category: string;
  vote: string;
}

const Participant: React.FC = () => {
  const { participant, meet, sendVote } = useMeet();
  const [cardSelected, setCardSelected] = useState<number>();
  const [historyNowId, setHistoryNowId] = useState<number>();

  const canVote = useMemo(() => {
    return meet?.status === 'started' && meet.historyNowId >= 0;
  }, [meet]);

  const histories = useMemo<History[]>(
    () => meet?.histories?.sort((a, b) => a.id - b.id) ?? [],
    [meet],
  );

  const myHistoryVotes = useMemo<MyHistoryVoteItemProps[]>(() => {
    const resp: MyHistoryVoteItemProps[] = [];

    histories.forEach((history) => {
      const vote = history.votes?.find(
        (voteHistory) => voteHistory.participantId === participant?.id,
      );

      if (vote) {
        resp.push({
          id: history.id,
          name: history.name,
          category: history.category,
          vote: `${vote.number}`,
        });
      }
    });

    return resp;
  }, [histories, participant]);

  useEffect(() => {
    if (historyNowId !== meet?.historyNowId) {
      setHistoryNowId(meet?.historyNowId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meet]);

  useEffect(() => {
    setCardSelected(undefined);
  }, [historyNowId]);

  const selectCard = useCallback(
    async (value: number) => {
      await sendVote(
        {
          number: value,
        },
        async () => {
          setCardSelected(value);
        },
      );
    },
    [sendVote],
  );

  return (
    <Container contentContainerStyle={{ paddingBottom: 100 }}>
      <StatusBar barStyle="light-content" backgroundColor="#222533" />
      <HeaderView>
        <HelloText>
          Olá{participant?.name ? `, ${participant?.name}` : ''}!
        </HelloText>
      </HeaderView>
      {!!myHistoryVotes.length && (
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
              {myHistoryVotes.map((history) => (
                <CardTableLine key={history.id}>
                  <CardTableColumn flex={3}>
                    <CardTableSectionName>
                      <CardTableSectionText>
                        {history.name}
                      </CardTableSectionText>
                      <CardTableSectionDescription>
                        {history.category}
                      </CardTableSectionDescription>
                    </CardTableSectionName>
                  </CardTableColumn>
                  <CardTableColumn flex={1}>
                    <CardTableSectionScore>
                      <CardTableSectionScoreText>
                        {history.vote}
                      </CardTableSectionScoreText>
                    </CardTableSectionScore>
                  </CardTableColumn>
                </CardTableLine>
              ))}
            </CardTableSection>
          </CardTable>
        </Card>
      )}
      <Card>
        <CardTitle>
          Cartas {meet?.historyNow?.name ? ` - ${meet?.historyNow?.name}` : ''}
        </CardTitle>
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
