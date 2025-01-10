import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataListTable } from "#components/DataListTable";
import { normalizeTableData } from "#utils/tableDataUtils";
import { Button } from "#components/Button";
import { MainTitle } from "#components/MainTitle";
import { routesNames } from "#utils/routesNames";
import * as S from "./styles";
import { CampaignReport, useReportCampaigns } from "#services/reports/useReportCampaigns";
import { ErrorMessage } from "#styles/components";
import { getLocalSelectedEvent } from "#utils/localStorageItems";

type ReportAndResultRow = [string, string, string, React.ReactNode];

const { DETAIL_REPORTS_AND_RESULTS } = routesNames;

const ReportsAndResults: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 100;

    const {
        data: reportCampaigns,
        loading: loadingReportCampaigns,
        error,
        fetchReports
    } = useReportCampaigns();

    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;
    const [hasFetched, setHasFetched] = useState<boolean>(false);

    useEffect(() => {
        if (registeredEventId && !reportCampaigns && !hasFetched) {
            fetchReports(registeredEventId).finally(() => setHasFetched(true));
        }
    }, [registeredEventId, reportCampaigns, hasFetched]);

    const handleCheckReportAndResult = (reportCampaign: CampaignReport) => {
        navigate(DETAIL_REPORTS_AND_RESULTS, { state: { reportCampaign } });
    };

    const formattedRowData = reportCampaigns?.map((reportCampaign) => ({
        ...reportCampaign,
        accessReports: (
            <Button variant="outline" onClick={() => handleCheckReportAndResult(reportCampaign)}>
                Conferir
            </Button>
        ),
    }));

    const { normalizedRows } = normalizeTableData<ReportAndResultRow>(
        (formattedRowData ?? []).map((item) => ({
            id: item.campaign_id,
            row: [
                item.campaign_name,
                item.campaign_date,
                item.campaign_exhibitors.toString(),
                item.accessReports,
            ]
        }))
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData: ReportAndResultRow[] = normalizedRows
        ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        ?.map((item) => item.row);

    const columnsHead = [
        { id: 0, item: <span>Campanha</span> },
        { id: 1, item: <span>Data de início</span> },
        { id: 2, item: <span>Quantidade Expositores</span> },
        { id: 3, item: <span>Ações</span> },
    ];

    const renderError = () => {
        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Relatórios e resultados</MainTitle>
                </S.Header>
                <S.SpaceY40 />
                <ErrorMessage>Erro ao buscar relatórios de campanhas: {error?.message}</ErrorMessage>
            </S.Container>
        )
    };

    const renderEmptyState = () => {
        if (!hasFetched) return null;

        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Relatórios e resultados</MainTitle>
                </S.Header>
                <S.SpaceY40 />
                <p>Nenhum relatório encontrado.</p>
            </S.Container>
        )
    };

    const renderTable = () => {
        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Relatórios e resultados</MainTitle>
                </S.Header>
                <S.SpaceY40 />
                <DataListTable<ReportAndResultRow>
                    title="Lista de campanhas"
                    hasSearchBar
                    searchPlaceholder="Pesquisar campanha"
                    isTableLoading={loadingReportCampaigns}
                    columns={columnsHead}
                    columnWidths={["40%", "20%", "20%", "20%"]}
                    dataList={paginatedData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalRows={normalizedRows.length}
                    handlePageChange={handlePageChange}
                />
            </S.Container>
        );
    };

    if (error && !loadingReportCampaigns) {
        return renderError();
    }

    if ((!reportCampaigns || reportCampaigns.length === 0) && !loadingReportCampaigns) {
        return renderEmptyState();
    }

    return renderTable();
};

export { ReportsAndResults };
