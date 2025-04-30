/**
 * Formats a date into a relative time string (e.g., "2 minutes ago", "3 hours ago", etc.)
 * @param {Date|string|number} date - The date to format (Date object, ISO string, or timestamp)
 * @param {Date|string|number} [baseDate=new Date()] - The base date to compare against (defaults to now)
 * @returns {string} The formatted relative time string
 */
export function getRelativeTimeString(date: Date, baseDate = new Date()) {
  // Convert both dates to milliseconds
  const inputDate = new Date(date).getTime();
  const currentDate = new Date(baseDate).getTime();

  // Calculate the difference in milliseconds
  const diffInMs = currentDate - inputDate;

  // Return "just now" for very recent times
  if (diffInMs < 1000) {
    return "just now";
  }

  // Convert to seconds
  const diffInSecs = Math.floor(diffInMs / 1000);

  // Less than a minute
  if (diffInSecs < 60) {
    return `${diffInSecs} second${diffInSecs !== 1 ? "s" : ""} ago`;
  }

  // Convert to minutes
  const diffInMins = Math.floor(diffInSecs / 60);

  // Less than an hour
  if (diffInMins < 60) {
    return `${diffInMins} minute${diffInMins !== 1 ? "s" : ""} ago`;
  }

  // Convert to hours
  const diffInHours = Math.floor(diffInMins / 60);

  // Less than a day
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  // Convert to days
  const diffInDays = Math.floor(diffInHours / 24);

  // Less than a week
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  // Convert to weeks
  const diffInWeeks = Math.floor(diffInDays / 7);

  // Less than a month (approximately)
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
  }

  // Convert to months
  const diffInMonths = Math.floor(diffInDays / 30);

  // Less than a year
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  }

  // Convert to years
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
}
