import React from "react";
import * as S from "./styles";

export type StatusBadgeProps = {
    status:
    "excellent"
    | "regular"
    | "bad"
    | "good"
    | "pendingActivation"
    | "scheduledShipping"
    | "canceled"
    | "cancel"
    | "active"
    | "conclued";
    label?: string;
};

export const statusLabels: Record<StatusBadgeProps["status"], string> = {
    excellent: "Excelente",
    good: "Bom",
    regular: "Regular",
    bad: "Ruim",
    pendingActivation: "Ativação Pendente",
    scheduledShipping: "Envio Agendado",
    canceled: "Cancelado",
    cancel: "Cancelada",
    active: "Ativa",
    conclued: "Concluída",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
    return <S.Badge status={status}>{label || statusLabels[status]}</S.Badge>;
};

export { StatusBadge };
