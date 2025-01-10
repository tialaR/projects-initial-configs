import { MainTitle } from "#components/MainTitle";
import { CreateCampaignForm } from "#components/CreateCampaignForm";
import { Breadcrumb } from "#components/Breadcrumb";
import { routesNames } from "#utils/routesNames";
import { DataListItem, DataSearchSelectListTable } from "#components/DataSearchSelectListTable";
import { useState, useEffect } from "react";
import { useFecthExhibitors } from "#services/exhibitors/useFecthExhibitors";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import * as S from "./styles";

const { GENERAL_CAMPAIGN, CREATE_CAMPAIGN } = routesNames;

const CreateCampaigns: React.FC = () => {
    const [selectedExhibitors, setSelectedExhibitors] = useState<DataListItem[]>([]);
    const { data: exhibitors, loading, error, fetchExhibitors } = useFecthExhibitors();

    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;

    useEffect(() => {
        if (registeredEventId) {
            fetchExhibitors(registeredEventId);
        }
    }, [registeredEventId]);

    const exhibitorsList = exhibitors?.map((exhibitor) => ({
        id: exhibitor.exhibitor_id,
        label: exhibitor.exhibitor_name,
    })) || [];

    const handleSelectedOptions = (selectedItems: DataListItem[]) => {
        setSelectedExhibitors(selectedItems);
    };

    return (
        <div>
            <S.Header>
                <Breadcrumb
                    items={[
                        { label: "Campanha geral", href: GENERAL_CAMPAIGN },
                        { label: "Criar campanha", href: CREATE_CAMPAIGN },
                    ]}
                />
                <MainTitle>Criar Campanha</MainTitle>
            </S.Header>

            <CreateCampaignForm selectedExhibitors={selectedExhibitors}>
                <S.SpaceY32 />
                <DataSearchSelectListTable
                    title="Lista de Expositores"
                    columns={[{ id: 1, item: "Expositor" }]}
                    dataList={exhibitorsList}
                    currentPage={1}
                    itemsPerPage={10}
                    totalRows={exhibitorsList.length}
                    searchPlaceholder="Pesquisar expositor"
                    columnWidths={["100%"]}
                    onSelectionChange={handleSelectedOptions}
                    loading={loading}
                    error={error}
                />
            </CreateCampaignForm>
        </div>
    );
};

export { CreateCampaigns };
