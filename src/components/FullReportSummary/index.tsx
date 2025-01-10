import { Button } from "#components/Button";
import { defaultTheme } from "#styles/themes/default";
import { ProgressBar } from "#components/ProgressBar";
import { formatPercentage } from "#utils/formatPercentage";
import { Icon } from "#components/Icon";
import * as S from "./styles";
import { useResultsDrawerInfo } from "#services/reports/useResultsDrawerInfo";
import { useEffect } from "react";
import { ErrorMessage } from "#styles/components";
import { SkeletonBox } from "#components/SkeletonBox";

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

    const interaction = resultsInfo?.interaction ? `${resultsInfo.interaction} interações` : '---';
    const hasInteractionPercentage = !!resultsInfo?.interaction_percentage;
    const interactionPercentage = resultsInfo?.interaction_percentage ? resultsInfo?.interaction_percentage : 0;
    const interactionPercentageText = resultsInfo?.interaction_percentage ? formatPercentage(resultsInfo?.interaction_percentage) : '---';
    const delivered = resultsInfo?.delivered ? `${resultsInfo.delivered} entregas` : '---';
    const hasDeliveredPercentage = !!resultsInfo?.delivered_percentage;
    const deliveredPercentage = resultsInfo?.delivered_percentage ? resultsInfo?.delivered_percentage : 0;
    const deliveredPercentageText = resultsInfo?.delivered_percentage ? formatPercentage(resultsInfo?.delivered_percentage) : '---';
    const notResponded = resultsInfo?.not_responded ? `${resultsInfo.not_responded}` : '---';
    const notRespondedPercentage = resultsInfo?.not_responded_percentage ? formatPercentage(resultsInfo?.not_responded_percentage) : formatPercentage(0);
    const notRespondedPercentageText = resultsInfo?.not_responded_percentage ? formatPercentage(resultsInfo?.not_responded_percentage) : '0';
    const optOutPercentage = resultsInfo?.opt_out_percentage ? formatPercentage(resultsInfo.opt_out_percentage) : formatPercentage(0);
    const campaignExecution = resultsInfo?.campaign_execution ? `${resultsInfo.campaign_execution}` : '---';
    const campaignExecutionPercentage = resultsInfo?.campaign_execution_percentage ? formatPercentage(resultsInfo?.campaign_execution_percentage) : formatPercentage(0);
    const meanHourResponseTime = resultsInfo?.mean_hour_response_time ? Math.round(resultsInfo.mean_hour_response_time) : '--- ';

    const renderFullReportSummarySkeleton = () => {
        return (
            <S.ReportContainer>
                <S.Header>
                    <S.SkeletonBoxContainer>
                        <SkeletonBox width="200px" />
                        <SkeletonBox width="150px" />
                    </S.SkeletonBoxContainer>
                    <Button variant="primary" disabled>
                        Baixar relatório
                    </Button>
                </S.Header>

                <S.DividerX />

                <S.DonutContainer>
                    <S.DonutChartContainer>
                        <SkeletonBox width="100px" />
                        <S.SkeletonBoxContainer>
                            <SkeletonBox width="80px" />
                            <SkeletonBox width="60px" />
                        </S.SkeletonBoxContainer>
                    </S.DonutChartContainer>

                    <S.DividerY />

                    <S.DonutChartContainer>
                        <SkeletonBox width="100px" />
                        <S.SkeletonBoxContainer>
                            <SkeletonBox width="80px" />

                            <SkeletonBox width="60px" />
                        </S.SkeletonBoxContainer>
                    </S.DonutChartContainer>
                </S.DonutContainer>

                <S.DividerX />

                <S.StatusContainer>
                    {[1, 2, 3].map((_, i) => (
                        <S.StatusCard key={i} color="#eee">
                            <SkeletonBox width="100px" />
                            <S.StatusCardInfo color="#eee">
                                <S.SkeletonBoxContainer>
                                    <SkeletonBox width="40px" />
                                    <SkeletonBox width="60px" />
                                </S.SkeletonBoxContainer>
                                <div>
                                    <SkeletonBox width="40px" />
                                    <SkeletonBox width="100px" />
                                </div>
                            </S.StatusCardInfo>
                        </S.StatusCard>
                    ))}
                </S.StatusContainer>

                <S.DividerX />

                <S.TimeResponse>
                    <SkeletonBox width="200px" />
                    <S.SkeletonBoxContainerFooter>
                        <SkeletonBox width="40px" />
                        <SkeletonBox width="40px" />
                        <SkeletonBox width="40px" />
                    </S.SkeletonBoxContainerFooter>
                </S.TimeResponse>
            </S.ReportContainer>
        );
    };

    if (loadingResultsInfo) return renderFullReportSummarySkeleton();
    if (errorResultsInfo) return <ErrorMessage>Erro ao carregar relatório.</ErrorMessage>;
    if (!resultsInfo) return null;

    return (
        <S.ReportContainer>
            <S.Header>
                <div>
                    <S.Title>Relatório completo</S.Title>
                    <S.SubTitle>{`${'Expositor: '} ${' ---'}`}</S.SubTitle>
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
                        <h5>{interaction}</h5>
                    </div>
                    {hasInteractionPercentage && (
                        <>
                            <S.DonutChartWrapper>
                                <S.DonutChart color={defaultTheme.colors.primary.purple200} percentage={interactionPercentage} />
                                <S.PercentageText>{interactionPercentageText}</S.PercentageText>
                            </S.DonutChartWrapper>
                            <S.StyledSpan
                                color={defaultTheme.colors.primary.purple200}>
                                interações
                            </S.StyledSpan>
                        </>
                    )}
                </S.DonutChartContainer>

                <S.DividerY />

                <S.DonutChartContainer>
                    <div>
                        <p>Total de entrega</p>
                        <h5>{delivered}</h5>
                    </div>
                    {hasDeliveredPercentage &&
                        <>
                            <S.DonutChartWrapper>
                                <S.DonutChart color={defaultTheme.colors.primary.purple300} percentage={deliveredPercentage} />
                                <S.PercentageText>{deliveredPercentageText}</S.PercentageText>
                            </S.DonutChartWrapper>
                            <S.StyledSpan
                                color={defaultTheme.colors.primary.purple300}>
                                entregas
                            </S.StyledSpan>
                        </>}
                </S.DonutChartContainer>
            </S.DonutContainer>

            <S.DividerX />

            <S.StatusContainer>
                <S.StatusCard color={defaultTheme.colors.primary.purple100}>
                    <h5>Sem Respostas</h5>
                    <S.StatusCardInfo color={defaultTheme.colors.primary.purple100}>
                        <div>
                            <h2>{notResponded}</h2>
                            <p>Quantidade</p>
                        </div>
                        <div>
                            <h2>{notRespondedPercentage}</h2>
                            <ProgressBar
                                color={defaultTheme.colors.primary.purple100}
                                percentage={notRespondedPercentageText}
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
                            <h2>{optOutPercentage}</h2>
                            <ProgressBar
                                color={defaultTheme.colors.primary.purple200}
                                percentage={optOutPercentage}
                            />
                        </div>
                    </S.StatusCardInfo>
                </S.StatusCard>
                <S.StatusCard color={defaultTheme.colors.primary.purple300}>
                    <h5>Execução da< br />campanha</h5>
                    <S.StatusCardInfo color={defaultTheme.colors.primary.purple300}>
                        <div>
                            <h2>{campaignExecution}</h2>
                            <p>Quantidade</p>
                        </div>
                        <div>
                            <h2>{campaignExecutionPercentage}</h2>
                            <ProgressBar
                                color={defaultTheme.colors.primary.purple300}
                                percentage={campaignExecutionPercentage}
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
                    <h2>{meanHourResponseTime}</h2> <h4>Horas</h4>
                </div>
            </S.TimeResponse>
        </S.ReportContainer >
    );
};

export { FullReportSummary };
