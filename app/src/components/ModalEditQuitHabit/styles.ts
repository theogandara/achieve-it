import styled from 'styled-components/native';

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 24px;
  top: 24px;
`;

export const Header = styled.View`
  max-width: 80%;
  gap: 8px;
`;

export const HeaderText = styled.View``;

export const ModalBody = styled.View`
  background: #1c1c1e;
  padding: 32px 24px 0px;
  flex: 1;
`;

export const Footer = styled.View`
  background: #1c1c1e;
  min-height: 110px;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView``;

export const HabitItem = styled.TouchableOpacity`
  padding: 12px;
  background: #2c2c2e;
  border-radius: 4px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 14px 24px;
  width: 50%;
  margin-top: 24px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
`;
