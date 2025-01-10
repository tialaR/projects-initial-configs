import { useState } from "react";
import { AxiosError } from "axios";
import api from "#services/api";
import { useToastInfo } from "#hooks/useToastInfo";

export type RegisteredEvent = {
    registered_event_id: string;
    event_name: string;
    event_month_pt_br: string;
    event_year: string;
};

const useGetRegisteredEvents = () => {
    const [events, setEvents] = useState<RegisteredEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const { showToast } = useToastInfo();

    const getEvents = async () => {
        setLoading(true);
        try {
            const response = await api.get<RegisteredEvent[]>('/registered_events');
            setEvents(response.data);
        } catch (err: any) {
            setError(err);
            showToast({
                type: "error",
                message: "Não foi possível carregar eventos!",
                description: "Tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return { events, loading, error, getEvents };
};

export { useGetRegisteredEvents };
