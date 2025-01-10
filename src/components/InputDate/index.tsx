import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { format, parse, isValid, getMonth, getYear, setMonth, setYear, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Icon } from "#components/Icon";
import { Button } from "#components/Button";
import { defaultTheme } from "#styles/themes/default";
import * as S from "./styles";
import { ErrorMessage } from "#styles/components";

// Dynamically generate months in Portuguese using `date-fns`
const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(2000, i, 1), "MMMM", { locale: ptBR })
);

// Dynamically generates years based on the current year (current year to +20 years = 21 years)
const currentYear = getYear(new Date());
const years = Array.from({ length: 21 }, (_, i) => currentYear + i);

type InputDateProps = InputHTMLAttributes<HTMLInputElement> & {
    value: Date | null;
    onChange: (date: Date | null) => void;
    label?: string;
};

const InputDate: React.FC<InputDateProps> = ({ value, onChange, label, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState<Date | undefined | string>(undefined);
    const [currentMonth, setCurrentMonth] = useState(value || new Date());
    const [currentYear, setCurrentYear] = useState(() =>
        value instanceof Date ? getYear(value) : new Date().getFullYear());
    const [previousValue, setPreviousValue] = useState<Date | null>(
        value instanceof Date ? value : null
    );
    const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagem de erro

    const containerRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, "");
        let formattedInput = "";

        if (input.length > 0) formattedInput += input.slice(0, 2);
        if (input.length > 2) formattedInput += "/" + input.slice(2, 4);
        if (input.length > 4) formattedInput += "/" + input.slice(4, 8);

        setInputValue(formattedInput);
        setErrorMessage("");

        if (formattedInput.length === 10) {
            const parsedDate = parse(formattedInput, "dd/MM/yyyy", new Date());

            if (isValid(parsedDate) && parsedDate >= startOfDay(new Date())) {
                onChange(parsedDate);
                setCurrentMonth(parsedDate);
                setCurrentYear(getYear(parsedDate));
                setErrorMessage("");
            } else {
                setErrorMessage("Não é possível selecionar datas passadas.");
                setInputValue("");
                onChange(null);
            }
        } else {
            setErrorMessage("Data inválida.");
            onChange(null);
        }
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentMonth(setMonth(currentMonth, parseInt(e.target.value, 10)));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value, 10);
        setCurrentYear(newYear);
        setCurrentMonth(setYear(currentMonth, newYear));
    };

    const changeMonth = (direction: "prev" | "next") => {
        setCurrentMonth(setMonth(currentMonth, getMonth(currentMonth) + (direction === "next" ? 1 : -1)));
    };

    const changeYear = (direction: "prev" | "next") => {
        setCurrentMonth(setYear(currentMonth, getYear(currentMonth) + (direction === "next" ? 1 : -1)));
    };

    const handleClear = () => {
        setInputValue("");
        onChange(null);
        setIsOpen(false);
    };

    const handleConfirm = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        if (!isOpen) {
            setPreviousValue(value instanceof Date ? value : null);

            if (value instanceof Date) {
                setCurrentMonth(value);
                setCurrentYear(getYear(value));
            } else {
                setCurrentYear(new Date().getFullYear());
            }
        } else {
            setInputValue(previousValue ? format(previousValue, "dd/MM/yyyy") : "");
            onChange(previousValue);
        }
        setIsOpen((prev) => !prev);
    };

    const handleToggleCalendar = () => {
        handleOpen();
    };


    const handleCancel = () => {
        setInputValue(previousValue ? format(previousValue, "dd/MM/yyyy") : "");
        onChange(previousValue);
        setIsOpen(false);
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

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {label && <S.Label>{label}</S.Label>}
            <S.Container
                ref={containerRef}
                onClickCapture={handleClickOutside}
            >
                <S.InputWrapper isOpen={isOpen}>
                    <S.Input
                        {...rest}
                        type="text"
                        value={inputValue?.toString()}
                        onChange={handleInputChange}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleCalendar();
                        }}
                    />
                    <S.IconWrapper isOpen={isOpen}>
                        <Icon name="arrowDownSmall" size={24} />
                    </S.IconWrapper>
                </S.InputWrapper>

                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

                {isOpen && (
                    <S.CalendarWrapper onClick={(e) => e.stopPropagation()}>
                        <S.Header>
                            <S.SelectWrapper>
                                <S.ArrowButton onClick={() => changeMonth("prev")}>
                                    <Icon name="arrowLeft" size={12} />
                                </S.ArrowButton>

                                <S.SelectContainer>
                                    <S.Select onChange={handleMonthChange} value={getMonth(currentMonth)}>
                                        {months.map((month, index) => (
                                            <option key={index} value={index}>{month}</option>
                                        ))}
                                    </S.Select>
                                    <S.SelectIcon>
                                        <Icon name="arrowFilledDown" size={18} />
                                    </S.SelectIcon>
                                </S.SelectContainer>

                                <S.ArrowButton onClick={() => changeMonth("next")}>
                                    <Icon name="arrowRight" size={12} />
                                </S.ArrowButton>
                            </S.SelectWrapper>

                            <S.SelectWrapper>
                                <S.ArrowButton onClick={() => changeYear("prev")}>
                                    <Icon name="arrowLeft" size={12} />
                                </S.ArrowButton>
                                <S.SelectContainer>
                                    <S.Select onChange={handleYearChange} value={currentYear}>
                                        {years.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </S.Select>
                                    <S.SelectIcon>
                                        <Icon name="arrowFilledDown" size={18} />
                                    </S.SelectIcon>
                                </S.SelectContainer>
                                <S.ArrowButton onClick={() => changeYear("next")}>
                                    <Icon name="arrowRight" size={12} />
                                </S.ArrowButton>
                            </S.SelectWrapper>
                        </S.Header>

                        <DayPicker
                            mode="single"
                            locale={ptBR}
                            selected={value}
                            month={currentMonth}
                            onMonthChange={setCurrentMonth}
                            onSelect={(date) => {
                                if (date && date >= startOfDay(new Date())) {
                                    setInputValue(format(date, "dd/MM/yyyy"));
                                    onChange(date);
                                    setErrorMessage("");
                                }
                            }}
                            components={{
                                MonthCaption: () => <></>,
                                Nav: () => <></>
                            }}
                            modifiers={{
                                pastDays: (day) =>
                                    getYear(day) === currentYear && day < startOfDay(new Date()),
                            }}
                            modifiersStyles={{
                                pastDays: {
                                    opacity: 0.5,
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                },
                                today: {
                                    color: defaultTheme.colors.primary.purple100,
                                    fontWeight: defaultTheme.typography.paragraph.p16.bold,
                                },
                                selected: {
                                    backgroundColor: defaultTheme.colors.primary.purple200,
                                    fontWeight: defaultTheme.typography.paragraph.p16.regular,
                                    color: defaultTheme.colors.grayScale.white,
                                    borderRadius: "50%",
                                },
                            }}
                        />

                        <S.ButtonContainer>
                            <Button onClick={handleClear} variant="outline">Limpar</Button>
                            <div>
                                <Button onClick={handleCancel} variant="outline">Cancelar</Button>
                                <Button onClick={handleConfirm} variant="outline">OK</Button>
                            </div>
                        </S.ButtonContainer>
                    </S.CalendarWrapper>
                )}
            </S.Container >
        </>
    );
};

export { InputDate };
