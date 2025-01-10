import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  color: #444;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    font-size: 24px;
    color: #666;

    &:hover {
      color: #007bff;
    }
  }
`;