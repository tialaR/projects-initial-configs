import logo from '#assets/svg/logo.svg'
import logoHide from '#assets/svg/logo-hide.svg'
import { Icon } from '#components/Icon';
import * as S from './styles';

type DrawerHeaderProps = {
    isExpanded: boolean;
    onToggle: () => void;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ isExpanded, onToggle }) => {
    return (
        <>
            <S.DrawerHeader isExpanded={isExpanded}>
                <S.Logo isExpanded={isExpanded}>
                    {isExpanded
                        ? <img src={logo} alt='logo-maximizado' />
                        : <img src={logoHide} alt='logo-minimizado' />}
                </S.Logo>
            </S.DrawerHeader>
            <S.ToggleButton isExpanded={isExpanded} onClick={onToggle}>
                <Icon name="arrowDrawer" size={24} />
            </S.ToggleButton>
        </>
    );
};

export { DrawerHeader };
