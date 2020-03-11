import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import { Container, Image, Form, Input, SubmitButton } from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit(idStudent) {
    dispatch(signInRequest(idStudent));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} alt="GymPoint" />
        <Form>
          <Input
            keyboardType="number-pad"
            autoCorrect={false}
            returnKeyType="send"
            placeholder="Informe seu ID de cadastro"
            onChangeText={setId}
            onSubmitEditing={() => handleSubmit(id)}
            value={id}
          />
          <SubmitButton loading={loading} onPress={() => handleSubmit(id)}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
