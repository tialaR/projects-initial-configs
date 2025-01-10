import { ReactNode } from "react";
import { Icon } from "#components/Icon";
import * as S from './styles'

type ContentSideMenuProps = {
    isOpen: boolean;
    closeContentMenu: () => void;
    children: ReactNode;
}

const ContentSideMenu: React.FC<ContentSideMenuProps> = ({ isOpen, closeContentMenu, children }) => {
    return (
        <>
            <S.Backdrop isOpen={isOpen} onClick={closeContentMenu} />
            <S.MenuContainer isOpen={isOpen}>
                <S.CloseButton onClick={closeContentMenu}>
                    <Icon name="close" size={32} />
                </S.CloseButton>
                <S.ContentMenuContainer>
                    {children}
                </S.ContentMenuContainer>
            </S.MenuContainer>
        </>
    );
};

export { ContentSideMenu }