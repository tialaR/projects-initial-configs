import { Icon } from "#components/Icon";
import * as S from "./styles";

type TooltipProps = {
    text: string;
    iconName?: string;
};

const Tooltip: React.FC<TooltipProps> = ({
    text,
    iconName = "",
}) => {
    return (
        <S.TooltipContainer>
            <S.TooltipWrapper>
                <S.TooltipIcon>
                    <Icon name={iconName} size={14} />
                </S.TooltipIcon>
                <S.TooltipText>
                    {text}
                </S.TooltipText>
            </S.TooltipWrapper>
        </S.TooltipContainer>
    )
}

export { Tooltip };