import { useNavigate } from "react-router-dom";
import * as S from "./styles";

type BreadcrumbItem = {
    label: string;
    href: string;
}

type BreadcrumbProps = {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    const navigate = useNavigate();

    const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        event.preventDefault();
        navigate(href);
    };

    return (
        <S.Container>
            {items.map((item, index) => (
                <S.BreadcrumbItem key={index}>
                    <S.BreadcrumbLink
                        href={item.href}
                        isLast={index === items.length - 1}
                        onClick={(e) => handleNavigation(e, item.href)}
                    >
                        {item.label}
                    </S.BreadcrumbLink>
                </S.BreadcrumbItem>
            ))}
        </S.Container>
    );
};

export { Breadcrumb };
