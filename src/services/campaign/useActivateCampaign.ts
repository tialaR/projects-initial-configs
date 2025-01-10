import { useState } from 'react';
import api from '#services/api';

export type ActivateCampaign = {
    registered_event_id?: string;
    event_name?: string;
    campaign_content_id?: string;
    campaign_name?: string;
    exhibitor_id?: string;
    template_id?: string;
    event_phone_number?: string;
    leads_reached?: string;
    launch_datetime?: string;
    engine?: string;
    exhibitor_name?: string;
    exhibitor_description?: string;
    exhibitor_contact_name?: string;
    exhibitor_contact_phone?: string;
};

export const useActivateCampaign = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    const activateCampaign = async (payload: ActivateCampaign) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/activate_campaign', payload);
            setData(response.data);
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    return { activateCampaign, loading, error, data };
};
