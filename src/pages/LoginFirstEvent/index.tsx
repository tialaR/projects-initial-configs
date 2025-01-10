import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateLocalSelectedEvent } from "#utils/localStorageItems";
import { MainTitle } from "#components/MainTitle";
import { Button } from "#components/Button";
import { ListEvents } from "#components/ListEvents";
import { routesNames } from "#utils/routesNames";
import * as S from "./styles";
import { RegisteredEvent, useGetRegisteredEvents } from "#services/events/useGetRegisteredEvents";
import { ErrorMessage } from "#styles/components";

const { GENERAL_CAMPAIGN } = routesNames;

const LoginFirstEvent: React.FC = () => {
    const navigate = useNavigate();
    const { events, loading, error, getEvents } = useGetRegisteredEvents();
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

    const renderLoading = () => <div>Carregando eventos...</div>;

    const renderError = () => <ErrorMessage>Erro ao carregar eventos. Tente novamente.</ErrorMessage>;

    const renderListEvents = () => (
        <ListEvents
            listName="Lista de eventos"
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
                <MainTitle>{`Bem vinda, ${'Isabela Fernandes'}!`}</MainTitle>
            </S.Header>

            <S.ListEventsWrapper>
                <S.ListEventsHeader>
                    <S.ListEventsTitle>Configurar Campanha</S.ListEventsTitle>
                    <S.ListEventsDescription>
                        Preencha os campos abaixo para configurar a campanha.
                        Em seguida, selecione os expositores para finalizar a criação.
                    </S.ListEventsDescription>
                </S.ListEventsHeader>

                {loading && renderLoading()}
                {error && renderError()}
                {!loading && !error && renderListEvents()}
            </S.ListEventsWrapper>

            {!loading && !error && renderFooter()}
        </div>
    );
};

export { LoginFirstEvent };
