import { MainTitle } from "#components/MainTitle";
import { CreateCampaignForm } from "#components/CreateCampaignForm";
import { Breadcrumb } from "#components/Breadcrumb";
import { routesNames } from "#utils/routesNames";
import { DataListItem, DataSearchSelectListTable } from "#components/DataSearchSelectListTable";
import { useState } from "react";
import * as S from "./styles";

const { GENERAL_CAMPAIGN, CREATE_CAMPAIGN } = routesNames;

const mockExhibitors = [
    { id: 1, label: "Expositor 1" },
    { id: 2, label: "Marca Alpha" },
    { id: 3, label: "Stand XYZ" },
    { id: 4, label: "Expositor" },
    { id: 5, label: "Marca Alpha" },
    { id: 6, label: "Stand XYZ" },
    { id: 7, label: "Expositor 3" },
    { id: 8, label: "Marca Alpha 3" },
    { id: 9, label: "Stand XYZ 3" },
    { id: 10, label: "Expositor 4" },
    { id: 11, label: "Marca Alpha 4" },
];

const CreateCampaigns: React.FC = () => {
    const [selectedExhibitors, setSelectedExhibitors] = useState<DataListItem[]>([]);

    const handleSelectedOptions = (selectedItems: DataListItem[]) => {
        setSelectedExhibitors(selectedItems);
    };

    return (
        <div>
            <S.Header>
                <Breadcrumb
                    items={[
                        { label: "Campanha geral", href: GENERAL_CAMPAIGN },
                        { label: "Criar campanha", href: CREATE_CAMPAIGN }
                    ]}
                />
                <MainTitle>Criar Campanha</MainTitle>
            </S.Header>

            <CreateCampaignForm selectedExhibitors={selectedExhibitors}>
                <S.SpaceY32 />
                <DataSearchSelectListTable
                    title="Lista de Expositores"
                    columns={[
                        { id: 1, item: 'Expositor' },
                    ]}
                    dataList={mockExhibitors}
                    currentPage={1}
                    itemsPerPage={10}
                    totalRows={mockExhibitors.length}
                    searchPlaceholder="Pesquisar expositor"
                    columnWidths={['100%']}
                    onSelectionChange={handleSelectedOptions}
                    handlePageChange={(page: number) => {
                        console.log("Mudou a página para:", page);
                    }}
                    onSearchEvent={(searchedElement: string) => {
                        console.log("Pesquisou por:", searchedElement);
                    }}
                />
            </CreateCampaignForm>
        </div>
    );
};

export { CreateCampaigns };
