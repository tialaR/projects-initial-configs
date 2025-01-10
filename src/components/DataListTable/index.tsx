import { ReactNode, useEffect, useState, isValidElement } from 'react';
import { Pagination } from './Pagination';
import { SearchBar } from '#components/SearchBar';
import * as S from './styles';
import { SkeletonBox } from '#components/SkeletonBox';
import { ErrorMessage } from '#styles/components';
// import { Select } from '#components/Select';

type Columns = {
    id: number;
    item: ReactNode | string;
};

type DataListTableProps<T extends readonly unknown[]> = {
    title: string;
    columns: Columns[];
    dataList: T[];
    currentPage?: number;
    itemsPerPage?: number;
    totalRows?: number;
    hasSearchBar?: boolean;
    searchPlaceholder?: string;
    hasResearchFilter?: boolean;
    columnWidths: string[];
    isTableLoading?: boolean;
    skeletonRowsAmount?: number;
    handlePageChange?: (page: number) => void;
    onSearchEvent?: (searchedElement: string) => void;
};

const DataListTable = <T extends readonly unknown[]>({
    title,
    columns,
    dataList,
    currentPage = 0,
    itemsPerPage = 0,
    totalRows = 0,
    hasSearchBar = false,
    searchPlaceholder = 'Pesquisar',
    // hasResearchFilter = false,
    columnWidths,
    isTableLoading = false,
    skeletonRowsAmount = 5,
    handlePageChange = () => { },
    onSearchEvent = () => { },
}: DataListTableProps<T>) => {
    const showPagination = totalRows > itemsPerPage;
    const [filteredList, setFilteredList] = useState<T[]>(dataList);
    const showSearchBar = hasSearchBar && !isTableLoading && (dataList && dataList.length > 0);
    const isTableEmpty = !dataList || dataList.length === 0;

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

    const renderSkeletonTable = ({ numCols }: { numCols: number }) => {
        return (
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
                        {Array.from({ length: skeletonRowsAmount }, (_, rowIndex) => (
                            <tr key={`skeleton-${rowIndex}`}>
                                {Array.from({ length: numCols }, (_, cellIndex) => (
                                    <td key={`skeleton-cell-${cellIndex}`}>
                                        <SkeletonBox />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </S.StyledTable>
            </S.StyledTableContainer>
        )
    }

    const renderTableData = () => {
        if (isTableEmpty) {
            return (
                <ErrorMessage>Nenhum dado encontrado.</ErrorMessage>
            )
        }

        return (
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
        )
    };

    return (
        <S.TableWrapper>
            <S.TableWrapperHeader>
                <S.TableTitle>{title}</S.TableTitle>

                <S.Filters>
                    {showSearchBar && (
                        <SearchBar
                            placeholder={searchPlaceholder}
                            debounceEnabled
                            width="29.625rem"
                            onSearch={handleSearchElement}
                        />
                    )}
                    {/* TBD -> Will be  added soon */}
                    {/* {hasResearchFilter && !isTableLoading && (
                        <Select
                            selectOptionsList={[
                                'Pendente Ativação',
                                'Envio Programado',
                                'Em andamento',
                                'Concluida',
                                'Cancelada'
                            ]}
                            onChange={(e: any) => {
                                console.log(e.target.value);
                            }}
                            placeholder="Filtro"
                        />
                    )} */}
                </S.Filters>
            </S.TableWrapperHeader>

            {isTableLoading
                ? renderSkeletonTable({ numCols: columns.length })
                : renderTableData()}

            {showPagination &&
                <Pagination
                    totalRows={totalRows}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />}
        </S.TableWrapper>
    );
};


export { DataListTable };
