/** Tests an array of inputs against their expexted types (e.g. is a dictionary really a dictionary). Accepted types are: string, number, boolean, array, object, function, spreadsheet, sheet, folder, folderId, fileId, file, date, null, and undefined. 
 * @param {array}   Each input and expected output is an array.
 * @return {string} Returns an error if encountered. Otherwise nothing. 
 */
function testVariableTypes(fncName, checks) {
    let errors = [];

    checks.forEach(([check, type]) => {
        switch (type) {
        case "string": 
            if (typeof check !== "string") errors.push(` '${check}' muss Text sein.`);
            break;

        case "number":
            if (typeof check !== "number") errors.push(`'${check}' muss eine Nummer sein.`);
            break;

        case "boolean":
            if (typeof check !== "boolean") errors.push(`'${check}' muss ein Wahrheitswert (Boolean) sein.`);
            break;

        case "array":
            if (!Array.isArray(check)) errors.push(`'${check}' muss eine Array sein.`);
            break;

        case "object":
            if (typeof check !== "object" || check === null || Array.isArray(check)) {
            errors.push(`'${check}' muss ein Javascript Objekt sein (kein null oder Array).`);
            }
            break;

        case "function":
            if (typeof check !== "function") errors.push(`'${check}' muss eine Funktion sein.`);
            break;

        case "spreadsheet":
            if (!check || typeof check.getId !== "function") { 
            errors.push(`'${check}' muss ein gültiges Google Spreadsheet-Objekt sein.`);
            }
            break;
        
        case "sheet":
            if (!check || typeof check.getName !== "function") { 
            errors.push(`'${check}' muss ein gültiges Google Sheet-Objekt sein.`);
            }
            break;

        case "folder":
            try {
            if (!check) throw new Error();
            } catch (e) {
            errors.push(`'${check}' muss ein gültiger Google Drive-Ordner sein.`);
            }
            break;

        case "folderId":
        case "fileId":
            if (typeof check !== "string" || !/^[a-zA-Z0-9_-]{20,}$/.test(check)) {
            errors.push(`'${check}' muss eine gültige Google Drive ${type === "folderId" ? "Ordner" : "Datei"}-ID sein.`);
            }
            break;
        
        case "file":
            if (!check || typeof check.getId !== "function") {
            errors.push(`${check}' muss eine gültige Google Drive-Datei sein.`);
            }
            break;

        case "date":
            if (!(check instanceof Date) || isNaN(check.getTime())) {
            errors.push(`'${check}' muss ein gültiges Datum sein.`);
            }
            break;

        case "null":
            if (check !== null) errors.push(`'${check}' muss null sein.`);
            break;

        case "undefined":
            if (typeof check !== "undefined") errors.push(`'${check}' muss undefined sein.`);
            break;

        default:
            errors.push(`⚠️ Unbekannter Validierungstyp: '${type}'.`);
        }
    });

    if (errors.length > 0) {
        throw new TypeError(`Validierung des Variablentyps fehlgeschlagen für Funktion: ${fncName}.\n ${errors.join("\n")}`);
    };
};