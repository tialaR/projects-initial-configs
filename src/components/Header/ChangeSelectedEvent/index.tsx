import { useEffect } from "react";
import { Button } from "#components/Button";
import { ListEvents } from "#components/ListEvents";
import * as S from "./styles";
import { RegisteredEvent, useGetRegisteredEvents } from "#services/events/useGetRegisteredEvents";
import { ErrorMessage } from "#styles/components";

const ChangeSelectedEvent: React.FC<{
    buttonRef: React.RefObject<HTMLButtonElement>;
    selectedCurrentEvent: RegisteredEvent | null;
    onSelectEvent: (option: RegisteredEvent) => void;
    onConfirm: () => void;
    onCancel: () => void;
}> = ({
    buttonRef,
    selectedCurrentEvent,
    onSelectEvent,
    onConfirm,
    onCancel,
}) => {
        const { events, loading: loadingEvents, error, getEvents } = useGetRegisteredEvents();

        useEffect(() => {
            if (buttonRef.current) {
                buttonRef.current.disabled = true;
            }
        }, []);

        useEffect(() => {
            getEvents();
        }, []);

        const renderError = () => <ErrorMessage>Erro ao carregar eventos! Tente novamente.</ErrorMessage>;

        const renderListEvents = () => (
            <>
                <ListEvents
                    listName="Lista de eventos"
                    registeredEvents={events}
                    loadingEvents={loadingEvents}
                    searchbarPlaceholder="Pesquisar evento"
                    searchbarWidth="29.625rem"
                    debounceEnabled
                    selectedCurrentEvent={selectedCurrentEvent}
                    onSelectEvent={onSelectEvent}
                />

                <S.SelectedEventContainerFooter>
                    <Button variant="primary-outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button ref={buttonRef} variant="primary" onClick={onConfirm}>
                        Alterar
                    </Button>
                </S.SelectedEventContainerFooter>
            </>
        );

        return (
            <S.ChangeSelectedEventContainer>
                {error && !loadingEvents && renderError()}
                {renderListEvents()}
            </S.ChangeSelectedEventContainer>
        );
    };

export { ChangeSelectedEvent };
