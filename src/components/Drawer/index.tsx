import { useNavigate } from 'react-router-dom';
import { DrawerList } from './DrawerList';
import { DrawerHeader } from './DrawerHeader';
import { routesNames } from '#utils/routesNames';
import { removeLocalSelectedEvent } from '#utils/localStorageItems';
import { Icon } from '#components/Icon';
import * as S from './styles';

type DrawerProps = {
    isExpanded: boolean;
    onToggle: () => void;
}

const { LOGIN_FIRST_EVENT } = routesNames;

const Drawer: React.FC<DrawerProps> = ({ isExpanded, onToggle }) => {
    // const location = useLocation();
    const navigation = useNavigate();

    const handleLogout = () => {
        // if (location.pathname === LOGIN_FIRST_EVENT) return;

        removeLocalSelectedEvent();
        navigation(LOGIN_FIRST_EVENT, { replace: true });
    };

    return (
        <S.DrawerContainer isExpanded={isExpanded}>
            <DrawerHeader isExpanded={isExpanded} onToggle={onToggle} />
            <S.SpaceY80 />
            <DrawerList isExpanded={isExpanded} />
            <S.DrawerFooter isExpanded={isExpanded} onClick={handleLogout}>
                <Icon name="logout" />
                {isExpanded && <span>Sair</span>}
            </S.DrawerFooter>
        </S.DrawerContainer>
    );
};

export { Drawer };