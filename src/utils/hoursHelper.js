import moment from 'moment';

/** Constants */
export const LIMITED_AVAILABILITY = 'LIMITED_AVAILABILITY';
export const STAT_HOLIDAY = 'STAT_HOLIDAY';
export const SHOP_OPEN = 'SHOP_OPEN';
export const SHOP_CLOSED = 'SHOP_CLOSED';

/** Variables */
const CURR_DATE = moment();
const CURR_WEEK = CURR_DATE.week();

const holidays = {
  /** Static Holidays */
  CHRISTMAS: moment(`12/25/${CURR_DATE.year()}`),
  BOXING_DAY: moment(`12/26/${CURR_DATE.year()}`),
  NEW_YEARS_DAY: moment(`1/1/${CURR_DATE.year()}`),
  CANADA_DAY: moment(`7/1/${CURR_DATE.year()}`),

  /** Variable Date Holidays (UPDATE THESE) */
  MAY_LONG: moment('5/20/2019'),
  GOOD_FRIDAY: moment('4/19/2019'),
  EASTER_MONDAY: moment('4/22/2019'),
  AUGUST_LONG: moment('8/5/2019'),
  FRIDAY_AUGUST_LONG: moment('8/2/2019'),
  LABOUR_DAY: moment('9/2/2019'),
  THANKSGIVING: moment('10/14/2019'),
  REMEMBERANCE_DAY: moment('11/11/2019'),
};

const isHoliday = Object.keys(holidays).some(day =>
  isSameDay(holidays[day], CURR_DATE)
);

/** Booleans */
const isLimitedAvailablity = CURR_WEEK === holidays.CHRISTMAS.week();
const OPEN_TIME = moment(`${CURR_DATE.format('YYYY/MM/DD')} 08:00`);
const CLOSE_TIME = moment(`${CURR_DATE.format('YYYY/MM/DD')} 17:00`);
const isWeekday = CURR_DATE.day() > 0 && CURR_DATE.day() < 6;
const isOpen = isWeekday && CURR_DATE.isBetween(OPEN_TIME, CLOSE_TIME);

/** Export */
export const openStatus = resolveStatus();

export function resolveStatusColor({ theme, openStatus }) {
  switch (openStatus) {
    case LIMITED_AVAILABILITY:
    case STAT_HOLIDAY:
      return theme.orange;
    case SHOP_OPEN:
      return theme.green;
    case SHOP_CLOSED:
    default:
      return theme.red;
  }
}

export function resolveStatusString(openStatus, messages) {
  switch (openStatus) {
    case LIMITED_AVAILABILITY:
      return messages.messages_shop_status_limited_availability.text;
    case STAT_HOLIDAY:
      return messages.messages_shop_status_holiday.text;
    case SHOP_OPEN:
      return messages.messages_shop_status_open.text;
    case SHOP_CLOSED:
    default:
      return messages.messages_shop_status_closed.text;
  }
}

function isSameDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return (
    a.date() === b.date() && a.month() === b.month() && a.year() === b.year()
  );
}

function resolveStatus() {
  if (isLimitedAvailablity) return LIMITED_AVAILABILITY;
  if (isHoliday) return STAT_HOLIDAY;
  if (isOpen) return SHOP_OPEN;
  return SHOP_CLOSED;
}
