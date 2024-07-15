const moment = require('moment');

const DateTimeUtils = {

    /**
     * Converts a date-time string in the format 'YYYY-MM-DD HH:mm:ss.SSSZ' to epoch time in milliseconds.
     * @param {string} dateTimeString - The date-time string to convert.
     * @returns {number} The epoch time in milliseconds.
     */
    toEpoch: function (dateTimeString) {
        return moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss.SSSZ').valueOf();
    },

    /**
     * Converts epoch time in milliseconds to a date-time string in the format 'YYYY-MM-DD HH:mm:ss.SSSZ'.
     * @param {number} epochTime - The epoch time in milliseconds to convert.
     * @returns {string} The formatted date-time string.
     */
    fromEpoch: function (epochTime) {
        return moment(epochTime).format('YYYY-MM-DD HH:mm:ss.SSSZ');
    }
};

module.exports = DateTimeUtils;
