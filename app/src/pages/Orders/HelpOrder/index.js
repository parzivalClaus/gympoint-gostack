import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import { useSelector } from 'react-redux';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  StyledButton,
  List,
  AnswerContainer,
  AnswerView,
  AnswerTop,
  Answer,
  AnswerText,
  AnswerDate,
  AnswerQuestion,
} from './styles';

import api from '~/services/api';

function HelpOrder({ navigation, isFocused }) {
  const id = useSelector(state => state.auth.id);
  const [helpOrders, setHelpOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    console.tron.log(`PageNumber ${pageNumber}`);
    console.tron.log(`Page ${page}`);
    console.tron.log(`Total ${total}`);
    if (pageNumber > total) return;
    if (loading) return;

    setLoading(true);

    const response = await api.get(`students/${id}/help-orders`, {
      params: { page: pageNumber },
    });
    const data = response.data.rows.map(answer => ({
      ...answer,
      formattedQuestionDate: formatRelative(
        parseISO(answer.createdAt),
        new Date(),
        {
          locale: pt,
        }
      ),
      formattedAnswerDate: answer.answer_at
        ? formatRelative(parseISO(answer.answer_at), new Date(), {
            locale: pt,
          })
        : null,
    }));

    const totalItems = response.data.count;
    setTotal(Math.ceil(totalItems / 7));

    setLoading(false);
    setPage(pageNumber + 1);
    setHelpOrders(shouldRefresh ? data : [...helpOrders, ...data]);
  }

  function refreshList() {
    setRefreshing(true);
    loadPage(1, true);

    setRefreshing(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    if (total === 0) {
      setTotal(1);
    }
    refreshList();
  }, [isFocused]);

  return (
    <>
      <Container>
        <StyledButton onPress={() => navigation.navigate('NewHelpOrder')}>
          Novo pedido de auxílio
        </StyledButton>
        <List
          key="list"
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.01}
          bounces={false}
          onEndReached={() => loadPage()}
          ListFooterComponent={() =>
            loading && <ActivityIndicator size="small" color="#000" />
          }
          renderItem={({ item: answer }) => (
            <AnswerContainer
              onPress={() => navigation.navigate('Answer', { answer })}
            >
              <AnswerView>
                <AnswerTop>
                  <Answer>
                    <Icon
                      name="check-circle"
                      size={18}
                      color={answer.answer ? '#42cb59' : '#999'}
                    />
                    <AnswerText answer={answer.answer}>
                      {answer.answer ? 'Respondido' : 'Sem resposta'}
                    </AnswerText>
                  </Answer>
                  <AnswerDate>{answer.formattedQuestionDate}</AnswerDate>
                </AnswerTop>
                <AnswerQuestion>{answer.question}</AnswerQuestion>
              </AnswerView>
            </AnswerContainer>
          )}
        />
      </Container>
    </>
  );
}

export default withNavigationFocus(HelpOrder);
