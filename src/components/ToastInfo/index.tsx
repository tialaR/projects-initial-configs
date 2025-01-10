import { useEffect, useState } from "react";
import * as S from "./styled";
import { Icon } from "#components/Icon";

interface ToastInfoProps {
    type: "success" | "error";
    message: string;
    description: string;
    onClose: () => void;
}

const ToastInfo = ({ type, message, description, onClose }: ToastInfoProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 500); // Animation time
        }, 8000); // 8 seconds timeout for the toast to be visible

        return () => clearTimeout(timer);
    }, [onClose]);

    const renderIcon = () => {
        if (type === "success") {
            return <Icon name="checkCircle" size={40} />;
        } else if (type === "error") {
            return <Icon name="cancelCircle" size={40} />;
        }
        return "";
    };

    return (
        <S.ToastWrapper visible={visible}>
            <S.ToastInfoContainer type={type}>
                {renderIcon()}

                <S.ToastInfoContent>
                    <p>{message}</p>
                    <small>{description}</small>
                </S.ToastInfoContent>
            </S.ToastInfoContainer>
        </S.ToastWrapper>
    );
};

export { ToastInfo };
