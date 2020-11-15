import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
  disabled?: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  flex: 1;
  height: 45px;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `}
`;

export const ButtonComponentText = styled.Text`
  color: #222533;
  font-size: 16px;
  font-weight: bold;
`;
