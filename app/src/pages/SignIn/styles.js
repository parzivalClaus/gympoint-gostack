import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
})`
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  align-self: stretch;
`;

export const Image = styled.Image`
  width: 150px;
  height: 100px;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const Input = styled.TextInput`
  color: #999;
  border: 1px solid #ddd;
  padding: 13px 20px;
  border-radius: 4px;
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
