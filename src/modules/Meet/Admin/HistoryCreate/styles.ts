import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #222533;
  justify-content: center;
  align-items: center;
`;

export const FormArea = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InputTitle = styled.Text`
  color: white;
  width: 100%;
  margin-bottom: 5px;
  margin-top: 15px;
  font-weight: bold;
`;

export const InputArea = styled.View`
  padding: 0 25px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  color: white;
  width: 80%;
`;

export const ButtonConfirm = styled(RectButton)`
  width: 80%;
  height: 55px;
  justify-content: center;
  align-items: center;
  background-color: #911ada;
  border-radius: 20px;
  margin-top: auto;
  margin-bottom: 60px;

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
  margin-top: auto;
  margin-bottom: 10px;

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
