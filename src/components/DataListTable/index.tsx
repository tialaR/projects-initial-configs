import { ReactNode, useEffect, useState, isValidElement } from 'react';
import { Pagination } from './Pagination';
import { SearchBar } from '#components/SearchBar';
import * as S from './styles';

type Columns = {
    id: number;
    item: ReactNode | string;
};

type DataListTableProps<T extends readonly unknown[]> = {
    title: string;
    columns: Columns[];
    dataList: T[];
    currentPage: number;
    itemsPerPage: number;
    totalRows: number;
    hasSearchBar?: boolean;
    searchPlaceholder?: string;
    hasResearchFilter?: boolean;
    columnWidths: string[];
    handlePageChange: (page: number) => void;
    onSearchEvent?: (searchedElement: string) => void;
};

const DataListTable = <T extends readonly unknown[]>({
    title,
    columns,
    dataList,
    currentPage,
    itemsPerPage,
    totalRows,
    hasSearchBar = false,
    searchPlaceholder = 'Pesquisar',
    hasResearchFilter = false,
    columnWidths,
    handlePageChange,
    onSearchEvent = () => { },
}: DataListTableProps<T>) => {
    const [filteredList, setFilteredList] = useState<T[]>(dataList);

    useEffect(() => {
        setFilteredList(dataList);
    }, [dataList]);

    const handleSearchElement = (searchedElement: string) => {
        if (!searchedElement.trim()) {
            setFilteredList(dataList);
        } else {
            const filtered = dataList.filter((row) =>
                row.some((cell) =>
                    typeof cell === 'string' && cell.toLowerCase().includes(searchedElement.toLowerCase())
                )
            );
            setFilteredList(filtered);
        }

        onSearchEvent?.(searchedElement);
    };

    return (
        <S.TableWrapper>
            <S.TableWrapperHeader>
                <S.TableTitle>{title}</S.TableTitle>

                <S.Filters>
                    {hasSearchBar && (
                        <SearchBar
                            placeholder={searchPlaceholder}
                            debounceEnabled
                            width="29.625rem"
                            onSearch={handleSearchElement}
                        />
                    )}
                    {hasResearchFilter && (
                        <select onChange={(e) => console.log("Filtro selecionado:", e.target.value)}>
                            <option value="">Filtros</option>
                            <option value="event">Evento</option>
                            <option value="exhibitors">Expositores</option>
                        </select>
                    )}
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
                        {filteredList.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>
                                        {typeof cell === "string" || typeof cell === "number" || isValidElement(cell)
                                            ? cell
                                            : null}
                                    </td>
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
