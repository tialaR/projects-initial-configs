import { RegisteredEvent } from "#services/events/useGetRegisteredEvents";

const getLocalSelectedEvent = (): RegisteredEvent | null => {
    const selectedEvent = localStorage.getItem('@Leadster-Informa-Markets:selectedEvent');
    let selectedEventParsed = null;
    if (selectedEvent) {
        selectedEventParsed = (JSON.parse(selectedEvent));
    }
    return selectedEventParsed;
};

const updateLocalSelectedEvent = (selectedEvent: RegisteredEvent): void => {
    localStorage.setItem('@Leadster-Informa-Markets:selectedEvent', JSON.stringify(selectedEvent));
};

const removeLocalSelectedEvent = (): void => {
    localStorage.removeItem('@Leadster-Informa-Markets:selectedEvent');
};

export {
    getLocalSelectedEvent,
    updateLocalSelectedEvent,
    removeLocalSelectedEvent,
};

