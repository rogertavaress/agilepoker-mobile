import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background-color: #911ada;
  border-radius: 10px;
  height: 45px;
  padding: 10px 20px;

  ${({ enabled }) =>
    enabled &&
    css`
      opacity: 0.6;
    `}
`;

export const ButtonComponentText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
