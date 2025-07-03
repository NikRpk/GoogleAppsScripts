/**
 * Finds the zero-based index of a specific header within an array of headers.
 * This function is case-sensitive.
 *
 * @param {string[]} headers - An array of strings representing the header row of a dataset.
 * @param {string} header - The specific header string to find the index of.
 * @returns {number} The zero-based index of the header in the headers array.
 * @throws {Error} Throws an error if the specified header is not found in the array,
 * preventing potential downstream errors from using an index of -1.
 */
function getColIndex(headers, header) {
  const index = headers.indexOf(header);

  if (index === -1) {
    throw new Error(`Could not find '${header}' in the header row ${headers}`)
  }
  return index;
};
