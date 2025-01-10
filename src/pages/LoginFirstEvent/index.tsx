import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeLocalSelectedEvent, updateLocalSelectedEvent } from "#utils/localStorageItems";
import { MainTitle } from "#components/MainTitle";
import { EventOption } from "#components/RadioButtonEventList";
import { Button } from "#components/Button";
import { ListEvents } from "#components/ListEvents";
import { routesNames } from "#utils/routesNames";
import { listEventsMock } from "#components/ListEvents/listEventsMock";
import * as S from "./styles";

const { CREATE_CAMPAIGN } = routesNames

const LoginFirstEvent: React.FC = () => {
    const navigate = useNavigate();

    const [selectedEvent, setSelectedEvent] = useState<EventOption | null>(null);

    useEffect(() => {
        removeLocalSelectedEvent();
    }, []);

    const handleSelectEvent = (option: EventOption) => {
        if (option) {
            setSelectedEvent(option);
        }
    };

    const handleRenderSelectedEvent = () => {
        if (selectedEvent) {
            updateLocalSelectedEvent(selectedEvent)
            navigate(CREATE_CAMPAIGN, { state: { selectedEvent } })
        }
    };

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

                <ListEvents
                    listName="Lista de eventos"
                    radioOptionsList={listEventsMock}
                    searchbarPlaceholder="Pesquisar evento"
                    searchbarWidth="29.625rem"
                    debounceEnabled
                    onSelectEvent={handleSelectEvent}
                />
            </S.ListEventsWrapper>

            <S.Footer>
                <Button
                    disabled={!selectedEvent}
                    variant="primary"
                    onClick={handleRenderSelectedEvent}>
                    Iniciar
                </Button>
            </S.Footer>
        </div>
    );
}

export { LoginFirstEvent };