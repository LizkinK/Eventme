/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (dateAll) {
  var [date, time] = dateAll.split(' ');
  var [years, months, days] = date.split('-');
  var [hours, minutes] = time.split(':');
  return {
    years: +years,
    months: +months,
    days: +days, 
    hours: +hours, 
    minutes: +minutes,
    add(quantity, unit) {
      if (quantity < 0 || this[unit] === undefined) {
        throw new TypeError();
      } else {
        this[unit] += quantity;
        this.format();
      }
      return this;
    },
    subtract(quantity, unit) {
      if (quantity < 0 || this[unit] === undefined) {
        throw new TypeError();
      } else {
        this[unit] -= quantity;
        this.format();
      }
      return this;
    },
    format() {
      const newDate = new Date(this.years, this.months - 1, this.days, this.hours, this.minutes);
      this.years = newDate.getFullYear();
      this.months = newDate.getMonth() + 1;
      this.days = newDate.getDate();
      this.hours = newDate.getHours();
      this.minutes = newDate.getMinutes();

      var months = this.months.toString();
      var days = this.days.toString();
      var hours = this.hours.toString();
      var minutes = this.minutes.toString();

      this.value = `${this.years}-${months.length > 1 ? months : '0' + months}-${days.length > 1 ? days : '0' + days} ${hours.length > 1 ? hours : '0' + hours}:${minutes.length > 1 ? minutes : '0' + minutes}`;
    },
    value: dateAll,
  }	
};

