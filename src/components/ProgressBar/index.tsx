import * as S from "./styles";

type ProgressBarProps = {
    color: string;
    percentage: number | string;
    width?: string | number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ color, percentage, width = "100%" }) => {
    return <S.ProgressBar color={color} width={width} percentage={percentage} />;
}

export { ProgressBar };