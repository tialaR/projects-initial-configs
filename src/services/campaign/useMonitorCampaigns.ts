import { useState } from "react";
import api from "#services/api";
import { useToastInfo } from "#hooks/useToastInfo";

type MonitorCampaign = {
    campaign_content_id: string;
    campaign_name: string;
    exhibitor_id: string;
    exhibitor_name: string;
    exhibitor_leads: number | null;
    leads_reached: number;
    positive_leads: number;
    campaign_status: string;
};

type UseMonitorCampaignsReturn = {
    data: MonitorCampaign[] | null;
    loading: boolean;
    error: Error | null;
    fetchMonitorCampaigns: (registered_event_id: string) => Promise<void>;
};

export const useMonitorCampaigns = (): UseMonitorCampaignsReturn => {
    const [data, setData] = useState<MonitorCampaign[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const { showToast } = useToastInfo();

    const fetchMonitorCampaigns = async (registered_event_id: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post<MonitorCampaign[]>("/monitor_campaigns",
                { registered_event_id }
            );
            setData(data);
        } catch (err) {
            setError(err as Error);
            showToast({
                type: "error",
                message: "Não foi possível carregar acompanhar campanhas!",
                description: "Tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchMonitorCampaigns };
};
