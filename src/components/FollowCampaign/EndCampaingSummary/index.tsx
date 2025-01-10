import { Button } from "#components/Button";
import { useTerminateCampaign } from "#services/campaign/useTerminateCampaign";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { useEffect } from "react";
import * as S from "./styles";
import { ErrorMessage } from "#styles/components";

type EndCampaingSummaryProps = {
    exibitorId: string;
    exhibitorName: string;
    campaignContentId: string;
    campaignName: string;
    onCancel: () => void;
    onConfirm: ({ isSuccess }: { isSuccess: boolean }) => void;
};

const EndCampaingSummary: React.FC<EndCampaingSummaryProps> = ({
    exibitorId,
    campaignContentId,
    campaignName,
    exhibitorName,
    onCancel,
    onConfirm,
}) => {
    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;
    const {
        terminateCampaign,
        loading: loadingTerminateCampeign,
        error: errorTerminateCampaign,
        success: successTerminateCampaign
    } = useTerminateCampaign();

    const handleConfirm = () => {
        terminateCampaign({
            registered_event_id: registeredEventId || "",
            campaign_name: campaignName,
            exhibitor_id: exibitorId,
            campaign_content_id: campaignContentId || "",
        });
    }

    useEffect(() => {
        if (successTerminateCampaign) {
            onConfirm({
                isSuccess: successTerminateCampaign
            });
        }
    }, [successTerminateCampaign]);

    return (
        <S.Container>
            <S.TitleContainer>
                <h5>Resumo da campanha</h5>
            </S.TitleContainer>

            <S.SummaryContainer>
                <S.SummaryItem>
                    <span>Nome da Campanha:</span>
                    <span>
                        {campaignName}
                    </span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Expositor:</span>
                    <span>
                        {exhibitorName}
                    </span>
                </S.SummaryItem>
            </S.SummaryContainer>

            <S.Footer>
                <span>Deseja confirmar o encerramento da campanha?
                    < br />Após o encerramento, não será possível reativá-la.
                </span>

                <div>
                    <Button
                        disabled={loadingTerminateCampeign}
                        variant="primary-outline"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                    <Button
                        disabled={loadingTerminateCampeign}
                        variant="primary"
                        onClick={handleConfirm}
                    >
                        {loadingTerminateCampeign ? "Confirmando..." : "Confirmar"}
                    </Button>
                </div>
            </S.Footer>

            <ErrorMessage>{errorTerminateCampaign}</ErrorMessage>
        </S.Container>
    );
};

export { EndCampaingSummary };

