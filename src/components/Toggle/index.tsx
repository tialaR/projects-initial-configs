import * as S from "./styles";

interface ToggleProps {
    isActive: boolean;
    onToggle: (isActive: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ isActive, onToggle }) => {
    const handleToggle = () => {
        onToggle(!isActive);
    };

    return (
        <S.ToggleWrapper isActive={isActive} onClick={handleToggle}>
            <S.ToggleSlider />
        </S.ToggleWrapper>
    );
};

export { Toggle };