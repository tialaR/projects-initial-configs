import { RegisteredEvent } from "#services/events/useGetRegisteredEvents";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { SkeletonBox } from "#components/SkeletonBox";

type RadioButtonEventListProps = {
    radioOptionsList: RegisteredEvent[];
    loadingOptionsList?: boolean;
    selectedEvent?: RegisteredEvent | null;
    onSelectEvent: (option: RegisteredEvent) => void;
};

const RadioButtonEventList: React.FC<RadioButtonEventListProps> = ({
    radioOptionsList,
    loadingOptionsList = false,
    selectedEvent = null,
    onSelectEvent,
}) => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    const updatedOptionsList = radioOptionsList.map((event) => ({
        ...event,
        checked: event.registered_event_id === selectedOption,
    }));

    useEffect(() => {
        if (selectedEvent) {
            setSelectedOption(selectedEvent.registered_event_id);
        }
    }, [selectedEvent]);

    if (loadingOptionsList) {
        return (
            <S.RadioListContainer>
                {Array.from({ length: 5 }).map((_, index) => (
                    <S.RadioItem key={index}>
                        <SkeletonBox width="100%" />
                    </S.RadioItem>
                ))}
            </S.RadioListContainer>
        );
    }

    return (
        <S.RadioListContainer>
            {updatedOptionsList?.map((event) => (
                <S.RadioItem key={event.registered_event_id} checked={event.checked}>
                    <S.RadioInput
                        type="radio"
                        name="event"
                        value={event.registered_event_id}
                        checked={event.checked}
                        onChange={() => {
                            setSelectedOption(event.registered_event_id);
                            onSelectEvent(event);
                        }}
                    />
                    <S.RadioText>
                        <S.Title checked={event.checked}>
                            {event.event_name}
                        </S.Title>
                        <S.Details checked={event.checked}>
                            {event.event_month_pt_br} | {event.event_year}
                        </S.Details>
                    </S.RadioText>
                </S.RadioItem>
            ))}
        </S.RadioListContainer>
    );
};

export { RadioButtonEventList };