import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: white;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;

  ${(props) =>
    props.isFocused &&
    css`
      border-color: whitesmoke;
    `}
`;

export const InputTextCustomComponent = styled.TextInput`
  flex: 1;
  color: white;
  font-size: 32px;
  text-align: center;
`;
