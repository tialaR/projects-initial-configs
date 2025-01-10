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
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
`
export const Filters = styled.div`

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

  tbody tr:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray200};
  }
`;

type SearchWrapperProps = {
  width?: string | number;
}

export const SearchWrapper = styled.div<SearchWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border: ${({ theme }) => `2px solid ${theme.colors.grayScale.gray500}`};
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus-within {
    border: ${({ theme }) => `2px solid ${theme.colors.primary.purple100}`};
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
  color: ${({ theme }) => theme.colors.grayScale.gray800};

  &::placeholder {
    font-size: ${({ theme }) => theme.typography.paragraph.p16.size};
    color: ${({ theme }) => theme.colors.grayScale.gray800};
  }

  border: none !important;
  outline: none !important;

  caret-color: ${({ theme }) => theme.colors.primary.purple100};
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const SearchIconButton = styled.button`
  color: ${({ theme }) => theme.colors.primary.purple100};
  cursor: pointer;
  position: absolute;
  right: 0.5rem;
  font-size: 24px;
  background: none;
  border: none;
`;

export const OptionsList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.grayScale.white};
    border: 2px solid ${({ theme }) => theme.colors.primary.purple100};
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    margin-top: 0.25rem;
    max-height: 16.75rem;
    overflow-y: auto;
    list-style: none;

    padding-top: 1rem;
    padding-bottom: 2rem;
    padding-left: 1.5rem;
    padding-right: 2rem;

    &::-webkit-scrollbar {
        width: 0.65rem; 
        height: 0.2rem; 
        background: transparent; 
        border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.grayScale.gray500};
        border-radius: 8px;
        &:hover {
          background: ${({ theme }) => theme.colors.grayScale.gray500};
          opacity: 0.9;
        }
        &:active {
          background: ${({ theme }) => theme.colors.grayScale.gray600};
        }
    }
`;

export const OptionItem = styled.li`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.grayScale.white};
    opacity: 1;
    transition: background-color 0.2s;
    overflow: hidden; 
    padding: 1rem;

    &:hover {
        opacity: 0.9;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.colors.grayScale.gray200};
    }
`;

