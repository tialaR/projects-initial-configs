import { useToastInfo } from "#hooks/useToastInfo";
import api from "#services/api";
import { useState } from "react";

type CampaignReportDetailInput = {
    registered_event_id: string;
    campaign_id: string;
};

type CampaignReportDetailContent = {
    campaign_content_id: string;
    exhibitor_name: string;
    leads_response: number | null;
    percent_leads_response: number;
    leads_reached_sent: number | null;
    percent_leads_reached: number;
};

type CampaignReportDetail = {
    campaign_name: string;
    phone_name: string;
    phone_number: string;
    template_name: string;
    campaign_date: string;
    campaign_time: string;
    leads_reached: number;
    campaign_content: CampaignReportDetailContent[];
}[];

export const useCampaignReportDetail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<CampaignReportDetail | null>(null);
    const { showToast } = useToastInfo();

    const fetchReport = async ({ registered_event_id, campaign_id }: CampaignReportDetailInput) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post<CampaignReportDetail>("/report_campaign", {
                registered_event_id,
                campaign_id,
            });
            setData(response.data);
        } catch (err: any) {
            showToast({
                type: "error",
                message: "Não foi possível carregar!",
                description: "Tente novamente.",
            });
            setError("Erro ao buscar o relatório da campanha: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchReport };
};
