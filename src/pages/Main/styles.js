import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #192151;
  border: 0;
  padding: 0 13px;
  margin-left: 15px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-left: 8px;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &:hover {
    box-shadow: 2px 2px 2px #777;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  font-size: 16px;

  li {
    padding: 15px 0;
    display: flex;
    padding-right: 9px;
    padding-left: 9px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

   & + li {
     border-top: 1px solid #eee;
    }

   a {
      color: #192151;
      text-decoration: none;
   }
  }
`;
