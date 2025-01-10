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

    const [isOpen, setIsOpen] = useState(false);
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [focusedField, setFocusedField] = useState<FocusedField | null>(null);
    const [inputValue, setInputValue] = useState<string>(value || '');
    const [previousValue, setPreviousValue] = useState<string>(inputValue || '');

    const handleOpen = () => {
        if (!isOpen) {
            const formattedTime = formatTimeHourMinute(value);
            setInputValue(formattedTime);
            setPreviousValue(formattedTime);

            if (formattedTime.length === 5) {
                const hoursTime = formattedTime.slice(0, 2);
                const minutesTime = formattedTime.slice(-2);
                setHour(hoursTime || '');
                setMinute(minutesTime || '');
            }

            onChange({ target: { value: formattedTime } } as ChangeEvent<HTMLInputElement>);
        } else {
            // Resets hour and minute values if canceling
            if (!value) {
                setInputValue('');
                onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
                setHour('');
                setMinute('');
            } else {
                setInputValue(previousValue || '');
                onChange({ target: { value: previousValue } } as ChangeEvent<HTMLInputElement>);

                if (previousValue.length === 5) {
                    const hoursTime = previousValue.slice(0, 2);
                    const minutesTime = previousValue.slice(-2);
                    setHour(hoursTime || '');
                    setMinute(minutesTime || '');
                }
            }
        }

        setIsOpen((prev) => !prev);
    };

    const handleToggleTimePicker = () => {
        handleOpen();
    };

    const handleCancel = () => {
        setInputValue(previousValue ? formatTimeHourMinute(previousValue) : "");
        onChange({ target: { value: previousValue } } as ChangeEvent<HTMLInputElement>);
        setIsOpen(false);
    };

    const handleConfirm = () => {
        const formattedTime = `${hour}:${minute}`;
        if (formattedTime.length === 5) {
            const hoursTime = formattedTime.slice(0, 2);
            const minutesTime = formattedTime.slice(-2);
            setHour(hoursTime || '');
            setMinute(minutesTime || '');
        }
        setPreviousValue(formattedTime);
        setInputValue(formattedTime);
        onChange({ target: { value: formattedTime } } as ChangeEvent<HTMLInputElement>);
        setIsOpen(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formattedTime = formatTimeHourMinute(e.target.value);
        onChange({ target: { value: formattedTime } } as ChangeEvent<HTMLInputElement>);
        setInputValue(formattedTime);
        setPreviousValue(formattedTime);

        if (formattedTime.length === 5) {
            const hoursTime = formattedTime.slice(0, 2);
            const minutesTime = formattedTime.slice(-2);
            setHour(hoursTime || '');
            setMinute(minutesTime || '');
        }
    };

    const handleClickOutside = (event: React.MouseEvent) => {
        if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
            handleCancel();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
                handleCancel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {label && <S.Label>{label}</S.Label>}

            <S.TimePickerWrapper
                ref={containerRef}
                onClickCapture={handleClickOutside}
            >
                <S.InputWrapper isOpen={isOpen}>
                    <S.TimePickerInput
                        {...rest}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleTimePicker();
                        }}
                    />

                    <S.IconWrapper isOpen={isOpen}>
                        <Icon name="arrowDownSmall" size={24} />
                    </S.IconWrapper>
                </S.InputWrapper>

                {isOpen && (
                    <S.Dropdown onClick={(e) => e.stopPropagation()}>
                        <S.TimeColumnWrapper>
                            <S.TimeColumnContainer>
                                <S.TimeColumn isFocused={!!(focusedField === 'hour')}>
                                    <input
                                        type="text"
                                        value={hour}
                                        placeholder='00'
                                        onFocus={() => setFocusedField('hour')}
                                        onBlur={() => setFocusedField(null)}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, '');
                                            const isDeleting = (e.nativeEvent as InputEvent).inputType === 'deleteContentBackward';

                                            if (isDeleting && value === '0' && value.length < 2) {
                                                setHour('');
                                                value = '';
                                                return;
                                            }

                                            if (value.length > 2) {
                                                value = value.slice(1, 3);
                                            }

                                            if (Number(value) > 23) {
                                                value = '23';
                                            }

                                            if (value.length === 1 && Number(value) < 10) {
                                                value = `0${value}`;
                                            } else {
                                                value = `${value}`;
                                            }

                                            setHour(value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (!/[\d]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </S.TimeColumn>
                                <span>Hora</span>
                            </S.TimeColumnContainer>

                            <S.Separator>
                                <span>:</span>
                            </S.Separator>

                            <S.TimeColumnContainer>
                                <S.TimeColumn isFocused={!!(focusedField === 'minute')}>
                                    <input
                                        type="text"
                                        placeholder='00'
                                        value={minute}
                                        onFocus={() => setFocusedField('minute')}
                                        onBlur={() => setFocusedField(null)}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, '');
                                            const isDeleting = (e.nativeEvent as InputEvent).inputType === 'deleteContentBackward';

                                            if (isDeleting && value === '0' && value.length < 2) {
                                                setMinute('');
                                                value = '';
                                                return;
                                            }

                                            if (value.length > 2) {
                                                value = value.slice(1, 3);
                                            }

                                            if (Number(value) > 59) {
                                                value = '59';
                                            }

                                            if (value.length === 1 && Number(value) < 10) {
                                                value = `0${value}`;
                                            } else {
                                                value = `${value}`;
                                            }

                                            setMinute(value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (!/[\d]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </S.TimeColumn>
                                <span>Minuto</span>
                            </S.TimeColumnContainer>
                        </S.TimeColumnWrapper>

                        <S.ConfirmButtons>
                            <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
                            <Button variant="outline" onClick={handleConfirm}>OK</Button>
                        </S.ConfirmButtons>
                    </S.Dropdown>
                )}
            </S.TimePickerWrapper>
        </>
    );
};

export { InputTimePicker };
