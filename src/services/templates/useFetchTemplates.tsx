import api from "#services/api";
import { useState } from "react";

type Template = {
    template_id: string;
    template_name: string;
    status: string;
};

type FetchTemplatesResponse = Template[];

type UseFetchTemplatesReturn = {
    data: FetchTemplatesResponse | null;
    loading: boolean;
    error: Error | null;
    fetchTemplates: (registeredEventId: string) => Promise<void>;
};

export const useFetchTemplates = (): UseFetchTemplatesReturn => {
    const [data, setData] = useState<FetchTemplatesResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchTemplates = async (registeredEventId: string): Promise<void> => {
        if (!registeredEventId) return;

        setLoading(true);
        try {
            const response = await api.post<FetchTemplatesResponse>('/registered_templates', {
                registered_event_id: registeredEventId,
            });
            setData(response.data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchTemplates };
};
