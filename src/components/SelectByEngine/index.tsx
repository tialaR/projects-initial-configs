import { useState, useRef, useEffect } from "react";
import * as S from "./styles";
import { Icon } from "#components/Icon";

export type EngineOption = {
    id: string;
    label: string;
    status: string;
    statusColor: string;
};

const ENGINE_OPTIONS: EngineOption[] = [
    { id: "engine-class", label: "Engine Class", status: "Aprovado", statusColor: "positive100" },
    { id: "engine-cluster", label: "Engine Cluster", status: "Bom", statusColor: "info100" },
    { id: "engine-behaviour", label: "Engine Behaviour", status: "Regular", statusColor: "warning100" }
];

type SelectByEngineProps = {
    onSelect: (selectedEngine: EngineOption | null) => void;
};

const SelectByEngine = ({ onSelect }: SelectByEngineProps) => {
    const [selectedEngine, setSelectedEngine] = useState<EngineOption | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelectEngine = (engine: EngineOption) => {
        const newSelected = selectedEngine?.id === engine.id ? null : engine;
        setSelectedEngine(newSelected);
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

    return (
        <S.Container ref={dropdownRef}>
            <S.SelectButton onClick={() => setIsOpen((prev) => !prev)}>
                {selectedEngine ? selectedEngine.label : "Escolher Engine"}
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
