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
import { normalizeLabel } from "#utils/normalizeLabel";
import { ErrorMessage } from "#styles/components";

type ActiveCampaignRow = [string, string, number, number, number, ReactNode, ReactNode];

const FollowCampaign: React.FC = () => {
    const { openContentSideMenu, closeContentSideMenu } = useContentSideMenu();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 100;

    const {
        data: monitorCampaigns,
        loading: loadingMonitorCampaigns,
        error: errorMonitorCampaigns,
        fetchMonitorCampaigns
    } = useMonitorCampaigns();
    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

    useEffect(() => {
        if (registeredEventId && !monitorCampaigns && !hasFetched) {
            fetchMonitorCampaigns(registeredEventId).finally(() => setHasFetched(true));
            return;
        }

        if (registeredEventId && monitorCampaigns && !hasFetched) {
            fetchMonitorCampaigns(registeredEventId).finally(() => setHasFetched(true));
            return;
        }
    }, [registeredEventId, monitorCampaigns, hasFetched, shouldRefetch]);

    const renderError = () => {
        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Acompanhar Campanhas</MainTitle>
                </S.Header>

                <S.SpaceY40 />
                <ErrorMessage>Erro ao carregar acompanhar campanhas: {errorMonitorCampaigns?.message}</ErrorMessage>
            </S.Container>
        )
    }

    const renderEmptyState = () => {
        if (!hasFetched) return null;

        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Acompanhar Campanhas</MainTitle>
                </S.Header>

                <S.SpaceY40 />
                <p>Nenhuma campanha encontrada.</p>
            </S.Container>
        )
    }

    const handleConfirmEndCampaign = () => {
        openContentSideMenu(
            <EndCampaingSuccess onConfirm={() => {
                closeContentSideMenu();
            }} />
        );
    };

    const handleEndCampaign = ({ exibitorId, campaignName, exhibitorName, campaignContentId }
        : { exibitorId: string, campaignName: string, exhibitorName: string, campaignContentId: string }) => {
        function refreshTable() {
            setHasFetched(false);
            setShouldRefetch(true);
        }

        openContentSideMenu(
            <EndCampaingSummary
                exibitorId={exibitorId}
                exhibitorName={exhibitorName}
                campaignContentId={campaignContentId}
                campaignName={campaignName}
                onConfirm={({ isSuccess }: { isSuccess: boolean }) => {
                    if (isSuccess) {
                        refreshTable();
                    }
                    handleConfirmEndCampaign()
                }}
                onCancel={closeContentSideMenu}
            />
        );
    };

    const formattedRowData = monitorCampaigns?.map((campaign) => ({
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
                disabled={normalizeLabel(campaign.campaign_status) !== "envio programado"}
                onClick={() =>
                    handleEndCampaign({
                        exibitorId: campaign.exhibitor_id,
                        campaignName: campaign.campaign_name,
                        exhibitorName: campaign.exhibitor_name,
                        campaignContentId: campaign.campaign_content_id,
                    })}
            >
                {normalizeLabel(campaign.campaign_status) === "envio programado" ? "Encerrar" : "Encerrada"}
            </Button>
        ),
    }));

    const { normalizedRows } = normalizeTableData<ActiveCampaignRow>(
        (formattedRowData ?? []).map((item) => ({
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

    const renderTable = () => {
        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Acompanhar Campanhas</MainTitle>
                </S.Header>

                <S.SpaceY40 />
                <DataListTable<ActiveCampaignRow>
                    title="Lista de campanhas"
                    hasSearchBar
                    // hasResearchFilter TBD -> Will be implemented in the future
                    searchPlaceholder="Pesquisar expositor"
                    isTableLoading={loadingMonitorCampaigns}
                    columns={columnsHead}
                    columnWidths={["19%", "17%", "10%", "10%", "10%", "17%", "17%"]}
                    dataList={paginatedData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalRows={normalizedRows.length}
                    handlePageChange={handlePageChange}
                />
            </S.Container>
        );
    }

    if (errorMonitorCampaigns && !loadingMonitorCampaigns) {
        return renderError();
    }

    if ((!monitorCampaigns || monitorCampaigns.length === 0) && !loadingMonitorCampaigns) {
        return renderEmptyState();
    }

    return renderTable()
};

export { FollowCampaign };
