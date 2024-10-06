import styled from 'styled-components/native';

export const Body = styled.KeyboardAvoidingView`
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
  max-height: 100%;
`;

export const Item = styled.TouchableOpacity`
  border: 1px solid #fff;
  border-radius: 4px;
  gap: 24px;
  padding: 24px;
  margin-top: 24px;
`;

export const ItemList = styled.View`
  flex-direction: row;
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
  height: 48px;
`;

export const AddProject = styled.View`
  flex-direction: row;
  gap: 24px;
`;
