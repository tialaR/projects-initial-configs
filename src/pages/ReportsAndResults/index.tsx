import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataListTable } from "#components/DataListTable";
import { normalizeTableData } from "#utils/tableDataUtils";
import { Button } from "#components/Button";
import { MainTitle } from "#components/MainTitle";
import { routesNames } from "#utils/routesNames";
import * as S from "./styles";
import { useReportCampaigns } from "#services/reports/useReportCampaigns";
import { ErrorMessage } from "#styles/components";
import { getLocalSelectedEvent } from "#utils/localStorageItems";

type ReportAndResultRow = [string, string, string, React.ReactNode];

const { CAMPAIGN_PLAY } = routesNames;

const ReportsAndResults: React.FC = () => {
    const navigate = useNavigate();
    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;

    const { data: reportCampaigns, isLoading, error, fetchReports } = useReportCampaigns();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 100;

    useEffect(() => {
        if (registeredEventId) {
            fetchReports(registeredEventId);
        }
    }, [registeredEventId]);

    const handleCheckReportAndResult = (id: string) => {
        navigate(CAMPAIGN_PLAY, { state: { id } });
    };

    const formattedRowData = reportCampaigns.map((report) => ({
        ...report,
        accessReports: (
            <Button variant="outline" onClick={() => handleCheckReportAndResult(report.campaign_id)}>
                Conferir
            </Button>
        ),
    }));

    const { normalizedRows } = normalizeTableData<ReportAndResultRow>(
        formattedRowData.map((item) => ({
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
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => item.row);

    const columnsHead = [
        { id: 0, item: <span>Campanha</span> },
        { id: 1, item: <span>Data de início</span> },
        { id: 2, item: <span>Quantidade Expositores</span> },
        { id: 3, item: <span>Ações</span> },
    ];

    return (
        <S.Container>
            <S.Header>
                <MainTitle>Relatórios e resultados</MainTitle>
            </S.Header>
            <S.SpaceY40 />

            {isLoading && <p>Carregando relatórios...</p>}
            {error && <ErrorMessage>Erro ao buscar relatórios de campanhas.</ErrorMessage>}

            {!isLoading && !error && (
                <DataListTable<ReportAndResultRow>
                    title="Lista de campanhas"
                    hasSearchBar
                    searchPlaceholder="Pesquisar campanha"
                    columns={columnsHead}
                    columnWidths={["40%", "20%", "20%", "20%"]}
                    dataList={paginatedData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalRows={normalizedRows.length}
                    handlePageChange={handlePageChange}
                />
            )}
        </S.Container>
    );
};

export { ReportsAndResults };
