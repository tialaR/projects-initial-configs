import * as S from "./styles";

type ProgressBarProps = {
    color: string;
    percentage: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ color, percentage }) => {
    return <S.ProgressBar color={color} percentage={percentage} />;
}

export { ProgressBar };