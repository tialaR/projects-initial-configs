
import { MainTitle } from "#components/MainTitle";
import { Breadcrumb } from "#components/Breadcrumb";
import { routesNames } from "#utils/routesNames";
import { ReactNode, useState } from "react";
import { Button } from "#components/Button";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import { normalizeTableData } from "#utils/tableDataUtils";
import { DataListTable } from "#components/DataListTable";
import * as S from "./styles";
import { ProgressBar } from "#components/ProgressBar";
import { defaultTheme } from "#styles/themes/default";
import { formatPercentage } from "#utils/formatPercentage";
import { FullReportSummary } from "#components/FullReportSummary";

const { REPORTS_AND_RESULTS, CAMPAIGN_PLAY } = routesNames;

type MockRowDataTuple = [string, ReactNode, number, ReactNode, number, ReactNode, ReactNode];
type InteractionReport = {
    id: number | string;
    exhibitor: string;
    interactionPercentage: string;
    totalInteractions: number;
    deliveryPercentage: string;
    totalDeliveries: number;
};

export const mockInteractionReports: InteractionReport[] = [
    {
        id: 1,
        exhibitor: "Tech Store",
        interactionPercentage: "45",
        totalInteractions: 1200,
        deliveryPercentage: "90%",
        totalDeliveries: 5000,
    },
    {
        id: 2,
        exhibitor: "Super Eletro",
        interactionPercentage: "30",
        totalInteractions: 800,
        deliveryPercentage: "85%",
        totalDeliveries: 4000,
    },
    {
        id: 3,
        exhibitor: "Mega Shopping",
        interactionPercentage: "55",
        totalInteractions: 1500,
        deliveryPercentage: "95%",
        totalDeliveries: 6000,
    },
    {
        id: 4,
        exhibitor: "Online Stationery",
        interactionPercentage: "20",
        totalInteractions: 500,
        deliveryPercentage: "80%",
        totalDeliveries: 2500,
    },
    {
        id: 5,
        exhibitor: "Loja XYZ",
        interactionPercentage: "60",
        totalInteractions: 1800,
        deliveryPercentage: "92%",
        totalDeliveries: 7000,
    },
];

const CampaignPlay: React.FC = () => {
    const { openContentSideMenu } = useContentSideMenu();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 100;

    const handleOpenFullReport = ({ interactionReport }: { interactionReport: InteractionReport }) => {
        console.log("Abrir relatório completo " + interactionReport.id);
        openContentSideMenu(
            <FullReportSummary />
        );
    };

    const formattedRowData = mockInteractionReports.map((interactionReport) => ({
        ...interactionReport,
        interactionPercentage: (
            <S.ProgressBarWrapper>
                <span>{formatPercentage(interactionReport.interactionPercentage)}</span>
                <ProgressBar
                    width="4.375rem"
                    color={defaultTheme.colors.primary.purple100}
                    percentage={formatPercentage(interactionReport.interactionPercentage)}
                />
            </S.ProgressBarWrapper>
        ),
        deliveryPercentage: (
            <S.ProgressBarWrapper>
                <span>{formatPercentage(interactionReport.deliveryPercentage)}</span>
                <ProgressBar
                    width="4.375rem"
                    color={defaultTheme.colors.primary.purple100}
                    percentage={formatPercentage(interactionReport.deliveryPercentage)}
                />
            </S.ProgressBarWrapper>
        ),
        fullReport: (
            <Button
                variant="outline"
                onClick={() => handleOpenFullReport({ interactionReport })}
            >
                Conferir
            </Button>
        ),
        contactsArchive: (
            <Button
                variant="outline"
                onClick={() => console.log(`Clicked on ID: ${interactionReport.id}`)}
            >
                Baixar Leads
            </Button>
        ),
    }));

    const { normalizedRows } = normalizeTableData<MockRowDataTuple>(
        formattedRowData.map((item) => ({
            id: item.id,
            row: [
                item.exhibitor,
                item.interactionPercentage,
                item.totalInteractions,
                item.deliveryPercentage,
                item.totalDeliveries,
                item.fullReport,
                item.contactsArchive
            ],
        }))
    );

    const columnsHead = [
        { id: 0, item: <span>Expositor</span> },
        { id: 1, item: <span>% de< br />interação</span> },
        { id: 2, item: <span>Qtd. tota< br />de interação</span> },
        { id: 3, item: <span>% de< br />entrega</span> },
        { id: 4, item: <span>Qtd. total< br />de entrega</span> },
        { id: 5, item: <span>Relatório< br />completo</span> },
        { id: 6, item: <span>Arquivo< br />dos contatos</span> },
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData: MockRowDataTuple[] = normalizedRows
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => item.row);

    return (
        <div>
            <S.Header>

                <Breadcrumb
                    items={[
                        { label: "Relatórios e resultados", href: REPORTS_AND_RESULTS },
                        { label: "Campanha Play", href: CAMPAIGN_PLAY }
                    ]}
                />
                <MainTitle>Campanha Play</MainTitle>
            </S.Header>

            <S.Section>
                <S.Title>Detalhes da Campanha</S.Title>
                <S.SpaceY32 />
                <S.GridContainer>
                    <S.InfoBox>
                        <span>Telefone</span>
                        <p>Nome Feira Play<br />(11) 98765-4321</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Template</span>
                        <p>Template-campanha-feira-play-24</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Data e hora</span>
                        <p>17/01/2025< br />9:00h</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Quantidade de disparos</span>
                        <p>1.300< br />por expositor</p>
                    </S.InfoBox>
                </S.GridContainer>
            </S.Section >
            <S.SpaceY32 />

            <DataListTable<MockRowDataTuple>
                title="Lista de expositores na campanha"
                columns={columnsHead}
                columnWidths={["24%", "12%", "12%", "12%", "12%", "14%", "14%"]}
                hasSearchBar
                searchPlaceholder="Pesquisar expositor"
                dataList={paginatedData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalRows={normalizedRows.length}
                handlePageChange={handlePageChange}
            />
        </div >
    );
};

export { CampaignPlay };
