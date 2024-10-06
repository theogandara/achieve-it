import { Text } from '../Text';
import { ActivityIndicator } from 'react-native';
import * as S from './styles';

interface ButtonSecondaryProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function ButtonSecondary({
  children,
  onPress,
  disabled,
  loading,
}: ButtonSecondaryProps) {
  return (
    <S.Container onPress={onPress} disabled={disabled || loading}>
      {!loading ? (
        <Text weight="600" color="#1e1e1e">
          {children}
        </Text>
      ) : (
        <ActivityIndicator size="small" color="#fff" />
      )}
    </S.Container>
  );
}
