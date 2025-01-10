import { ReactNode, useEffect, useState } from "react";
import { DataListTable } from "#components/DataListTable";
import { MainTitle } from "#components/MainTitle";
import * as S from "./styles";
import { Button } from "#components/Button";
import { normalizeTableData } from "#utils/tableDataUtils";
import { useNavigate } from "react-router-dom";
import { routesNames } from "#utils/routesNames";
import { StatusBadge } from "#components/StatusBadge";
import { EmptyCampaignList } from "#components/EmptyCampaignList";
import { useRegisteredCampaigns } from "#services/campaign/useRegisteredCampaigns";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { ErrorMessage } from "#styles/components";

type ExhibitorCampaignRow = [string, string, string, ReactNode, ReactNode];

const { CONFIGURE_CAMPAIGN, CREATE_CAMPAIGN } = routesNames;

const ExhibitorCampaign: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 100;

    const { data: registeredCampaigns, loading: loadingRegisteredCampaigns, error, fetchRegisteredCampaigns } = useRegisteredCampaigns();

    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;
    const [hasFetched, setHasFetched] = useState<boolean>(false);

    useEffect(() => {
        if (registeredEventId && !registeredCampaigns && !hasFetched) {
            fetchRegisteredCampaigns(registeredEventId).finally(() => setHasFetched(true));
        }
    }, [registeredEventId, registeredCampaigns, hasFetched]);

    const columnsHead = [
        { id: 0, item: <span>Campanha</span> },
        { id: 1, item: <span style={{ display: "flex" }}>Expositor</span> },
        { id: 2, item: <span style={{ display: "flex" }}>Data e Hora</span> },
        { id: 3, item: <span style={{ display: "flex" }}>Status Campanha</span> },
        { id: 4, item: <span style={{ display: "flex" }}>Editar</span> },
    ];

    const handleConfigureCampaign = ({ campaignContentId }: { campaignContentId: string }) => {
        navigate(CONFIGURE_CAMPAIGN, { state: { campaignContentId } });
    };

    const formattedRowData =
        registeredCampaigns?.map((campaign) => {
            return {
                id: campaign.campaign_content_id,
                name: campaign.campaign_name,
                exhibitor: campaign.exhibitor_name,
                dateAndHour: `${campaign.campaign_date} ${campaign.campaign_time}`,
                campaigStatus: (
                    <StatusBadge label={campaign.campaign_status} />
                ),
                editerExhibitorCampaign: (
                    <Button variant="outline"
                        onClick={
                            () => handleConfigureCampaign({ campaignContentId: campaign.campaign_content_id })
                        }>
                        Configurar
                    </Button>
                ),
            };
        }) || [];

    const { normalizedRows } = normalizeTableData<ExhibitorCampaignRow>(formattedRowData.map((item) => ({
        id: item.id,
        row: [item.name, item.exhibitor, item.dateAndHour, item.campaigStatus, item.editerExhibitorCampaign],
    })));

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData: ExhibitorCampaignRow[] = normalizedRows
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => item.row);

    const handleCreateCampaign = () => {
        navigate(CREATE_CAMPAIGN);
    };

    const renderErrorState = () => {
        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Campanha Expositor</MainTitle>
                </S.Header>
                <S.SpaceY40 />
                <ErrorMessage>Erro ao carregar campanha expositor: {error?.message}</ErrorMessage>
            </S.Container>
        );
    };

    const renderEmptyState = () => {
        if (!hasFetched) return null;

        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Campanha Expositor</MainTitle>
                </S.Header>

                <S.SpaceY40 />
                <EmptyCampaignList onCreateCampaign={handleCreateCampaign} />
            </S.Container>
        );
    };

    const renderTable = () => {
        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Campanha Expositor</MainTitle>
                </S.Header>

                <S.SpaceY40 />
                <DataListTable<ExhibitorCampaignRow>
                    title="Lista de campanhas"
                    hasSearchBar
                    searchPlaceholder="Pesquisar expositor"
                    columns={columnsHead}
                    isTableLoading={loadingRegisteredCampaigns}
                    columnWidths={["28%", "18%", "18%", "18%", "18%"]}
                    dataList={paginatedData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalRows={normalizedRows.length}
                    handlePageChange={handlePageChange}
                />
            </S.Container>
        );
    };

    if (error && !loadingRegisteredCampaigns) {
        return renderErrorState();
    }

    if ((!registeredCampaigns || registeredCampaigns.length === 0) && !loadingRegisteredCampaigns) {
        return renderEmptyState();
    }

    return renderTable();
};

export { ExhibitorCampaign };
