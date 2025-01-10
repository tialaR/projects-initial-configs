import api from "#services/api";
import { useState } from "react";

type Exhibitor = {
    exhibitor_id: string;
    exhibitor_name: string;
};

type GetExhibitorsResponse = Exhibitor[];

type UseGetExhibitorsReturn = {
    data: GetExhibitorsResponse | null;
    loading: boolean;
    error: Error | null;
    fetchExhibitors: (registeredEventId: string) => Promise<void>;
};

export const useFecthExhibitors = (): UseGetExhibitorsReturn => {
    const [data, setData] = useState<GetExhibitorsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchExhibitors = async (registeredEventId: string): Promise<void> => {
        if (!registeredEventId) return;

        setLoading(true);
        try {
            const response = await api.post<GetExhibitorsResponse>('/exhibitors_list', {
                registered_event_id: registeredEventId,
            });
            setData(response.data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchExhibitors };
};
