import { useEffect, useState } from 'react';
import { EventOption, RadioButtonEventList } from '#components/RadioButtonEventList';
import { SearchBar } from '#components/SearchBar';
import * as S from './styles';

type ListEventsProps = {
    listName: string;
    searchbarWidth: string | number;
    searchbarPlaceholder: string;
    debounceEnabled?: boolean;
    radioOptionsList: EventOption[];
    selectedCurrentEvent?: EventOption | null;
    onSearchEvent?: (searchedElement: string) => void;
    onSelectEvent: (option: EventOption) => void;
};

const ListEvents: React.FC<ListEventsProps> = ({
    listName,
    searchbarWidth,
    searchbarPlaceholder,
    debounceEnabled = false,
    radioOptionsList,
    selectedCurrentEvent = null,
    onSearchEvent = () => { },
    onSelectEvent,
}) => {
    const [filteredEvents, setFilteredEvents] = useState<EventOption[]>(radioOptionsList);

    useEffect(() => {
        setFilteredEvents(radioOptionsList);
    }, [radioOptionsList]);

    const handleSearchEvent = (searchedElement: string) => {
        if (!searchedElement.trim()) {
            setFilteredEvents(radioOptionsList);
        } else {
            const filtered = radioOptionsList.filter(event =>
                event.label.toLowerCase().includes(searchedElement.toLowerCase())
            );
            setFilteredEvents(filtered);
        }

        onSearchEvent?.(searchedElement);
    };

    const handleSelectEvent = (option: EventOption) => {
        onSelectEvent(option);
    };

    return (
        <>
            <S.ListEventsHeaderContainer>
                <S.ListEventsName>
                    {listName}
                </S.ListEventsName>

                <SearchBar
                    placeholder={searchbarPlaceholder}
                    debounceEnabled={debounceEnabled}
                    width={searchbarWidth}
                    onSearch={handleSearchEvent}
                />
            </S.ListEventsHeaderContainer>

            <S.ListEventsContainer>
                <RadioButtonEventList
                    radioOptionsList={filteredEvents}
                    selectedEvent={selectedCurrentEvent}
                    onSelectEvent={handleSelectEvent}
                />
            </S.ListEventsContainer>
        </>
    );
};

export { ListEvents };
