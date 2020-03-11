import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
  width: 1200px;
  margin: 30px auto;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      text-align: left;
    }

    div {
      display: flex;
      flex-direction: row;
    }
  }

  div.data {
    background: #fff;
    padding: 30px;
    margin-top: 20px;
    border-radius: 4px;

    strong {
      font-size: 14px;
      font-weight: bold;
      line-height: 16px;
    }

    input {
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      padding: 13px 15px;
      color: #999999;
      margin-top: 8px;
      margin-bottom: 20px;

      &:placeholder {
        color: #999999;
      }
    }
    span {
      color: ${darken(0.05, '#ee4d64')};
      display: block;
      padding: 7px;
      margin-top: -18px;
      border-radius: 15px;
      font-size: 14px;
      margin-bottom: 15px;
    }

    > div {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-column-gap: 16px;
    }
  }
`;

export const StyledButton = styled.button`
  background: #cccccc;
  border-radius: 4px;
  border: 0;
  color: #fff;
  font-weight: bold;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  flex-direction: row;

  button:hover {
    background: ${darken(0.07, '#cccccc')};
  }

  & + button {
    background: #ee4d64;
    margin-left: 16px;
  }

  & + button:hover {
    background: ${darken(0.07, '#ee4d64')};
  }

  svg {
    margin-right: 8px;
  }
`;
