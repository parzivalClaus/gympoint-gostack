import React, { useEffect, useState } from 'react';
import { MdRefresh } from 'react-icons/md';
// import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  Container,
  Button,
  ContainerForm,
  StyledButtonClose,
  StyledButton,
} from './styles';

export default function HelpOrders() {
  const [page, setPage] = useState(1);
  const [helpOrders, setHelpOrders] = useState([]);
  const [reg, setReg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [helpOrder, setHelpOrder] = useState({});

  useEffect(() => {
    setLoading(true);
    async function loadHelpOrders() {
      const response = await api.get('help-orders', {
        params: { page },
      });

      const data = response.data.rows.map(h => ({
        ...h,
      }));

      setReg(response.data.count);
      setHelpOrders(data);
      setLoading(false);
    }
    loadHelpOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, reg, helpOrders.length]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  function handleAnswer() {
    setVisible(!visible);
    setHelpOrder({});
    console.log(helpOrder);
  }

  async function handleSubmit(h) {
    try {
      setLoading(true);
      await api.post(`/help-orders/${helpOrder.id}/answer`, h);

      setLoading(false);
      setHelpOrders(helpOrders.filter(help => help.id !== helpOrder.id));
      setVisible(false);
      toast.success('A resposta foi cadastrada com sucesso');
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.error);
    }
  }
  return (
    <>
      <ContainerForm visible={visible}>
        <Form onSubmit={handleSubmit}>
          <StyledButtonClose type="button" onClick={handleAnswer}>
            x
          </StyledButtonClose>
          <strong>PERGUNTA DO ALUNO</strong>
          <p>{helpOrder.question}</p>
          <strong className="repply">SUA RESPOSTA</strong>
          <Input multiline name="answer" placeholder="Sua resposta..." />
          <StyledButton type="submit">Responder aluno</StyledButton>
        </Form>
      </ContainerForm>
      <Container>
        <header>
          <p>Pedidos de Auxílio</p>
        </header>

        <div className="table">
          <div>
            <div className="tableTittle">ALUNO</div>
            <div className="tableTittle" />
          </div>

          {loading ? <MdRefresh size={50} color="#ee4d64" /> : ''}
          {reg !== 0 ? '' : <span>Não há nenhum pedido de auxílio.</span>}

          {helpOrders.map(help => (
            <div key={help.id} className="line">
              <div className="box">{help.student.name}</div>
              <div className="box actions ">
                <button
                  className="reply"
                  type="button"
                  onClick={() => [handleAnswer(), setHelpOrder(help)]}
                >
                  responder
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer>
          <Button type="button" onClick={handlePrevPage} disabled={page === 1}>
            Página anterior
          </Button>
          <Button
            type="button"
            onClick={handleNextPage}
            disabled={
              (page !== 1 && reg / 5 <= page) ||
              (page === 1 && helpOrders.length < 5)
            }
          >
            Próxima página
          </Button>
        </footer>
      </Container>
    </>
  );
}
