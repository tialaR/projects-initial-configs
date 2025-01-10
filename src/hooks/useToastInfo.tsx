import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ToastInfo } from "#components/ToastInfo";

interface ToastInfoProps {
    type: "success" | "error";
    message: string;
    description: string;
}

interface ToastInfoContextType {
    showToast: (toast: ToastInfoProps) => void;
}

const ToastInfoContext = createContext<ToastInfoContextType | undefined>(undefined);

export const ToastInfoProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastInfoProps | null>(null);

    const showToast = useCallback((toastData: ToastInfoProps) => {
        setToast(toastData);
    }, []);

    return (
        <ToastInfoContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <ToastInfo
                    type={toast.type}
                    message={toast.message}
                    description={toast.description}
                    onClose={() => setToast(null)}
                />
            )}
        </ToastInfoContext.Provider>
    );
};

export const useToastInfo = () => {
    const context = useContext(ToastInfoContext);
    if (!context) {
        throw new Error("useToastInfo deve ser usado dentro de um ToastInfoProvider");
    }
    return context;
};
