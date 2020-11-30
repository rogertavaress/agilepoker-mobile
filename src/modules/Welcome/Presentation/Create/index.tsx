import React, { useMemo, useState } from 'react';
import { PresentationScreenProps } from '..';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { ButtonGroup, ButtonGroupSpace, Title } from '../styles';

const Create: React.FC<PresentationScreenProps> = ({
  handleCreateOrRun,
  handleBack,
}) => {
  const [sprint, setSprint] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const canCreate = useMemo(() => sprint.length !== 0 || email.length !== 0, [
    sprint,
    email,
  ]);

  return (
    <>
      <Title>Sprint:</Title>
      <Input
        onChangeText={(value: string) => setSprint(value ?? '')}
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
            () => canCreate && handleCreateOrRun && handleCreateOrRun('create')
            // eslint-disable-next-line react/jsx-curly-newline
          }
          disabled={!canCreate}
        />
      </ButtonGroup>
    </>
  );
};

export default Create;
