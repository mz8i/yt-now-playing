function getDescription(document) {
    const descriptionElement = document.getElementById('description');

    if (descriptionElement === undefined) return null;

    return descriptionElement.textContent;
}

function getTopTracklistComment(document) {
    return null;
}

function getTracklistCandidates(document) {
    const description = getDescription(document);

    if (description === null) {
        return null;
    }

    const candidates = [description];

    const topComment = getTopTracklistComment(document);

    if (topComment !== null) candidates.push(topComment);

    return candidates;
}