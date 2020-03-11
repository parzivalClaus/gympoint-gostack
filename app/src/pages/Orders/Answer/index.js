import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Touchable,
  AnswerContainer,
  QuestionTop,
  Question,
  QuestionDate,
  QuestionText,
  AnswerTop,
  AnswerTitle,
  AnswerDate,
  AnswerText,
} from './styles';

export default function Answer({ navigation }) {
  const answer = navigation.getParam('answer');
  return (
    <>
      <Touchable onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="#000" />
      </Touchable>
      <Container>
        <AnswerContainer>
          <QuestionTop>
            <Question>PERGUNTA</Question>
            <QuestionDate>{answer.formattedQuestionDate}</QuestionDate>
          </QuestionTop>
          <QuestionText>{answer.question}</QuestionText>
          <AnswerTop>
            <AnswerTitle>RESPOSTA</AnswerTitle>
            <AnswerDate>{answer.formattedAnswerDate}</AnswerDate>
          </AnswerTop>
          <AnswerText>{answer.answer}</AnswerText>
        </AnswerContainer>
      </Container>
    </>
  );
}
