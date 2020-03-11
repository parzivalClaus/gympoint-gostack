import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  padding: 0 30px;
  height: 64px;
  background: #fff;
  border-color: #ddd;
  border-bottom-width: 1px;
  justify-content: center;
`;

export const ContainerImage = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 150px;
  height: 32px;
`;

export const ContainerLogout = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const LogoutButton = styled(RectButton)``;

export const LogoutText = styled.Text`
  font-size: 13px;
  color: #666;
  padding: 5px 8px;
`;
