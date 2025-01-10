import { useState } from "react";
import api from "#services/api";
import * as XLSX from "xlsx";
import { useToastInfo } from "#hooks/useToastInfo";

type CampaignLeadsListInput = {
    registered_event_id: string;
    campaign_content_id: string;
};

export const useCampaignLeadsList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToastInfo();

    const fetchLeadsList = async ({
        registered_event_id,
        campaign_content_id,
    }: CampaignLeadsListInput) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post<string>(
                "/leads_list",
                { registered_event_id, campaign_content_id },
                { responseType: "text" }
            );

            const txtData = response.data;
            const rows = convertTxtToArray(txtData);
            downloadExcel(rows, "leads_list");

            showToast({
                type: "success",
                message: "Download concluído com sucesso!",
                description: "O arquivo Excel foi gerado com sucesso.",
            });
        } catch (err: any) {
            const errorMsg = "Erro ao processar a lista de leads: " + err.message;
            setError(errorMsg);

            showToast({
                type: "error",
                message: "Erro no download!",
                description: "Não foi possível gerar o Excel. Tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    const convertTxtToArray = (txtData: string) => {
        return txtData
            .trim()
            .replace(/^"(.*)"$/, "$1")
            .replace(/\\n/g, "\n")
            .split("\n")
            .map((line) => {
                const cols = line.split(",");
                return cols.map((col) => decodeBase64(col));
            });
    };

    const downloadExcel = (rows: string[][], filename: string) => {
        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

        XLSX.writeFile(workbook, `${filename}.xlsx`);
    };

    const isBase64 = (str: string) => {
        return /^[A-Za-z0-9+/=]+$/.test(str) && str.length % 4 === 0;
    };

    const decodeBase64 = (value: string) => {
        try {
            return isBase64(value) ? atob(value) : value;
        } catch {
            return value;
        }
    };

    return { loading, error, fetchLeadsList };
};
