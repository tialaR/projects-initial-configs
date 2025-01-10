import { Button } from "#components/Button";
import * as S from "./styles";

type EndCampaingSummaryProps = {
    campaignName: string;
    exhibitorName: string;
    onCancel: () => void;
    onConfirm: () => void;
};

const EndCampaingSummary: React.FC<EndCampaingSummaryProps> = ({
    campaignName,
    exhibitorName,
    onCancel,
    onConfirm,
}) => {
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
                    <Button variant="primary-outline" onClick={onCancel}>Cancelar</Button>
                    <Button variant="primary" onClick={onConfirm}>Confirmar</Button>
                </div>
            </S.Footer>
        </S.Container>
    );
};

export { EndCampaingSummary };

