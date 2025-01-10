import { useState } from 'react';
import api from '#services/api';

type ResultsDrawerInfo = {
    delivered: number;
    delivered_percentage: number;
    interaction: number;
    interaction_percentage: number;
    not_responded: number;
    not_responded_percentage: number;
    opt_out: number;
    opt_out_percentage: number;
    campaign_execution: number;
    campaign_execution_percentage: number;
    mean_seconds_response_time: number;
    mean_minutes_response_time: number;
    mean_hour_response_time: number;
    unsended: number;
    failed: number;
    positive: number;
    negative: number;
};

type UseResultsDrawerInfoReturn = {
    data: ResultsDrawerInfo | null;
    loading: boolean;
    error: string | null;
    fetchResultsDrawerInfo: (campaign_content_id: string) => Promise<void>;
};

export function useResultsDrawerInfo(): UseResultsDrawerInfoReturn {
    const [data, setData] = useState<ResultsDrawerInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchResultsDrawerInfo = async (campaign_content_id: string): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post<ResultsDrawerInfo>('/results_drawer_info', {
                campaign_content_id,
            });

            setData(response.data);
        } catch (err: any) {
            setError('Erro ao buscar informações do drawer: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        fetchResultsDrawerInfo,
    };
}
