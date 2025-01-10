import { useToastInfo } from "#hooks/useToastInfo";
import api from "#services/api";
import { useState } from "react";

type Campaign = {
    campaign_id: string;
    campaign_name: string;
    template_name: string;
    campaign_date: string;
    campaign_time: string;
    campaign_exhibitors: number;
};

type UseGeneralCampaignsReturn = {
    date: Campaign[] | null;
    loading: boolean;
    error: Error | null;
    fetchCampaigns: (registeredEventId: string) => Promise<void>;
};

export const useGeneralCampaigns = (): UseGeneralCampaignsReturn => {
    const [date, setData] = useState<Campaign[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const { showToast } = useToastInfo();

    const fetchCampaigns = async (registeredEventId: string): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const { data } = await api.post<Campaign[]>("/general_campaigns",
                { registered_event_id: registeredEventId }
            );
            setData(data);
        } catch (err) {
            setError(err as Error);
            showToast({
                type: "error",
                message: "Não foi possível carregar campanhas!",
                description: "Tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return { date, loading, error, fetchCampaigns };
};

