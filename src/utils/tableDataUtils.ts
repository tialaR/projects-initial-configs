type RowData<T extends readonly unknown[]> = {
    id: number | string;
    row: T;
};

export const normalizeTableData = <T extends readonly unknown[]>(
    rows: RowData<T>[]
): { maxColumnCount: number; normalizedRows: RowData<T>[] } => {
    if (!Array.isArray(rows)) {
        throw new TypeError("Expected 'rows' to be an array of objects.");
    }

    const maxColumnCount = Math.max(
        0,
        ...rows.map((row) => row.row.length)
    );

    const normalizedRows: RowData<T>[] = rows.map(({ id, row }) => {
        const missingColumnCount = maxColumnCount - row.length;
        const normalizedRow = [...row, ...Array(missingColumnCount).fill(null)] as unknown as T;

        return { id, row: normalizedRow };
    });

    return { maxColumnCount, normalizedRows };
};
