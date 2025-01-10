import api from "#services/api";
import { useState } from "react";
import { useToastInfo } from "#hooks/useToastInfo";

type CampaignLeadsListInput = {
    registered_event_id: string;
    campaign_content_id: string;
};

export const useCampaignLeadsList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToastInfo();

    const fetchLeadsList = async ({ registered_event_id, campaign_content_id }: CampaignLeadsListInput) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post<string>(
                "/leads_list",
                { registered_event_id, campaign_content_id },
                { responseType: "text" }
            );

            const csvData = convertTxtToCsv(response.data);
            downloadCsv(csvData);

            showToast({
                type: "success",
                message: "Download concluído com sucesso!",
                description: "Seu arquivo já está disponível.",
            });
        } catch (err: any) {
            setError("Erro ao processar a lista de leads: " + err.message);
            showToast({
                type: "error",
                message: "Não foi possível fazer o download!",
                description: "Verifique sua conexão e tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    const convertTxtToCsv = (txtData: string) => {
        return txtData
            .trim()
            .replace(/^"(.*)"$/, '$1')
            .replace(/\\n/g, "\n")
            .split("\n")
            .map(line => {
                const columns = line.split(",");
                return columns.map(col => decodeBase64(col)).join(",");
            })
            .join("\n");
    };


    const isBase64 = (str: string) => {
        return /^[A-Za-z0-9+/=]+$/.test(str) && str.length % 4 === 0;
    };

    const decodeBase64 = (value: string) => {
        try {
            return isBase64(value) ? atob(value) : value;
        } catch (error) {
            console.warn("Erro ", error)
            console.warn("Erro ao decodificar Base64:", value);
            return value;
        }
    };


    const downloadCsv = (csvData: string) => {
        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csvData], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", "leads_list.csv");
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return { loading, error, fetchLeadsList };
};
