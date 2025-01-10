import { Button } from "#components/Button";
import { ErrorMessage } from "#styles/components";
import { ActivateCampaign, useActivateCampaign } from "#services/campaign/useActivateCampaign";
import { formatEngineValueToLabel } from "#utils/formatEngineValueToLabel";
import * as S from "./styles";
import { useEffect } from "react";

type CampaignSummaryProps = {
    data: ActivateCampaign;
    onCancel: () => void;
    onConfirm: () => void;
};

const CampaignSummary: React.FC<CampaignSummaryProps> = ({ data, onCancel, onConfirm }) => {
    const {
        activateCampaign,
        loading: loadingActivateCampaign,
        error: errorActivateCampaign,
        data: activateCampaignData
    } = useActivateCampaign();

    const handleConfirm = () => {
        activateCampaign(data);
    };

    useEffect(() => {
        if (activateCampaignData) {
            onConfirm();
        }
    }, [activateCampaignData]);

    return (
        <S.Container>
            <S.TitleContainer>
                <h5>Ativar Campanha</h5>
            </S.TitleContainer>

            <S.SummaryContainer>
                <S.SummaryItem>
                    <span>Nome da Campanha:</span>
                    <span>{data?.campaign_name}</span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Expositor:</span>
                    <span>{data?.exhibitor_name}</span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Engine:</span>
                    <span>{formatEngineValueToLabel(data?.engine || '')}</span>
                </S.SummaryItem>
            </S.SummaryContainer>


            <S.Footer>
                <span>Deseja confirmar o ativamento da campanha?</span>
                <div>
                    <Button variant="primary-outline" onClick={onCancel} disabled={loadingActivateCampaign}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirm} disabled={loadingActivateCampaign}>
                        {loadingActivateCampaign ? "Ativando..." : "Confirmar"}
                    </Button>
                </div>
            </S.Footer>

            {errorActivateCampaign && <ErrorMessage>Erro ao tentar ativar campanha: {errorActivateCampaign}</ErrorMessage>}
        </S.Container>
    );
};

export { CampaignSummary };
