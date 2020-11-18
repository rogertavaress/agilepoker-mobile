import React, { useState, useEffect, useCallback } from 'react';
import { Animated, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Background,
  Content,
  Logo,
  Title,
  ButtonGroup,
  ButtonGroupSpace,
} from './styles';

import BackgroundImg from '../../../assets/images/background.png';
import LogoImg from '../../../assets/images/logo.png';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const Presentation: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [cod, setCod] = useState<string>('');
  const [cardMovimentation] = useState(new Animated.Value(350));
  const { navigate } = useNavigation();

  useEffect(() => {
    Animated.timing(cardMovimentation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRun = useCallback(() => {
    if (name.length !== 0) {
      Animated.timing(cardMovimentation, {
        toValue: 350,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [cardMovimentation, name]);

  const handleCreate = useCallback(() => {
    if (name.length !== 0 || cod.length !== 0) {
      Animated.timing(cardMovimentation, {
        toValue: 350,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigate('Term');
      });
    }
  }, [cardMovimentation, name, cod, navigate]);

  return (
    <Background source={BackgroundImg}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Logo source={LogoImg} />
        <Content
          style={{
            transform: [{ translateY: cardMovimentation }],
          }}
        >
          <Title>Nome:</Title>
          <Input
            onChangeText={(value: string) => setName(value ?? '')}
            keyboardAppearance="dark"
            textContentType="name"
          />
          <Title>Código:</Title>
          <Input
            onChangeText={(value: string) => setCod(value ?? '')}
            keyboardAppearance="dark"
            keyboardType="numeric"
          />
          <ButtonGroup>
            <Button
              text="Criar"
              onPress={() => handleCreate()}
              disabled={name.length === 0}
            />
            <ButtonGroupSpace />
            <Button
              text="Entrar"
              onPress={() => handleRun()}
              disabled={name.length === 0 || cod.length === 0}
            />
          </ButtonGroup>
        </Content>
      </Container>
    </Background>
  );
};

export default Presentation;
