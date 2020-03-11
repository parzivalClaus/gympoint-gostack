import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { zonedTimeToUtc } from 'date-fns-tz';
import { MdAdd, MdRefresh, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import history from '~/services/history';

import { Container, Button, StyledLink } from './styles';

export default function Plans() {
  const [page, setPage] = useState(1);
  const [registrations, setRegistrations] = useState([]);
  const [reg, setReg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadRegistrations() {
      const response = await api.get('registrations', {
        params: { page },
      });

      const data = response.data.rows.map(r => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return {
          ...r,
          startDateFormatted: format(
            zonedTimeToUtc(r.start_date, timezone),
            "d 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
          endDateFormatted: format(
            zonedTimeToUtc(r.end_date, timezone),
            "d 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
        };
      });

      setReg(response.data.count);
      setRegistrations(data);
      setLoading(false);
    }
    loadRegistrations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, reg, registrations.length]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja deletar esta matrícula?') === true) {
      await api.delete(`registrations/${id}`);

      setRegistrations(
        registrations.filter(registration => registration.id !== id)
      );

      toast.success('A matrícula foi deletada com sucesso!');
    }
  }

  return (
    <Container>
      <header>
        <p>Gerenciando matrículas</p>

        <div>
          <StyledLink to="/register" type="button">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </StyledLink>
        </div>
      </header>

      <div className="table">
        <div>
          <div className="tableTittle">ALUNO</div>
          <div className="tableTittle center">PLANO</div>
          <div className="tableTittle center">INÍCIO</div>
          <div className="tableTittle center">TÉRMINO</div>
          <div className="tableTittle center">ATIVA</div>
          <div className="tableTittle" />
        </div>

        {loading ? <MdRefresh size={50} color="#ee4d64" /> : ''}
        {reg !== 0 ? '' : <span>Não há nenhuma matrícula.</span>}

        {registrations.map(registration => (
          <div key={registration.id} className="line">
            <div className="box">{registration.student.name}</div>
            <div className="box center">{registration.plan.title}</div>
            <div className="box center">{registration.startDateFormatted}</div>
            <div className="box center">{registration.endDateFormatted}</div>
            <div className="box center">
              {registration.active ? (
                <MdCheckCircle size={20} color="#42cb59" />
              ) : (
                <MdCheckCircle size={20} color="#dddddd" />
              )}
            </div>
            <div className="box actions ">
              <button
                className="edit"
                type="button"
                onClick={() =>
                  history.push(`/register/${registration.id}`, { registration })
                }
              >
                editar
              </button>
              <button
                className="delete"
                type="button"
                onClick={() => handleDelete(registration.id)}
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
            (page !== 1 && reg / 5 <= page) ||
            (page === 1 && registrations.length < 5)
          }
        >
          Próxima página
        </Button>
      </footer>
    </Container>
  );
}
