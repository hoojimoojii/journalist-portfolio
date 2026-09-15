const {
    DateTime
} = require("luxon");


module.exports = (dateObj, format = 'LLLL dd, yyyy') => {
    if (dateObj instanceof Date) {
        return DateTime.fromJSDate(dateObj, {
            zone: 'utc',
            locale: "en"
        }).toFormat(format);
    } else {
        return DateTime.fromISO(dateObj, {
            zone: "utc",
            locale: "en"
        }).toFormat(format);
    }
};