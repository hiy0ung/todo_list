import { css } from "@emotion/react";

export const container = css`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 15px;
  background-color: antiquewhite;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

export const inputStyle = css`
  padding-left: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

`;

export const btnStyle = css`
  margin-top: 10px;
  background-color: #f4a261;
`