import styled, { css } from 'styled-components';

export const Exhibitor = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

type StatusBadgeProps = {
  status: "ativated" | "inApproval" | "desactivated";
};

const statusStyles = {
  ativated: css`
    background-color: #e6f7e6; 
    color: #4caf50; 
  `,
  inApproval: css`
    background-color: #fff3e0; 
    color: #ffa726; 
  `,
  desactivated: css`
    background-color: #fbeaea; 
    color: #e57373; 
  `,
};

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  text-align: center;

  ${({ status }) => statusStyles[status]}
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
