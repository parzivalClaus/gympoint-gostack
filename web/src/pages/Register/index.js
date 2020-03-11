import React, { useState, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { format, addMonths, parseISO } from 'date-fns';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import history from '~services/history';
import api from '~/services/api';

import {
  Container,
  StyledButton,
  CustomAsyncSelect,
  CustomSelect,
  CustomDatePicker,
} from './styles';

export default function Register({ history: navigation }) {
  const { registration } = navigation.location.state || '';
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(
    registration ? registration.student : ''
  );

  const [startDate, setStartDate] = useState(
    registration ? parseISO(registration.start_date) : ''
  );

  const [plan, setPlan] = useState(registration ? registration.plan : '');

  const [totalPrice, setTotalPrice] = useState(
    registration
      ? `R$ ${registration.plan.duration * registration.plan.price}.00`
      : ''
  );

  const endDate = useMemo(() => {
    if (plan && startDate) {
      return plan.duration
        ? format(addMonths(startDate, plan.duration), 'dd/MM/yyyy')
        : format(addMonths(startDate, plan.duration), 'dd/MM/yyyy');
    }

    return '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan, startDate]);

  function handlePlanChange(e) {
    setPlan(e);
    setTotalPrice(e ? `R$ ${e.totalPrice.toFixed(2).replace('.', '.')}` : '');
  }

  async function loadPlans() {
    const response = await api.get(`plans`);
    return new Promise(resolve => {
      resolve(
        response.data.rows.map(p1 => {
          return {
            value: p1.id,
            label: p1.title,
            duration: p1.duration,
            totalPrice: p1.price * p1.duration,
            ...p1,
          };
        })
      );
    });
  }

  async function handleSubmit() {
    if (registration) {
      try {
        setLoading(true);
        await api.put(`/registrations/${student.id}`, {
          plan_id: plan.id,
          start_date: startDate,
        });

        setLoading(false);
        toast.success('A matrícula foi editada com sucesso');
      } catch (err) {
        setLoading(false);
        console.log(startDate);

        toast.error(err.response.data.error);
      }
    } else {
      try {
        setLoading(true);
        await api.post('/registrations', {
          student_id: student.id,
          plan_id: plan.value,
          start_date: startDate,
        });

        setLoading(false);
        toast.success('A matrícula foi cadastrada com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    }
  }

  async function loadStudents(q) {
    const res = await api.get(`students`, { params: { q } });

    return new Promise(resolve => {
      resolve(
        res.data.rows.map(st => {
          return {
            value: st.id,
            label: st.name,
            ...st,
          };
        })
      );
    });
  }

  return (
    <Container>
      <Form initialData={registration} onSubmit={handleSubmit}>
        <header>
          <p>{registration ? 'Edição' : 'Cadastro'} de matrículas</p>

          <div>
            <StyledButton
              onClick={() => history.push('/registrations')}
              type="button"
            >
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
          <strong>ALUNO</strong>
          <br />
          <CustomAsyncSelect
            isSearchable={!registration}
            defaultOptions={!registration}
            loadOptions={e => loadStudents(e)}
            defaultValue={{
              label: registration ? registration.student.name : '',
              value: registration ? registration.student : '',
            }}
            onChange={e => setStudent(e)}
            placeholder="Buscar aluno"
            name="student.id"
          />
          <div className="grid">
            <div>
              <strong>PLANO</strong>
              <br />
              <CustomSelect
                name="plan"
                isClearable
                defaultOptions
                loadOptions={e => loadPlans(e)}
                defaultValue={{
                  label: registration ? registration.plan.title : '',
                  value: plan,
                }}
                onChange={e => handlePlanChange(e)}
                placeholder="Selecione o plano"
              />
            </div>
            <div>
              <strong>DATA DE INÍCIO</strong>
              <br />
              <CustomDatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                minDate={new Date()}
                defaultValue={{
                  label: registration ? startDate : new Date(),
                  value: registration ? registration.start_date : new Date(),
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Escolha a data"
                name="start_date"
              />
            </div>
            <div>
              <strong>DATA DE TÉRMINO</strong>
              <br />
              <Input name="endDate" value={endDate} className="form" readOnly />
            </div>
            <div>
              <strong>VALOR FINAL</strong>
              <br />
              <Input
                name="totalPrice"
                value={totalPrice}
                className="form"
                readOnly
              />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
