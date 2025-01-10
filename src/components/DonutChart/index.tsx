import { defaultTheme } from "#styles/themes/default";
import * as S from "./styles";

type MedalColor = (typeof defaultTheme.colors.status)["gold" | "silver" | "bronze"];
type MedalLabel = "Ouro" | "Prata" | "Bronze" | string;

type DonutChartItem = {
    id: string;
    percentage: number;
    color: MedalColor;
    label: MedalLabel;
};

type DonutChartProps = {
    chartList: DonutChartItem[];
};

const DonutChart: React.FC<DonutChartProps> = ({ chartList }) => {
    return (
        <S.ChartContainer>
            <S.DonutChart />
            <S.Legend>
                {chartList.map((item) => (
                    <S.LegendItem key={item.id} color={item.color}>
                        <p>{item.percentage}%</p> <span /> {item.label}
                    </S.LegendItem>
                ))}
            </S.Legend>
        </S.ChartContainer>
    );
};

export { DonutChart };
