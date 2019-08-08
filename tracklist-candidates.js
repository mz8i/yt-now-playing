function getDescription(document, isTracklistCandidateFn) {
    const descriptionElement = document.getElementById('description');

    if (descriptionElement === undefined) return null;

    const descriptionText = descriptionElement.textContent;

    if (!isTracklistCandidateFn(descriptionText)) {
        return null;
    }
    return descriptionText;
}

function getTopTracklistComments(document, isTracklistCandidateFn) {
    const nodeList = document
        .querySelectorAll('ytd-comment-renderer div#content');
    return Array.prototype.slice.call(nodeList, 0, 10)
        .map(x => x.textContent)
        .filter(isTracklistCandidateFn);

}

function getTracklistCandidates(document, isTracklistCandidateFn) {
    if (isTracklistCandidateFn == null) {
        return [];
    }
    
    const candidates = [];

    const description = getDescription(document, isTracklistCandidateFn);

    if (description != null) {
        candidates.push(description);
    }

    const topComments = getTopTracklistComments(document, isTracklistCandidateFn);

    if (topComments != null) {
        candidates.push(...topComments);
    }

    return candidates;
}