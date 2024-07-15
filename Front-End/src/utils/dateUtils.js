import moment from "moment";

export const DATE_FORMAT = "DD/MM/YYYY";

export const DATE_TIME_FORMAT = "DD/MM/YYYY hh:mm A";

export const TIME_FORMAT = "hh:mm A";

export const MUI_DATE_FORMAT = "YYYY-MM-DD";

/**
 * Converts date to epoch
 * @example
 * toEpoch(new Date( ));
 * // returns epoch of given date
 * @returns {long} Returns long data type of date
 */

export const toEpoch = (date) => {
    return date && moment(date, MUI_DATE_FORMAT).unix();
};

/**
 * Converts epoch to moment
 * @example
 * fromEpoch(1670970530);
 * // returns Moment instance of : Tuesday, December 13, 2022 10:28:50 PM
 * @returns {moment} Returns the moment instance
 */

export const fromEpoch = (epoch) => {
    return epoch ? moment(epoch).format() : null;
};

export const formatDate = (date, format = DATE_TIME_FORMAT) => {
    return date && moment(date).format(format) || null;
};

export const fromEpochToMuiDate = (epoch) => {
    if (!epoch) {
        return null;
    }
    return moment.unix(epoch).format(MUI_DATE_FORMAT);
};

export const fromDateObjectToMuiDate = (date) => {
    if (!date) {
        return null;
    }

    const momentDate = moment(date);
    const formattedDate = momentDate.format("YYYY-MM-DD");
    return formattedDate;
};


export const fromMuiDateEpoch = (date = "") => {
    const momentDate = moment(date, MUI_DATE_FORMAT).unix();
    return momentDate;
};

export function fromDateObjectToEpoch(dateObj) {
    const momentObj = moment(dateObj);
    const epochTime = momentObj.unix();
    return epochTime;
}

export const getRelativeTime = (dateString) => {
    const date = moment(dateString, "YYYY-MM-DD HH:mm:ss.SSSZ");

    return date.fromNow();
};


export const convertToHumanReadableDate = (isoDateString, format = "MMMM Do YYYY, h:mm:ss a") => {
    return moment(isoDateString).format(format);
};


export function formatDuration(seconds) {
    return moment.utc(seconds * 1000).format("HH:mm:ss");
}

export function formatCourseDuration(seconds) {
    return moment.utc(seconds * 1000).format("HH:mm");
}

export const formattedDateToLocal = (dateStr) => moment(dateStr).format("DD/MM/YYYY");
