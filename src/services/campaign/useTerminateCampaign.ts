import { useState } from "react";
import api from "#services/api";

interface TerminateCampaignParams {
    registered_event_id: string;
    campaign_name: string;
    exhibitor_id: string;
    campaign_content_id: string;
}

export const useTerminateCampaign = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const terminateCampaign = async (params: TerminateCampaignParams) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.post("/terminate_campaign", params);
            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (err) {
            setError("Erro ao encerrar a campanha. Tente novamente: " + err);
        } finally {
            setLoading(false);
        }
    };

    return { terminateCampaign, loading, error, success };
};
