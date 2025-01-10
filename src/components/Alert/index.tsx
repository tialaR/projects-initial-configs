import { useEffect } from "react";
import * as S from "./styled";

interface AlertProps {
    type: "success" | "error";
    message: string;
    description: string;
    onClose: () => void;
}

const Alert = ({ type, message, description, onClose }: AlertProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <S.AlertContainer type={type}>
            <S.Icon type={type}>{type === "success" ? "✔️" : "❌"}</S.Icon>
            <S.AlertContent>
                <p>{message}</p>
                <small>{description}</small>
            </S.AlertContent>
        </S.AlertContainer>
    );
};

export { Alert };
