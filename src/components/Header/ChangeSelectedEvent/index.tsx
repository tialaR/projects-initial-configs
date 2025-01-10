import { useEffect } from "react";
import { Button } from "#components/Button";
import { ListEvents } from "#components/ListEvents";
import * as S from "./styles";
import { RegisteredEvent, useGetRegisteredEvents } from "#services/events/useGetRegisteredEvents";

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
        const { events, loading, error, getEvents } = useGetRegisteredEvents();

        useEffect(() => {
            if (buttonRef.current) {
                buttonRef.current.disabled = true;
            }
        }, []);

        useEffect(() => {
            getEvents();
        }, []);

        const renderLoading = () => <div>Carregando eventos...</div>;

        const renderError = () => <div>Erro ao carregar eventos. Tente novamente.</div>;

        const renderListEvents = () => (
            <>
                <ListEvents
                    listName="Lista de eventos"
                    registeredEvents={events}
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
                {loading && renderLoading()}
                {error && renderError()}
                {!loading && !error && renderListEvents()}
            </S.ChangeSelectedEventContainer>
        );
    };

export { ChangeSelectedEvent };
