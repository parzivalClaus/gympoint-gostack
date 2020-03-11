import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 20px 30px;
`;

export const StyledButton = styled(Button)``;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
export const AnswerContainer = styled(RectButton)`
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
`;

export const AnswerView = styled.View`
  border: 1px solid #ddd;
  padding: 15px 20px;
  border-radius: 4px;
`;

export const AnswerTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Answer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AnswerText = styled.Text`
  margin-left: 8px;
  font-weight: bold;
  font-size: 14px;
  color: ${props => (props.answer ? '#42cb59' : '#999')};
`;

export const AnswerDate = styled.Text`
  font-size: 14px;
  color: #666;
`;
export const AnswerQuestion = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 26px;
  margin-top: 16px;
`;
