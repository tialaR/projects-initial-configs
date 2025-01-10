import { useEffect } from "react";
import { Button } from "#components/Button";
import { ListEvents } from "#components/ListEvents";
import { listEventsMock } from "#components/ListEvents/listEventsMock";
import { EventOption } from "#components/RadioButtonEventList";
import * as S from "./styles";

const ChangeSelectedEvent: React.FC<{
    buttonRef: React.RefObject<HTMLButtonElement>;
    selectedCurrentEvent: EventOption | null;
    onSelectEvent: (option: EventOption) => void;
    onConfirm: () => void;
    onCancel: () => void;
}> = ({
    buttonRef,
    selectedCurrentEvent,
    onSelectEvent,
    onConfirm,
    onCancel,
}) => {

        useEffect(() => {
            if (buttonRef.current) {
                buttonRef.current.disabled = true;
            }
        }, []);

        return (
            <S.ChangeSelectedEventContainer>
                <ListEvents
                    listName="Lista de eventos"
                    radioOptionsList={listEventsMock}
                    selectedCurrentEvent={selectedCurrentEvent}
                    searchbarPlaceholder="Pesquisar evento"
                    searchbarWidth="29.625rem"
                    debounceEnabled
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
            </S.ChangeSelectedEventContainer>
        );
    };

export { ChangeSelectedEvent };
