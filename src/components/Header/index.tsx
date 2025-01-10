import { useRef } from 'react';
import { Icon } from '#components/Icon';
import { UserProfile } from '#components/UserProfile';
import { useContentSideMenu } from '#hooks/useContentSideMenu';
import { useSelectedEvent } from '#hooks/useEventSelected';
import { updateLocalSelectedEvent } from '#utils/localStorageItems';
import { ChangeSelectedEvent } from './ChangeSelectedEvent';
import { RegisteredEvent } from '#services/events/useGetRegisteredEvents';
import { useNavigate } from 'react-router-dom';
import { routesNames } from '#utils/routesNames';
import * as S from './styles';
import { useUserAttributes } from '#hooks/useUserAttributes';

type HeaderProps = {
    isExpanded: boolean;
};

const { GENERAL_CAMPAIGN } = routesNames

const Header: React.FC<HeaderProps> = ({ isExpanded }) => {
    const navigate = useNavigate();
    const { fullName, email } = useUserAttributes();
    const { selectedLocalEvent, updateSelectedEvent } = useSelectedEvent();
    const { openContentSideMenu, closeContentSideMenu } = useContentSideMenu();

    const tempSelectedEvent = useRef<RegisteredEvent | null>(selectedLocalEvent);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleSelectEvent = (option: RegisteredEvent) => {
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

        if (window.location.pathname !== GENERAL_CAMPAIGN) {
            navigate(GENERAL_CAMPAIGN);
        } else {
            navigate(GENERAL_CAMPAIGN, { replace: true });
            window.location.reload();
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
            <S.HeaderContainerContent isExpanded={isExpanded} hasEventName={!!selectedLocalEvent?.event_name}>
                {selectedLocalEvent?.event_name && (
                    <S.EventContaiver onClick={handleChangeSelectedEvent}>
                        <div>
                            <p>Selecione um evento</p>
                            <S.EventSelectedContainer>
                                <h4>{selectedLocalEvent?.event_name}</h4>
                                <Icon name="chevronRight" size={36} />
                            </S.EventSelectedContainer>
                        </div>
                    </S.EventContaiver>
                )}
                <S.UserProfileWrapper>
                    <UserProfile
                        name={fullName || ''}
                        email={email || ''}
                    />
                </S.UserProfileWrapper>
            </S.HeaderContainerContent>
        </S.HeaderContainer>
    );
};

export { Header };
