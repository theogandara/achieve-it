import styled from 'styled-components/native';

export const Body = styled.View`
  height: 100%;
  margin-top: 40px;
  padding: 0 24px;
  padding-bottom: 100px;
`;

export const Header = styled.View`
  margin-bottom: 24px;
  flex-direction: row;
  gap: 24px;
  align-items: center;
`;

export const Container = styled.View`
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 24px;
  max-height: 100%;
`;

export const ItemList = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 24px;
  gap: 12px;
`;

export const ButtonContainer = styled.View`
  background-color: #1c1c1e;
  padding-bottom: 8px;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 14px 24px;
  width: 100%;
  margin-top: 24px;
`;

export const SecondaryActions = styled.View``;

export const Footer = styled.View`
  background-color: #1c1c1e;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView``;

export const Input = styled.TextInput`
  background-color: #1c1c1e;
  padding: 16px;
  border-radius: 2px;
  border: 1px solid rgba(204, 204, 204, 0.5);
  padding: 8px;
  color: #fff;
  font-size: 20px;
`;
