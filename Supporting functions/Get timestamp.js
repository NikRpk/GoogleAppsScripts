/** Get the current timestamp. 
 * @return {string} Format: dd/mm/yyyy HH:MM
 */
function getTimestamp() {
    let now = new Date();
    let day = String(now.getDate()).padStart(2, "0");
    let month = String(now.getMonth() + 1).padStart(2,"0");
    let year = now.getFullYear();

    let hours = String(now.getHours()).padStart(2, "0"); // Get hours (0-23)
    let minutes = String(now.getMinutes()).padStart(2, "0"); // Get minutes (0-59)

    let timeDaystamp = `${day}.${month}.${year} ${hours}:${minutes}`; // Formats as dd/mm/yyyy HH:MM

    return timeDaystamp;
};