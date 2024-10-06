import { Close } from '../Icons/Close';
import * as S from './styles';

type CloseButtonProps = {
  onClose: () => void;
};

export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <S.CloseButton onPress={onClose}>
      <Close color="#fff" />
    </S.CloseButton>
  );
}
