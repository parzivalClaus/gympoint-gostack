import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-h.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <ul>
            <NavLink
              activeStyle={{ color: '#000' }}
              id="students"
              to="/students"
            >
              ALUNOS
            </NavLink>
            <NavLink activeStyle={{ color: '#000' }} id="plans" to="/plans">
              PLANOS
            </NavLink>
            <NavLink
              activeStyle={{ color: '#000' }}
              id="registrations"
              to="/registrations"
            >
              MATRÍCULAS
            </NavLink>
            <NavLink
              activeStyle={{ color: '#000' }}
              id="help-orders"
              to="/help-orders"
            >
              PEDIDOS DE AUXÍLIO
            </NavLink>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <NavLink to="/" onClick={handleSignOut}>
                Sair do sistema
              </NavLink>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
