import React, {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps, Platform } from 'react-native';

import { Container, InputTextCustomComponent } from './styles';

interface InputRef {
  focus: () => void;
}

const Input: React.ForwardRefRenderFunction<InputRef, TextInputProps> = (
  { ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      if (inputElementRef.current) {
        inputElementRef.current.focus();
      }
    },
  }));

  return (
    <Container isFocused={isFocused}>
      <InputTextCustomComponent
        ref={inputElementRef}
        keyboardAppearance="default"
        placeholderTextColor="#838383"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
