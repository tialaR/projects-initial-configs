import { Button } from "#components/Button";
import { DataListItem } from "#components/DataSearchSelectListTable";
import { PhoneCategory, TemplateOption } from "../listMocksAux";
import * as S from "./styles";

type CampaignSummaryProps = {
    data: {
        campaignName: string;
        template: TemplateOption | null;
        phone: PhoneCategory | null;
        leadsAmount: string | null;
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
                    <span>Template:</span>
                    <span>
                        {template?.label} - {template?.value}
                    </span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Telefone:</span>
                    <span>
                        {phone?.phones[0].name} {phone?.phones[0].number}
                    </span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Quantidade de disparos:</span>
                    <span>
                        {leadsAmount}
                    </span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Data e Hora:</span>
                    <span>
                        {date} - {time}h
                    </span>
                </S.SummaryItem>
                <S.SummaryItem>
                    <span>Quantidade de expositor:</span>
                    <span>
                        {selectedExhibitors.length}
                    </span>
                </S.SummaryItem>
            </S.SummaryContainer>

            <S.Footer>
                <span>Está tudo certo? Deseja confirmar a criação da campanha?</span>

                <div>
                    <Button variant="primary-outline" onClick={onCancel}>Cancelar</Button>
                    <Button variant="primary" onClick={onConfirm}>Confirmar</Button>
                </div>
            </S.Footer>
        </S.Container>
    );
};

export { CampaignSummary };

