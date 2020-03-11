import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

import sort from 'fast-sort';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  StyledButton,
  List,
  CheckinContainer,
  CheckinNumber,
  CheckinDate,
} from './styles';
import Header from '~/components/Header';

import api from '~/services/api';

export default function CheckIn() {
  const id = useSelector(state => state.auth.id);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadCheckins() {
    const response = await api.get(`students/${id}/checkins`);
    const data = response.data.map((checkin, index) => ({
      ...checkin,
      checkinNumber: index + 1,
      checkinDate: formatRelative(parseISO(checkin.createdAt), new Date(), {
        locale: pt,
      }),
    }));

    const orderedData = sort(data).desc(check => check.checkinNumber);
    setCheckins(orderedData);
  }

  useEffect(() => {
    loadCheckins();
  }, []);

  async function handleCheckin() {
    setLoading(true);
    const response = await api.post(`students/${id}/checkins`);

    if (response.data.error) {
      Alert.alert(response.data.error);
      setLoading(false);
    }

    loadCheckins();
    setLoading(false);
  }

  return (
    <>
      <Header />
      <Container>
        <StyledButton loading={loading} onPress={handleCheckin}>
          Novo check-in
        </StyledButton>

        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <CheckinContainer>
              <CheckinNumber>Check-in #{item.checkinNumber}</CheckinNumber>
              <CheckinDate>{item.checkinDate}</CheckinDate>
            </CheckinContainer>
          )}
        />
      </Container>
    </>
  );
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
