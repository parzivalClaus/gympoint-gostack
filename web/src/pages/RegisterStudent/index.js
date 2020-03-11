import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import history from '~services/history';
import api from '~/services/api';

import { Container, StyledButton } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function RegisterStudent({ history: navigation }) {
  const { student } = navigation.location.state || '';
  const [loading, setLoading] = useState(false);

  async function handleSubmit(s) {
    if (student) {
      try {
        setLoading(true);
        await api.put(`/students/${student.id}`, s);

        setLoading(false);
        toast.success('O aluno foi editado com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    } else {
      try {
        setLoading(true);
        await api.post('/students', s);

        setLoading(false);
        toast.success('O aluno foi cadastrado com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
        <header>
          <p>{student ? 'Edição' : 'Cadastro'} de aluno</p>

          <div>
            <StyledButton onClick={() => history.push('/')} type="button">
              <MdKeyboardArrowLeft size={20} color="#fff" />
              VOLTAR
            </StyledButton>
            <StyledButton type="submit">
              <MdCheck size={20} color="#fff" />
              {loading ? 'SALVANDO...' : 'SALVAR'}
            </StyledButton>
          </div>
        </header>
        <div className="data">
          <strong>NOME COMPLETO</strong>
          <br />
          <Input name="name" type="text" />
          <strong>ENDEREÇO DE E-MAIL</strong>
          <br />
          <Input name="email" type="email" />
          <div>
            <div>
              <strong>IDADE</strong>
              <br />
              <Input name="age" type="text" />
            </div>
            <div>
              <strong>PESO (em kg)</strong>
              <br />
              <Input name="weight" />
            </div>
            <div>
              <strong>ALTURA</strong>
              <br />
              <Input name="height" />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}

RegisterStudent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
