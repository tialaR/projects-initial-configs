import { useState } from "react";
import api from "#services/api";
import { useToastInfo } from "#hooks/useToastInfo";

export type CampaignReport = {
    campaign_id: string;
    campaign_name: string;
    campaign_date: string;
    campaign_time: string;
    campaign_exhibitors: number;
}

type UseReportCampaignsReturn = {
    data: CampaignReport[] | null;
    loading: boolean;
    error: Error | null;
    fetchReports: (eventId: string) => Promise<void>;
}

export const useReportCampaigns = (): UseReportCampaignsReturn => {
    const [data, setData] = useState<CampaignReport[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const { showToast } = useToastInfo();

    const fetchReports = async (eventId: string): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post<CampaignReport[]>('/report_campaigns', {
                registered_event_id: eventId,
            });

            setData(response.data);
            if (!response.data) {
                showToast({
                    type: "error",
                    message: "Nenhum relatório encontrado!",
                    description: "Tente novamente.",
                });
            }
        } catch (err) {
            setError(err as Error);
            showToast({
                type: "error",
                message: "Não foi possível carregar!",
                description: "Tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchReports };
};
