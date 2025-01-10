import { useState } from 'react';
import api from '#services/api';

type SaveCampaignInput = {
    registered_event_id: string;
    campaign_content_id: string;
    exhibitor_name: string;
    exhibitor_description: string;
    exhibitor_contact_name: string;
    exhibitor_contact_number: string;
    leadster_ml_engine: string;
    exhibitor_file: File | null;
};

type UseSaveCampaignDetailsReturn = {
    data: string | null;
    loading: boolean;
    error: Error | null;
    saveCampaignDetails: (campaignData: SaveCampaignInput) => Promise<void>;
};

export const useSaveCampaignDetails = (): UseSaveCampaignDetailsReturn => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const saveCampaignDetails = async (campaignData: SaveCampaignInput) => {
        setLoading(true);
        try {
            const { data } = await api.post<string>('/update_campaign',
                campaignData
            );
            setData(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, saveCampaignDetails };
};
