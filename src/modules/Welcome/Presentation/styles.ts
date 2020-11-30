import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;
export const Background = styled.ImageBackground`
  flex: 1;
  width: 100%;
  resize-mode: contain;
`;

export const Logo = styled.Image`
  margin-top: 70px;
`;

export const ButtonGroup = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 20px;
  justify-content: flex-end;
`;

export const ButtonGroupSpace = styled.View`
  width: 10px;
`;

export const Title = styled.Text`
  color: white;
  width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Content = styled(Animated.View)`
  background-color: #222533;
  height: 350px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  padding: 0 40px;
`;
