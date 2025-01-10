import api from "#services/api";
import { useState } from "react";

type RegisterCampaignInput = {
    campaign_name: string;
    registered_event_id: string;
    phone_id: string;
    template_id: string;
    exhibitors_list: string[];
    leads_reached: number;
    launch_date: string;
    launch_time: string;
};

type UseRegisterCampaignReturn = {
    data: string | null;
    loading: boolean;
    error: Error | null;
    registerCampaign: (campaignData: RegisterCampaignInput) => Promise<boolean>;
};

export const useRegisterCampaign = (): UseRegisterCampaignReturn => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const registerCampaign = async (campaignData: RegisterCampaignInput): Promise<boolean> => {
        setLoading(true);
        try {
            const { data, status } = await api.post<string>('/register_campaign', campaignData);

            if (status === 200 && data) {
                setData(data);
                return true;
            }

            throw new Error("Resposta inválida da API");
        } catch (err) {
            setError(err as Error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, registerCampaign };
};

