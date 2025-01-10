import { ReactNode } from "react";

/**
 * Normalizes a 2D array of table data by ensuring each row has the same number of columns.
 *
 * @param rows - A 2D array of table data, where each inner array represents a row.
 * @returns An object with the following properties:
 *   - `maxColumnCount`: The maximum number of columns across all rows.
 *   - `normalizedRows`: The input rows with any missing columns filled with `null` values.
 */

type RowData = {
    id: number;
    row: ReactNode[];
};

export const normalizeTableData = (
    rows: { id: number; row: ReactNode[] }[]
): { maxColumnCount: number; normalizedRows: RowData[] } => {
    if (!Array.isArray(rows)) {
        throw new TypeError("Expected 'rows' to be an array of objects.");
    }

    const maxColumnCount = Math.max(
        0,
        ...rows.map((row) => (Array.isArray(row.row) ? row.row.length : 0))
    );

    const normalizedRows = rows.map(({ id, row }) => {
        const missingColumnCount = maxColumnCount - row.length;
        return { id, row: [...row, ...Array(missingColumnCount).fill(null)] };
    });

    return { maxColumnCount, normalizedRows };
};