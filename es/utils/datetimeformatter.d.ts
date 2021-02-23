/**
 * @param timeStamp eg:1551323702241
 * @param formatter eg:yyyy-MM-dd yyyy/MM/dd yyyy-M-d yyyy/M/d yyyy-MM-dd hh:mm:ss
 * @returns formatted date string
 */
declare function timestamp2String(timeStamp: number, formatter: string): string;
/**
 * @param date eg: new Date(2019, 7, 2, 23, 58, 12), 1551323702241
 * @param formatter eg:yyyy-MM-dd yyyy/MM/dd yyyy-M-d yyyy/M/d yyyy-MM-dd hh:mm:ss
 * @returns formatted date string
 */
declare function date2String(date: Date | number, formatter: string): string;
declare const _default: {
    timestamp2String: typeof timestamp2String;
    date2String: typeof date2String;
};
export default _default;
