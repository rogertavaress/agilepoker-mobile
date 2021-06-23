import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
`;

export const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 28px;
`;

export const Description = styled.Text`
  color: white;
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
`;

export const Observations = styled.View`
  margin-top: 60px;
  margin-bottom: 50px;
`;

export const Observation = styled.Text`
  color: white;
  margin-top: 10px;
`;

export const ObservationBold = styled.Text`
  font-weight: bold;
`;

export const ButtonConfirm = styled(RectButton)`
  width: 80%;
  height: 55px;
  justify-content: center;
  align-items: center;
  background-color: #911ada;
  border-radius: 20px;
  margin-bottom: 15px;

  ${({ enabled }) =>
    !enabled &&
    css`
      opacity: 0.6;
    `}
`;

export const ButtonBack = styled(RectButton)`
  width: 80%;
  height: 55px;
  justify-content: center;
  align-items: center;
  background-color: #911ada;
  border-radius: 20px;

  ${({ enabled }) =>
    !enabled &&
    css`
      opacity: 0.6;
    `}
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export const ButtonGroup = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
