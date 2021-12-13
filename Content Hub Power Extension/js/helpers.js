function navigateToContentHubPage(path) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        var url = extractCurrentUrlOfTab(tabs[0], path);
        createTab(url);
    });
}

function navigateTemplateEntityId(template) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {

        // get url of tab
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {

            let origin = new URL(tabs[0].url).origin;
            let entityId = getLastSegment(tabs[0].url);
            var path = template.replace("{entityId}", entityId);

            createTab(combineUrls(origin, path));
        });
    });
}

//create new tab and redirect to url
function createTab(url) {
    chrome.tabs.create({ url });
}

function extractCurrentUrlOfTab(tab, path) {
    let origin = new URL(tab.url).origin;
    return combineUrls(origin, path);
}

function combineUrls(origin, path) {
    return new URL(path, origin).toString();
}

function replace(template, args) {
    args.forEach(function (element) {
        template = template.replace("{" + element[0] + "}", element[1]);
    }, this);
    return template;
}

//get last segment from url
function getLastSegment(url) {
    return url.substr(url.lastIndexOf('/') + 1);
}

//ask user to enter some string
function getUserResponse(message) {
    return prompt(message);
}



// ## Sitecore code
//getting current tab and proceed with next function
//get last segment from url
function GetLastSegment(url) {
    return url.substr(url.lastIndexOf('/') + 1);
}

//get current location object from url
function GetLocation(url) {
    var l = document.createElement("a");
    l.href = url;
    return l;
};

//replace placeholder in string from two-dimension array
function Replace(template, args) {
    args.forEach(function (element) {
        template = template.replace("{" + element[0] + "}", element[1]);
    }, this);
    return template;
}

//send request to url with specified type
function SendRequest(url, type) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, false);
    xhr.send();
}

//ask user to enter some string
function GetUserResponse(message) {
    return prompt(message);
}

//check if string is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}

//close extension
function Exit() {
    window.close();
}

//create new tab and redirect to url
function CreateTab(url) {
    chrome.tabs.create({ url });
}

//refresh pages in some weird way
function RefreshPage(tabId) {
    chrome.tabs.executeScript(tabId, { code: 'window.location.reload();' });
}

//getting current tab and proceed with next function
function SelectCurrentTab(next) {
//    chrome.tabs.getSelected(null, function (tab) {
//        next(tab);
//    });

    chrome.tabs.query({ active: true, lastFocusedWindow: true },
        tabs => {
            next(tabs[0]);
        });
}