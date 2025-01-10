import { useContentSideMenu } from '#hooks/useContentSideMenu';
import * as S from './styles';

const Dashboard: React.FC = () => {
    const { openContentSideMenu } = useContentSideMenu();

    return (
        <S.DashboardContainer>
            <div>
                <S.Card>
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
                </S.Card>
                <S.Card>Top Right</S.Card>
            </div>

            <div>
                <S.Card>Bottom Left</S.Card>
                <S.Card>Bottom Right</S.Card>
            </div>
        </S.DashboardContainer>
    );
};

export { Dashboard };
