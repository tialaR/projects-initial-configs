import { Button } from "#components/Button";
import { Icon } from "#components/Icon";
import * as S from "./styles";

type CampaignSuccessProps = {
    onConfirm: () => void;
};

const CampaignSuccess: React.FC<CampaignSuccessProps> = ({ onConfirm }) => {
    return (
        <S.Container>
            <S.TitleContainer>
                <Icon name="checkSuccess" size={48} />
                <h5>Sua campanha foi ativada com sucesso!</h5>
            </S.TitleContainer>

            <S.Footer>
                <span>Tudo certo! A campanha foi ativa.< br />
                    Você pode conferir em Acompanhar Campanhas.</span>
                <div>
                    <Button variant="primary" onClick={onConfirm}>Acompanhar campanhas</Button>
                </div>
            </S.Footer>
        </S.Container>
    );
};

export { CampaignSuccess };

