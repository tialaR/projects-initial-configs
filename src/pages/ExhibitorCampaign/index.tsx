import { ReactNode, useState } from "react";
import { DataListTable } from "#components/DataListTable";
import { MainTitle } from "#components/MainTitle";
import * as S from "./styles";
import { Button } from "#components/Button";
import { normalizeTableData } from "#utils/tableDataUtils";
import { useNavigate } from "react-router-dom";
import { routesNames } from "#utils/routesNames";
import { StatusBadge } from "#components/StatusBadge";
import { EmptyCampaignList } from "#components/EmptyCampaignList";

type ExhibitorCampaignRow = [string, string, string, ReactNode, ReactNode];

export type CampaignStatus = "pendingActivation" | "scheduledShipping" | "canceled";
export type CampaignStatusLabel = "Pendente ativação" | "Envio programado" | "Cancelado";

const statusLabels: Record<CampaignStatus, CampaignStatusLabel> = {
    pendingActivation: "Pendente ativação",
    scheduledShipping: "Envio programado",
    canceled: "Cancelado",
};

type ExhibitorCampaign = {
    id: string | number;
    name: string;
    exhibitor: string;
    dateAndHour: string;
    campaigStatus: CampaignStatusLabel;
};

const {
    CONFIGURE_CAMPAIGN,
    CREATE_CAMPAIGN
} = routesNames

const reverseStatusLabels: Record<CampaignStatusLabel, CampaignStatus> = Object.fromEntries(
    Object.entries(statusLabels).map(([key, value]) => [value, key])
) as Record<CampaignStatusLabel, CampaignStatus>;

const mockExhibitorCampaigns: ExhibitorCampaign[] = [
    {
        id: 1,
        name: "Promoção de Verão",
        exhibitor: "Loja A",
        dateAndHour: "2025-03-01T10:00:00",
        campaigStatus: "Pendente ativação",
    },
    {
        id: 2,
        name: "Lançamento de Produto",
        exhibitor: "Loja B",
        dateAndHour: "2025-03-05T14:30:00",
        campaigStatus: "Envio programado",
    },
    {
        id: 3,
        name: "Desconto Relâmpago",
        exhibitor: "Loja C",
        dateAndHour: "2025-02-20T18:00:00",
        campaigStatus: "Cancelado",
    },
    {
        id: 4,
        name: "Black Friday",
        exhibitor: "Loja D",
        dateAndHour: "2025-11-29T00:00:00",
        campaigStatus: "Envio programado",
    },
    {
        id: 5,
        name: "Natal Premiado",
        exhibitor: "Loja E",
        dateAndHour: "2025-12-24T23:59:00",
        campaigStatus: "Pendente ativação",
    },
];
// const mockExhibitorCampaigns = [] as ExhibitorCampaign[];

const ExhibitorCampaign: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 3;

    const columnsHead = [
        { id: 0, item: <span>Campanha</span> },
        { id: 1, item: <span style={{ display: 'flex' }}>Expositor</span> },
        { id: 2, item: <span style={{ display: 'flex' }}>Data e Hora</span> },
        { id: 3, item: <span style={{ display: 'flex' }}>Status Campanha</span> },
        { id: 4, item: <span style={{ display: 'flex' }}>Editar</span> },
    ];


    const handleConfigureCampaign = () => {
        navigate(CONFIGURE_CAMPAIGN);
    };

    const formattedRowData = mockExhibitorCampaigns.map((exhibitorCampaign) => ({
        ...exhibitorCampaign,
        campaigStatus: (
            <StatusBadge
                status={reverseStatusLabels[exhibitorCampaign.campaigStatus]}
                label={exhibitorCampaign.campaigStatus} />
        ),
        editerExhibitorCampaign: (
            <Button variant="outline" onClick={handleConfigureCampaign}>
                Configurar
            </Button>
        ),
    }));

    const { normalizedRows } = normalizeTableData<ExhibitorCampaignRow>(
        formattedRowData.map((item) => ({
            id: item.id,
            row: [
                item.name,
                item.exhibitor,
                item.dateAndHour,
                item.campaigStatus,
                item.editerExhibitorCampaign,
            ],
        }))
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData: ExhibitorCampaignRow[] = normalizedRows
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => item.row);

    const handleCreateCampaign = () => {
        navigate(CREATE_CAMPAIGN);
    };

    if (!mockExhibitorCampaigns || mockExhibitorCampaigns.length === 0) {
        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Campanha Expositor</MainTitle>
                </S.Header>

                <S.SpaceY40 />
                <EmptyCampaignList
                    onCreateCampaign={handleCreateCampaign}
                />
            </S.Container>
        );
    }

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
                columnWidths={["28%", "18%", "18%", "18%", "18%"]}
                dataList={paginatedData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalRows={normalizedRows.length}
                handlePageChange={handlePageChange}
            />
        </S.Container>
    );
}

export { ExhibitorCampaign };