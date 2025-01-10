import { Button } from "#components/Button";
import { defaultTheme } from "#styles/themes/default";
import { ProgressBar } from "#components/ProgressBar";
import { formatPercentage } from "#utils/formatPercentage";
import { Icon } from "#components/Icon";
import * as S from "./styles";

const FullReportSummary = () => {
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
                        <h5>900 interações</h5>
                    </div>
                    <S.DonutChartWrapper>
                        <S.DonutChart color={defaultTheme.colors.primary.purple200} percentage={85} />
                        <S.PercentageText>85%</S.PercentageText>
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
                        <h5>1200 entregas</h5>
                    </div>
                    <S.DonutChartWrapper>
                        <S.DonutChart color={defaultTheme.colors.primary.purple300} percentage={95} />
                        <S.PercentageText>95%</S.PercentageText>
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
                            <h2>400</h2>
                            <p>Quantidade</p>
                        </div>
                        <div>
                            <h2>30%</h2>
                            <ProgressBar
                                color={defaultTheme.colors.primary.purple100}
                                percentage={formatPercentage(30)}
                            />
                        </div>
                    </S.StatusCardInfo>
                </S.StatusCard>
                <S.StatusCard color={defaultTheme.colors.primary.purple200}>
                    <h5>Opt-out</h5>
                    <S.StatusCardInfo color={defaultTheme.colors.primary.purple200}>
                        <div>
                            <h2>400</h2>
                            <p>Quantidade</p>
                        </div>
                        <div>
                            <h2>30%</h2>
                            <ProgressBar
                                color={defaultTheme.colors.primary.purple200}
                                percentage={formatPercentage(30)}
                            />
                        </div>
                    </S.StatusCardInfo>
                </S.StatusCard>
                <S.StatusCard color={defaultTheme.colors.primary.purple300}>
                    <h5>Execução da< br />campanha</h5>
                    <S.StatusCardInfo color={defaultTheme.colors.primary.purple300}>
                        <div>
                            <h2>400</h2>
                            <p>Quantidade</p>
                        </div>
                        <div>
                            <h2>30%</h2>
                            <ProgressBar
                                color={defaultTheme.colors.primary.purple300}
                                percentage={formatPercentage(30)}
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
                    <h2>48</h2> <h4>Horas</h4>
                </div>
            </S.TimeResponse>
        </S.ReportContainer >
    );
};

export { FullReportSummary };