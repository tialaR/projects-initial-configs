import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { ComponentType, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RouteProps {
    isPrivate?: boolean;
    element: ComponentType;
}

const CustomRoute: React.FC<RouteProps> = ({ isPrivate = false, element: Component }) => {
    const hasLocalSelectedEvent = getLocalSelectedEvent();
    const isAuthenticated = !!hasLocalSelectedEvent?.event_name;
    const location = useLocation();
    const prevLocation = useRef<string | null>(null);
    const historyStack = useRef<string[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            window.history.pushState(null, "", window.location.href);
            const blockBack = () => {
                window.history.pushState(null, "", window.location.href);
            };
            window.addEventListener("popstate", blockBack);
            return () => {
                window.removeEventListener("popstate", blockBack);
            };
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isPrivate) {
            prevLocation.current = location.pathname;

            if (!historyStack.current.includes(location.pathname) && location.pathname !== "/") {
                historyStack.current.push(location.pathname);
            }

            const handleBackNavigation = () => {
                const lastPrivateRouteIndex = historyStack.current.length - 1;

                if (lastPrivateRouteIndex === 1) {
                    window.history.pushState(null, "", window.location.href);
                } else {
                    historyStack.current.pop();
                }
            };

            window.addEventListener("popstate", handleBackNavigation);
            return () => {
                window.removeEventListener("popstate", handleBackNavigation);
            };
        }
    }, [isPrivate, location.pathname]);

    if (isPrivate && !isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Component />;
};

export { CustomRoute };
