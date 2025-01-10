
import { useState } from "react";
import { DataListTable } from "#components/DataListTable";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import * as S from './styles';

const PreFireCampaign: React.FC = () => {
    const { openContentSideMenu } = useContentSideMenu();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const data = [
        { id: 0, name: "Primeira Compra", exhibitors: 5, event: "Feira Play 2024" },
        { id: 1, name: "Promo 90 anos", exhibitors: 124, event: "Evento Agro 90 anos" },
        { id: 2, name: "Sua nova máquina", exhibitors: 43, event: "Exposição Máquinas" },
    ];

    const columnsHead = [
        { id: 0, item: "Nome da campanha" },
        { id: 1, item: "Qtd. Expositores" },
        { id: 2, item: "Evento" },
        { id: 3, item: "Deletar" },
        { id: 4, item: "Configurar" },
    ];

    const normalizedRows = data.map((item) => [
        item.name,
        item.exhibitors,
        item.event,
        <S.IconButton onClick={() => alert(`Deletar ${item.name}`)}>🗑️</S.IconButton>,
        <S.IconButton onClick={() => alert(`Editar ${item.name}`)}>✏️</S.IconButton>,
    ]);

    const paginatedData = normalizedRows.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div>
            <div style={{
                paddingLeft: '20px',
                paddingTop: '20px',
                paddingBottom: '20px',
            }}>
                <p style={{ color: '#bbbbbb', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                    Configurar campanhas
                </p>
                <button
                    style={{
                        padding: '0.625rem 1.25rem',
                        fontSize: '1rem',
                        border: 'none',
                        borderRadius: '8px',
                        backgroundColor: '#616161',
                        color: '#eeeeee',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                    onClick={() => openContentSideMenu(
                        <div style={{ padding: '2rem' }}>
                            <span style={{ display: 'block', color: '#616161', marginTop: '2rem' }}>
                                O conteúdo desse side menu age de forma dinâmica. Ele pode ser
                                reutilizado para todas as telas que necessitarem do mesmo.
                                Suportanquando qualquer componente dentro dele.
                            </span>
                        </div>
                    )}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#eeeeee',
                        e.currentTarget.style.color = '#616161')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#616161',
                        e.currentTarget.style.color = '#eeeeee'
                    )}
                >
                    Open ContentSideMenu
                </button>

            </div>
            <S.Container>
                <S.Title>Selecione uma campanha para configurar</S.Title>
                <S.SearchContainer>
                    <S.Input type="text" placeholder="Pesquisar Evento" />
                    <S.Button>Filtros</S.Button>
                </S.SearchContainer>
                <DataListTable
                    title="Lista de Campanhas"
                    columns={columnsHead}
                    dataList={paginatedData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalRows={normalizedRows.length}
                    handlePageChange={(page) => setCurrentPage(page)}
                />
            </S.Container>
        </div>
    );
};

export { PreFireCampaign };
