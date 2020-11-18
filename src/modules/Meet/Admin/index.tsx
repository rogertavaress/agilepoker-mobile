import React from 'react';
import { StatusBar } from 'react-native';
import ButtonAlternative from '../../../components/ButtonAlternative';

import {
  Container,
  HeaderView,
  HelloText,
  Card,
  SharedViewDescription,
  SharedViewCode,
  SharedViewCodeText,
  SharedViewControl,
  Space,
  CardTitle,
  CardTable,
  CardTableHeader,
  CardTableNameColumn,
  CardTableScoreColumn,
  CardTableHeaderTitle,
  CardTableSection,
  CardTableSectionScore,
  CardTableSectionScoreText,
  CardTableSectionName,
  CardTableSectionNameText,
  CardTableSectionNameCategory,
  CardTableLine,
} from './styles';

const Admin: React.FC = () => {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#222533" />
      <HeaderView>
        <HelloText>Olá, Rogério!</HelloText>
      </HeaderView>
      <Card>
        <SharedViewDescription>
          O código da sua reunião é:
        </SharedViewDescription>
        <SharedViewCode>
          <SharedViewCodeText>1234</SharedViewCodeText>
        </SharedViewCode>
        <SharedViewControl>
          <ButtonAlternative text="Compartilhar" />
          <Space />
          <ButtonAlternative text="Copiar" />
        </SharedViewControl>
      </Card>
      <Card>
        <CardTitle>Pontuação por História</CardTitle>
        <CardTable>
          <CardTableHeader>
            <CardTableNameColumn>
              <CardTableHeaderTitle>História</CardTableHeaderTitle>
            </CardTableNameColumn>
            <CardTableScoreColumn>
              <CardTableHeaderTitle>Pontuação</CardTableHeaderTitle>
            </CardTableScoreColumn>
          </CardTableHeader>
          <CardTableSection>
            <CardTableLine>
              <CardTableNameColumn>
                <CardTableSectionName>
                  <CardTableSectionNameText>
                    Criar um botão
                  </CardTableSectionNameText>
                  <CardTableSectionNameCategory>
                    Bug
                  </CardTableSectionNameCategory>
                </CardTableSectionName>
              </CardTableNameColumn>
              <CardTableScoreColumn>
                <CardTableSectionScore>
                  <CardTableSectionScoreText>5</CardTableSectionScoreText>
                </CardTableSectionScore>
              </CardTableScoreColumn>
            </CardTableLine>
            <CardTableLine>
              <CardTableNameColumn>
                <CardTableSectionName>
                  <CardTableSectionNameText>
                    Criar um botão
                  </CardTableSectionNameText>
                  <CardTableSectionNameCategory>
                    Bug
                  </CardTableSectionNameCategory>
                </CardTableSectionName>
              </CardTableNameColumn>
              <CardTableScoreColumn>
                <CardTableSectionScore>
                  <CardTableSectionScoreText>5</CardTableSectionScoreText>
                </CardTableSectionScore>
              </CardTableScoreColumn>
            </CardTableLine>
            <CardTableLine>
              <CardTableNameColumn>
                <CardTableSectionName>
                  <CardTableSectionNameText>
                    Criar um botão
                  </CardTableSectionNameText>
                  <CardTableSectionNameCategory>
                    Bug
                  </CardTableSectionNameCategory>
                </CardTableSectionName>
              </CardTableNameColumn>
              <CardTableScoreColumn>
                <CardTableSectionScore>
                  <CardTableSectionScoreText>5</CardTableSectionScoreText>
                </CardTableSectionScore>
              </CardTableScoreColumn>
            </CardTableLine>
          </CardTableSection>
        </CardTable>
      </Card>
    </Container>
  );
};

export default Admin;
