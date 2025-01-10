import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Drawer } from '#components/Drawer';
import { Header } from '#components/Header';
import * as S from './styles';

const DefaultLayout: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <S.DefaultLayoutContainer>
            <Header isExpanded={isExpanded} />
            <S.DrawerAndOutletContainer isExpanded={isExpanded}>
                <Drawer isExpanded={isExpanded} onToggle={handleExpand} />
                <S.OutletContainer isExpanded={isExpanded}>
                    <Outlet />
                </S.OutletContainer>
            </S.DrawerAndOutletContainer>
        </S.DefaultLayoutContainer>
    );
};

export { DefaultLayout };
