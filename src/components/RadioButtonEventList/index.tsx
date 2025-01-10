import { RegisteredEvent } from "#services/events/useGetRegisteredEvents";
import { useEffect, useState } from "react";
import * as S from "./styles";

type RadioButtonEventListProps = {
    radioOptionsList: RegisteredEvent[];
    selectedEvent?: RegisteredEvent | null;
    onSelectEvent: (option: RegisteredEvent) => void;
};

const RadioButtonEventList: React.FC<RadioButtonEventListProps> = ({
    radioOptionsList,
    selectedEvent,
    onSelectEvent,
}) => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    useEffect(() => {
        if (selectedEvent) {
            setSelectedOption(selectedEvent.registered_event_id);
        }
    }, [selectedEvent]);

    return (
        <S.RadioListContainer>
            {radioOptionsList.map((event) => (
                <S.RadioItem key={event.registered_event_id} checked={selectedOption === event.registered_event_id}>
                    <S.RadioInput
                        type="radio"
                        name="event"
                        value={event.registered_event_id}
                        checked={selectedOption === event.registered_event_id}
                        onChange={() => {
                            setSelectedOption(event.registered_event_id);
                            onSelectEvent(event);
                        }}
                    />
                    <S.RadioText>
                        <S.Title checked={selectedOption === event.registered_event_id}>
                            {event.event_name}
                        </S.Title>
                        <S.Details checked={selectedOption === event.registered_event_id}>
                            {event.event_month_pt_br} | {event.event_year}
                        </S.Details>
                    </S.RadioText>
                </S.RadioItem>
            ))}
        </S.RadioListContainer>
    );
};

export { RadioButtonEventList };
