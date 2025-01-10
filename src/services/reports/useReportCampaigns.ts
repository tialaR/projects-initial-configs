import { useState } from "react";
import api from "#services/api";

interface CampaignReport {
    campaign_id: string;
    campaign_name: string;
    campaign_date: string;
    campaign_time: string;
    campaign_exhibitors: number;
}

interface UseReportCampaignsReturn {
    data: CampaignReport[];
    isLoading: boolean;
    error: string | null;
    fetchReports: (eventId: string) => Promise<void>;
}

export const useReportCampaigns = (): UseReportCampaignsReturn => {
    const [data, setData] = useState<CampaignReport[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReports = async (eventId: string): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post<CampaignReport[]>('/report_campaigns', {
                registered_event_id: eventId,
            });

            setData(response.data);
        } catch (err: any) {
            setError("Erro ao buscar relatórios de campanhas. " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, fetchReports };
};
