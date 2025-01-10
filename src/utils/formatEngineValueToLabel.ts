export type EngineOption = {
    id: string;
    label: string;
    value: string;
    status: string; // TBD -> This status will be implemented in the future
    statusColor: string; // TBD -> This badge color will be implemented in the future
};

/* TBD -> The prop status and statusColor of EngineOption is going to be implemented in the future */
export const ENGINE_OPTIONS: EngineOption[] = [
    { id: "classification", label: "Class", value: 'classification', status: "TBD", statusColor: "positive100" },
    { id: "clustering", label: "Cluster", value: 'clustering', status: "TBD", statusColor: "info100" },
    { id: "recommendation", label: "Behaviour", value: 'recommendation', status: "TBD", statusColor: "warning100" }
];

export const formatEngineValueToLabel = (value: string): string => {
    const engine = ENGINE_OPTIONS.find(option => option.value === value);
    return engine ? engine.label : value;
};