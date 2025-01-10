import api from "#services/api";
import { useState } from "react";

export type CampaignDetails = {
    campaign_name: string;
    exhibitor_name: string;
    campaign_date: string;
    campaign_time: string;
    phone_name: string;
    phone_number: string;
    template_id: string;
    template_name: string;
    leads_reached: number;
    classification: boolean;
    clustering: boolean;
    recommendation: boolean;
    leadster_ml_engine: string;
    exhibitor_description: string;
    exhibitor_contact_name: string;
    exhibitor_contact_number: string;
    exhibitor_file: File | null;
};

type UseCampaignDetailsReturn = {
    data: CampaignDetails[] | null;
    loading: boolean;
    error: Error | null;
    fetchCampaignDetails: (registered_event_id: string, campaign_content_id: string) => Promise<void>;
};

export const useCampaignDetails = (): UseCampaignDetailsReturn => {
    const [data, setData] = useState<CampaignDetails[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchCampaignDetails = async (registered_event_id: string, campaign_content_id: string) => {
        setLoading(true);
        try {
            const { data } = await api.post<CampaignDetails[]>('/registered_campain',
                { registered_event_id, campaign_content_id }
            );
            setData(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchCampaignDetails };
};