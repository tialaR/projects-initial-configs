import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routesNames } from "#utils/routesNames";
import { removeLocalSelectedEvent } from "#utils/localStorageItems";

const allowedRoutes = new Set([
    routesNames.GENERAL_CAMPAIGN,
    routesNames.CREATE_CAMPAIGN,
    routesNames.EXHIBITOR_CAMPAIGN,
    routesNames.CONFIGURE_CAMPAIGN,
    routesNames.FOLLOW_CAMPAIGN,
    routesNames.REPORTS_AND_RESULTS,
    routesNames.DETAIL_REPORTS_AND_RESULTS,
]);

const RouteWatcher: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (!allowedRoutes.has(location.pathname)) {
            removeLocalSelectedEvent();
        }
    }, [location.pathname]);

    return null;
};

export { RouteWatcher };
