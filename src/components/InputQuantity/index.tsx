import { InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "#components/Icon";
import * as S from "./styles";

type InputQuantityProps = InputHTMLAttributes<HTMLInputElement> & {
    width?: string | number;
    label?: string;
    tooltip?: ReactNode;
};

const InputQuantity: React.FC<InputQuantityProps> = ({
    width = "",
    label = "",
    tooltip = "",
    ...rest
}) => {
    return (
        <>
            <div>
                {label && <S.Label>{label}</S.Label>}
                {tooltip && tooltip}
            </div>
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
