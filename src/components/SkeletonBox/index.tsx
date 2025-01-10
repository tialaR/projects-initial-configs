import * as S from "./styles";

type SkeletonBoxProps = {
    width?: string;
};

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ width = "100px" }) => {
    return <S.SkeletonBoxContainer width={width} />;
};

export { SkeletonBox };
