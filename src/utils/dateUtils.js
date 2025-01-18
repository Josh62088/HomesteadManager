const moment = require("moment");

module.exports = {
  currentDate: () => moment().format("YYYY-MMM-DD"),
  daysBetween: (startDate, endDate) =>
    moment(endDate).diff(moment(startDate), "days"),
};
