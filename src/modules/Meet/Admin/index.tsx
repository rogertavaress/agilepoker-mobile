import React, { useCallback, useMemo } from 'react';
import { StatusBar, Share } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import ButtonAlternative from '../../../components/ButtonAlternative';

import {
  Container,
  HeaderView,
  HelloText,
  Card,
  CardFooter,
  Space,
  CardTitle,
  CardTable,
  CardTableHeader,
  CardTableColumn,
  CardTableHeaderTitle,
  CardTableSection,
  CardTableLine,
  CardTableSectionScore,
  CardTableSectionScoreText,
  CardTableSectionName,
  CardTableSectionText,
  CardTableSectionDescription,
} from '../styles';

import {
  SharedViewDescription,
  SharedViewCode,
  SharedViewCodeText,
  CardTableSectionAttention,
} from './styles';
import { useMeet } from '../../../hooks/meet';
import Vote from '../../../entities/Vote';
import History from '../../../entities/History';

interface RoundNowItemProps {
  id: string;
  name: string;
  vote: string;
}
interface HistoryNumberItemProps {
  id: number;
  name: string;
  category: string;
  vote: string;
}

const Admin: React.FC = () => {
  const { meet, changeMeetStatus, changeHistoryNow } = useMeet();
  const { navigate } = useNavigation();

  const histories = useMemo<History[]>(
    () => meet?.histories?.sort((a, b) => a.id - b.id) ?? [],
    [meet],
  );

  const selectHistoryVoteByHistories = useCallback((votes: Vote[]): string => {
    let resp = 0;
    let respIndex = -1;
    const votesResp: number[] = [];

    votes?.forEach((vote) => {
      if (votesResp[vote.number]) {
        votesResp[vote.number] += 1;
      } else {
        votesResp[vote.number] = 1;
      }
    });

    votesResp.forEach((vote, index) => {
      if (vote > resp) {
        respIndex = index;
        resp = vote;
      }
    });

    return respIndex === -1 ? '?' : `${respIndex}`;
  }, []);

  const handleCopy = useCallback(() => {
    Clipboard.setString(meet?.id ?? '');
  }, [meet]);

  const handleShare = useCallback(async () => {
    await Share.share({
      message: `Olá pessoal!\nEsse é o convite para participar da reunião de planejamento.\n\nCódigo: ${meet?.id}`,
      title: 'Convite para participar',
    });
  }, [meet]);

  const handleNextHistory = useCallback(async () => {
    const historyNowIndex = histories.findIndex(
      (historyNowFind) => historyNowFind.id === meet?.historyNowId,
    );

    if (
      historyNowIndex !== undefined &&
      historyNowIndex < histories.length - 1
    ) {
      await changeHistoryNow(histories[historyNowIndex + 1].id);
    }
  }, [changeHistoryNow, histories, meet]);

  const handlePlayPause = useCallback(async () => {
    if (meet?.status === 'paused') {
      await changeMeetStatus('started');
    } else if (meet?.status === 'started') {
      await changeMeetStatus('paused');
    }
  }, [changeMeetStatus, meet]);

  const roundNowList = useMemo<RoundNowItemProps[]>(() => {
    const resp: RoundNowItemProps[] = [];

    meet?.participants?.forEach((participant) => {
      const vote = meet?.historyNow?.votes?.find(
        (voteNow) => voteNow.participantId === participant.id,
      )?.number;

      resp.push({
        id: participant.id,
        name: participant.name,
        vote: vote !== undefined && vote >= 0 ? `${vote}` : '?',
      });
    });

    return resp;
  }, [meet]);

  const historyNumbersList = useMemo<HistoryNumberItemProps[]>(() => {
    const resp: HistoryNumberItemProps[] = [];

    meet?.histories.forEach((history) => {
      const vote = selectHistoryVoteByHistories(history.votes);

      if (vote !== '?') {
        resp.push({
          id: history.id,
          name: history.name,
          category: history.category,
          vote,
        });
      }
    });

    return resp;
  }, [meet, selectHistoryVoteByHistories]);

  return (
    <Container contentContainerStyle={{ paddingBottom: 100 }}>
      <StatusBar barStyle="light-content" backgroundColor="#222533" />
      <HeaderView>
        <HelloText>Olá{meet?.name ? `, ${meet?.name}` : ''}!</HelloText>
      </HeaderView>
      <Card>
        <SharedViewDescription>
          O código da sua reunião é:
        </SharedViewDescription>
        <SharedViewCode>
          <SharedViewCodeText>
            {`${meet?.id.substr(0, 11)}...`}
          </SharedViewCodeText>
        </SharedViewCode>
        <CardFooter>
          <ButtonAlternative text="Compartilhar" onPress={handleShare} />
          <Space />
          <ButtonAlternative text="Copiar" onPress={handleCopy} />
        </CardFooter>
      </Card>
      {!!historyNumbersList.length && (
        <Card>
          <CardTitle>Pontuação por História</CardTitle>
          <CardTable>
            <CardTableHeader>
              <CardTableColumn flex={2}>
                <CardTableHeaderTitle>História</CardTableHeaderTitle>
              </CardTableColumn>
              <CardTableColumn flex={1}>
                <CardTableHeaderTitle>Pontuação</CardTableHeaderTitle>
              </CardTableColumn>
              <CardTableColumn flex={0.8}>
                <CardTableHeaderTitle>Atenção</CardTableHeaderTitle>
              </CardTableColumn>
            </CardTableHeader>
            <CardTableSection>
              {historyNumbersList.map((history) => (
                <CardTableLine key={history.id}>
                  <CardTableColumn flex={2}>
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
                  <CardTableColumn flex={0.8}>
                    <CardTableSectionAttention />
                  </CardTableColumn>
                </CardTableLine>
              ))}
            </CardTableSection>
          </CardTable>
        </Card>
      )}
      {!!meet?.participants?.length && (
        <Card>
          <CardTitle>
            Rodada atual{' '}
            {meet?.historyNow?.name ? ` - ${meet?.historyNow?.name}` : ''}
          </CardTitle>
          <CardTable>
            <CardTableHeader>
              <CardTableColumn flex={3}>
                <CardTableHeaderTitle>Participante</CardTableHeaderTitle>
              </CardTableColumn>
              <CardTableColumn flex={1}>
                <CardTableHeaderTitle>Pontuação</CardTableHeaderTitle>
              </CardTableColumn>
            </CardTableHeader>
            <CardTableSection>
              {roundNowList.map((round) => (
                <CardTableLine key={round.id}>
                  <CardTableColumn flex={3}>
                    <CardTableSectionText>{round.name}</CardTableSectionText>
                  </CardTableColumn>
                  <CardTableColumn flex={1}>
                    <CardTableSectionScore>
                      <CardTableSectionScoreText>
                        {round.vote}
                      </CardTableSectionScoreText>
                    </CardTableSectionScore>
                  </CardTableColumn>
                </CardTableLine>
              ))}
            </CardTableSection>
            <CardFooter>
              <ButtonAlternative
                enabled={
                  meet.histories[meet.histories.length - 1].id !==
                    meet.historyNowId && meet.status === 'paused'
                }
                onPress={handleNextHistory}
              >
                <AntDesign name="stepforward" size={24} color="white" />
              </ButtonAlternative>
              <Space />

              <ButtonAlternative
                enabled={!!meet?.historyNow && meet?.historyNowId >= 0}
                onPress={handlePlayPause}
              >
                {meet.status === 'started' && (
                  <Entypo name="controller-stop" size={24} color="white" />
                )}
                {meet.status === 'paused' && (
                  <AntDesign name="caretright" size={24} color="white" />
                )}
              </ButtonAlternative>
            </CardFooter>
          </CardTable>
        </Card>
      )}
      <Card>
        <CardTitle>Histórias</CardTitle>
        <CardTable>
          <CardTableHeader>
            <CardTableColumn flex={1}>
              {!!meet?.histories?.length && (
                <CardTableHeaderTitle>Nome</CardTableHeaderTitle>
              )}
            </CardTableColumn>
          </CardTableHeader>
          <CardTableSection>
            {meet?.histories?.map((history) => (
              <CardTableLine key={history.id}>
                <CardTableColumn flex={2}>
                  <CardTableSectionName>
                    <CardTableSectionText>{history.name}</CardTableSectionText>
                    <CardTableSectionDescription>
                      {history.category}
                    </CardTableSectionDescription>
                  </CardTableSectionName>
                </CardTableColumn>
              </CardTableLine>
            ))}
          </CardTableSection>
          <CardFooter>
            <ButtonAlternative
              text="Adicionar"
              onPress={() => navigate('HistoryCreate')}
            />
          </CardFooter>
        </CardTable>
      </Card>
    </Container>
  );
};

export default Admin;
