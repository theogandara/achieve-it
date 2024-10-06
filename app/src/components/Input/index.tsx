import * as S from './styles';

type InputProps = {
  placeholder: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'number-pad';
  secureTextEntry?: boolean;
  value?: string;
};

export function Input({
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
  value,
}: InputProps) {
  return (
    <S.Input
      value={value}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor="#666"
      onChangeText={onChangeText}
    />
  );
}
