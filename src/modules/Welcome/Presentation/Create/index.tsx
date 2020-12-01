import React, { useMemo, useState } from 'react';
import { PresentationScreenProps } from '..';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { ButtonGroup, ButtonGroupSpace, Title } from '../styles';

const Create: React.FC<PresentationScreenProps> = ({
  handleCreateOrRun,
  handleBack,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const canCreate = useMemo(() => name.length !== 0 || email.length !== 0, [
    name,
    email,
  ]);

  return (
    <>
      <Title>Nome:</Title>
      <Input
        onChangeText={(value: string) => setName(value ?? '')}
        keyboardAppearance="dark"
      />
      <Title>Email:</Title>
      <Input
        onChangeText={(value: string) => setEmail(value ?? '')}
        keyboardAppearance="dark"
        keyboardType="email-address"
      />
      <ButtonGroup>
        <Button text="Voltar" onPress={() => handleBack && handleBack()} />
        <ButtonGroupSpace />
        <Button
          text="Criar"
          onPress={
            () =>
              canCreate &&
              handleCreateOrRun &&
              handleCreateOrRun('create', { name, email })
            // eslint-disable-next-line react/jsx-curly-newline
          }
          disabled={!canCreate}
        />
      </ButtonGroup>
    </>
  );
};

export default Create;
