import logo from '#assets/svg/logo.svg'
import * as S from './styles';

type DrawerHeaderProps = {
    isExpanded: boolean;
    onToggle: () => void;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ isExpanded, onToggle }) => {
    return (
        <>
            <S.DrawerHeader>
                <S.Logo isExpanded={isExpanded}>
                    {isExpanded ? <img src={logo} alt='logo' /> : "🔷"}
                </S.Logo>
            </S.DrawerHeader>
            <S.ToggleButton isExpanded={isExpanded} onClick={onToggle}>
                {isExpanded ? "⬅" : "➡"}
            </S.ToggleButton>
        </>
    );
};

export { DrawerHeader };
