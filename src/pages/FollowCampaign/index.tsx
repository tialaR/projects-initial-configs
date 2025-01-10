import React, { useState } from "react";
import { DataListTable } from "#components/DataListTable";
import { Toggle } from "#components/Toggle";
import * as S from "./styles";

interface Campaign {
    id: number;
    name: string;
    exhibitors: number;
    event: string;
    status: 'ativated' | 'inApproval' | 'desactivated';
    isActive: boolean;
}

const FollowCampaign: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([
        {
            id: 1,
            name: "Primeira Compra",
            exhibitors: 5,
            event: "Feira Play 2024",
            status: "ativated",
            isActive: true,
        },
        {
            id: 2,
            name: "Conexão Saúde",
            exhibitors: 23,
            event: "Feira Doctor Ed.6",
            status: "inApproval",
            isActive: false,
        },
        {
            id: 3,
            name: "Agora pode ser seu",
            exhibitors: 30,
            event: "Exposição Máquinas",
            status: "desactivated",
            isActive: true,
        },
    ]);

    const handleToggle = (id: number, isActive: boolean): void => {
        alert(`Toggle clicked for campaign with ID ${id}. New status: ${isActive}`);
        setCampaigns((prevCampaigns) =>
            prevCampaigns.map((campaign) =>
                campaign.id === id ? { ...campaign, isActive } : campaign
            )
        );
    };

    const columnsHead = [
        { id: 0, item: "Nome da campanha" },
        { id: 1, item: "Qtd. Expositores" },
        { id: 2, item: "Evento" },
        { id: 3, item: "Status" },
        { id: 4, item: "Campanha Ativa" },
        { id: 5, item: "Editar" },
    ];

    const paginatedData = campaigns.map((campaign) => [
        campaign.name,
        campaign.exhibitors,
        campaign.event,
        <S.StatusBadge status={campaign.status}>{campaign.status}</S.StatusBadge>,
        <Toggle
            key={`toggle-${campaign.id}`}
            isActive={campaign.isActive}
            onToggle={(isActive) => handleToggle(campaign.id, isActive)}
        />,
        <S.IconButton
            key={`edit-${campaign.id}`}
            onClick={() => alert(`Editar campanha ${campaign.id}`)}
        >
            ✏️
        </S.IconButton>,
    ]);

    return (
        <div style={{ padding: "1.5rem" }}>
            <p style={{ color: "#bbbbbb", fontSize: "1.25rem" }}>Lista de campanhas</p>
            <DataListTable
                title="Acompanhar Campanha"
                columns={columnsHead}
                dataList={paginatedData}
                currentPage={1}
                itemsPerPage={10}
                totalRows={campaigns.length}
                handlePageChange={() => { }}
            />
        </div>
    );
};

export { FollowCampaign };
