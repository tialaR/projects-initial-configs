import { useState } from "react";
import * as S from './styles';

type CheckboxProps = {
    label: string;
    isCheckboxChecked: boolean;
    onCheckboxChange?: () => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, isCheckboxChecked, onCheckboxChange = () => { } }) => {
    const [isChecked, setIsChecked] = useState(isCheckboxChecked);

    const handleChange = () => {
        setIsChecked((prev) => !prev);
        if (onCheckboxChange) {
            onCheckboxChange();
        }
    };

    return (
        <S.CheckboxWrapper>
            <S.Label>
                <S.StyledCheckbox
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                    className={isChecked ? "checked" : ""}
                />
            </S.Label>
            <span>{label}</span>
        </S.CheckboxWrapper>
    );
};

export { Checkbox };