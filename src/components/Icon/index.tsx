import { iconMap } from '#utils/icons';
import { StyledIcon } from './styles';

export type IconProps = {
    name: keyof typeof iconMap | string;
    size?: number;
    color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 32, color }) => {
    if (!(name in iconMap)) {
        console.warn(`Icon "${name}" is not a valid icon key.`);
        return null;
    }

    const SvgIcon = iconMap[name as keyof typeof iconMap];

    return (
        <StyledIcon size={size} color={color}>
            <SvgIcon
                width={size}
                height={size}
                fill={color}
                stroke={color} />
        </StyledIcon>
    );
};

export { Icon };
