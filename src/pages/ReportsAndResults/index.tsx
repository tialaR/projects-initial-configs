import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataListTable } from "#components/DataListTable";
import { normalizeTableData } from "#utils/tableDataUtils";
import { Button } from "#components/Button";
import { MainTitle } from "#components/MainTitle";
import { routesNames } from "#utils/routesNames";
import * as S from "./styles";

type ReportAndResultRow = [string, string, string, ReactNode];

type ReportAndResult = {
    id: string | number;
    campaignName: string;
    startDate: string;
    exhibitorAmount: string;
};

const { CAMPAIGN_PLAY } = routesNames;

const ReportsAndResults: React.FC = () => {
    const navigate = useNavigate();
    //const location = useLocation();

    //const selectedEvent = location.state?.selectedEvent as EventOption | undefined;
    //console.log(selectedEvent);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 3;

    // Datas Mock
    const mockReportAndResults: ReportAndResult[] = [
        {
            id: 1,
            campaignName: "Black Friday 2025",
            startDate: "2025-11-28",
            exhibitorAmount: "15",
        },
        {
            id: 2,
            campaignName: "Summer Sale",
            startDate: "2025-06-15",
            exhibitorAmount: "10",
        },
        {
            id: 3,
            campaignName: "Christmas Giveaway",
            startDate: "2025-12-20",
            exhibitorAmount: "20",
        },
        {
            id: 4,
            campaignName: "Back to School",
            startDate: "2025-01-10",
            exhibitorAmount: "8",
        },
        {
            id: 5,
            campaignName: "Consumer Week",
            startDate: "2025-03-01",
            exhibitorAmount: "12",
        },
    ];
    // const mockReportAndResults = [];

    const handleCheckReportAndResult = (id: number | string) => {
        navigate(CAMPAIGN_PLAY, { state: { id } });
    };

    const formattedRowData = mockReportAndResults.map((reportAndResult) => ({
        ...reportAndResult,
        accessReports: (
            <Button variant="outline" onClick={() => handleCheckReportAndResult(reportAndResult.id)}>
                Conferir
            </Button>
        ),
    }));

    const { normalizedRows } = normalizeTableData<ReportAndResultRow>(
        formattedRowData.map((item) => ({
            id: item.id,
            row: [
                item.campaignName,
                item.startDate,
                item.exhibitorAmount,
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
        { id: 2, item: <span>Quantidade Expositor</span> },
        { id: 3, item: <span>Quantidade Expositor</span> },
    ];

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

export { ReportsAndResults };
