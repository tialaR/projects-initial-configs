import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { EventOption } from "#components/RadioButtonEventList";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { routesNames } from "#utils/routesNames";

const { LOGIN_FIRST_EVENT } = routesNames;

const useSelectedEvent = () => {
    const location = useLocation();
    const selectedEventParam = location.state?.selectedEvent as EventOption | undefined;
    const isLoginFirstEventPage = location.pathname === LOGIN_FIRST_EVENT;

    const [selectedLocalEvent, setSelectedLocalEvent] = useState<EventOption | null>(getLocalSelectedEvent());

    const updateSelectedEvent = useCallback((selectedEvent: EventOption) => {
        setSelectedLocalEvent(selectedEvent);
    }, []);

    useEffect(() => {
        setSelectedLocalEvent(getLocalSelectedEvent());
    }, [selectedEventParam, isLoginFirstEventPage]);

    return { selectedLocalEvent, updateSelectedEvent };
};

export { useSelectedEvent };
