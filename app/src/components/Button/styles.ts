import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled }: { disabled: boolean }) =>
    disabled ? '#0A84FF80' : '#0A84FF'};
  border-radius: 4px;
  padding: 14px 24px;
`;
