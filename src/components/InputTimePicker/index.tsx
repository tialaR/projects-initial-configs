import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { Button } from '#components/Button';
import { Icon } from '#components/Icon';
import { formatTimeHourMinute } from '#utils/formatTime';
import * as S from './styles';

type InputTimePickerProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    value?: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement> | null) => void;
};

type FocusedField = 'hour' | 'minute' | null;

const InputTimePicker: React.FC<InputTimePickerProps> = ({
    label = '',
    placeholder = '',
    value = '',
    onChange,
    ...rest
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousValueRef = useRef<string>('');

    const [isOpen, setIsOpen] = useState(false);
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [focusedField, setFocusedField] = useState<FocusedField | null>(null);
    const [inputValue, setInputValue] = useState<string>(value || '');

    const isConfirmDisabled = !(hour.length === 2 && minute.length === 2);

    useEffect(() => {
        if (value) {
            const formattedTime = formatTimeHourMinute(value);
            setInputValue(formattedTime);

            if (formattedTime.length === 5) {
                setHour(formattedTime.slice(0, 2));
                setMinute(formattedTime.slice(3, 5));
            }
        }
    }, [value]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let rawValue = e.target.value.replace(/\D/g, '');

        if (rawValue.length > 4) rawValue = rawValue.slice(0, 4);

        let formattedTime = rawValue;
        if (rawValue.length >= 3) {
            formattedTime = `${rawValue.slice(0, 2)}:${rawValue.slice(2, 4)}`;
        }

        setInputValue(formattedTime);

        if (formattedTime.length === 5) {
            setHour(formattedTime.slice(0, 2));
            setMinute(formattedTime.slice(3, 5));
            onChange({ target: { value: formattedTime } } as ChangeEvent<HTMLInputElement>);
        } else {
            setHour('');
            setMinute('');
        }
    };

    const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) value = value.slice(-2);
        if (Number(value) > 23) value = '23';
        if (value.length === 1) value = `0${value}`;

        setHour(value);
        setInputValue(`${value}:${minute}`);
    };

    const handleMinuteChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) value = value.slice(-2);
        if (Number(value) > 59) value = '59';
        if (value.length === 1) value = `0${value}`;

        setMinute(value);
        setInputValue(`${hour}:${value}`);
    };

    const handleOpen = () => {
        if (!isOpen) {
            previousValueRef.current = inputValue;
        }
        setIsOpen((prev) => !prev);
    };

    const handleCancel = () => {
        setInputValue(previousValueRef.current);
        setHour(previousValueRef.current.slice(0, 2) || '');
        setMinute(previousValueRef.current.slice(3, 5) || '');
        setIsOpen(false);
    };

    const handleConfirm = () => {
        if (!isConfirmDisabled) {
            const formattedTime = `${hour}:${minute}`;
            setInputValue(formattedTime);
            onChange({ target: { value: formattedTime } } as ChangeEvent<HTMLInputElement>);
            previousValueRef.current = formattedTime;
        }
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
            handleCancel();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {label && <S.Label>{label}</S.Label>}

            <S.TimePickerWrapper ref={containerRef}>
                <S.InputWrapper isOpen={isOpen}>
                    <S.TimePickerInput
                        {...rest}
                        type="text"
                        value={inputValue}
                        placeholder={placeholder}
                        onChange={handleInputChange}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOpen();
                        }}
                    />
                    <S.IconWrapper isOpen={isOpen}>
                        <Icon name="arrowDownSmall" size={24} />
                    </S.IconWrapper>
                </S.InputWrapper>

                {isOpen && (
                    <S.Dropdown>
                        <S.TimeColumnWrapper>
                            <S.TimeColumnContainer>
                                <S.TimeColumn isFocused={focusedField === 'hour'}>
                                    <input
                                        type="text"
                                        value={hour}
                                        placeholder="00"
                                        onFocus={() => setFocusedField('hour')}
                                        onBlur={() => setFocusedField(null)}
                                        onChange={handleHourChange}
                                    />
                                </S.TimeColumn>
                                <span>Hora</span>
                            </S.TimeColumnContainer>

                            <S.Separator>
                                <span>:</span>
                            </S.Separator>

                            <S.TimeColumnContainer>
                                <S.TimeColumn isFocused={focusedField === 'minute'}>
                                    <input
                                        type="text"
                                        value={minute}
                                        placeholder="00"
                                        onFocus={() => setFocusedField('minute')}
                                        onBlur={() => setFocusedField(null)}
                                        onChange={handleMinuteChange}
                                    />
                                </S.TimeColumn>
                                <span>Minuto</span>
                            </S.TimeColumnContainer>
                        </S.TimeColumnWrapper>

                        <S.ConfirmButtons>
                            <Button variant="outline" onClick={handleCancel}>
                                Cancelar
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleConfirm}
                                disabled={isConfirmDisabled}
                            >
                                OK
                            </Button>
                        </S.ConfirmButtons>
                    </S.Dropdown>
                )}
            </S.TimePickerWrapper>
        </>
    );
};

export { InputTimePicker };
