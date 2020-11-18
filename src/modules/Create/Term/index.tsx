import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { useMeet } from '../../../hooks/meet';

import {
  Container,
  FormArea,
  TermTitle,
  TermArea,
  TermInput,
  TermInputCheck,
  TermInputText,
  ButtonConfirm,
  ButtonConfirmText,
} from './styles';

const Term: React.FC = () => {
  const { confirmTerms, term } = useMeet();
  const { reset } = useNavigation();

  const [data, setData] = useState([
    {
      key: 'historias',
      name: 'Podemos coletar os nomes e as categorias das histórias?',
      checked: false,
    },
    {
      key: 'recomendações',
      name:
        'Seus dados podem ser usados para o nosso sistema de recomendações?',
      checked: false,
    },
    {
      key: 'tempo',
      name:
        'Podemos coletar o tempo da sua reunião para lhe ajudar a organizar melhor as suas reuniões?',
      checked: false,
    },
  ]);

  const activeButton = useMemo(() => !data.some((item) => !item.checked), [
    data,
  ]);

  const handleChangeCheck = useCallback(
    (key: string) => {
      const questions = data.map((item) => {
        if (item.key === key) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });

      setData(questions);
    },
    [data],
  );

  const handleConfirm = useCallback(() => {
    confirmTerms();
  }, [confirmTerms]);

  useEffect(() => {
    if (term) {
      reset({
        index: 0,
        routes: [{ name: 'Admin' }],
      });
    }
  }, [term]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#222533" />
      <FormArea>
        <TermTitle>Vamos falar sobre os seus dados?</TermTitle>
        <TermArea>
          {data.map((question) => (
            <TermInput key={question.key}>
              <TermInputCheck
                isChecked={question.checked}
                onPress={() => handleChangeCheck(question.key)}
              />
              <TermInputText>{question.name}</TermInputText>
            </TermInput>
          ))}
        </TermArea>
      </FormArea>
      <ButtonConfirm enabled={activeButton} onPress={handleConfirm}>
        <ButtonConfirmText>Aceitar</ButtonConfirmText>
      </ButtonConfirm>
    </Container>
  );
};

export default Term;
