export function setScreenState() {
  // get the currently active tab OR last focused tab
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: {
          // run this script in tab with specified id
          tabId: tabs[0].id,
        },
        func: () => document.body.id, // get the body id from document in current tab
      },
      (results) => {
        const shouldActivate =
          !results || results.some((frame) => frame.result.startsWith("m-"));

        // todo: style the page in such manner, that the page is not usable in deactivated state
        if (shouldActivate) {
          activate();
        } else {
          hide();
        }
      }
    );
  });
}

function activate() {
  document.getElementById("invalid").style.display = "none";
}

function hide() {
  document.getElementById("container").style.display = "none";
}
