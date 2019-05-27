// let nowPlayingButtons = [
//   {
//     title: 'previous'
//   }, {
//     title: 'next'
//   }
// ];


let nowPlayingId = 'nowplaying-notification';

function notifyNowPlaying(msg) {
  chrome.notifications.create(
    nowPlayingId, {
      type: 'basic',
      title: 'Now playing',
      iconUrl: browser.extension.getURL('/icons/play.png'),
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



chrome.runtime.onMessage.addListener(notifyNowPlaying);
// browser.notifications.onButtonClicked.addListener();