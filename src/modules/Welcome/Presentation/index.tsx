import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Animated, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Container, Background, Content, Logo } from './styles';

import BackgroundImg from '../../../assets/images/background.png';
import LogoImg from '../../../assets/images/logo.png';
import Main from './Main';
import Create from './Create';
import Run from './Run';

export interface PresentationScreenProps {
  goTo?: (key: 'create' | 'run') => void;
  handleCreateOrRun?: (type: 'create' | 'run') => void;
  handleBack?: () => void;
}

const Presentation: React.FC = () => {
  const [selected, setSelected] = useState<'main' | 'create' | 'run'>('main');
  const [cardMovimentation] = useState(new Animated.Value(350));
  const { navigate } = useNavigation();

  useEffect(() => {
    Animated.timing(cardMovimentation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [cardMovimentation]);

  const handleBack = useCallback(() => {
    Animated.timing(cardMovimentation, {
      toValue: 350,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setSelected('main');
      Animated.timing(cardMovimentation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [cardMovimentation]);

  const goTo = useCallback(
    (key: 'create' | 'run') => {
      Animated.timing(cardMovimentation, {
        toValue: 350,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setSelected(key);
        Animated.timing(cardMovimentation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    },
    [cardMovimentation],
  );

  const handleCreateOrRun = useCallback(() => {
    Animated.timing(cardMovimentation, {
      toValue: 350,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigate('Term');
    });
  }, [cardMovimentation, navigate]);

  const components = useMemo(
    () => ({
      main: <Main goTo={goTo} />,

      create: (
        <Create handleBack={handleBack} handleCreateOrRun={handleCreateOrRun} />
      ),
      run: (
        <Run handleBack={handleBack} handleCreateOrRun={handleCreateOrRun} />
      ),
    }),
    [goTo, handleBack, handleCreateOrRun],
  );

  useEffect(() => {
    components[selected];
  }, [components, selected]);

  return (
    <Background source={BackgroundImg}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Logo source={LogoImg} />
        <Content
          style={{
            transform: [{ translateY: cardMovimentation }],
          }}
        >
          {components[selected]}
        </Content>
      </Container>
    </Background>
  );
};

export default Presentation;
