import { Button } from "#components/Button";
import { DataListItem } from "#components/DataSearchSelectListTable";
import { useRegisterCampaign } from "#services/campaign/useRegisterCampaign";
import { ErrorMessage } from "#styles/components";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import * as S from "./styles";

type CampaignSummaryProps = {
    data: {
        campaignName: string;
        template: any | null;
        phone: any | null;
        leadsAmount: string;
        date: string | null;
        time: string;
        selectedExhibitors: DataListItem[];
    };
    onCancel: () => void;
    onConfirm: () => void;
};

const CampaignSummary: React.FC<CampaignSummaryProps> = ({
    data: {
        campaignName,
        template,
        phone,
        leadsAmount,
        date,
        time,
        selectedExhibitors,
    },
    onCancel,
    onConfirm,
}) => {
    const { loading: loadingRegisterCampaign, error: errorRegisterCampaign, registerCampaign } = useRegisterCampaign();

    const campaignData = {
        campaign_name: campaignName,
        registered_event_id: getLocalSelectedEvent()?.registered_event_id as string,
        phone_id: phone.id || "",
        template_id: template?.value || "",
        exhibitors_list: selectedExhibitors.map((exhibitor) => ({
            exhibitor_id: exhibitor.id,
            exhibitor_name: exhibitor.name,
            exhibitor_description: exhibitor?.description || "",
        })),
        leads_reached: Number(leadsAmount) || 0,
        launch_date: date || "",
        launch_time: time || "",
    };

    return (
        <S.Container>
            <S.TitleContainer>
                <h5>Resumo da campanha</h5>
            </S.TitleContainer>

            <S.SummaryContainer>
                <S.SummaryItem>
                    <span>Nome da Campanha:</span>
                    <span>{campaignName}</span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Template:</span>
                    <span>{template?.label} - {template?.value}</span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Telefone:</span>
                    <span>{phone?.phones[0].name} {phone?.phones[0].number}</span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Quantidade de disparos:</span>
                    <span>{leadsAmount}</span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Data e Hora:</span>
                    <span>{date} - {time}h</span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Quantidade de expositor:</span>
                    <span>{selectedExhibitors.length}</span>
                </S.SummaryItem>
            </S.SummaryContainer>

            <S.Footer>
                <span>Está tudo certo? Deseja confirmar a criação da campanha?</span>

                <div>
                    <Button variant="primary-outline" onClick={onCancel} disabled={loadingRegisterCampaign}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={async () => {
                            const isSuccess = await registerCampaign(campaignData);
                            if (isSuccess) onConfirm();
                        }}
                        disabled={loadingRegisterCampaign}
                    >
                        {loadingRegisterCampaign ? "Criando..." : "Confirmar"}
                    </Button>
                </div>

                {errorRegisterCampaign && <ErrorMessage>Não foi possível criar essa campanha.</ErrorMessage>}
            </S.Footer>
        </S.Container>
    );
};

export { CampaignSummary };
