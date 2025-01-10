import { useState, useRef, useEffect } from 'react';
import { Icon } from '#components/Icon';
import { isObjectTypeGuard } from '#utils/typeGuards';
import * as S from './styles';
import { StatusBadge } from '#components/StatusBadge';

type TemplateOption = {
    id: string;
    label: string;
    value: string;
};

type PhoneCategory = {
    category: string;
    id: string;
    phones: {
        name: string;
        number: string;
        /* TBD -> We still don't have the colors and percentages of the health of the numbers */
        health: {
            label: string;
            color: string;
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
    return isObjectTypeGuard<TemplateOption>(option, ["id", "label", "value"]);
};

const isPhoneCategory = (option: any): option is PhoneCategory => {
    return isObjectTypeGuard<PhoneCategory>(option, ["category", "id", "phones"]) &&
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
            const { label, value } = selectedOption;
            return (
                <S.OptionDetailsSelected>
                    <div>
                        <span>{label}</span>
                        <span>{value}</span>
                    </div>
                    <StatusBadge label={label} />
                </S.OptionDetailsSelected>
            );
        }

        if (isPhoneCategory(selectedOption)) {
            const { phones } = selectedOption;
            const phoneName = phones[0].name;
            const phoneContact = phones[0].number;

            return (
                <S.OptionDetailsSelected>
                    <div>
                        <span>{phoneName}</span>
                        <span>{phoneContact}</span>
                    </div>
                    {/* We still don't have the colors and percentages of the health of the numbers */}
                    <StatusBadge label="TDB" />
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
                                        <StatusBadge label={option.label} />
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
                                                        id: option.id,
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
                                                            {/*We still don't have the colors and percentages of the health of the numbers */}
                                                            <StatusBadge label={phone.health.label} />
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
