import { useEffect, useState } from 'react';
import { Button } from '../../components/Button/button';
import { Input } from '../../components/Input';
import { SafeArea } from '../../components/SafeArea';
import * as S from './styles';
import { Text } from '../../components/Text';
import { ButtonSecondary } from '../../components/ButtonSecondary/buttonSecondary';
import { RegisterModal } from '../../components/RegisterModal';
import { RootStackParamList } from '../../Main';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { api } from '../../utils/api';
import * as SecureStore from 'expo-secure-store';

export default function Login() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [message, setMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getToken = () => {
    return SecureStore.getItemAsync('token');
  };

  useEffect(() => {
    getToken().then((token) => {
      if (token) navigation.navigate('Home');
    });
  }, []);

  function handleSetEmail(value: string) {
    const email = value.toLowerCase();
    setEmail(email);
  }

  function handleSetPassword(value: string) {
    setPassword(value);
  }

  function handleAccessToken(token: string) {
    return SecureStore.setItemAsync('token', token);
  }

  async function handleLogin() {
    if (email.length === 0) {
      setMessage('Email is required');
      return;
    }

    if (password.length === 0) {
      setMessage('Password is required');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    if (password.length > 20) {
      setMessage('Password must be at most 20 characters');
      return;
    }

    if (email.length < 6) {
      setMessage('Email must be at least 6 characters');
      return;
    }

    if (email.length > 50) {
      setMessage('Email must be at most 50 characters');
      return;
    }

    if (!email.includes('@')) {
      setMessage('Invalid email');
      return;
    }

    if (!email.includes('.')) {
      setMessage('Invalid email');
      return;
    }

    try {
      const res = await api.post('/login', {
        email: email,
        password: password,
      });
      handleAccessToken(res.data.token);
      setMessage('Logged in successfully');
      navigation.navigate('Home');
    } catch (error) {
      setMessage('Invalid credentials');
    }
  }

  function handleRegister() {
    setModalVisible(true);
  }

  return (
    <>
      <RegisterModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <SafeArea>
        <S.Form>
          <S.Header>
            <Text size={28} weight="700" color="#fff">
              Hello, let&apos;s get started!
            </Text>
          </S.Header>

          {message && <Text color="#fff">{message}</Text>}
          <S.InputContainer>
            <Text color="#9A999E" weight="600">
              Email
            </Text>
            <Input
              placeholder="Digite seu email"
              onChangeText={handleSetEmail}
              value={email}
              keyboardType="default"
            />
          </S.InputContainer>
          <S.InputContainer>
            <Text color="#9A999E" weight="600">
              Password
            </Text>
            <Input
              placeholder="Insira sua senha"
              onChangeText={handleSetPassword}
              value={password}
              keyboardType="default"
              secureTextEntry
            />
          </S.InputContainer>
        </S.Form>
      </SafeArea>

      <S.Footer>
        <S.FooterContainer>
          <Button onPress={handleLogin}>Login</Button>
          <ButtonSecondary onPress={handleRegister}>Register</ButtonSecondary>
        </S.FooterContainer>
      </S.Footer>
    </>
  );
}
