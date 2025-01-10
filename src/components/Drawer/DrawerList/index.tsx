import { useNavigate } from 'react-router-dom';
import { routesNames } from '#utils/routesNames';
import { routeItems } from '#utils/routeItems';
import { Icon } from '#components/Icon';
import { useSelectedEvent } from '#hooks/useEventSelected';
import * as S from './styles';

type DrawerListProps = {
    isExpanded: boolean;
}

const { LOGIN_FIRST_EVENT } = routesNames;

const DrawerList: React.FC<DrawerListProps> = ({ isExpanded }) => {
    const navigate = useNavigate();
    const { selectedLocalEvent } = useSelectedEvent();

    const hasEventSelected = selectedLocalEvent !== null;

    const filteredRouteItems = routeItems.filter((item) => item.path !== LOGIN_FIRST_EVENT);

    return (
        <S.Menu>
            {filteredRouteItems.map((item) => (
                <S.MenuItem
                    key={item.label}
                    disable={!hasEventSelected}
                    isActive={location.pathname.includes(item.path)}
                    isExpanded={isExpanded}
                    onClick={() => navigate(item.path)}
                >
                    <S.Icon isExpanded={isExpanded}>
                        <Icon name={item.iconName ?? ''} />
                    </S.Icon>
                    <S.Label isExpanded={isExpanded}>{item.label}</S.Label>
                </S.MenuItem>
            ))}
        </S.Menu>
    );
};

export { DrawerList };
