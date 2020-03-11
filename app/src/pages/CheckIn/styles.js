import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 20px 30px;
`;

export const StyledButton = styled(Button)``;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const CheckinContainer = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 15px 20px;
  border: 1px solid #ddd;
`;

export const CheckinNumber = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
  text-align: center;
`;

export const CheckinDate = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
`;
