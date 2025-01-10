import { routesNames } from '#utils/routesNames'

type RouteItemType = {
    label: string;
    iconName?: string;
    path: string;
};

const {
    LOGIN_FIRST_EVENT,
    CREATE_CAMPAIGN,
    PRE_FIRE_CAMPAIGN,
    FOLLOW_CAMPAIGN,
    REPORTS_AND_EXPORTS,
} = routesNames;

export const routeItems: RouteItemType[] = [
    { label: 'Login do Evento', path: LOGIN_FIRST_EVENT },
    { label: 'Criar Campanha', iconName: "createCampaign", path: CREATE_CAMPAIGN },
    { label: 'Campanha pré-disparo', iconName: "activeCampaign", path: PRE_FIRE_CAMPAIGN },
    { label: 'Acompanhar Campanha', iconName: "followCampaign", path: FOLLOW_CAMPAIGN },
    { label: 'Relatórios', iconName: "reports", path: REPORTS_AND_EXPORTS },
];
