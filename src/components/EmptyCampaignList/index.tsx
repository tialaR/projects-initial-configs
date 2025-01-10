import { Button } from "#components/Button";
import rocketImg from "#assets/images/rocket.png";
import * as S from './styles';

type EmptyCampaignListProps = {
    onCreateCampaign: () => void;
};

const EmptyCampaignList: React.FC<EmptyCampaignListProps> = ({ onCreateCampaign }) => {
    return (
        <S.EmptyWrapper>
            <S.Container>
                <img src={rocketImg} alt="Lista de campanhas vazia" />

                <S.ContentContainer>
                    <h4>Crie sua primeira campanha!</h4>
                    <p>
                        É rápido, fácil e garante mais destaque
                        para os expositores do evento.
                    </p>
                </S.ContentContainer>
                <Button variant="primary" onClick={onCreateCampaign}>
                    Criar campanha
                </Button>
            </S.Container>
        </S.EmptyWrapper>
    );
};

export { EmptyCampaignList };
