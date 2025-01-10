import { useState, useEffect, useRef, InputHTMLAttributes } from 'react';
import { Icon } from '#components/Icon';
import * as S from './styles';

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
    onSearch: (value: string) => void;
    debounceEnabled?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, debounceEnabled = true, width, ...rest }) => {
    const [query, setQuery] = useState<string>('');
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (query.length === 0) {
            onSearch('');
            return;
        }

        if (debounceEnabled && query.length >= 3) {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            debounceTimeout.current = setTimeout(() => {
                onSearch(query);
            }, 500);
        }

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [query, debounceEnabled, onSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuery(newValue);

        if (!debounceEnabled) {
            onSearch(newValue);
        }

        if (newValue.trim() === '') {
            onSearch('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(query);
        }
    };

    return (
        <S.SearchWrapper width={width}>
            <S.SearchInput
                type="text"
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                {...rest}
            />
            <S.SearchIconButton onClick={() => onSearch(query)}>
                <Icon name="search" size={24} />
            </S.SearchIconButton>
        </S.SearchWrapper>
    );
};

export { SearchBar };