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
  gap: 8px;
`;

export const ModalBody = styled.View`
  background: #1c1c1e;
  height: 100%;
  padding: 32px 24px 0px;
  flex: 1;
`;

export const Footer = styled.View`
  background: #1c1c1e;
  min-height: 110px;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView``;

export const Container = styled.View`
  margin-top: 24px;
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 24px;
  max-height: 100%;
`;

export const ItemList = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
  gap: 12px;
`;

export const Input = styled.TextInput`
  background-color: #1c1c1e;
  padding: 16px;
  border-radius: 2px;
  border: 1px solid rgba(204, 204, 204, 0.5);
  padding: 8px;
  color: #fff;
  font-size: 20px;
  margin-top: 24px;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 14px 24px;
  width: 100%;
  margin-top: 24px;
`;
