import { useState, useRef, useEffect } from 'react';
import { Icon } from '#components/Icon';
import { defaultTheme } from '#styles/themes/default';
import { isObjectTypeGuard } from '#utils/typeGuards';
import * as S from './styles';

type StatusBadge = {
    color: Extract<keyof typeof defaultTheme.colors.alert, 'positive100' | 'negative100' | 'warning100' | 'info100'>;
};
type StatusTemplate = 'Aprovado' | 'Reprovado' | 'Em análise';
type TemplateOption = {
    id: string;
    label: string;
    value: string;
    status: StatusTemplate;
    statusColor: StatusBadge['color'];
};

type PhoneCategory = {
    category: string;
    phones: {
        name: string;
        number: string;
        health: {
            label: string;
            color: StatusBadge['color'];
        };
    }[];
};

type SelectProps<T> = {
    onChange: (value: T) => void;
    selectOptionsList: T[];
    label?: string;
    width?: string | number;
    placeholder?: string;
};

const isTemplateOption = (option: any): option is TemplateOption => {
    return isObjectTypeGuard<TemplateOption>(option, ["id", "label", "value", "status", "statusColor"]);
};

const isPhoneCategory = (option: any): option is PhoneCategory => {
    return isObjectTypeGuard<PhoneCategory>(option, ["category", "phones"]) &&
        Array.isArray(option.phones) &&
        option.phones.every(phone =>
            typeof phone.name === "string" &&
            typeof phone.number === "string" &&
            typeof phone.health === "object" &&
            typeof phone.health.label === "string" &&
            typeof phone.health.color === "string"
        );
};

const Select = <T,>({
    selectOptionsList,
    onChange,
    label = '',
    placeholder = '',
    width = '100%',
}: SelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<T | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectOption = (option: T) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };

    const renderSelectedOption = () => {
        if (selectedOption === null || !selectedOption) {
            return <span>{placeholder}</span>;
        }

        if (typeof selectedOption === 'string') {
            return <span>{selectedOption}</span>;
        }

        if (isTemplateOption(selectedOption)) {
            const { label, value, status, statusColor } = selectedOption;
            return (
                <S.OptionDetailsSelected>
                    <div>
                        <span>{label}</span>
                        <span>{value}</span>
                    </div>
                    <S.StatusBadge color={defaultTheme.colors.alert[statusColor]}>
                        {status}
                    </S.StatusBadge>
                </S.OptionDetailsSelected>
            );
        }

        if (isPhoneCategory(selectedOption)) {
            const { phones } = selectedOption;
            const phoneName = phones[0].name;
            const phoneContact = phones[0].number;
            const statusColor = phones[0].health.color;
            const healthLabel = phones[0].health.label;

            return (
                <S.OptionDetailsSelected>
                    <div>
                        <span>{phoneName}</span>
                        <span>{phoneContact}</span>
                    </div>
                    <S.StatusBadge color={defaultTheme.colors.alert[statusColor]}>
                        {healthLabel}
                    </S.StatusBadge>
                </S.OptionDetailsSelected>
            );
        }

        return null;
    };

    return (
        <>
            {label && <S.Label>{label}</S.Label>}

            <S.SelectWrapper width={width} ref={dropdownRef}>
                <S.SelectButton
                    onClick={() => setIsOpen((prev) => !prev)}
                    placeholder={!selectedOption}
                >
                    {renderSelectedOption()}
                    <S.IconWrapper isOpen={isOpen}>
                        <Icon name="arrowDownSmall" size={24} />
                    </S.IconWrapper>
                </S.SelectButton>

                {isOpen && (
                    <S.OptionsList>
                        {selectOptionsList.map((option) => {
                            if (typeof option === 'string') {
                                return (
                                    <S.OptionItem key={option} onClick={() => handleSelectOption(option)}>
                                        <S.OptionDetails>
                                            <S.TemplateLabel>{option}</S.TemplateLabel>
                                        </S.OptionDetails>
                                    </S.OptionItem>
                                );
                            }

                            if (isTemplateOption(option)) {
                                return (
                                    <S.OptionItem key={option.value} onClick={() => handleSelectOption(option)}>
                                        <S.OptionDetails>
                                            <S.TemplateLabel>{option.label}</S.TemplateLabel>
                                            <S.TemplateValue>{option.value}</S.TemplateValue>
                                        </S.OptionDetails>
                                        <S.StatusBadge color={defaultTheme.colors.alert[option.statusColor]}>
                                            {option.status}
                                        </S.StatusBadge>
                                    </S.OptionItem>
                                );
                            }

                            if (isPhoneCategory(option)) {
                                return (
                                    <S.CategoryContainer key={option.category}>
                                        <div>
                                            <S.CategoryLabel>{option.category}</S.CategoryLabel>
                                            <S.PhonesList>
                                                {option.phones.map((phone) => {
                                                    const optionSelected = {
                                                        category: option.category,
                                                        phones: [
                                                            {
                                                                name: phone.name,
                                                                number: phone.number,
                                                                health: {
                                                                    label: phone.health.label,
                                                                    color: phone.health.color,
                                                                },
                                                            },
                                                        ],
                                                    } as PhoneCategory;

                                                    return (
                                                        <S.PhoneItem key={phone.number} onClick={() =>
                                                            handleSelectOption(optionSelected as T)
                                                        }>
                                                            <S.PhoneDetails>
                                                                <S.PhoneName>{phone.name}</S.PhoneName>
                                                                <S.PhoneNumber>{phone.number}</S.PhoneNumber>
                                                            </S.PhoneDetails>
                                                            <S.StatusBadge color={defaultTheme.colors.alert[phone.health.color]}>
                                                                {phone.health.label}
                                                            </S.StatusBadge>
                                                        </S.PhoneItem>
                                                    )
                                                })}
                                            </S.PhonesList>
                                        </div>
                                    </S.CategoryContainer>
                                );
                            }

                            return null;
                        })}
                    </S.OptionsList>
                )}
            </S.SelectWrapper>
        </>
    );
};

export { Select };
