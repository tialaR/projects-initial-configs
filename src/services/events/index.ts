import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const useGetEvents = () => {
    const [events, setEvents] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://nwaf2guw07.execute-api.sa-east-1.amazonaws.com/Prod');
            setEvents(response.data);
            console.log('Events', response.data);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { events, loading, error, fetchEvents };
};

export { useGetEvents };
