import { useRef, useEffect, useState } from "react";
import * as S from "./styles";
import { Icon } from "#components/Icon";
import { ENGINE_OPTIONS, EngineOption } from "#utils/formatEngineValueToLabel";

export type ClassificationEngine = 'ótimo' | 'bom' | 'regular' | 'ruim' | 'indisponível';
export type DefaultEngine = 'disponível' | 'indisponível';
export type MlEngine = 'classification' | 'clustering' | 'recommendation' | '' | null;

type EngineDataFromApi = {
    classification: ClassificationEngine;
    clustering: DefaultEngine;
    recommendation: DefaultEngine;
    leadsterMlEngine: MlEngine;
};

type SelectByEngineProps = {
    engineData: EngineDataFromApi;
    loading?: boolean;
    onSelect: (selectedEngine: EngineOption | null) => void;
};

const SelectByEngine = ({ engineData, onSelect, loading }: SelectByEngineProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<EngineOption | null>(null);
    const [filteredOptions, setFilteredOptions] = useState<EngineOption[]>([]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // define o engine selecionado se vier preenchido pela API
    useEffect(() => {
        if (engineData.leadsterMlEngine) {
            const foundedEngine = ENGINE_OPTIONS.find(engineOption => engineOption.id === engineData.leadsterMlEngine);
            if (foundedEngine) {
                setSelected(foundedEngine);
                onSelect(foundedEngine);
            }
        } else {
            setSelected(null);
            onSelect(null);
        }
    }, [engineData.leadsterMlEngine]);

    // filtra as opções de acordo com as regras
    useEffect(() => {
        const validOptions: EngineOption[] = [];

        ENGINE_OPTIONS.forEach(option => {
            if (option.id === 'classification') {
                const value = engineData.classification;
                if (value !== 'indisponível') {
                    validOptions.push(option);
                }
            }

            if (option.id === 'clustering' && engineData.clustering === 'disponível') {
                validOptions.push(option);
            }

            if (option.id === 'recommendation' && engineData.recommendation === 'disponível') {
                validOptions.push(option);
            }
        });

        setFilteredOptions(validOptions);
    }, [engineData]);

    const handleSelectEngine = (engine: EngineOption) => {
        const newSelected = selected?.id === engine.id ? null : engine;
        setSelected(newSelected);
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
        if (loading) return <span>Carregando Engine</span>;
        if (selected?.label) return <span>{selected.label}</span>;
        return <span>Selecionar Engine</span>;
    };

    return (
        <S.Container ref={dropdownRef}>
            <S.SelectButton onClick={() => setIsOpen((prev) => !prev)}>
                <span>{renderSelectedEngine()}</span>
                <S.IconWrapper isOpen={isOpen}>
                    <Icon name="arrowDownSmall" size={24} />
                </S.IconWrapper>
            </S.SelectButton>

            {isOpen && (
                <S.Modal>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <S.OptionItem key={option.id} onClick={() => handleSelectEngine(option)}>
                                <span>{option.label}</span>
                            </S.OptionItem>
                        ))
                    ) : (
                        <span>Nenhuma Engine disponível</span>
                    )}
                </S.Modal>
            )}
        </S.Container>
    );
};

export { SelectByEngine };
