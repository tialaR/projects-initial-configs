import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataListTable } from "#components/DataListTable";
import { normalizeTableData } from "#utils/tableDataUtils";
import { Button } from "#components/Button";
import { MainTitle } from "#components/MainTitle";
import { EmptyCampaignList } from "#components/EmptyCampaignList";
import { routesNames } from "#utils/routesNames";
import * as S from "./styles";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { useGeneralCampaigns } from "#services/campaign/useGeneralCampaigns";
import { ErrorMessage } from "#styles/components";

type CampaignRow = [string, string, string, number, ReactNode];

const { CREATE_CAMPAIGN, EXHIBITOR_CAMPAIGN } = routesNames;

const GeneralCampaign: React.FC = () => {
    const navigate = useNavigate();
    const { date: campaigns, loading: loadingCampaigns, error, fetchCampaigns } = useGeneralCampaigns();

    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 100;

    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;

    useEffect(() => {
        if (registeredEventId && !campaigns && !hasFetched) {
            fetchCampaigns(registeredEventId).finally(() => setHasFetched(true));
        }
    }, [registeredEventId, campaigns, hasFetched]);

    const formattedRowData = campaigns?.map((campaign) => ({
        ...campaign,
        editCampaignTemplate: (
            <Button variant="outline" onClick={() => navigate(EXHIBITOR_CAMPAIGN)}>
                Configurar
            </Button>
        ),
    })) || [];

    const { normalizedRows } = normalizeTableData<CampaignRow>(
        formattedRowData.map((item) => ({
            id: item.campaign_id,
            row: [
                item.campaign_name,
                item.template_name,
                `${item.campaign_date} - ${item.campaign_time}`,
                item.campaign_exhibitors,
                item.editCampaignTemplate,
            ],
        }))
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData: CampaignRow[] = normalizedRows
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => item.row);

    const columnsHead = [
        { id: 0, item: <span>Campanha</span> },
        { id: 1, item: <span style={{ display: 'flex' }}>Template</span> },
        { id: 2, item: <span style={{ display: 'flex' }}>Data e Hora</span> },
        { id: 3, item: <span style={{ display: 'flex' }}>{'Quantidade'}<br />{'de Expositor'}</span> },
        { id: 4, item: <span style={{ display: 'flex' }}>{'Editar modelo'}<br />{'da campanha'}</span> },
    ];

    const handleCreateCampaign = () => {
        navigate(CREATE_CAMPAIGN);
    };

    const renderErrorState = () => {
        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Campanha Geral</MainTitle>
                </S.Header>
                <S.SpaceY40 />
                <ErrorMessage>Erro ao tentar carregar lista: {error?.message}</ErrorMessage>
            </S.Container>
        );
    };

    const renderEmptyState = () => {
        if (!hasFetched) return null;

        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Campanha Geral</MainTitle>
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
                    <MainTitle>Campanha Geral</MainTitle>
                    <Button variant="primary" onClick={handleCreateCampaign}>
                        Criar campanha
                    </Button>
                </S.Header>

                <S.SpaceY40 />
                <DataListTable<CampaignRow>
                    title="Lista de campanhas"
                    hasSearchBar
                    searchPlaceholder="Pesquisar campanha"
                    isTableLoading={loadingCampaigns}
                    columns={columnsHead}
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

    if (error && !loadingCampaigns) {
        return renderErrorState();
    }

    if ((!campaigns || campaigns.length === 0) && !loadingCampaigns) {
        return renderEmptyState();
    }

    return renderTable();
};

export { GeneralCampaign };
