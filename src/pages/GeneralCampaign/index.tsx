import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataListTable } from "#components/DataListTable";
import { normalizeTableData } from "#utils/tableDataUtils";
import { Button } from "#components/Button";
import { MainTitle } from "#components/MainTitle";
import { EmptyCampaignList } from "#components/EmptyCampaignList";
import { routesNames } from "#utils/routesNames";
import * as S from "./styles";

type CampaignRow = [string, string, string, number, ReactNode];

type Campaign = {
    id: string | number;
    name: string;
    template: string;
    dateAndHour: string;
    quantityExhibitor: number;
};

const { CREATE_CAMPAIGN } = routesNames;

const GeneralCampaign: React.FC = () => {
    const navigate = useNavigate();
    //const location = useLocation();

    //const selectedEvent = location.state?.selectedEvent as EventOption | undefined;
    //console.log(selectedEvent);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 3;

    // Datas Mock
    const mockCampaigns: Campaign[] = [
        { id: "1", name: "Lançamento de Produto A", template: "Template Alpha", dateAndHour: "20/02/2025 - 14:30h", quantityExhibitor: 8 },
        { id: "2", name: "Promoção Especial B", template: "Template Beta", dateAndHour: "05/03/2025 - 16:00h", quantityExhibitor: 10 },
        { id: "3", name: "Campanha de Natal", template: "Template Gamma", dateAndHour: "24/12/2024 - 18:00h", quantityExhibitor: 12 },
        { id: "4", name: "Black Friday 2025", template: "Template Delta", dateAndHour: "29/11/2025 - 08:00h", quantityExhibitor: 15 },
        { id: "5", name: "Páscoa 2025", template: "Template Epsilon", dateAndHour: "10/04/2025 - 09:30h", quantityExhibitor: 7 },
        { id: "6", name: "Semana do Cliente", template: "Template Zeta", dateAndHour: "15/09/2025 - 11:45h", quantityExhibitor: 5 },
        { id: "7", name: "Queima de Estoque", template: "Template Theta", dateAndHour: "03/07/2025 - 13:20h", quantityExhibitor: 6 },
        { id: "8", name: "Aniversário da Loja", template: "Template Iota", dateAndHour: "22/06/2025 - 17:10h", quantityExhibitor: 9 },
        { id: "9", name: "Dia das Mães", template: "Template Kappa", dateAndHour: "12/05/2025 - 15:50h", quantityExhibitor: 11 },
        { id: "10", name: "Verão com Descontos", template: "Template Lambda", dateAndHour: "01/12/2025 - 10:00h", quantityExhibitor: 4 }
    ];
    // const mockCampaigns: Campaign[] = [];

    const formattedRowData = mockCampaigns.map((campaign) => ({
        ...campaign,
        editCampaignTemplate: (
            <Button variant="outline" onClick={() => { }}>
                Configurar
            </Button>
        ),
    }));

    const { normalizedRows } = normalizeTableData<CampaignRow>(
        formattedRowData.map((item) => ({
            id: item.id,
            row: [
                item.name,
                item.template,
                item.dateAndHour,
                item.quantityExhibitor,
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

    if (!mockCampaigns || mockCampaigns.length === 0) {
        return (
            <S.Container>
                <S.Header>
                    <MainTitle>Campanha Geral</MainTitle>
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

export { GeneralCampaign };
