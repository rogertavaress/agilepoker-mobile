import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useCallback } from 'react';
import * as ExpoLocation from 'expo-location';

import {
  Container,
  Title,
  Description,
  Observations,
  Observation,
  ObservationBold,
  ButtonGroup,
  ButtonConfirm,
  ButtonBack,
  ButtonText,
} from './styles';
import { useMeet } from '../../../hooks/meet';

const Location: React.FC = () => {
  const { updateLocationParticipant } = useMeet();
  const { goBack, canGoBack } = useNavigation();
  const canPressBackButton = useMemo(() => canGoBack(), [canGoBack]);

  const handleRequestLocation = useCallback(async () => {
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      const location = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.High,
      });

      updateLocationParticipant({
        altitude: location.coords.altitude ?? 0,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (canPressBackButton) {
        goBack();
      }
    }
  }, [canPressBackButton, goBack, updateLocationParticipant]);

  return (
    <Container>
      <Title>Dados de Localização</Title>
      <Description>
        Solicitamos os dados de localização para alimentar um relatório que o
        gestor da reunião poderá baixar.
      </Description>
      <Observations>
        <Observation>
          <ObservationBold>Obs:</ObservationBold> Solicitamos apenas os dados de
          localização durante o uso da aplicação.
        </Observation>
        <Observation>
          <ObservationBold>Obs:</ObservationBold> Você pode recusar e participar
          normalmente da reunião.
        </Observation>
      </Observations>
      <ButtonGroup>
        <ButtonConfirm onPress={handleRequestLocation} enabled>
          <ButtonText>Aceitar</ButtonText>
        </ButtonConfirm>
        <ButtonBack onPress={goBack} enabled={canPressBackButton}>
          <ButtonText>Recusar</ButtonText>
        </ButtonBack>
      </ButtonGroup>
    </Container>
  );
};

export default Location;
