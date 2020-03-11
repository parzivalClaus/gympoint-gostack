import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import { darken } from 'polished';

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}

`;

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

      div {
        background: #fff;
        border: 1px solid #dddddd;
        box-sizing: border-box;
        border-radius: 4px;
        margin-left: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;

        input {
          border: 0;
          font-size: 14px;
          line-height: 16px;
          color: #999999;
          margin-left: 10px;

          &:read-only {
            background: #f5f5f5;
          }
        }
      }
    }
  }

  div.table {
    background: #fff;
    padding: 30px;
    margin-top: 20px;
    border-radius: 4px;

    span {
      padding: 10px;
      margin: 20px 0px;
      font-size: 18px;
      color: #ee4d64;
      display: block;
      text-align: center;
    }

    svg {
      margin: 20px auto;
      width: 100%;
      text-align: center;
      animation: ${rotate} 1s linear infinite;
    }

    > div {
      grid-template-columns: 40% 10% 40% 10%;
      display: grid;
      padding: 10px 0px;

      & + div.line {
        border-top: 1px solid #eee;
      }

      div.tableTittle {
        font-weight: bold;
        font-size: 16px;
        color: #444;
        padding: 5px 0;
        line-height: 19px;
      }

      div.box {
        color: #666;
        padding: 10px 0;

        button {
          background: none;
          border: 0;
        }

        button.edit {
          color: #4d85ee;
        }

        button.delete {
          color: #de3b3b;
        }
      }

      div.actions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        text-align: right;
      }

      div.value {
        text-align: center;
      }
    }
  }

  footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }
`;

export const StyledLink = styled(Link)`
  background: #ee4d64;
  border-radius: 4px;
  border: 0;
  color: #fff;
  font-weight: bold;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  flex-direction: row;

  &:hover {
    background: ${darken(0.07, '#ee4d64')};
  }

  svg {
    margin-right: 8px;
  }
`;

export const Button = styled.button`
  background: #ee4d64;
  color: #fff;
  padding: 10px;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};

  &:hover {
    /* background: ${darken(0.07, '#ee4d64')}; */
    background: ${props =>
      props.disabled ? '#ee4d64' : `${darken(0.07, '#ee4d64')}`};
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
`;
