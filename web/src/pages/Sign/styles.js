import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  width: 360px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 30px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  img {
    width: 153px;
    height: 100px;
    margin: 0 auto 30px;
  }

  form {
    text-align: left;

    strong {
      line-height: 16px;
      font-weight: bold;
      color: #444444;
    }

    input {
      background: #fff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding: 13px;
      width: 100%;
      margin-top: 8px;
      margin-bottom: 20px;

      &::placeholder {
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

    button {
      background: #ee4d64;
      border: 0px;
      border-radius: 4px;
      color: #fff;
      padding: 13px;
      width: 100%;
      font-weight: bold;
      text-align: center;

      &:hover {
        background: ${darken(0.07, '#ee4d64')};
      }
    }
  }
`;
