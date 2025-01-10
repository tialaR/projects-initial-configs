import { Button } from '#components/Button';
import { Icon } from '#components/Icon';
import * as S from './styles';

type PaginationProps = {
    totalRows: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalRows, currentPage, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalRows / itemsPerPage);

    return (
        <S.Pagination>
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                iconPosition="left"
                icon={<Icon name="arrowLeft" size={18} />}
            >
                Anterior
            </Button>
            <span>
                Página {currentPage} de {totalPages}
            </span>

            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                iconPosition="right"
                icon={<Icon name="arrowRight" size={18} />}
            >
                Próximo
            </Button>
        </S.Pagination >
    );
};

export { Pagination }