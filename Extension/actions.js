function actionsClick(event) {
    navigateToContentHubPage("en-us/admin/actions");
}

function mediaProcessingClick(event) {
    navigateToContentHubPage("/en-us/admin/media-processing-mgmt");
}

function pageslick(event) {
    pageslick("en-us/admin/page");
}

function schemaClick(event) {
    navigateToContentHubPage("/en-us/admin/definitionmgmt");
}

function scriptsClick(event) {
    navigateToContentHubPage("/en-us/admin/scripts");
}

function settingsClick(event) {
    navigateToContentHubPage("/en-us/admin/settingmanagement");
}

function taxonomyClick(event) {
    navigateToContentHubPage("/en-us/admin/taxonomy");
}

function themesClick(event) {
    navigateToContentHubPage("/en-us/admin/thememgmt");
}

function triggersClick(event) {
    navigateToContentHubPage("/en-us/admin/triggers");
}

function navigateToContentHubPage(urlPath) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let tablUrl = new URL(tabs[0].url);
        let url = new URL(urlPath, tablUrl.origin);

        chrome.tabs.update({
            url: url.toString()
        });

        window.close();
    });
}

// Add a button to the page for each supplied color
function initialize() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let code = "";

        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: getBody
            },
            (injectionResults) => {
                for (const frameResult of injectionResults) {
                    if (frameResult.result.startsWith("m-")) {
                        document.getElementById("invalid").style.display = "none";
                    } else {
                        document.getElementById("container").style.display = "none";
                    }
                }
            });
    });

    addClickEvent("actions", actionsClick);
    addClickEvent("media_processing", mediaProcessingClick);
    addClickEvent("pages", pageslick);
    addClickEvent("schema", schemaClick);
    addClickEvent("scripts", scriptsClick);
    addClickEvent("settings", settingsClick);
    addClickEvent("taxonomy", taxonomyClick);
    addClickEvent("themes", themesClick);
    addClickEvent("triggers", triggersClick);
}

function getBody() {
    return document.body.id;
}

function addClickEvent(elementName, functionReference) {
    let element = document.getElementById(elementName);
    element.addEventListener("click", functionReference);
}

initialize();