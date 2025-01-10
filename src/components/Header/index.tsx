import { useRef } from 'react';
import { Icon } from '#components/Icon';
import { EventOption } from '#components/RadioButtonEventList';
import { UserProfile } from '#components/UserProfile';
import { useContentSideMenu } from '#hooks/useContentSideMenu';
import { useSelectedEvent } from '#hooks/useEventSelected';
import { updateLocalSelectedEvent } from '#utils/localStorageItems';
import { ChangeSelectedEvent } from './ChangeSelectedEvent';
import * as S from './styles';

type HeaderProps = {
    isExpanded: boolean;
};

const Header: React.FC<HeaderProps> = ({ isExpanded }) => {
    const { selectedLocalEvent, updateSelectedEvent } = useSelectedEvent();
    const { openContentSideMenu, closeContentSideMenu } = useContentSideMenu();

    const tempSelectedEvent = useRef<EventOption | null>(selectedLocalEvent);

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleSelectEvent = (option: EventOption) => {
        tempSelectedEvent.current = option;

        if (buttonRef.current) {
            buttonRef.current.disabled = false;
        }
    };

    const handleConfirmSelection = () => {
        if (tempSelectedEvent.current) {
            updateLocalSelectedEvent(tempSelectedEvent.current);
            updateSelectedEvent(tempSelectedEvent.current);
        }
        closeContentSideMenu();
    };

    const handleCancelSelection = () => {
        tempSelectedEvent.current = null;
        closeContentSideMenu();
    }

    const handleChangeSelectedEvent = () => {
        tempSelectedEvent.current = selectedLocalEvent;

        openContentSideMenu(
            <ChangeSelectedEvent
                buttonRef={buttonRef}
                selectedCurrentEvent={selectedLocalEvent}
                onSelectEvent={handleSelectEvent}
                onConfirm={handleConfirmSelection}
                onCancel={handleCancelSelection}
            />
        );
    };

    return (
        <S.HeaderContainer>
            <S.HeaderContainerContent isExpanded={isExpanded} hasEventName={!!selectedLocalEvent?.label}>
                {selectedLocalEvent?.label && (
                    <S.EventContaiver onClick={handleChangeSelectedEvent}>
                        <div>
                            <p>Selecione um evento</p>
                            <S.EventSelectedContainer>
                                <h4>{selectedLocalEvent?.label}</h4>
                                <Icon name="chevronRight" size={36} />
                            </S.EventSelectedContainer>
                        </div>
                    </S.EventContaiver>
                )}
                <S.UserProfileWrapper>
                    <UserProfile
                        name="Isabela Fernandes"
                        email="isabela@email.com"
                    />
                </S.UserProfileWrapper>
            </S.HeaderContainerContent>
        </S.HeaderContainer>
    );
};

export { Header };
