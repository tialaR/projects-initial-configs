
import { MainTitle } from "#components/MainTitle";
import { Breadcrumb } from "#components/Breadcrumb";
import { routesNames } from "#utils/routesNames";
import { ReactNode, useState } from "react";
import { Button } from "#components/Button";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import { ContactsAmount } from "#components/ContactsAmount";
import { normalizeTableData } from "#utils/tableDataUtils";
import { DataListTable } from "#components/DataListTable";
import { ConfigurateCampaignForm } from "#components/ConfigurateCapaign";
import * as S from "./styles";
import { StatusBadge, StatusBadgeProps } from "#components/StatusBadge";
import { EngineOption, SelectByEngine } from "#components/SelectByEngine";

const { EXHIBITOR_CAMPAIGN, CONFIGURE_CAMPAIGN } = routesNames;

type MockRowDataTuple = [string, ReactNode, ReactNode, ReactNode, ReactNode, ReactNode];
type MockRowDataType = {
    id: number;
    exhibitor: string;
    engineClass: StatusBadgeProps['status'];
    engineCluster: StatusBadgeProps['status'];
    engineBehaviour: StatusBadgeProps['status'];
};

const ConfigureCampaign: React.FC = () => {
    const { openContentSideMenu } = useContentSideMenu();
    const [selectedEngine, setSelectedEngine] = useState<EngineOption | null>(null);

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
            />
        );
    };

    // Dados Mock
    const mockRowData: MockRowDataType[] = [
        { id: 0, exhibitor: "Expositor 1", engineClass: "excellent", engineCluster: "regular", engineBehaviour: "good" },
    ];

    const formattedRowData = mockRowData.map(({ id, exhibitor, engineClass, engineCluster, engineBehaviour }) => ({
        id,
        exhibitor,
        engineClass: <StatusBadge status={engineClass} />,
        engineCluster: <StatusBadge status={engineCluster} />,
        engineBehaviour: <StatusBadge status={engineBehaviour} />,
        contactsAmount: (
            <Button
                variant="outline"
                onClick={() => onContactsAmountClick({
                    id,
                    exhibitor,
                    potentialContacts: new Intl.NumberFormat("pt-BR").format(2000 + id),
                })}
            >
                Conferir
            </Button>
        ),
        selectedEngine: (<SelectByEngine onSelect={(engine) => setSelectedEngine(engine)} />),
    }));

    const { normalizedRows } = normalizeTableData<MockRowDataTuple>(
        formattedRowData.map((item) => ({
            id: item.id,
            row: [
                item.exhibitor,
                item.engineClass,
                item.engineCluster,
                item.engineBehaviour,
                item.contactsAmount,
                item.selectedEngine,
            ],
        }))
    );

    const normalizedRowsDataList: MockRowDataTuple[] = normalizedRows.map((item) => item.row);

    const columnsHead = [
        { id: 0, item: <span>Expositor</span> },
        { id: 1, item: <span>{'Engine Class'}</span> },
        { id: 2, item: <span>{'Engine Cluster'}</span> },
        { id: 3, item: <span>{'Engine Behaviour'}</span> },
        { id: 4, item: <span>{'Quantidade de contatos'}</span> },
        { id: 5, item: <span>{'Selecionar Engine'}</span> },
    ];

    return (
        <div>
            <S.Header>

                <Breadcrumb
                    items={[
                        { label: "Campanha expoxitor", href: EXHIBITOR_CAMPAIGN },
                        { label: "Configurar Campanha", href: CONFIGURE_CAMPAIGN }
                    ]}
                />
                <MainTitle>Criar Campanha</MainTitle>
            </S.Header>

            <S.Section>
                <S.Title>Detalhes da Campanha</S.Title>
                <S.SpaceY32 />
                <S.GridContainer>
                    <S.InfoBox>
                        <span>Campanha:</span>
                        <p>Campanha Play</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Expositor:</span>
                        <p>Expositor Marca</p>
                        <p>Alpha</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Template:</span>
                        <p>Template-campanha-feira-play-24</p>
                    </S.InfoBox>
                </S.GridContainer>
                <S.SpaceY32 />
                <S.GridContainer>
                    <S.InfoBox>
                        <span>Telefone:</span>
                        <p>Nome Feira Play</p>
                        <p>(11) 98765-4321</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Quantidade de disparos:</span>
                        <p>1.300</p>
                        <p>por expositor</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Data e Hora:</span>
                        <p>17/01/2025</p>
                        <p>9:00h</p>
                    </S.InfoBox>
                </S.GridContainer>
            </S.Section >
            <S.SpaceY32 />

            <ConfigurateCampaignForm
                selectedEngine={selectedEngine}
                campaignName="Campanha Play"
            >
                <DataListTable<MockRowDataTuple>
                    title="Lista de Expositores"
                    columns={columnsHead}
                    columnWidths={["20%", "10%", "10%", "10%", "10%", "18%"]}
                    dataList={normalizedRowsDataList}
                />
                <S.SpaceY32 />
            </ConfigurateCampaignForm>
        </div >
    );
};

export { ConfigureCampaign };
