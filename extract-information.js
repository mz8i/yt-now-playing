function rawCharacterToRegex(character) {
    if ('\\^$*+?.()|{}[]'.includes(character)) {
        character = '\\' + character;
    }
    return character;
}

function isGrouppedRegexString(regexString) {
    return !!regexString.match(/^\(.*\)$/);
}

const TITLE_REGEX = '(.+?)';
const TIME_REGEX = '(?:\\d+:)?\\d+:\\d{1,2}';
const NUMBER_REGEX = '[a-zA-Z]?\\d+';

const regexFunctions = [
    () => '\\s+',
    () => `(${TIME_REGEX})`,
    () => `(${NUMBER_REGEX})`,
    function (rows, dir) {
        const first = rows[0];
        const char = dir === -1 ? first[0] : first[first.length - 1];
        return rawCharacterToRegex(char);
    }
];

const informationRegexStrings = [
    { name: 'timeString', regexString: TIME_REGEX },
    { name: 'number', regexString: NUMBER_REGEX },
    { name: 'title', regexString: TITLE_REGEX }
];

function tryAddition(state, regexFunctions, direction) {
    if (state.rows.length === 0) return false;

    for (const fn of regexFunctions) {
        const addition = fn(state.rowRemainders, direction);

        let titleRegexReplacement;
        if (direction === -1) {
            titleRegexReplacement = addition + TITLE_REGEX;
        } else if (direction === 1) {
            titleRegexReplacement = TITLE_REGEX + addition;
        }

        const regExp = new RegExp('^' + titleRegexReplacement + '$');
        const matches = state.rowRemainders.map(r => r.match(regExp));

        if (matches.every(x => !!x)) {

            state.regexString = state.regexString.replace(TITLE_REGEX, titleRegexReplacement);

            if (isGrouppedRegexString(addition) && direction === -1) {
                state.freeFormGroupIndex += 1;
            }

            state.rowRemainders = state.rows.map(
                r => r.match(new RegExp(state.regexString))[state.freeFormGroupIndex]
            );

            return true;
        }

    }

    return false;
}

function buildRegex(rows, regexFunctions) {
    if (!rows || rows.length === 0) return null;

    const initialRegex = '^' + TITLE_REGEX + '$';
    const parsingState = {
        rows: rows.slice(0),
        rowRemainders: rows.slice(0),
        regexString: initialRegex,
        freeFormGroupIndex: 1
    };

    while (tryAddition(parsingState, regexFunctions, -1)) { }

    while (tryAddition(parsingState, regexFunctions, 1)) { }

    if (parsingState.regexString === initialRegex) return null;

    return parsingState.regexString;
}

function parseTime(timeString) {
    const timeParts = timeString.split(':');

    let totalSeconds = 0;

    for (const timePart of timeParts) {
        totalSeconds *= 60;
        totalSeconds += parseInt(timePart, 10);
    }

    return totalSeconds;
}

function extractTrackDetails(match, informationRegexes) {
    const details = match.slice(1) // get rid of full match
        .map(m => ({
            group: m,
            matchedRegex: informationRegexes.find(ir => m.match(ir.regex))
        }))
        .filter(x => x.matchedRegex != undefined)
        .reduce((result, entry) => {
            result[entry.matchedRegex.name] = entry.group;
            return result;
        }, {});

    details.time = parseTime(details.timeString);

    return details;
}

function extractTracklist(rows, regexString, informationRegexStrings) {
    const regex = new RegExp(regexString);
    const informationRegexes = informationRegexStrings.map(x => ({
        name: x.name,
        regex: new RegExp(`^${x.regexString}$`)
    }));
    return rows.map(r => r.match(regex))
        .map(m => extractTrackDetails(m, informationRegexes));
}

function parseTracklist(description) {
    if (!description) return null;

    const rows = description.split('\n')
        .map(r => r.trim())
        .filter(x => x.match(new RegExp(TIME_REGEX)));

    if (!rows) return null;

    const regexString = buildRegex(rows, regexFunctions);

    if (regexString === null) {
        return null;
    } else {
        return extractTracklist(rows, regexString, informationRegexStrings);
    }
}

function getTrackList(candidates) {
    let tracklist = null;
    if (!candidates) return tracklist;

    for (const candidate of candidates) {
        tracklist = parseTracklist(candidate);
        if (tracklist) break;
    }

    return tracklist;
}