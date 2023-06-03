import dayjs from 'dayjs';

export function getRemainingTimeUntilMsTimestamp(timestampMs) {
    const timestampDayjs = dayjs(timestampMs);
    const nowdayjs = dayjs();
    // for the timer not to be in negative values 

    if (timestampDayjs.isBefore(nowdayjs)) {
        return false

    }

    return {
        seconds: getRemainingSeconds(nowdayjs, timestampDayjs),
        minutes: getRemainingMinutes(nowdayjs, timestampDayjs),
        hours: getRemainingHours(nowdayjs, timestampDayjs),
        days: getRemainingDays(nowdayjs, timestampDayjs),


    }







}


function getRemainingSeconds(nowdayjs, timestampDayjs) {
    const seconds = timestampDayjs.diff(nowdayjs, 'seconds') % 60;
    return seconds;
}
function getRemainingMinutes(nowdayjs, timestampDayjs) {
    const minutes = timestampDayjs.diff(nowdayjs, 'minutes') % 60;
    return minutes;
}
function getRemainingHours(nowdayjs, timestampDayjs) {
    const hours = timestampDayjs.diff(nowdayjs, 'hours') % 24;
    return hours;
}
function getRemainingDays(nowdayjs, timestampDayjs) {
    const days = timestampDayjs.diff(nowdayjs, 'days') % 60;
    return days;
}
