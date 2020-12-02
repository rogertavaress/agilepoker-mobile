import React from 'react';
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ButtonAlternative from '../../../components/ButtonAlternative';

import {
  Container,
  HeaderView,
  HelloText,
  Card,
  SharedViewDescription,
  SharedViewCode,
  SharedViewCodeText,
  CardFooter,
  Space,
  CardTitle,
  CardTable,
  CardTableHeader,
  CardTableHeaderTitle,
  CardTableSection,
  CardTableColumn,
  CardTableSectionScore,
  CardTableSectionScoreText,
  CardTableSectionName,
  CardTableSectionText,
  CardTableSectionDescription,
  CardTableSectionAttention,
  CardTableLine,
} from './styles';
import { useMeet } from '../../../hooks/meet';

const Admin: React.FC = () => {
  const { name } = useMeet();

  return (
    <Container contentContainerStyle={{ paddingBottom: 100 }}>
      <StatusBar barStyle="light-content" backgroundColor="#222533" />
      <HeaderView>
        <HelloText>Olá, {name}!</HelloText>
      </HeaderView>
      <Card>
        <SharedViewDescription>
          O código da sua reunião é:
        </SharedViewDescription>
        <SharedViewCode>
          <SharedViewCodeText>1234</SharedViewCodeText>
        </SharedViewCode>
        <CardFooter>
          <ButtonAlternative text="Compartilhar" />
          <Space />
          <ButtonAlternative text="Copiar" />
        </CardFooter>
      </Card>
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
            <CardTableLine>
              <CardTableColumn flex={2}>
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
              <CardTableColumn flex={0.8}>
                <CardTableSectionAttention />
              </CardTableColumn>
            </CardTableLine>
          </CardTableSection>
        </CardTable>
      </Card>
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
              <AntDesign name="stepbackward" size={24} color="white" />
            </ButtonAlternative>
            <Space />
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
      <Card>
        <CardTitle>Histórias</CardTitle>
        <CardTable>
          <CardTableHeader>
            <CardTableColumn flex={1}>
              <CardTableHeaderTitle>Nome</CardTableHeaderTitle>
            </CardTableColumn>
          </CardTableHeader>
          <CardTableSection>
            <CardTableLine>
              <CardTableColumn flex={2}>
                <CardTableSectionName>
                  <CardTableSectionText>Criar um botão</CardTableSectionText>
                  <CardTableSectionDescription>Bug</CardTableSectionDescription>
                </CardTableSectionName>
              </CardTableColumn>
            </CardTableLine>
          </CardTableSection>
          <CardFooter>
            <ButtonAlternative text="Adicionar" />
          </CardFooter>
        </CardTable>
      </Card>
    </Container>
  );
};

export default Admin;
