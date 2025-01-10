import { useEffect, useState } from "react";
import { SearchBar } from "#components/SearchBar";
import { RegisteredEvent } from "#services/events/useGetRegisteredEvents";
import { RadioButtonEventList } from "#components/RadioButtonEventList";
import * as S from "./styles";

type ListEventsProps = {
    listName: string;
    loadingEvents?: boolean;
    searchbarWidth: string | number;
    searchbarPlaceholder: string;
    debounceEnabled?: boolean;
    registeredEvents: RegisteredEvent[];
    selectedCurrentEvent?: RegisteredEvent | null;
    onSearchEvent?: (searchedElement: string) => void;
    onSelectEvent: (option: RegisteredEvent) => void;
};

const ListEvents: React.FC<ListEventsProps> = ({
    listName,
    loadingEvents = false,
    searchbarWidth,
    searchbarPlaceholder,
    debounceEnabled = false,
    registeredEvents,
    selectedCurrentEvent = null,
    onSearchEvent = () => { },
    onSelectEvent,
}) => {
    const [filteredEvents, setFilteredEvents] = useState<RegisteredEvent[]>(registeredEvents);
    const showSearchBar = !loadingEvents && registeredEvents.length > 0;

    useEffect(() => {
        setFilteredEvents(registeredEvents);
    }, [registeredEvents]);

    const handleSearchEvent = (searchedElement: string) => {
        if (!searchedElement.trim()) {
            setFilteredEvents(registeredEvents);
        } else {
            const filtered = registeredEvents.filter(event =>
                event.event_name.toLowerCase().includes(searchedElement.toLowerCase())
            );
            setFilteredEvents(filtered);
        }

        onSearchEvent?.(searchedElement);
    };

    const handleSelectEvent = (option: RegisteredEvent) => {
        onSelectEvent(option);
    };

    return (
        <>
            <S.ListEventsHeaderContainer>
                <S.ListEventsName>{listName}</S.ListEventsName>

                {showSearchBar &&
                    <SearchBar
                        placeholder={searchbarPlaceholder}
                        debounceEnabled={debounceEnabled}
                        width={searchbarWidth}
                        onSearch={handleSearchEvent}
                    />}
            </S.ListEventsHeaderContainer>

            <S.ListEventsContainer>
                <RadioButtonEventList
                    radioOptionsList={filteredEvents}
                    loadingOptionsList={loadingEvents}
                    selectedEvent={selectedCurrentEvent}
                    onSelectEvent={handleSelectEvent}
                />
            </S.ListEventsContainer>
        </>
    );
};

export { ListEvents };
