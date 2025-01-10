import * as S from "./styles";

type BreadcrumbItem = {
    label: string;
    href: string;
}

type BreadcrumbProps = {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <S.Container>
            {items.map((item, index) => (
                <S.BreadcrumbItem key={index}>
                    <S.BreadcrumbLink href={item.href} isLast={index === items.length - 1}>
                        {item.label}
                    </S.BreadcrumbLink>
                </S.BreadcrumbItem>
            ))}
        </S.Container>
    );
};

export { Breadcrumb };
