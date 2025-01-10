import { useRef, useEffect, useState } from "react";
import * as S from "./styles";
import { Icon } from "#components/Icon";
import { ENGINE_OPTIONS, EngineOption } from "#utils/formatEngineValueToLabel";

type SelectByEngineProps = {
    selected: EngineOption | null;
    loading?: boolean;
    onSelect: (selectedEngine: EngineOption | null) => void;
};

const SelectByEngine = ({ selected, onSelect, loading }: SelectByEngineProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelectEngine = (engine: EngineOption) => {
        const newSelected = selected?.id === engine.id ? null : engine;
        onSelect(newSelected);
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const renderSelectedEngine = () => {
        if (loading) {
            return <span>Carregando Engine</span>;
        }
        if (selected?.label) {
            return (
                <span>{selected.label}</span>
            );
        }
        return <span>Escolher Engine</span>;
    };

    return (
        <S.Container ref={dropdownRef}>
            <S.SelectButton onClick={() => setIsOpen((prev) => !prev)}>
                <span>
                    {renderSelectedEngine()}
                </span>
                <S.IconWrapper isOpen={isOpen}>
                    <Icon name="arrowDownSmall" size={24} />
                </S.IconWrapper>
            </S.SelectButton>

            {isOpen && (
                <S.Modal>
                    {ENGINE_OPTIONS.map((option) => (
                        <S.OptionItem key={option.id} onClick={() => handleSelectEngine(option)}>
                            <span>{option.label}</span>
                        </S.OptionItem>
                    ))}
                </S.Modal>
            )}
        </S.Container>
    );
};

export { SelectByEngine };
