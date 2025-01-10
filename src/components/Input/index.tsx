import { useState, InputHTMLAttributes } from 'react';
import * as S from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    onChange: (value: string) => void;
    width?: string | number;
    label?: string;
};

const Input: React.FC<InputProps> = ({
    onChange,
    width = '',
    label = '',
    ...rest
}) => {
    const [query, setQuery] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuery(newValue);
        onChange(newValue);

        if (newValue.trim() === '') {
            onChange('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChange(query);
        }
    };

    return (
        <>
            {label && <S.Label>{label}</S.Label>}
            <S.InputWrapper width={width}>
                <S.Input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    {...rest}
                />
            </S.InputWrapper>
        </>
    );
};

export { Input };