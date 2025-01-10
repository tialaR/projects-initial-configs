import { ReactNode } from "react";
import ReactDOM from "react-dom";
import * as S from './styles';

type CenterModalProps = {
    isOpen: boolean;
    content: ReactNode | null;
    closeModal: () => void;
}

const CenterModal: React.FC<CenterModalProps> = ({ isOpen, content, closeModal }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <S.Overlay onClick={closeModal}>
            <S.CenterModalContainer onClick={(e) => e.stopPropagation()}>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                {content}
            </S.CenterModalContainer>
        </S.Overlay>,
        document.body
    );
};

export { CenterModal }