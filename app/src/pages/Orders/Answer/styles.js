import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 20px 30px;
`;

export const Touchable = styled(TouchableOpacity)`
  position: absolute;
  margin-top: -43px;
  z-index: 999;
  left: 20px;
`;

export const AnswerContainer = styled.View`
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;
export const QuestionTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Question = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;
export const QuestionDate = styled.Text`
  font-size: 14px;
  color: #666;
`;
export const QuestionText = styled.Text`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  line-height: 26px;
`;

export const AnswerTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

export const AnswerTitle = styled.Text`
  font-size: 14px;
  color: #444;
  font-weight: bold;
`;

export const AnswerDate = styled.Text`
  font-size: 14px;
  color: #666;
`;
export const AnswerText = styled.Text`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  line-height: 26px;
`;
