import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.5);
  visibility: ${props => (props.visible ? 'block' : 'hidden')};
  width: 100%;
  position: absolute;
  left: 0;
  margin: 0;
  z-index: 9999999;
  height: 100%;
  margin-top: -64px;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    background: #fff;
    position: relative;
    width: 450px;
    padding: 30px;
    border-radius: 4px;

    strong {
      font-size: 14px;
      line-height: 16px;
      font-weight: bold;
      display: block;
    }

    strong.repply {
      margin-top: 20px;
    }

    p {
      font-size: 16px;
      line-height: 26px;
      margin: 8px 0;
    }

    textarea {
      font-family: 'Roboto', sans-serif;
      width: 100%;
      padding: 15px;
      display: block;
      color: #999;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      margin: 8px 0;

      &:placeholder {
        color: #999;
      }
    }
  }
`;

export const StyledButton = styled.button`
  color: #fff;
  background: #ee4d64;
  border-radius: 4px;
  text-align: center;
  display: block;
  width: 100%;
  padding: 15px;
  font-weight: bold;
  font-size: 16px;
  border: 0;

  &:hover {
    background: ${darken(0.07, '#ee4d64')};
  }
`;

export const StyledButtonClose = styled.button`
  position: absolute;
  right: 6px;
  top: 6px;
  color: #fff;
  background: #ee4d64;
  border-radius: 4px;
  padding: 5px 11px;
  border: 0;

  &:hover {
    background: ${darken(0.07, '#ee4d64')};
  }
`;
