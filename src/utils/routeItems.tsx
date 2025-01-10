import { routesNames } from '#utils/routesNames'

type RouteItemType = {
    label: string;
    iconName?: string;
    path: string;
};

const {
    LOGIN_FIRST_EVENT,
    GENERAL_CAMPAIGN,
    EXHIBITOR_CAMPAIGN,
    FOLLOW_CAMPAIGN,
    REPORTS_AND_RESULTS,
} = routesNames;

export const routeItems: RouteItemType[] = [
    { label: 'Login do Evento', path: LOGIN_FIRST_EVENT },
    { label: 'Campanha Geral', iconName: "generalCampaign", path: GENERAL_CAMPAIGN },
    { label: 'Campanha Expositor', iconName: "exhibitorCampaign", path: EXHIBITOR_CAMPAIGN },
    { label: 'Acompanhar Campanha', iconName: "followCampaign", path: FOLLOW_CAMPAIGN },
    { label: 'Relatórios e resultados', iconName: "reports", path: REPORTS_AND_RESULTS },
];
