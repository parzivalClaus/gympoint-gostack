import styled from 'styled-components/native';
import { TouchableOpacity, TextInput } from 'react-native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 20px 30px;
`;

export const Form = styled.View``;

export const Touchable = styled(TouchableOpacity)`
  position: absolute;
  margin-top: -43px;
  z-index: 999;
  left: 20px;
`;

export const StyledTextInput = styled(TextInput)`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  color: #999;
  font-size: 16px;
`;

export const StyledButton = styled(Button)``;
