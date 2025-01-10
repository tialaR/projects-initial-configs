import { useState, ReactNode } from 'react';
import { Icon } from '#components/Icon';
import { Pagination } from './Pagination';
import { Checkbox } from '#components/Checkbox';
import * as S from './styles';
import { ErrorMessage } from '#styles/components';

type Columns = {
    id: number;
    item: ReactNode | string;
};

export type DataListItem = {
    id: string;
    name: string;
    description?: string;
};

type DataListTableProps = {
    title: string;
    columns: Columns[];
    dataList: DataListItem[];
    currentPage: number;
    itemsPerPage: number;
    totalRows: number;
    searchPlaceholder?: string;
    columnWidths: string[];
    loading?: boolean;
    error?: Error | string | null;
    handlePageChange?: (page: number) => void;
    onSearchEvent?: (searchedElement: string) => void;
    onSelectionChange?: (selectedItems: DataListItem[]) => void;
};

const DataSearchSelectListTable = ({
    title,
    columns,
    dataList,
    currentPage,
    itemsPerPage,
    totalRows,
    searchPlaceholder = 'Pesquisar',
    columnWidths,
    loading = false,
    error = null,
    handlePageChange = () => { },
    onSearchEvent = () => { },
    onSelectionChange = () => { },
}: DataListTableProps) => {
    const [query, setQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(dataList);
    const [selectedOptions, setSelectedOptions] = useState<DataListItem[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const showTable = selectedOptions.length !== 0;
    const showPagination = selectedOptions.length > itemsPerPage;

    const isOptionSelected = (id: number | string) => {
        return selectedOptions.some((item) => item.id === id);
    };

    const handleSearchElement = (searchedElement: string) => {
        setQuery(searchedElement);
        setIsDropdownVisible(true);

        if (!searchedElement.trim()) {
            setFilteredOptions(dataList);
        } else {
            setFilteredOptions(
                dataList.filter((item) =>
                    item.name.toLowerCase().includes(searchedElement.toLowerCase())
                )
            );
        }

        onSearchEvent?.(searchedElement);
    };

    const handleFocus = () => {
        setIsDropdownVisible(true);
        setFilteredOptions(dataList);
    };

    const handleSelect = (option: DataListItem) => {
        setSelectedOptions((prev) => {
            const newSelection = isOptionSelected(option.id)
                ? prev.filter((item) => item.id !== option.id)
                : [...prev, option];

            onSelectionChange(newSelection);

            return newSelection;
        });

        setQuery('');
        setFilteredOptions(dataList);
        setIsDropdownVisible(false);
    };

    return (
        <S.TableWrapper>
            <S.TableWrapperHeader>
                <S.TableTitle>{title}</S.TableTitle>

                <S.SearchWrapper>
                    <S.SearchInput
                        type="text"
                        value={query}
                        onChange={(e) => handleSearchElement(e.target.value)}
                        placeholder={loading ? "Carregando expositores..." : searchPlaceholder}
                        onFocus={handleFocus}
                        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
                    />
                    <S.SearchIconButton>
                        <Icon name="search" size={24} />
                    </S.SearchIconButton>

                    {isDropdownVisible && (
                        <S.OptionsList>
                            {filteredOptions.map((option) => (
                                <S.OptionItem key={option.id} onClick={() => handleSelect(option)}>
                                    <Checkbox
                                        isCheckboxChecked={isOptionSelected(option.id)}
                                        label={option.name}
                                    />
                                </S.OptionItem>
                            ))}
                        </S.OptionsList>
                    )}
                </S.SearchWrapper>
            </S.TableWrapperHeader>

            {error && <ErrorMessage>Erro ao tentar carregar expositores.</ErrorMessage>}

            {showTable &&
                <>
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
                                {selectedOptions.map((option) => (
                                    <tr key={`selected-${option.id}`}>
                                        <td>
                                            <Checkbox
                                                isCheckboxChecked={true}
                                                onCheckboxChange={() => handleSelect(option)}
                                                label={option.name}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </S.StyledTable>
                    </S.StyledTableContainer>

                    {showPagination &&
                        <Pagination
                            totalRows={totalRows}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        />}
                </>
            }
        </S.TableWrapper>
    );
};

export { DataSearchSelectListTable };
