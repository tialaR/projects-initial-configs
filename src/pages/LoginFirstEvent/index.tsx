import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateLocalSelectedEvent } from "#utils/localStorageItems";
import { MainTitle } from "#components/MainTitle";
import { Button } from "#components/Button";
import { ListEvents } from "#components/ListEvents";
import { routesNames } from "#utils/routesNames";
import { RegisteredEvent, useGetRegisteredEvents } from "#services/events/useGetRegisteredEvents";
import { ErrorMessage } from "#styles/components";
import { useUserAttributes } from "#hooks/useUserAttributes";
import * as S from "./styles";

const { GENERAL_CAMPAIGN } = routesNames;

const LoginFirstEvent: React.FC = () => {
    const navigate = useNavigate();
    const { fullName } = useUserAttributes();
    const { events, loading: loadingEvents, error: errorEvents, getEvents } = useGetRegisteredEvents();
    const [selectedEvent, setSelectedEvent] = useState<RegisteredEvent | null>(null);

    useEffect(() => {
        getEvents();
    }, []);

    const handleSelectEvent = (option: RegisteredEvent) => {
        if (option) {
            setSelectedEvent(option);
        }
    };

    const handleRenderSelectedEvent = () => {
        if (selectedEvent) {
            updateLocalSelectedEvent(selectedEvent);
            navigate(GENERAL_CAMPAIGN);
        }
    };

    const renderError = () => <ErrorMessage>Erro ao carregar eventos. Tente novamente.</ErrorMessage>;

    const renderListEvents = () => (
        <ListEvents
            listName="Lista de eventos"
            loadingEvents={loadingEvents}
            registeredEvents={events}
            searchbarPlaceholder="Pesquisar evento"
            searchbarWidth="29.625rem"
            debounceEnabled
            selectedCurrentEvent={selectedEvent}
            onSelectEvent={handleSelectEvent}
        />
    );

    const renderFooter = () => (
        <S.Footer>
            <Button
                disabled={!selectedEvent}
                variant="primary"
                onClick={handleRenderSelectedEvent}>
                Iniciar
            </Button>
        </S.Footer>
    );

    return (
        <div>
            <S.Header>
                <MainTitle>{fullName ? `Bem vindo, ${fullName}!` : ''}</MainTitle>
            </S.Header>

            <S.ListEventsWrapper>
                <S.ListEventsHeader>
                    <S.ListEventsTitle>
                        Escolha um evento para iniciar e acessar as funcionalidades.
                    </S.ListEventsTitle>
                    <S.ListEventsDescription>
                        Selecione um evento abaixo ou pesquise pelo nome.
                    </S.ListEventsDescription>
                </S.ListEventsHeader>

                {errorEvents && !loadingEvents && renderError()}
                {renderListEvents()}
            </S.ListEventsWrapper>

            {!loadingEvents && events.length > 0 && renderFooter()}
        </div>
    );
};

export { LoginFirstEvent };
