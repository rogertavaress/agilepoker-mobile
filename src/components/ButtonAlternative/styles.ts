import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background-color: #911ada;
  border-radius: 10px;
  flex: 1;
  height: 45px;

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
