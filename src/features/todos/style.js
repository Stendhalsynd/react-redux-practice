import styled from "styled-components";

export const InputStyle = styled.input`
  border: none;
  width: 100%;
  box-sizing: border-box;
`;

export const titleStyle = {
  padding: "15px",
  background: "antiquewhite",
  fontWeight: "bold",
  fontSize: "x-large",
};

export const itemContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 14fr 1fr",
  padding: "10px 0",
};

export const footerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  borderBottom: "0.5px solid black",
};
