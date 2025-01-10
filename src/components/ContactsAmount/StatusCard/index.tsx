import { Icon } from "#components/Icon";
import { ProgressBar } from "#components/ProgressBar";
import { defaultTheme } from "#styles/themes/default";
import * as S from "./styles";

type MedalColor = (typeof defaultTheme.colors.status)["gold" | "silver" | "bronze"];
type MedalLabel = "Ouro" | "Prata" | "Bronze";
type MedalIcon = "medalGold" | "medalSilver" | "medalBronze";

type StatusCardProps = {
    color: MedalColor;
    medal: MedalLabel;
    iconName: MedalIcon;
    value: number;
    percentage: number | string;
};

const StatusCard: React.FC<StatusCardProps> = ({
    color,
    iconName,
    medal,
    value,
    percentage,
}) => {

    return (
        <S.ContactCardContainer color={color}>
            <Icon name={iconName} size={64} />
            <S.ContactCard>
                <S.ContactInfoContainer>
                    <S.ContactInfoLabelsContainer color={color}>
                        <p>Contatos</p>
                        <h2>{medal}</h2>
                    </S.ContactInfoLabelsContainer>
                    <S.ContactInfoValuesContainer>
                        <h2>{value}</h2>
                    </S.ContactInfoValuesContainer>
                </S.ContactInfoContainer>
                <ProgressBar color={color} percentage={percentage} />
            </S.ContactCard>
        </S.ContactCardContainer>
    );
}

export { StatusCard };