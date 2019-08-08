// let nowPlayingButtons = [
//   {
//     title: 'previous'
//   }, {
//     title: 'next'
//   }
// ];


let nowPlayingId = 'nowplaying-notification';

let displayNotifications = true;

function notifyNowPlaying(msg) {
  if (!displayNotifications) return;

  chrome.notifications.create(
    nowPlayingId, {
      type: 'basic',
      title: 'Now playing',
      iconUrl: chrome.runtime.getURL('/icons/play.png'),
      message: msg.name
      // buttons: nowPlayingButtons
    }
  );

  setTimeout(function () {
    chrome.notifications.clear(nowPlayingId);
  }, 4000);
}

// function buttonClicked(notificationId, buttonIndex){
//   if(notificationId == )
// }

function toggleDisplayNotifications() {
  displayNotifications = !displayNotifications;
  updateBrowserAction();
}

function updateBrowserAction() {
  let path, title;
  if (displayNotifications) {
    path = 'icons/play.png';
    title = 'YT Album Player: On';
  } else {
    path = 'icons/play-inactive.png';
    title = 'YT Album Player: Off';
  }

  chrome.browserAction.setIcon({ path });
  chrome.browserAction.setTitle({ title });
}


chrome.runtime.onMessage.addListener(notifyNowPlaying);
// browser.notifications.onButtonClicked.addListener();

chrome.browserAction.onClicked.addListener(toggleDisplayNotifications);

updateBrowserAction();