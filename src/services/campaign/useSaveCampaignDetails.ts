import { useState } from 'react';
import api from '#services/api';
import { useToastInfo } from '#hooks/useToastInfo';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            } else {
                reject(new Error("Failed to convert file to Base64"));
            }
        };

        reader.onerror = (error) => reject(error);
    });
};

export type CampaignDetails = {
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
    saveCampaignDetails: (campaignData: CampaignDetails) => Promise<void>;
};

export const useSaveCampaignDetails = (): UseSaveCampaignDetailsReturn => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const { showToast } = useToastInfo();

    const saveCampaignDetails = async (campaignData: CampaignDetails) => {
        setLoading(true);
        setError(null);

        try {
            let exhibitorFileBase64: string | null = null;
            if (campaignData.exhibitor_file) {
                exhibitorFileBase64 = await fileToBase64(campaignData.exhibitor_file);
            }

            const payload = {
                ...campaignData,
                exhibitor_file: exhibitorFileBase64,
            };

            const response = await api.post<string>('/update_campaign', payload);
            setData(response.data);

            showToast({
                type: "success",
                message: "Salva com sucesso!",
                description: 'Campanha salva.',
            });
        } catch (err) {
            alert(JSON.stringify(err));
            setError(err as Error);
            showToast({
                type: "error",
                message: "Não foi possível salvar!",
                description: "Tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, saveCampaignDetails };
};
