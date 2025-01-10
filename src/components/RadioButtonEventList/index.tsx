import { useEffect, useState } from "react";
import * as S from "./styles";

export type EventOption = {
    id: string;
    label: string;
    location: string;
    date: string;
};

type RadioButtonEventListProps = {
    radioOptionsList: EventOption[];
    selectedEvent?: EventOption | null; // Recebe o evento inicial
    onSelectEvent: (option: EventOption) => void;
};

const RadioButtonEventList: React.FC<RadioButtonEventListProps> = ({
    radioOptionsList,
    selectedEvent,
    onSelectEvent
}) => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    useEffect(() => {
        if (selectedEvent) {
            setSelectedOption(selectedEvent.id);
        }
    }, [selectedEvent]);

    return (
        <S.RadioListContainer>
            {radioOptionsList.map((option: EventOption) => (
                <S.RadioItem key={option.id} checked={selectedOption === option.id} >
                    <S.RadioInput
                        type="radio"
                        name="event"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={() => {
                            setSelectedOption(option.id);
                            onSelectEvent(option);
                        }}
                    />
                    <S.RadioText>
                        <S.Title checked={selectedOption === option.id}>{option.label}</S.Title>
                        <S.Details checked={selectedOption === option.id}>{option.location} | {option.date}</S.Details>
                    </S.RadioText>
                </S.RadioItem>
            ))}
        </S.RadioListContainer>
    );
};

export { RadioButtonEventList };
