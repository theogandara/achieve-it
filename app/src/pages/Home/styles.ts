import styled from 'styled-components/native';

export const Body = styled.View`
  height: 100%;
  margin-top: 80px;
  padding: 0 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  gap: 24px;
  justify-content: space-between;
  margin-bottom: 24px;
  max-width: 50%;
`;

export const Container = styled.View`
  border: 1px solid #fff;
  border-radius: 4px;
  gap: 24px;
  padding: 24px;
  max-height: 80%;
`;

export const ItemList = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 16px;
  gap: 12px;
`;

export const ButtonContainer = styled.View`
  padding: 0 24px;
`;

export const Footer = styled.View`
  background-color: #1c1c1e;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView`
  flex-direction: row;
  gap: 16px;
`;

export const Profile = styled.TouchableOpacity`
  border: 2px solid #d5d5d5;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #dedede;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 72px;
  right: 24px;
`;
