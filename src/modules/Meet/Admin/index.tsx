import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { string } from 'yup';
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

const Admin: React.FC = () => {
  const { meet } = useMeet();
  const { navigate } = useNavigation();

  const handleSelectHistoryVoteByHistories = useCallback(
    (votes: Vote[]): number => {
      let resp = 0;
      let respIndex = -1;
      const votesResp: number[] = [];

      votes.forEach((vote) => {
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

      return respIndex;
    },
    [],
  );

  return (
    <Container contentContainerStyle={{ paddingBottom: 100 }}>
      <StatusBar barStyle="light-content" backgroundColor="#222533" />
      <HeaderView>
        <HelloText>Olá, {meet?.name}!</HelloText>
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
          <ButtonAlternative text="Compartilhar" />
          <Space />
          <ButtonAlternative text="Copiar" />
        </CardFooter>
      </Card>
      {!!meet?.histories?.length && (
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
              {meet?.histories.map((history) => (
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
                        {handleSelectHistoryVoteByHistories(history.votes)}
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
          <CardTitle>Rodada atual</CardTitle>
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
              <CardTableLine>
                <CardTableColumn flex={3}>
                  <CardTableSectionText>Anderson</CardTableSectionText>
                </CardTableColumn>
                <CardTableColumn flex={1}>
                  <CardTableSectionScore>
                    <CardTableSectionScoreText>5</CardTableSectionScoreText>
                  </CardTableSectionScore>
                </CardTableColumn>
              </CardTableLine>
              <CardTableLine>
                <CardTableColumn flex={3}>
                  <CardTableSectionText>Lucas</CardTableSectionText>
                </CardTableColumn>
                <CardTableColumn flex={1}>
                  <CardTableSectionScore>
                    <CardTableSectionScoreText>5</CardTableSectionScoreText>
                  </CardTableSectionScore>
                </CardTableColumn>
              </CardTableLine>
              <CardTableLine>
                <CardTableColumn flex={3}>
                  <CardTableSectionText>João Paulo</CardTableSectionText>
                </CardTableColumn>
                <CardTableColumn flex={1}>
                  <CardTableSectionScore>
                    <CardTableSectionScoreText>5</CardTableSectionScoreText>
                  </CardTableSectionScore>
                </CardTableColumn>
              </CardTableLine>
            </CardTableSection>
            <CardFooter>
              <ButtonAlternative>
                <AntDesign name="stepforward" size={24} color="white" />
              </ButtonAlternative>
              <Space />
              <ButtonAlternative>
                {/* <Entypo name="controller-stop" size={24} color="white" /> */}
                <AntDesign name="caretright" size={24} color="white" />
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
              <CardTableLine key={`${history.category}-${history.name}`}>
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
