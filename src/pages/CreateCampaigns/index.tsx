import { ReactNode, useState } from "react";
import { DataListTable } from "#components/DataListTable";
import { normalizeTableData } from "#utils/tableDataUtils";
import { Checkbox } from "#components/Checkbox";
import { Button } from "#components/Button";
import { MainTitle } from "#components/MainTitle";
import { CreateCampaignForm } from "#components/CreateCampaignForm";
import { Select } from "#components/Select";
import * as S from "./styles";
import { ContactsAmount } from "#components/ContactsAmount";
import { useContentSideMenu } from "#hooks/useContentSideMenu";

type RowData = any;

type SelectedItems = Record<number, boolean>;

//Data Mock Type
type StatusType = "excellent" | "regular" | "bad" | "good";
const statusLabels: Record<StatusType, string> = {
    excellent: "Excelente",
    good: "Bom",
    regular: "Regular",
    bad: "Ruim",
};
type MockRowDataType = {
    id: number;
    exhibitor: string;
    engineClass: StatusType;
    engineCluster: StatusType;
    engineBehaviour: StatusType;
};

const CreateCampaigns: React.FC = () => {
    //const location = useLocation();
    const { openContentSideMenu } = useContentSideMenu();

    //const selectedEvent = location.state?.selectedEvent as EventOption | undefined;
    //console.log(selectedEvent);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
    const itemsPerPage = 3;

    const SelectByEngine = () => (
        <Select
            placeholder="Escolher Engine"
            selectOptionsList={['Engine 1', 'Engine 2', 'Engine 3']}
            onChange={(value) => console.log("Selecionado: ", value)}
        />
    )

    const onContactsAmountClick = ({
        id,
        exhibitor,
        potentialContacts
    }: {
        id: number,
        exhibitor: string,
        potentialContacts: number | string;
    }) => {
        console.log(`Clicked on ID: ${id} and exhibitor : ${exhibitor}`);
        openContentSideMenu(
            <ContactsAmount
                exhibitor={exhibitor}
                potentialContacts={potentialContacts}
            />);
    };

    // Datas Mock
    const mockRowData: MockRowDataType[] = [
        { id: 0, exhibitor: "Expositor 1", engineClass: "excellent", engineCluster: "bad", engineBehaviour: "bad" },
        { id: 1, exhibitor: "Marca Alpha", engineClass: "excellent", engineCluster: "good", engineBehaviour: "bad" },
        { id: 2, exhibitor: "Stand XYZ", engineClass: "good", engineCluster: "regular", engineBehaviour: "regular" },
        { id: 3, exhibitor: "Expositor", engineClass: "regular", engineCluster: "excellent", engineBehaviour: "excellent" },
        { id: 4, exhibitor: "Marca Alpha", engineClass: "bad", engineCluster: "excellent", engineBehaviour: "excellent" },
        { id: 5, exhibitor: "Stand XYZ", engineClass: "regular", engineCluster: "bad", engineBehaviour: "good" },
        { id: 6, exhibitor: "Expositor 3", engineClass: "bad", engineCluster: "bad", engineBehaviour: "bad" },
        { id: 7, exhibitor: "Marca Alpha 3", engineClass: "excellent", engineCluster: "regular", engineBehaviour: "regular" },
        { id: 8, exhibitor: "Stand XYZ 3", engineClass: "good", engineCluster: "good", engineBehaviour: "bad" },
        { id: 9, exhibitor: "Expositor 4", engineClass: "bad", engineCluster: "good", engineBehaviour: "bad" },
        { id: 10, exhibitor: "Marca Alpha 4", engineClass: "regular", engineCluster: "regular", engineBehaviour: "excellent" },
    ];

    const formattedRowData = mockRowData.map(({ id, exhibitor, engineClass, engineCluster, engineBehaviour }) => ({
        id,
        exhibitor,
        engineClass: <S.StatusBadge status={engineClass}>{statusLabels[engineClass]}</S.StatusBadge>,
        engineCluster: <S.StatusBadge status={engineCluster}>{statusLabels[engineCluster]}</S.StatusBadge>,
        engineBehaviour: <S.StatusBadge status={engineBehaviour}>{statusLabels[engineBehaviour]}</S.StatusBadge>,
        contactsAmount: (
            <Button variant="outline" onClick={() => onContactsAmountClick({
                id,
                exhibitor,
                potentialContacts: new Intl.NumberFormat("pt-BR").format(2000 + id),

            })}>
                Conferir
            </Button>
        ),
        selectedEngine: <SelectByEngine />,
    }));

    const { normalizedRows } = normalizeTableData(
        formattedRowData.map((item) => ({
            id: item.id,
            row: [
                <Checkbox
                    isCheckboxChecked={!!selectedItems[item.id]}
                    onCheckboxChange={() => handleCheckboxChange(item.id)}
                    label={item.exhibitor}
                />,
                item.engineClass,
                item.engineCluster,
                item.engineBehaviour,
                item.contactsAmount,
                item.selectedEngine,
            ],
        }))
    );

    const handleSelectAllCheckboxes = (pageItems: RowData[], isSelected: boolean) => {
        setSelectedItems((prev) => {
            const updatedSelection = { ...prev };
            pageItems.forEach((item) => {
                updatedSelection[item.id] = isSelected;
            });
            return updatedSelection;
        });
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const isAllSelectedOnPage = normalizedRows
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .every((item) => selectedItems[item.id] || false);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData: ReactNode[][] = normalizedRows
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => item.row);

    const columnsHead = [
        {
            id: 0,
            item: (
                <Checkbox
                    isCheckboxChecked={isAllSelectedOnPage}
                    onCheckboxChange={() => handleSelectAllCheckboxes(paginatedData, !isAllSelectedOnPage)}
                    label='Expositor'
                />
            ),
        },
        { id: 1, item: <span style={{ display: 'flex' }}>{'Engine'}<br />{'Class'}</span> },
        { id: 2, item: <span style={{ display: 'flex' }}>{'Engine'}<br />{'Cluster'}</span> },
        { id: 3, item: <span style={{ display: 'flex' }}>{'Engine'}<br />{'Behaviour'}</span> },
        { id: 4, item: <span style={{ display: 'flex' }}>{'Quantidade'}<br />{'de contatos'}</span> },
        { id: 5, item: <span>Selecionar Engine</span> },
    ];

    return (
        <div>
            <S.Header>
                <MainTitle>Criar Campanha</MainTitle>
            </S.Header>

            <CreateCampaignForm>
                <S.SpaceY32 />
                <DataListTable
                    title="Lista de Expositores"
                    hasSearchBar
                    searchPlaceholder="Pesquisar por Expositor"
                    columns={columnsHead}
                    columnWidths={["22%", "10%", "10%", "10%", "10%", "14%"]}
                    dataList={paginatedData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalRows={normalizedRows.length}
                    handlePageChange={handlePageChange}
                />
                <S.Footer>
                    <Button variant="primary" type="submit">
                        Criar campanha
                    </Button>
                </S.Footer>
            </CreateCampaignForm>
            {/* <button
                    onClick={() => openCenterModal(
                        <div style={{ padding: '2rem' }}>
                            <span style={{ display: 'block', color: '#616161', marginTop: '2rem' }}>
                                O conteúdo desse modal age de forma dinâmica. Ele pode ser
                                reutilizado para todas as telas que necessitarem do mesmo.
                                Suportanquando qualquer componente dentro dele.
                            </span>
                        </div>
                    )}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#eeeeee',
                        e.currentTarget.style.color = '#616161')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#616161',
                        e.currentTarget.style.color = '#eeeeee'
                    )}
                >
                    Open CenterModal
                </button> */}
        </div>
    );
};

export { CreateCampaigns };
