import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { routesNames } from "#utils/routesNames";
import { RegisteredEvent } from "#services/events/useGetRegisteredEvents";

const { LOGIN_FIRST_EVENT } = routesNames;

const useSelectedEvent = () => {
    const location = useLocation();
    const selectedEventParam = location.state?.selectedEvent as RegisteredEvent | undefined;
    const isLoginFirstEventPage = location.pathname === LOGIN_FIRST_EVENT;

    const [selectedLocalEvent, setSelectedLocalEvent] = useState<RegisteredEvent | null>(getLocalSelectedEvent());

    const updateSelectedEvent = useCallback((selectedEvent: RegisteredEvent) => {
        setSelectedLocalEvent(selectedEvent);
    }, []);

    useEffect(() => {
        setSelectedLocalEvent(getLocalSelectedEvent());
    }, [selectedEventParam, isLoginFirstEventPage]);

    return { selectedLocalEvent, updateSelectedEvent };
};

export { useSelectedEvent };
