import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { ContentSideMenu } from "#components/ContentSideMenu";

interface ContentSideMenuContextProps {
    isOpen: boolean;
    content: ReactNode | null;
    openContentSideMenu: (newContent: ReactNode) => void;
    closeContentSideMenu: () => void;
}

const ContentSideMenuContext = createContext<ContentSideMenuContextProps | undefined>(undefined);

export const ContentSideMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode | null>(null);

    const openContentSideMenu = useCallback((newContent: ReactNode) => {
        setContent(newContent);
        setIsOpen(true);
    }, []);

    const closeContentSideMenu = useCallback(() => {
        setContent(null);
        setIsOpen(false);
    }, []);

    return (
        <ContentSideMenuContext.Provider value={{ isOpen, content, closeContentSideMenu, openContentSideMenu }}>
            {children}
            <ContentSideMenu isOpen={isOpen} closeContentMenu={closeContentSideMenu}>
                {content}
            </ContentSideMenu>
        </ContentSideMenuContext.Provider>
    );
};

export const useContentSideMenu = (): ContentSideMenuContextProps => {
    const context = useContext(ContentSideMenuContext);
    if (!context) {
        throw new Error('useContentMenu must be used within a ContentMenuProvider');
    }
    return context;
};