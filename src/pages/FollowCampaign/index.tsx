import { ReactNode, useState } from "react";
import { DataListTable } from "#components/DataListTable";
import { MainTitle } from "#components/MainTitle";
import { Button } from "#components/Button";
import { normalizeTableData } from "#utils/tableDataUtils";
import { StatusBadge, StatusBadgeProps } from "#components/StatusBadge";
import * as S from "./styles";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import { EndCampaingSuccess, EndCampaingSummary } from "#components/FollowCampaign";

type ActiveCampaignRow = [string, string, number, number, number, ReactNode, ReactNode];

export type CampaignStatus = "active" | "conclued" | "cancel";
export type CampaignStatusLabel = "Ativa" | "Concluída" | "Cancelada";

const statusLabels: Record<CampaignStatus, CampaignStatusLabel> = {
    active: "Ativa",
    conclued: "Concluída",
    cancel: "Cancelada",
};

type ActiveCampaign = {
    id: string | number;
    campaignName: string;
    exhibitor: string;
    contactCount: number;
    dispatchCount: number;
    leadCount: number;
    campaignStatus: CampaignStatus;
    closeCampaign: boolean;
};

const reverseStatusLabels: Record<CampaignStatusLabel, StatusBadgeProps["status"]> = Object.fromEntries(
    Object.entries(statusLabels).map(([key, value]) => [value, key as StatusBadgeProps["status"]])
) as Record<CampaignStatusLabel, StatusBadgeProps["status"]>;

export const mockActiveCampaigns: ActiveCampaign[] = [
    {
        id: 1,
        campaignName: "Black Friday 2025",
        exhibitor: "Loja XYZ",
        contactCount: 5000,
        dispatchCount: 4500,
        leadCount: 1200,
        campaignStatus: "active",
        closeCampaign: false,
    },
    {
        id: 2,
        campaignName: "Summer Sale",
        exhibitor: "Super Eletro",
        contactCount: 3500,
        dispatchCount: 3000,
        leadCount: 800,
        campaignStatus: "conclued",
        closeCampaign: true,
    },
    {
        id: 3,
        campaignName: "Christmas Giveaway",
        exhibitor: "Mega Shopping",
        contactCount: 6000,
        dispatchCount: 5800,
        leadCount: 1500,
        campaignStatus: "cancel",
        closeCampaign: false,
    },
    {
        id: 4,
        campaignName: "Back to School",
        exhibitor: "Online Stationery",
        contactCount: 4000,
        dispatchCount: 3700,
        leadCount: 1000,
        campaignStatus: "conclued",
        closeCampaign: false,
    },
    {
        id: 5,
        campaignName: "Consumer Week",
        exhibitor: "Tech Store",
        contactCount: 7000,
        dispatchCount: 6800,
        leadCount: 2000,
        campaignStatus: "cancel",
        closeCampaign: true,
    },
];

const FollowCampaign: React.FC = () => {
    const { openContentSideMenu, closeContentSideMenu } = useContentSideMenu();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const [activeCampaigns, setActiveCampaigns] = useState<ActiveCampaign[]>(mockActiveCampaigns);

    const columnsHead = [
        { id: 0, item: <span>Campanha</span> },
        { id: 1, item: <span>Expositor</span> },
        { id: 2, item: <span>Quantidade< br />Contatos</span> },
        { id: 3, item: <span>Quantidade< br />Disparos</span> },
        { id: 4, item: <span>Quantidade< br />Leads</span> },
        { id: 5, item: <span>Status< br />Campanha</span> },
        { id: 6, item: <span>Encerrar< br />Campanha</span> },
    ];

    const handleConfirmEndCampaign = (activeCampaign: ActiveCampaign) => {
        if (activeCampaign) {
            setActiveCampaigns((prevCampaigns) =>
                prevCampaigns.map((campaign) =>
                    campaign.id === activeCampaign.id
                        ? { ...campaign, closeCampaign: true }
                        : campaign
                )
            );

            openContentSideMenu(
                <EndCampaingSuccess
                    onConfirm={closeContentSideMenu}
                />
            );
        }
    };

    const handleEndCampaign = ({ activeCampaign }: { activeCampaign: ActiveCampaign }) => {
        openContentSideMenu(
            <EndCampaingSummary
                campaignName={activeCampaign.campaignName}
                exhibitorName={activeCampaign.exhibitor}
                onConfirm={() => handleConfirmEndCampaign(activeCampaign)}
                onCancel={closeContentSideMenu}
            />
        );
    };

    const formattedRowData = activeCampaigns.map((activeCampaign) => ({
        ...activeCampaign,
        campaigStatus: (
            <StatusBadge
                status={reverseStatusLabels[statusLabels[activeCampaign.campaignStatus]]}
                label={statusLabels[activeCampaign.campaignStatus]}
            />
        ),
        editerExhibitorCampaign: (
            <Button
                variant="primary"
                onClick={() => handleEndCampaign({ activeCampaign })}
                disabled={activeCampaign.closeCampaign}
            >
                {activeCampaign.closeCampaign ? 'encerrado' : 'encerrar'}
            </Button>
        ),
    }));

    const { normalizedRows } = normalizeTableData<ActiveCampaignRow>(
        formattedRowData.map((item) => ({
            id: item.id,
            row: [
                item.campaignName,
                item.exhibitor,
                item.contactCount,
                item.dispatchCount,
                item.leadCount,
                item.campaigStatus,
                item.editerExhibitorCampaign,
            ],
        }))
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData: ActiveCampaignRow[] = normalizedRows
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => item.row);

    return (
        <S.Container>
            <S.Header>
                <MainTitle>Acompanhar Campanhas</MainTitle>
            </S.Header>

            <S.SpaceY40 />
            <DataListTable<ActiveCampaignRow>
                title="Lista de campanhas"
                hasSearchBar
                hasResearchFilter
                searchPlaceholder="Pesquisar expositor"
                columns={columnsHead}
                columnWidths={["18%", "17%", "13%", "13%", "13%", "13%", "13%"]}
                dataList={paginatedData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalRows={normalizedRows.length}
                handlePageChange={handlePageChange}
            />
        </S.Container>
    );
}

export { FollowCampaign };
