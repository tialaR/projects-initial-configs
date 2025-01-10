import { ReactNode } from 'react';
import * as S from './styles';

type MainTitleProps = {
    children: ReactNode;
};

const MainTitle: React.FC<MainTitleProps> = ({ children }) => {
    return <S.MainTitleStyled>{children}</S.MainTitleStyled>;
}

export { MainTitle };