import { Button } from "#components/Button";
import { Icon } from "#components/Icon";
import * as S from "./styles";

type CampaignSuccessProps = {
    onCancel: () => void;
    onConfirm: () => void;
};

const CampaignSuccess: React.FC<CampaignSuccessProps> = ({ onCancel, onConfirm }) => {
    return (
        <S.Container>
            <S.TitleContainer>
                <Icon name="checkSuccess" size={48} />
                <h5>Sua campanha foi criada com sucesso!</h5>
            </S.TitleContainer>

            <S.Footer>
                <span>Está tudo certo? Deseja confirmar a criação da campanha?</span>

                <div>
                    <Button variant="primary-outline" onClick={onCancel}>Não, ir para início</Button>
                    <Button variant="primary" onClick={onConfirm}>Sim, configurar agora</Button>
                </div>
            </S.Footer>
        </S.Container>
    );
};

export { CampaignSuccess };

