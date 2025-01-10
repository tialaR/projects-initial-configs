import { useState } from 'react';
import api from '#services/api';

type RegisteredCampaign = {
    campaign_content_id: string;
    campaign_name: string;
    exhibitor_name: string;
    campaign_date: string;
    campaign_time: string;
    campaign_status: string;
};

type UseRegisteredCampaignsReturn = {
    data: RegisteredCampaign[] | null;
    loading: boolean;
    error: Error | null;
    fetchRegisteredCampaigns: (registered_event_id: string) => Promise<void>;
};

export const useRegisteredCampaigns = (): UseRegisteredCampaignsReturn => {
    const [data, setData] = useState<RegisteredCampaign[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchRegisteredCampaigns = async (registered_event_id: string) => {
        setLoading(true);
        try {
            const { data } = await api.post<RegisteredCampaign[]>('/registered_campaigns',
                { registered_event_id }
            );
            setData(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchRegisteredCampaigns };
};
