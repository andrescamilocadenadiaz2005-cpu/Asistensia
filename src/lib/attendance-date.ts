const ATTENDANCE_TIME_ZONE = "America/Bogota";

function getLocalDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: ATTENDANCE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

function getTimeZoneOffset(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: ATTENDANCE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const localAsUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );

  return localAsUtc - date.getTime();
}

function localMidnightToUtc(year: number, month: number, day: number) {
  const midnightAsUtc = Date.UTC(year, month - 1, day);
  let timestamp = midnightAsUtc;

  for (let iteration = 0; iteration < 2; iteration += 1) {
    timestamp = midnightAsUtc - getTimeZoneOffset(new Date(timestamp));
  }

  return new Date(timestamp);
}

export function getAttendanceDayRange(date = new Date()) {
  const { year, month, day } = getLocalDateParts(date);
  const start = localMidnightToUtc(year, month, day);
  const nextDay = new Date(Date.UTC(year, month - 1, day + 1));
  const end = localMidnightToUtc(
    nextDay.getUTCFullYear(),
    nextDay.getUTCMonth() + 1,
    nextDay.getUTCDate(),
  );

  return { start, end };
}

export const attendanceTimeZone = ATTENDANCE_TIME_ZONE;
