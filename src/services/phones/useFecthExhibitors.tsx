import api from "#services/api";
import { useState } from "react";

type Phone = {
    phone_id: string;
    phone_name: string;
    phone_number: string;
    phone_health: number;
    registered_event_id: string;
};

type FetchPhonesResponse = Phone[];

type UseFetchPhonesReturn = {
    data: FetchPhonesResponse | null;
    loading: boolean;
    error: Error | null;
    fetchPhones: (registeredEventId: string) => Promise<void>;
};

export const useFetchPhones = (): UseFetchPhonesReturn => {
    const [data, setData] = useState<FetchPhonesResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchPhones = async (registeredEventId: string): Promise<void> => {
        if (!registeredEventId) return;

        setLoading(true);
        try {
            const response = await api.post<FetchPhonesResponse>('/registered_phones', { registered_event_id: registeredEventId });
            setData(response.data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchPhones };
};
