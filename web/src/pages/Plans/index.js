import React, { useEffect, useState } from 'react';
import { MdAdd, MdRefresh } from 'react-icons/md';
import { toast } from 'react-toastify';

import { formatPrice } from '~/util/format';
import api from '~/services/api';

import history from '~/services/history';

import { Container, Button, StyledLink } from './styles';

export default function Plans() {
  const [page, setPage] = useState(1);
  const [plans, setPlans] = useState([]);
  const [reg, setReg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadPlans() {
      const response = await api.get('plans', {
        params: { page },
      });

      const data = response.data.rows.map(p => ({
        ...p,
        priceFormatted: formatPrice(p.price),
        totalPrice: formatPrice(p.price * p.duration),
      }));

      setReg(response.data.count);
      setPlans(data);
      setLoading(false);
    }
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, reg, plans.length]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja deletar este plano?') === true) {
      try {
        const response = await api.delete(`plans/${id}`);

        if (response.data.error) {
          throw response.data;
        }

        setPlans(plans.filter(plan => plan.id !== id));

        toast.success('O plano foi deletado com sucesso!');
      } catch (err) {
        toast.error(err.error);
      }
    }
  }

  return (
    <Container>
      <header>
        <p>Gerenciando planos</p>

        <div>
          <StyledLink to="/register-plans" type="button">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </StyledLink>
        </div>
      </header>

      <div className="table">
        <div>
          <div className="tableTittle">TÍTULO</div>
          <div className="tableTittle">DURAÇÃO</div>
          <div className="tableTittle value">VALOR p/ MÊS</div>
          <div className="tableTittle" />
        </div>

        {loading ? <MdRefresh size={50} color="#ee4d64" /> : ''}
        {reg !== 0 ? '' : <span>Não há nenhum plano cadastrado.</span>}

        {plans.map(plan => (
          <div key={plan.id} className="line">
            <div className="box">{plan.title}</div>
            <div className="box">
              {plan.duration > 1 ? `${plan.duration} meses` : '1 mês'}
            </div>
            <div className="box value">{plan.priceFormatted}</div>
            <div className="box actions ">
              <button
                className="edit"
                type="button"
                onClick={() =>
                  history.push(`/register-plans/${plan.id}`, { plan })
                }
              >
                editar
              </button>
              <button
                className="delete"
                type="button"
                onClick={() => handleDelete(plan.id)}
              >
                apagar
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
            (page !== 1 && reg / 5 <= page) || (page === 1 && plans.length < 5)
          }
        >
          Próxima página
        </Button>
      </footer>
    </Container>
  );
}
