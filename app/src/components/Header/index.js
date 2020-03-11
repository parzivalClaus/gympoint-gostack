import React from 'react';

import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  ContainerImage,
  Image,
  ContainerLogout,
  LogoutButton,
  LogoutText,
} from './styles';
import logo from '~/assets/logo-h.png';

export default function Header() {
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <ContainerImage>
        <Image source={logo} alt="GymPoint" />
      </ContainerImage>
      <ContainerLogout>
        <LogoutButton onPress={handleLogout}>
          <LogoutText>Logout</LogoutText>
        </LogoutButton>
      </ContainerLogout>
    </Container>
  );
}
