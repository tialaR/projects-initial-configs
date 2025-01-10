import { ReactNode, useState, useEffect } from "react";
import { DataListTable } from "#components/DataListTable";
import { MainTitle } from "#components/MainTitle";
import { Button } from "#components/Button";
import { normalizeTableData } from "#utils/tableDataUtils";
import { StatusBadge } from "#components/StatusBadge";
import * as S from "./styles";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import { EndCampaingSuccess, EndCampaingSummary } from "#components/FollowCampaign";
import { useMonitorCampaigns } from "#services/campaign/useMonitorCampaigns";
import { getLocalSelectedEvent } from "#utils/localStorageItems";

type ActiveCampaignRow = [string, string, number, number, number, ReactNode, ReactNode];

const FollowCampaign: React.FC = () => {
    const { openContentSideMenu, closeContentSideMenu } = useContentSideMenu();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 100;

    const {
        data: monitorCampaigns,
        loading: loadingMonitorCampaigns,
        error: errorMonitorCampaigns,
        fetchMonitorCampaigns }
        = useMonitorCampaigns();
    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;

    useEffect(() => {
        if (registeredEventId) {
            fetchMonitorCampaigns(registeredEventId);
        }
    }, [registeredEventId]);

    if (loadingMonitorCampaigns) return <p>Carregando campanhas...</p>;
    if (errorMonitorCampaigns) return <p>Erro ao buscar campanhas: {errorMonitorCampaigns?.message}</p>;
    if (!monitorCampaigns || monitorCampaigns.length === 0) return <p>Nenhuma campanha encontrada.</p>;

    const handleConfirmEndCampaign = () => {
        openContentSideMenu(
            <EndCampaingSuccess onConfirm={closeContentSideMenu} />
        );
    };

    const handleEndCampaign = (campaignId: string, campaignName: string, exhibitorName: string) => {
        openContentSideMenu(
            <EndCampaingSummary
                campaignName={campaignName}
                exhibitorName={exhibitorName}
                onConfirm={handleConfirmEndCampaign}
                onCancel={closeContentSideMenu}
            />
        );
    };

    const formattedRowData = monitorCampaigns.map((campaign) => ({
        id: campaign.campaign_content_id,
        campaignName: campaign.campaign_name,
        exhibitor: campaign.exhibitor_name,
        contactCount: campaign.exhibitor_leads ?? 0,
        dispatchCount: campaign.leads_reached,
        leadCount: campaign.positive_leads,
        campaignStatus: campaign.campaign_status,
        campaignStatusBadge: (
            <StatusBadge label={campaign.campaign_status} />
        ),
        closeCampaignButton: (
            <Button
                variant="primary"
                disabled //TBD -> disable button while waiting API for end campaign
                onClick={() =>
                    handleEndCampaign(
                        campaign.campaign_content_id,
                        campaign.campaign_name,
                        campaign.exhibitor_name)}
            >
                Encerrar
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
                item.campaignStatusBadge,
                item.closeCampaignButton,
            ],
        }))
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData: ActiveCampaignRow[] = normalizedRows
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => item.row);

    const columnsHead = [
        { id: 0, item: <span>Campanha</span> },
        { id: 1, item: <span>Expositor</span> },
        { id: 2, item: <span>Quantidade< br />Contatos</span> },
        { id: 3, item: <span>Quantidade< br />Disparos</span> },
        { id: 4, item: <span>Quantidade< br />Leads</span> },
        { id: 5, item: <span>Status< br />Campanha</span> },
        { id: 6, item: <span>Encerrar< br />Campanha</span> },
    ];

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
};

export { FollowCampaign };
