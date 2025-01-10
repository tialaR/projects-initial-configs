import { useMemo } from "react";
import { MainTitle } from "#components/MainTitle";
import { Breadcrumb } from "#components/Breadcrumb";
import { routesNames } from "#utils/routesNames";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "#components/Button";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import { normalizeTableData } from "#utils/tableDataUtils";
import { DataListTable } from "#components/DataListTable";
import { ConfigurateCampaignForm } from "#components/ConfigurateCapaign";
import { StatusBadge } from "#components/StatusBadge";
import { ClassificationEngine, DefaultEngine, MlEngine, SelectByEngine } from "#components/SelectByEngine";
import * as S from "./styles";
import { useLocation } from "react-router-dom";
import { useCampaignDetails } from "#services/campaign/useCampaignDetails";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { ContactsAmount } from "#components/ContactsAmount";
import { SkeletonBox } from "#components/SkeletonBox";
import { EngineOption } from "#utils/formatEngineValueToLabel";

const { EXHIBITOR_CAMPAIGN, CONFIGURE_CAMPAIGN } = routesNames;

type RowDataTuple = [string | undefined, ReactNode, ReactNode, ReactNode, ReactNode, ReactNode];

export type CampaignData = {
    exhibitorId?: string;
    campaignContentId?: string;
    campaignName?: string;
    campaignDate?: string;
    campaignTime?: string;
    campaignClassification?: string;
    campaignClustering?: string;
    exhibitorContactName?: string | null;
    exhibitorContactNumber?: string | null;
    exhibitorDescription?: string | null;
    exhibitorFile?: File | null;
    exhibitorName?: string;
    leadsReached?: number;
    phoneName?: string;
    phoneNumber?: string;
    phoneContactNumber?: string;
    leadsterMlEngine?: string;
    recommendation?: string;
    classification?: string;
    clustering?: string;
    templateId?: string;
    templateName?: string;
};

const ConfigureCampaign: React.FC = () => {
    const { openContentSideMenu } = useContentSideMenu();
    const location = useLocation();
    const campaignContentId = location.state?.campaignContentId;
    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;
    const {
        data: campaignDetails,
        fetchCampaignDetails,
        loading: loadingCampaignDetails,
        error: errorCampaignDetails,
    } = useCampaignDetails();
    const campaignDetailsAux = campaignDetails?.[0];

    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [selectedEngine, setSelectedEngine] = useState<EngineOption | null>(null);

    const campaignData = useMemo(() => ({
        campaignContentId,
        exhibitorId: campaignDetailsAux?.exhibitor_id,
        campaignName: campaignDetailsAux?.campaign_name,
        campaignDate: campaignDetailsAux?.campaign_date,
        campaignTime: campaignDetailsAux?.campaign_time,
        campaignClassification: campaignDetailsAux?.classification,
        campaignClustering: campaignDetailsAux?.clustering,
        exhibitorContactName: campaignDetailsAux?.exhibitor_contact_name,
        exhibitorContactNumber: campaignDetailsAux?.exhibitor_contact_number,
        exhibitorDescription: campaignDetailsAux?.exhibitor_description,
        exhibitorFile: campaignDetailsAux?.exhibitor_file,
        exhibitorName: campaignDetailsAux?.exhibitor_name,
        leadsReached: campaignDetailsAux?.leads_reached,
        leadsterMlEngine: campaignDetailsAux?.leadster_ml_engine,
        phoneName: campaignDetailsAux?.phone_name,
        phoneNumber: campaignDetailsAux?.phone_number,
        phoneContactNumber: campaignDetailsAux?.phone_contact_number,
        recommendation: campaignDetailsAux?.recommendation,
        classification: campaignDetailsAux?.classification,
        clustering: campaignDetailsAux?.clustering,
        templateId: campaignDetailsAux?.template_id,
        templateName: campaignDetailsAux?.template_name
    }), [campaignDetailsAux, campaignContentId]);

    useEffect(() => {
        if (campaignContentId && registeredEventId && !hasFetched) {
            fetchCampaignDetails(registeredEventId, campaignContentId).finally(() => setHasFetched(true));
        }
    }, [campaignContentId, registeredEventId, hasFetched]);

    // TBD -> Show this component in next version?
    const onContactsAmountClick = ({
        id,
        exhibitor,
        potentialContacts
    }: {
        id: number,
        exhibitor: string | undefined,
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

    const formattedRowData = [
        {
            id: campaignContentId,
            exhibitor: campaignData.exhibitorName,
            engineClass: <StatusBadge label={campaignData.classification as ClassificationEngine} />,
            engineCluster: <StatusBadge label={campaignData.clustering as DefaultEngine} />,
            engineBehaviour: <StatusBadge label={campaignData.recommendation as DefaultEngine} />,
            contactsAmount: (
                <Button
                    variant="outline"
                    disabled //TBD -> Disable button and drawer metrics mnodal when this metrics is not defined on API
                    onClick={() => onContactsAmountClick({
                        id: campaignContentId,
                        exhibitor: campaignData.exhibitorName,
                        potentialContacts: new Intl.NumberFormat("pt-BR").format(2000 + campaignContentId),
                    })}
                >
                    Conferir
                </Button>
            ),
            selectedEngine: (
                <SelectByEngine
                    engineData={{
                        classification: campaignData.classification as ClassificationEngine,
                        clustering: campaignData.clustering as DefaultEngine,
                        recommendation: campaignData.recommendation as DefaultEngine,
                        leadsterMlEngine: campaignData.leadsterMlEngine as MlEngine,
                    }}
                    onSelect={setSelectedEngine}
                    loading={loadingCampaignDetails}
                />
            ),
        }
    ];

    const { normalizedRows } = normalizeTableData<RowDataTuple>(
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

    const normalizedRowsList: RowDataTuple[] = normalizedRows.map((item) => item.row);

    const columnsHead = [
        { id: 0, item: <span>Expositor</span> },
        { id: 1, item: <span>{'Engine Class'}</span> },
        { id: 2, item: <span>{'Engine Cluster'}</span> },
        { id: 3, item: <span>{'Engine Behaviour'}</span> },
        { id: 4, item: <span>{'Quantidade de contatos'}</span> },
        { id: 5, item: <span>{'Selecionar Engine'}</span> },
    ];

    const renderTable = () => (
        <DataListTable<RowDataTuple>
            title="Lista de Expositores"
            isTableLoading={loadingCampaignDetails}
            skeletonRowsAmount={1}
            columns={columnsHead}
            columnWidths={["20%", "10%", "10%", "10%", "10%", "18%"]}
            dataList={normalizedRowsList}
        />
    )

    return (
        <div>
            <S.Header>
                <Breadcrumb
                    items={[
                        { label: "Campanha expoxitor", href: EXHIBITOR_CAMPAIGN },
                        { label: "Configurar Campanha", href: CONFIGURE_CAMPAIGN }
                    ]}
                />
                <MainTitle>Configurar Campanha</MainTitle>
            </S.Header>

            <S.Section>
                <S.Title>Detalhes da Campanha</S.Title>
                <S.SpaceY32 />

                <S.GridContainer>
                    <S.InfoBox>
                        <span>Campanha:</span>
                        <p>{loadingCampaignDetails ? <SkeletonBox /> : campaignData.campaignName}</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Expositor:</span>
                        <p>{loadingCampaignDetails ? <SkeletonBox /> : campaignData.exhibitorName}</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Template:</span>
                        <p>{loadingCampaignDetails ? <SkeletonBox /> : campaignData.templateName}</p>
                    </S.InfoBox>
                </S.GridContainer>

                <S.SpaceY32 />
                <S.GridContainer>
                    <S.InfoBox>
                        <span>Telefone:</span>
                        <p>{loadingCampaignDetails ? <SkeletonBox /> : campaignData.phoneName}</p>
                        <p>{loadingCampaignDetails ? <></> : campaignData.phoneNumber}</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Quantidade de disparos:</span>
                        <p>{loadingCampaignDetails ? <SkeletonBox /> : campaignData.leadsReached}</p>
                        <p>{loadingCampaignDetails ? <></> : 'por expositor'}</p>
                    </S.InfoBox>
                    <S.InfoBox>
                        <span>Data e Hora:</span>
                        <p>{loadingCampaignDetails ? <SkeletonBox /> : campaignData.campaignDate}</p>
                        <p>{loadingCampaignDetails ? <></> : `${campaignData.campaignTime}h`}</p>
                    </S.InfoBox>
                </S.GridContainer>
            </S.Section >

            <S.SpaceY32 />
            <ConfigurateCampaignForm
                selectedEngine={selectedEngine}
                loadingCampaignData={loadingCampaignDetails}
                campaignData={campaignData}
            >
                {!errorCampaignDetails && renderTable()}
                <S.SpaceY32 />
            </ConfigurateCampaignForm>
        </div>
    );
};

export { ConfigureCampaign };
