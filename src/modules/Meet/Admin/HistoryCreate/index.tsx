import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import Input from '../../../../components/Input';
import { useMeet } from '../../../../hooks/meet';

import {
  ButtonConfirm,
  ButtonBack,
  ButtonText,
  Container,
  FormArea,
  InputTitle,
  InputArea,
  Title,
} from './styles';

const HistoryCreate: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const { goBack } = useNavigation();
  const { createHistory } = useMeet();

  const create = useCallback(() => {
    createHistory({ name, category }).then(() => {
      goBack();
    });
  }, [category, createHistory, goBack, name]);

  const canAdd = useMemo(() => !!name.length && !!category.length, [
    name,
    category,
  ]);

  return (
    <Container>
      <FormArea>
        <Title>Vamos adicionar uma nova história?</Title>
        <InputArea>
          <InputTitle>Nome</InputTitle>
          <Input onChangeText={setName} value={name} />
          <InputTitle>Categoria</InputTitle>
          <Input onChangeText={setCategory} value={category} />
        </InputArea>
      </FormArea>
      <ButtonBack onPress={goBack} enabled>
        <ButtonText>Voltar</ButtonText>
      </ButtonBack>
      <ButtonConfirm onPress={create} enabled={canAdd}>
        <ButtonText>Criar</ButtonText>
      </ButtonConfirm>
    </Container>
  );
};

export default HistoryCreate;
