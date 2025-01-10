import { Button } from "#components/Button";
import { defaultTheme } from "#styles/themes/default";
import { ProgressBar } from "#components/ProgressBar";
import { formatPercentage } from "#utils/formatPercentage";
import { Icon } from "#components/Icon";
import * as S from "./styles";
import { useResultsDrawerInfo } from "#services/reports/useResultsDrawerInfo";
import { useEffect } from "react";

type FullReportSummaryProps = {
    campaignContentId: string;
};

const FullReportSummary = ({
    campaignContentId
}: FullReportSummaryProps) => {
    const {
        data: resultsInfo,
        loading: loadingResultsInfo,
        error: errorResultsInfo,
        fetchResultsDrawerInfo,
    } = useResultsDrawerInfo();

    useEffect(() => {
        if (campaignContentId) {
            fetchResultsDrawerInfo(campaignContentId);
        }
    }, [campaignContentId]);

    if (loadingResultsInfo) return <p>Carregando relatório...</p>;
    if (errorResultsInfo) return <p>Erro ao carregar relatório.</p>;
    if (!resultsInfo) return null;

    return (
        <S.ReportContainer>
            <S.Header>
                <div>
                    <S.Title>Relatório completo</S.Title>
                    <S.SubTitle>Expositor: Marca Alpha</S.SubTitle>
                </div>

                <Button variant="primary" onClick={() => { }}>
                    Baixar relatório
                </Button>
            </S.Header>

            <S.DividerX />

            <S.DonutContainer>
                <S.DonutChartContainer>
                    <div>
                        <p>Total de interação</p>
                        <h5>{resultsInfo.interaction} interações</h5>
                    </div>
                    <S.DonutChartWrapper>
                        <S.DonutChart color={defaultTheme.colors.primary.purple200} percentage={resultsInfo.interaction_percentage} />
                        <S.PercentageText>{formatPercentage(resultsInfo.interaction_percentage)}</S.PercentageText>
                    </S.DonutChartWrapper>
                    <S.StyledSpan
                        color={defaultTheme.colors.primary.purple200}>
                        interações
                    </S.StyledSpan>
                </S.DonutChartContainer>

                <S.DividerY />

                <S.DonutChartContainer>
                    <div>
                        <p>Total de entrega</p>
                        <h5>{resultsInfo.delivered} entregas</h5>
                    </div>
                    <S.DonutChartWrapper>
                        <S.DonutChart color={defaultTheme.colors.primary.purple300} percentage={resultsInfo.delivered_percentage} />
                        <S.PercentageText>{formatPercentage(resultsInfo.delivered_percentage)}</S.PercentageText>
                    </S.DonutChartWrapper>
                    <S.StyledSpan
                        color={defaultTheme.colors.primary.purple300}>
                        entregas
                    </S.StyledSpan>
                </S.DonutChartContainer>
            </S.DonutContainer>

            <S.DividerX />

            <S.StatusContainer>
                <S.StatusCard color={defaultTheme.colors.primary.purple100}>
                    <h5>Sem Respostas</h5>
                    <S.StatusCardInfo color={defaultTheme.colors.primary.purple100}>
                        <div>
                            <h2>{resultsInfo.not_responded}</h2>
                            <p>Quantidade</p>
                        </div>
                        <div>
                            <h2>{formatPercentage(resultsInfo.not_responded_percentage)}</h2>
                            <ProgressBar
                                color={defaultTheme.colors.primary.purple100}
                                percentage={formatPercentage(resultsInfo.not_responded_percentage)}
                            />
                        </div>
                    </S.StatusCardInfo>
                </S.StatusCard>
                <S.StatusCard color={defaultTheme.colors.primary.purple200}>
                    <h5>Opt-out</h5>
                    <S.StatusCardInfo color={defaultTheme.colors.primary.purple200}>
                        <div>
                            <h2>{resultsInfo.opt_out}</h2>
                            <p>Quantidade</p>
                        </div>
                        <div>
                            <h2>{formatPercentage(resultsInfo.opt_out_percentage)}</h2>
                            <ProgressBar
                                color={defaultTheme.colors.primary.purple200}
                                percentage={formatPercentage(resultsInfo.opt_out_percentage)}
                            />
                        </div>
                    </S.StatusCardInfo>
                </S.StatusCard>
                <S.StatusCard color={defaultTheme.colors.primary.purple300}>
                    <h5>Execução da< br />campanha</h5>
                    <S.StatusCardInfo color={defaultTheme.colors.primary.purple300}>
                        <div>
                            <h2>{resultsInfo.campaign_execution}</h2>
                            <p>Quantidade</p>
                        </div>
                        <div>
                            <h2>{formatPercentage(resultsInfo.campaign_execution_percentage)}</h2>
                            <ProgressBar
                                color={defaultTheme.colors.primary.purple300}
                                percentage={formatPercentage(resultsInfo.campaign_execution_percentage)}
                            />
                        </div>
                    </S.StatusCardInfo>
                </S.StatusCard>
            </S.StatusContainer>

            <S.DividerX />

            <S.TimeResponse>
                <h6>Tempo médio de resposta</h6>
                <div>
                    <Icon name="chronic" size={32} />
                    <h2>{Math.round(resultsInfo.mean_hour_response_time)}</h2> <h4>Horas</h4>
                </div>
            </S.TimeResponse>
        </S.ReportContainer >
    );
};

export { FullReportSummary };
