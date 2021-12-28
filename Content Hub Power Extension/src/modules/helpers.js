export function createPromise(func) {
  return new Promise((resolve, reject) => {
    try {
      func(resolve, reject);
    } catch (e) {
      reject(e);
    }
  });
}

// get last segment from url
export function getLastSegment(url) {
  return url.substr(url.lastIndexOf("/") + 1);
}

// replace placeholder in string from two-dimension array
export function replaceTemplate(template, args) {
  args.forEach(function (element) {
    template = template.replace("{" + element[0] + "}", element[1]);
  }, this);

  return template;
}

// check if string is empty
export function isEmpty(str) {
  return !str || str.length === 0;
}

// create new tab and redirect to url
export function createTab(url) {
  chrome.tabs.create({ url });
}

// function navigateToContentHubPage(path) {
//   chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//     var url = extractCurrentUrlOfTab(tabs[0], path);
//     createTab(url);
//   });
// }

// function navigateTemplateEntityId(template) {
//   chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//     // get url of tab
//     chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//       let origin = new URL(tabs[0].url).origin;
//       let entityId = getLastSegment(tabs[0].url);
//       var path = template.replace("{entityId}", entityId);

//       createTab(combineUrls(origin, path));
//     });
//   });
// }

// function extractCurrentUrlOfTab(tab, path) {
//   let origin = new URL(tab.url).origin;
//   return combineUrls(origin, path);
// }

// function combineUrls(origin, path) {
//   return new URL(path, origin).toString();
// }

// ### Sitecore code

// //send request to url with specified type
// function SendRequest(url, type) {
//   var xhr = new XMLHttpRequest();
//   xhr.open(type, url, false);
//   xhr.send();
// }

// //close extension
// function Exit() {
//   window.close();
// }

// //refresh pages in some weird way
// function RefreshPage(tabId) {
//   chrome.tabs.executeScript(tabId, { code: "window.location.reload();" });
// }

// clear cache
// function ClearCache(location) {
//   var args = [["origin", location.origin]];
//   SendRequest(Replace(CONSTANTS.PATH.CLEARCACHE, args), "DELETE");
//   SendRequest(Replace(CONSTANTS.PATH.INITSEARCH, args), "POST");
// }

// clear cache and reload the page
// function ClearCacheAndReload(location, tabId) {
//   ClearCache(location);
//   RefreshPage(tabId);
//   Exit();
// }
