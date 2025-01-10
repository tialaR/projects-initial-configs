import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import * as S from "./styles";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "primary-outline" | "outline";
    icon?: ReactNode;
    iconPosition?: "left" | "right";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = "primary", icon = "", iconPosition = "", ...rest }, ref) => {

        if (variant === "outline") {
            return (
                <S.ButtonStyled ref={ref} variant={variant} {...rest}>
                    {icon && iconPosition === "left" && (
                        <S.Icon iconPosition="left">
                            {icon}
                        </S.Icon>
                    )}
                    {children}
                    {icon && iconPosition === "right" && (
                        <S.Icon iconPosition="right">
                            {icon}
                        </S.Icon>
                    )}
                </S.ButtonStyled>
            );
        }

        if (variant === "primary-outline") {
            return (
                <S.ButtonStyled ref={ref} variant={variant} {...rest}>
                    {children}
                </S.ButtonStyled>
            );
        }

        return (
            <S.ButtonStyled ref={ref} variant={variant} {...rest}>
                {children}
            </S.ButtonStyled>
        );
    }
);

Button.displayName = "Button";
export { Button };
