export const normalizeLabel = (label: string) =>
    label
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();