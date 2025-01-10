import { parse, format } from 'date-fns';

const formatTimeHourMinute = (time: string) => {
    if (!time) {
        return '';
    };

    const cleanTime = time.replace(/\D/g, '').slice(0, 4);

    if (cleanTime.length < 4) {
        return cleanTime
    };

    const hour = cleanTime.slice(0, 2);
    const minute = cleanTime.slice(2, 4);

    return format(
        parse(`${hour}:${minute}`, 'HH:mm', new Date()),
        'HH:mm');
};

export {
    formatTimeHourMinute
}
