import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface TermInputCheckProps {
  isChecked: boolean;
}

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

export const TermTitle = styled.Text`
  font-size: 24px;
  text-align: center;
  color: white;
  width: 80%;
`;

export const TermArea = styled.View`
  margin-top: 50px;
  width: 80%;
`;

export const TermInput = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const TermInputCheck = styled.TouchableOpacity<TermInputCheckProps>`
  background-color: white;
  border-radius: 3px;
  border: 5px solid white;
  width: 30px;
  height: 30px;
  margin-top: 4px;

  ${({ isChecked }) =>
    isChecked &&
    css`
      background-color: green;
    `}
`;

export const TermInputText = styled.Text`
  color: white;
  font-size: 18px;
  margin-left: 10px;
  margin-right: 30px;
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

export const ButtonConfirmText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
