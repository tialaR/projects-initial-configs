import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { CenterModal } from "#components/CenterModal";

interface CenterModalContextProps {
    openCenterModal: (modalContent: ReactNode) => void;
    closeCenterModal: () => void;
}

const CenterModalContext = createContext<CenterModalContextProps | undefined>(undefined);

export const CenterModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [content, setContent] = useState<ReactNode | null>(null);

    const openCenterModal = useCallback((modalContent: ReactNode) => {
        setContent(modalContent);
        setIsOpen(true);
    }, []);

    const closeCenterModal = useCallback(() => {
        setIsOpen(false);
        setContent(null);
    }, []);

    return (
        <CenterModalContext.Provider value={{ openCenterModal, closeCenterModal }}>
            {children}
            <CenterModal isOpen={isOpen} content={content} closeModal={closeCenterModal} />
        </CenterModalContext.Provider>
    );
};

export const useCenterModal = (): CenterModalContextProps => {
    const context = useContext(CenterModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};