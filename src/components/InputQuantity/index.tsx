import { InputHTMLAttributes } from "react";
import { Icon } from "#components/Icon";
import * as S from "./styles";

type InputQuantityProps = InputHTMLAttributes<HTMLInputElement> & {
    width?: string | number;
    label?: string;
};

const InputQuantity: React.FC<InputQuantityProps> = ({
    width = "",
    label = "",
    ...rest
}) => {
    return (
        <>
            {label && <S.Label>{label}</S.Label>}
            <S.InputWrapper width={width}>
                <S.Input {...rest} />
                <div>
                    <Icon name="arrowUpDown" size={24} />
                </div>
            </S.InputWrapper>
        </>
    );
};

export { InputQuantity };
