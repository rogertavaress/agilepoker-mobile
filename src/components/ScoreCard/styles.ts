import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface ScoreCardStyledProps {
  selected: boolean;
}

export const Container = styled(RectButton)<ScoreCardStyledProps>`
  flex: 1;
  height: 150px;
  background-color: #911ada;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding: 8px;

  ${({ enabled }) =>
    !enabled &&
    css`
      opacity: 0.4;
    `}

  ${({ selected }) =>
    selected &&
    css`
      background-color: white;
    `}
`;

export const Content = styled.View<ScoreCardStyledProps>`
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-width: 3px;
  border-color: white;

  ${({ selected }) =>
    selected &&
    css`
      border-color: #911ada;
    `}
`;

export const ScoreCardText = styled.Text<ScoreCardStyledProps>`
  color: white;
  font-size: 32px;
  font-weight: bold;

  ${({ selected }) =>
    selected &&
    css`
      color: #911ada;
    `}
`;
