import { ReactNode } from 'react';
import { Pagination } from './Pagination';
import { SearchBar } from '#components/SearchBar';
import * as S from './styles';

type Columns = {
    id: number;
    item: ReactNode | string;
};

type DataListTableProps = {
    title: string;
    columns: Columns[];
    dataList: ReactNode[][];
    currentPage: number;
    itemsPerPage: number;
    totalRows: number;
    hasSearchBar?: boolean;
    searchPlaceholder?: string;
    hasResearchFilter?: boolean;
    columnWidths: string[];
    handlePageChange: (page: number) => void;
};

const DataListTable: React.FC<DataListTableProps> = ({
    title = "",
    columns = [],
    columnWidths = [],
    dataList = [],
    currentPage = 1,
    itemsPerPage = 10,
    totalRows = 0,
    hasSearchBar = false,
    searchPlaceholder = "Pesquisar",
    hasResearchFilter = false,
    handlePageChange,
}) => {
    return (
        <S.TableWrapper>
            <S.TableWrapperHeader>
                <S.TableTitle>{title}</S.TableTitle>

                <S.Filters>
                    {hasSearchBar &&
                        <SearchBar
                            placeholder={searchPlaceholder}
                            debounceEnabled
                            width="29.625rem"
                            onSearch={(searchItem) => console.log("Pesquisar:", searchItem)}
                        />}
                    {hasResearchFilter &&
                        <select onChange={(e) => console.log("Filtro selecionado:", e.target.value)}>
                            <option value="">Filtros</option>
                            <option value="event">Evento</option>
                            <option value="exhibitors">Expositores</option>
                        </select>}
                </S.Filters>
            </S.TableWrapperHeader>

            <S.StyledTableContainer>
                <S.StyledTable>
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={column.id} style={{ width: columnWidths[index] }}>
                                    {column.item}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {dataList.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </S.StyledTable>
            </S.StyledTableContainer>
            <Pagination
                totalRows={totalRows}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </S.TableWrapper>
    );
};

export { DataListTable };
