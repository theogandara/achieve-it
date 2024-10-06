import { Modal } from 'react-native';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import * as S from './styles';
import { Input } from '../Input';
import { Button } from '../Button/button';
import { useState } from 'react';
import { api } from '../../utils/api';

type RegisterModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function RegisterModal({ isVisible, onClose }: RegisterModalProps) {
  if (!isVisible) return null;

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
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
      setLoading(true);
      await api.post('/users', {
        email: email,
        password: password,
      });
      setMessage('User registered successfully 🎉');
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (error) {
      console.log(error);
      setMessage('Error registering user');
    } finally {
      setLoading(false);
    }
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSetEmail(value: string) {
    const email = value.toLowerCase();
    setEmail(email);
  }

  function handleSetPassword(value: string) {
    setPassword(value);
  }

  function handleSetConfirmPassword(value: string) {
    setConfirmPassword(value);
  }

  const disabled = !email || !password || !confirmPassword;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <S.ModalBody>
        <S.Header>
          <Text size={24} weight="600" color="#fff">
            Register
          </Text>

          <S.CloseButton onPress={onClose}>
            <Close color="#fff" />
          </S.CloseButton>
        </S.Header>

        <S.Form>
          {message && <Text color="#fff">{message}</Text>}
          <S.InputContainer>
            <Text color="#9A999E">Email</Text>

            <Input
              placeholder="Digite seu email"
              onChangeText={handleSetEmail}
              value={email}
              keyboardType="default"
            />
          </S.InputContainer>

          <S.InputContainer>
            <Text color="#9A999E">Password</Text>
            <Input
              placeholder="Insira sua senha"
              onChangeText={handleSetPassword}
              value={password}
              keyboardType="default"
              secureTextEntry
            />
          </S.InputContainer>

          <S.InputContainer>
            <Text color="#9A999E">Confirm Password</Text>
            <Input
              placeholder="Confirme sua senha"
              onChangeText={handleSetConfirmPassword}
              value={confirmPassword}
              keyboardType="default"
              secureTextEntry
            />
          </S.InputContainer>

          <S.ButtonContainer>
            <Button
              disabled={disabled}
              onPress={handleRegister}
              loading={loading}
            >
              Register
            </Button>
          </S.ButtonContainer>
        </S.Form>
      </S.ModalBody>
    </Modal>
  );
}
