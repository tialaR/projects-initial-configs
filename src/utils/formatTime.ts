import { parse, format } from 'date-fns';

const formatTimeHourMinute = (time: string) => {
    if (!time) {
        return '';
    }

    const cleanTime = time.replace(/\D/g, '').slice(0, 4);

    if (cleanTime.length < 4) {
        return cleanTime;
    }

    let hour = parseInt(cleanTime.slice(0, 2), 10);
    let minute = parseInt(cleanTime.slice(2, 4), 10);

    if (hour > 23) hour = 23;
    if (minute > 59) minute = 59;

    return format(parse(
        `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        'HH:mm', new Date()), 'HH:mm');
};

export { formatTimeHourMinute };
