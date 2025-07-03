/**
 * Gets the current date and time and formats it as a string.
 * This function is useful for generating timestamps in a specific format.
 * The format used is "dd.MM.yyyy HH:mm:ss".
 *
 * @return {string} The current date and time formatted as "dd.MM.yyyy HH:mm:ss".
 */
function getFormattedDate(format) {
  const ft = format || "dd.MM.yyyy"; 
  var now = new Date();
  var formattedDate = Utilities.formatDate(now, "Europe/Berlin", ft);
  return formattedDate;
};
