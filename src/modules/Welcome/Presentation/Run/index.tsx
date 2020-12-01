import React, { useMemo, useState } from 'react';
import { PresentationScreenProps } from '..';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { ButtonGroup, ButtonGroupSpace, Title } from '../styles';

const Run: React.FC<PresentationScreenProps> = ({
  handleCreateOrRun,
  handleBack,
}) => {
  const [name, setName] = useState<string>('');
  const [cod, setCod] = useState<string>('');

  const canCreate = useMemo(() => cod.length !== 0 || name.length !== 0, [
    cod,
    name,
  ]);

  return (
    <>
      <Title>Nome:</Title>
      <Input
        onChangeText={(value: string) => setName(value ?? '')}
        keyboardAppearance="dark"
      />
      <Title>Código:</Title>
      <Input
        onChangeText={(value: string) => setCod(value ?? '')}
        keyboardAppearance="dark"
      />
      <ButtonGroup>
        <Button text="Voltar" onPress={() => handleBack && handleBack()} />
        <ButtonGroupSpace />
        <Button
          text="Entrar"
          onPress={
            () =>
              canCreate &&
              handleCreateOrRun &&
              handleCreateOrRun('run', { name, cod })
            // eslint-disable-next-line react/jsx-curly-newline
          }
          disabled={!canCreate}
        />
      </ButtonGroup>
    </>
  );
};

export default Run;
