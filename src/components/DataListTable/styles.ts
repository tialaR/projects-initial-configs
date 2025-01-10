import styled from 'styled-components';

export const TableWrapper = styled.div`
  background-color: ${({ theme, color }) => color ? color : theme.colors.grayScale.white};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
`;

export const TableTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title.t18.size};
  font-weight: ${({ theme }) => theme.typography.title.t18.bold};
`

export const TableWrapperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 2rem;
`
export const Filters = styled.div`
    display: flex;
    justify-content: flex-end; 
    align-items: center;
    gap: 0.625rem; 

    //Refatorar
    select {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        background-color: #fff;
        cursor: pointer;
        transition: border-color 0.2s ease;

        &:focus {
            border-color: #007bff;
            outline: none;
        }
    }
`;

export const StyledTableContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};
  border-radius: 8px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; 

  thead {
    background-color: ${({ theme }) => theme.colors.grayScale.gray300};

    th {
      font-weight: ${({ theme }) => theme.typography.title.t14.bold};
      font-size: ${({ theme }) => theme.typography.title.t14.size};
      text-align: left;
      padding-left: 1.75rem;
      padding-right: 1.75rem;
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;

      color: ${({ theme }) => theme.colors.grayScale.gray900};
      &:first-child {
        border-top-left-radius: 8px;
      }
      &:last-child {
        border-top-right-radius: 8px;
      }
    }
  }


  td {
    padding-left: 1.75rem;
    padding-right: 1.75rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    font-weight: ${({ theme }) => theme.typography.title.t14.regular};
    font-size: ${({ theme }) => theme.typography.title.t14.size};
    color: ${({ theme }) => theme.colors.grayScale.black};
    white-space: normal; 
    word-break: break-word; 
    overflow: visible; 
  }

  tbody {
    tr {
      border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
