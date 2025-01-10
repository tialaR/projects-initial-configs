import React from "react";
import { defaultTheme } from '#styles/themes/default';
import * as S from "./styles";
import { normalizeLabel } from "#utils/normalizeLabel";

export type StatusBadgeProps = {
    label: string;
};

const labelToColorMap: Record<string, string> = {
    "ótimo": defaultTheme.colors.alert.positive100,
    "Excelente": defaultTheme.colors.alert.positive100,
    "disponível": defaultTheme.colors.alert.positive100,
    "Bom": defaultTheme.colors.alert.info100,
    "Regular": defaultTheme.colors.alert.warning100,
    "Ruim": defaultTheme.colors.alert.negative100,
    "Pendente ativação": defaultTheme.colors.alert.warning100,
    "Envio programado": defaultTheme.colors.alert.positive100,
    "Em Ativação": defaultTheme.colors.alert.positive100,
    "Cancelada": defaultTheme.colors.alert.negative100,
    "Cancelado": defaultTheme.colors.alert.negative100,
    "Concluída": defaultTheme.colors.alert.info100,
    "Ativa": defaultTheme.colors.alert.positive100,
    "Aprovado": defaultTheme.colors.alert.positive100,
    "Reprovado": defaultTheme.colors.alert.negative100,
    "Em análise": defaultTheme.colors.alert.warning100,
    'Em andamento': defaultTheme.colors.alert.warning100,
    "Indefinido": defaultTheme.colors.grayScale.gray400,
    "indisponível": defaultTheme.colors.grayScale.gray400,
    "TBD": defaultTheme.colors.grayScale.gray400,
};

const findLabelColor = (label: string) => {
    const normalizedLabel = label && normalizeLabel(label);

    const foundKey = Object.keys(labelToColorMap).find(
        key => normalizeLabel(key) === normalizedLabel
    );

    return foundKey ? labelToColorMap[foundKey] : defaultTheme.colors.grayScale.gray400;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ label }) => {
    return <S.Badge label={label}>{label}</S.Badge>;
};

export { StatusBadge, findLabelColor };
