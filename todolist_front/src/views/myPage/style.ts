import { css } from'@emotion/react';

export const titleStyle = css`
  text-align: center;
  margin-bottom: 20px;
`;

export const container = css`
  width: 50%;
  height: 100%;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 15px;
  background-color: antiquewhite;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

export const infoBox = css`
  width: 80%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const infoTitle = css`
  width: 30%;
`;

export const infoText = css`
  width: 80%;
  padding: 10px;
  margin-left: 10px;
  font-size: 14px;
  color: black;
  font-weight: 600;
  border: none;
  outline: none;
  background-color: transparent;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
`;

export const updateInfoText = css`
  width: 80%;
  padding: 10px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  outline: none;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
`;

export const infoButton = css`
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  background-color: white;
  font-size: 12px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }

  &:active {
    background-color: #eee;
  }
`;

export const infoButtons = css`
  width: 80%;
  box-sizing: border-box;
  display: flex;
  padding-top: 5px;
  justify-content: flex-end;

  & > button:nth-of-type(1) {
    margin-right: 10px;
  }
`;

