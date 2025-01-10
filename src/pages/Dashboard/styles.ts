import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-rows: 35% 65%;
  height: calc(100vh - 154px);
  gap: 24px;
  padding: 20px;

  & > div {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  & > div + div {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.02);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;