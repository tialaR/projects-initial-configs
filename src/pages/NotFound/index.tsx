import React from "react";
import * as S from "./styles";

const NotFound: React.FC = () => {
    return (
        <S.Container>
            <S.Content>
                <S.Title>404</S.Title>
                <S.Subtitle>Página não encontrada</S.Subtitle>
                <S.Description>
                    Parece que você tentou acessar uma página que não existe ou foi movida.
                </S.Description>
                <S.HomeButton to="/">Voltar para a página inicial</S.HomeButton>
            </S.Content>
        </S.Container>
    );
};

export { NotFound };
