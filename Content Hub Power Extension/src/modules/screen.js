export function setScreenState() {
  // get the currently active tab OR last focused tab
  window.chrome.tabs.query(
    { active: true, lastFocusedWindow: true },
    (tabs) => {
      window.chrome.scripting.executeScript(
        {
          target: {
            // run this script in tab with specified id
            tabId: tabs[0].id,
          },
          func: () => document.body.id, // get the body id from document in current tab
        },
        (results) => {
          const isContentHubPage =
            !results || results.some((frame) => frame.result.startsWith("m-"));

          if (isContentHubPage) {
            document.getElementById("invalid").style.display = "none";
          } else {
            document.getElementById("container").style.display = "none";
          }
        }
      );
    }
  );
}
