import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import history from '~/services/history';

import { Container, StyledButton, StyledButtonClose } from './styles';

export default function Answer({ visible }) {
  function cancelRepply() {
    history.push('/help-orders');
  }

  return (
    <Container visible={visible}>
      <Form>
        <StyledButtonClose type="button" onClick={() => cancelRepply()}>
          x
        </StyledButtonClose>
        <strong>PERGUNTA DO ALUNO</strong>
        <p>
          Olá pessoal da academia, gostaria de saber se quando acordar devo
          ingerir batata doce e frango logo de primeira, preparar as marmitas e
          lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?
        </p>
        <strong className="repply">SUA RESPOSTA</strong>
        <Input multiline name="answer" placeholder="Sua resposta..." />
        <StyledButton type="button">Responder aluno</StyledButton>
      </Form>
    </Container>
  );
}
