import React, { useEffect, useState } from 'react';
import { MdAdd, MdSearch, MdRefresh } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';

import history from '~/services/history';

import { Container, Button, StyledLink } from './styles';

export default function Students() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [students, setStudents] = useState([]);
  const [reg, setReg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadStudents() {
      const response = await api.get('students', {
        params: { page, q },
      });

      const data = response.data.rows.map(s => ({
        ...s,
      }));

      setReg(response.data.count);
      setStudents(data);
      setLoading(false);
    }
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, q, reg, students.length]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja deletar este aluno?') === true) {
      try {
        const response = await api.delete(`students/${id}`);

        if (response.data.error) {
          throw response.data;
        }

        setStudents(students.filter(student => student.id !== id));

        toast.success('O aluno foi deletado com sucesso!');
      } catch (err) {
        toast.error(err.error);
      }
    }
  }

  return (
    <Container>
      <header>
        <p>Gerenciando alunos</p>

        <div>
          <StyledLink to="/register-student" type="button">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </StyledLink>
          <div>
            <MdSearch size={20} color="#999999" />

            <Input
              name="search"
              type="text"
              placeholder="Buscar aluno"
              value={q}
              onChange={e => [setQ(e.target.value), setPage(1)]}
            />
          </div>
        </div>
      </header>

      <div className="table">
        <div>
          <div className="tableTittle">NOME</div>
          <div className="tableTittle">E-MAIL</div>
          <div className="tableTittle age">IDADE</div>
          <div className="tableTittle" />
        </div>

        {loading ? <MdRefresh size={50} color="#ee4d64" /> : ''}
        {reg !== 0 ? '' : <span>Não há nenhum aluno cadastrado.</span>}

        {students.map(student => (
          <div key={student.id} className="line">
            <div className="box">{student.name}</div>
            <div className="box">{student.email}</div>
            <div className="box age">{student.age}</div>
            <div className="box actions ">
              <button
                className="edit"
                type="button"
                onClick={() =>
                  history.push(`/register-student/${student.id}`, { student })
                }
              >
                editar
              </button>
              <button
                className="delete"
                type="button"
                onClick={() => handleDelete(student.id)}
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
            (page === 1 && students.length < 5) ||
            (q !== '' && reg === 5) ||
            reg === 5
          }
        >
          Próxima página
        </Button>
      </footer>
    </Container>
  );
}
