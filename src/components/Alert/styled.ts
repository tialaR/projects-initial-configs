import styled from "styled-components";

export const AlertContainer = styled.div<{ type: "success" | "error" }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ type }) => (type === "success" ? "#28a745" : "#dc3545")};
  background-color: ${({ type }) => (type === "success" ? "#eaf7eb" : "#fdecea")};
  color: ${({ type }) => (type === "success" ? "#155724" : "#721c24")};
`;

export const Icon = styled.span<{ type: "success" | "error" }>`
  font-size: 20px;
  font-weight: bold;
  color: ${({ type }) => (type === "success" ? "#28a745" : "#dc3545")};
`;

export const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
`;