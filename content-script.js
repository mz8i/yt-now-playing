function getCurrentVideoId(window) {
  const videoIdMatch = window.location.href.match(/\/watch\?v=([0-9a-zA-Z]+)/);
  if(videoIdMatch == null) {
    return null;
  }
  return videoIdMatch[1];
}

function getCurrentVideoInfo(window) {
  return {
    videoId: getCurrentVideoId(window),
    videoDescription: getDescription(window.document, isTracklistCandidate),
    videoComments: getTopTracklistComments(window.document, isTracklistCandidate)
  };
}

function hasInfoChanged(oldVideoInfo, newVideoInfo) {
  return !_.isEqual(oldVideoInfo, newVideoInfo);
}

function updateVideoInfo(state, newVideoInfo, updateTime) {
  state.currentVideoInfo = newVideoInfo;
  state.isInfoChanging = true;
  state.lastInfoChange = updateTime;
}

function isInfoChangeComplete(state, currentTime, debounceMilliseconds) {
  return state.isInfoChanging &&
         currentTime.getTime() - state.lastInfoChange.getTime() >= debounceMilliseconds;
}

function getNowPlaying(time, tracklist) {
  if (!tracklist) return null;

  let i = 0;
  while (i < tracklist.length && time >= tracklist[i].time) i++;

  return i - 1;
}


const updateCompleteDebounceMillis = 1000;

const player = document.getElementById("movie_player");
const state = {
  currentVideoInfo: null,
  isInfoChanging: false,
  lastInfoChange: null,
  candidates: null, 
  tracklist: null,
  currentlyPlaying: -1,
  video: player.getElementsByTagName("video")[0]
};

function clearNowPlayingInfo(state) {
  state.currentlyPlaying = -1;
  state.tracklist = null
}

function updateTracklist(state, document) {
  state.candidates = getTracklistCandidates(document, isTracklistCandidate);
  console.log('candidates', state.candidates);
  state.tracklist = getTrackList(state.candidates);
  console.log(state.tracklist);
}

function updateNowPlayingInfo(state) {
  const newNowPlaying = getNowPlaying(state.video.currentTime, state.tracklist);

  if (newNowPlaying !== null && newNowPlaying !== state.currentlyPlaying) {

    state.currentlyPlaying = newNowPlaying;
    const track = state.tracklist[state.currentlyPlaying];

    console.log(track.title);

    chrome.runtime.sendMessage({
      name: track.title,
      time: track.time,
      index: state.currentlyPlaying
    });

  }
}

function loopFn() {
  const now = new Date();
  const newVideoInfo = getCurrentVideoInfo(window);

  if(hasInfoChanged(state.currentVideoInfo, newVideoInfo)) {
    updateVideoInfo(state, newVideoInfo, now);

    clearNowPlayingInfo(state);
  }

  if (isInfoChangeComplete(state, now, updateCompleteDebounceMillis)) {
    state.isInfoChanging = false;
    updateTracklist(state, document);
  }
  
  if(state.tracklist) {
    updateNowPlayingInfo(state)
  }
  
}

setInterval(loopFn, 1000);
