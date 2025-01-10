import { Button } from "#components/Button";
import * as S from "./styles";

type CampaignSummaryProps = {
    data: {
        selectedEngine: string;
        campaignName: string;
        exhibitorName: string
    };
    onCancel: () => void;
    onConfirm: () => void;
};

const CampaignSummary: React.FC<CampaignSummaryProps> = ({
    data: {
        selectedEngine,
        campaignName,
        exhibitorName
    },
    onCancel,
    onConfirm,
}) => {
    return (
        <S.Container>
            <S.TitleContainer>
                <h5>Ativar da campanha</h5>
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
                <S.SummaryItem>
                    <span>Engine:</span>
                    <span>
                        {selectedEngine}
                    </span>
                </S.SummaryItem>
            </S.SummaryContainer>

            <S.Footer>
                <span>Deseja confirmar o ativamento da campanha?</span>

                <div>
                    <Button variant="primary-outline" onClick={onCancel}>Cancelar</Button>
                    <Button variant="primary" onClick={onConfirm}>Confirmar</Button>
                </div>
            </S.Footer>
        </S.Container>
    );
};

export { CampaignSummary };

