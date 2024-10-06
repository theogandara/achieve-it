import styled from 'styled-components/native';

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  margin-top: 40px;
  gap: 16px;
`;

export const ButtonContainer = styled.View`
  margin-top: 16px;
`;

export const InputContainer = styled.View`
  display: flex;
  gap: 8px;
`;

export const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
  gap: 8px;
`;

export const ModalBody = styled.View`
  background-color: #1c1c1e;
  padding: 32px 24px 0px;
  flex: 1;
`;

export const Footer = styled.View`
  background-color: #1c1c1e;
  min-height: 110px;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView``;
