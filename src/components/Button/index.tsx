import { ButtonHTMLAttributes, ReactElement, SVGProps, forwardRef } from "react";
import * as S from "./styles";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "primary-outline" | "outline";
    icon?: ReactElement<SVGProps<SVGSVGElement>>;
    iconPosition?: "left" | "right";
    disabled?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    variant = "primary",
    icon = "",
    iconPosition = "",
    disabled = false,
    ...rest
}, ref) => {

    if (variant === "outline") {
        return (
            <S.ButtonStyled ref={ref} variant={variant} disabled={disabled} {...rest}>
                {icon && iconPosition === "left" && (
                    <S.Icon disabled={disabled} iconPosition="left">
                        {icon}
                    </S.Icon>
                )}
                {children}
                {icon && iconPosition === "right" && (
                    <S.Icon disabled={disabled} iconPosition="right">
                        {icon}
                    </S.Icon>
                )}
            </S.ButtonStyled>
        );
    }

    if (variant === "primary-outline") {
        return (
            <S.ButtonStyled ref={ref} variant={variant} disabled={disabled} {...rest}>
                {children}
            </S.ButtonStyled>
        );
    }

    return (
        <S.ButtonStyled ref={ref} variant={variant} disabled={disabled} {...rest}>
            {children}
        </S.ButtonStyled>
    );
}
);

Button.displayName = "Button";
export { Button };
