import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Form,
  Touchable,
  StyledButton,
  StyledTextInput,
} from './styles';

import api from '~/services/api';

export default function NewHelpOrder({ navigation }) {
  const id = useSelector(state => state.auth.id);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    if (question === '') {
      Alert.alert('A mensagem precisa ser preenchida.');
      setLoading(false);
      return;
    }

    await api.post(`students/${id}/help-orders`, {
      question,
    });

    setQuestion('');
    setLoading(false);
    navigation.navigate('HelpOrder');
  }
  return (
    <>
      <Touchable onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="#000" />
      </Touchable>
      <Container>
        <Form>
          <StyledTextInput
            multiline
            placeholder="Inclua seu pedido de auxílio"
            textAlignVertical="top"
            numberOfLines={10}
            onChangeText={setQuestion}
            onSubmitEditing={handleSubmit}
            value={question}
          />
          <StyledButton loading={loading} onPress={handleSubmit}>
            Enviar pedido
          </StyledButton>
        </Form>
      </Container>
    </>
  );
}
