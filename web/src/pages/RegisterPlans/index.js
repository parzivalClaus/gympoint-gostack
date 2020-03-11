import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import history from '~services/history';
import api from '~/services/api';

import { Container, StyledButton } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O nome do plano é obrigatório'),
  duration: Yup.number()
    .integer()
    .typeError('A duração do plano é obrigatória')
    .required('A duração do plano é obrigatória'),
  price: Yup.number('O valor precisa ser numérico')
    .typeError('O preço é obrigatório')
    .required('O valor do plano é obrigatório'),
});

export default function RegisterPlans({ history: navigation }) {
  const { plan } = navigation.location.state || '';
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(plan ? plan.duration : 0);
  const [price, setPrice] = useState(plan ? plan.price : 0);
  const [totalPrice, setTotalPrice] = useState(
    plan ? Number(plan.price * plan.duration) : 0
  );

  useEffect(() => {
    async function calcTotalPrice() {
      const total = price * duration;
      setTotalPrice(total);
    }
    calcTotalPrice();
  }, [duration, price, totalPrice]);

  async function handleSubmit(p) {
    if (plan) {
      try {
        setLoading(true);
        await api.put(`/plans/${plan.id}`, p);

        setLoading(false);
        toast.success('O plano foi editado com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    } else {
      try {
        setLoading(true);
        await api.post('/plans', p);

        setLoading(false);
        toast.success('O plano foi cadastrado com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Form initialData={plan} schema={schema} onSubmit={handleSubmit}>
        <header>
          <p>{plan ? 'Edição' : 'Cadastro'} de planos</p>

          <div>
            <StyledButton onClick={() => history.push('/plans')} type="button">
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
          <strong>TÍTULO DO PLANO</strong>
          <br />
          <Input name="title" type="text" />
          <div>
            <div>
              <strong>DURAÇÃO (em meses)</strong>
              <br />
              <Input
                name="duration"
                type="number"
                defaultValue={duration}
                onChange={d => setDuration(d.target.value)}
              />
            </div>
            <div>
              <strong>PREÇO MENSAL</strong>
              <br />
              <Input
                type="number"
                name="price"
                defaultValue={price}
                onChange={p => setPrice(p.target.value)}
              />
            </div>
            <div>
              <strong>PREÇO TOTAL</strong>
              <br />
              <Input type="number" name="total" readOnly value={totalPrice} />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}

RegisterPlans.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
