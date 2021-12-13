// Add a button to the page for each supplied color
function initialize() {
    setScreen();

    addClickEvent("actions", BaseFunction(gotoActions));
    addClickEvent("media_processing", BaseFunction(gotoMediaProcessing));
    addClickEvent("pages", BaseFunction(gotoPages));
    addClickEvent("schema", BaseFunction(gotoSchema));
    addClickEvent("scripts", BaseFunction(gotoScripts));
    addClickEvent("settings", BaseFunction(gotoSettings));
    addClickEvent("taxonomy", BaseFunction(gotoTaxonomy));
    addClickEvent("themes", BaseFunction(gotoThemes));
    addClickEvent("triggers", BaseFunction(gotoTriggers));

    addClickEvent("assetDetailPage", BaseFunction(gotoAssetDetailPage));
    addClickEvent("m_asset", BaseFunction(gotoSchemaM_Asset));

    addClickEvent("api-entity", BaseFunction(GoToEntity));
    addClickEvent("api-entity-id", BaseFunction(GoToEntityById));
    addClickEvent("api-entity-identifier", BaseFunction(GoToEntityByIdentifier));
    addClickEvent("entitymngmt", BaseFunction(GoToEntityMgmt));
    addClickEvent("entitymngmt-id", BaseFunction(GoToEntityMgmtById));
    addClickEvent("entity-definition", BaseFunction(GoToEntityDefinition));
    addClickEvent("option-list", BaseFunction(GoToOptionList));
    addClickEvent("messagemngmt-id", BaseFunction(GoToMessageMgmtById));
    addClickEvent("queues", BaseFunction(GoToQueues));
}

function getBody() {
    return document.body.id;
}

function addClickEvent(elementName, functionReference) {
    let element = document.getElementById(elementName);
    element.addEventListener("click", functionReference);
}

document.addEventListener('DOMContentLoaded', function () {
    initialize();
});

function setScreen() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: getBody
            },
            (injectionResults) => {
                if (injectionResults == null) {
                    ActivateScreen();
                    return;
                }

                for (const frameResult of injectionResults) {
                    if (frameResult.result.startsWith("m-")) {
                        ActivateScreen();
                    } else {
                        DeactivateScreen();
                    }
                }
            });
    });
}

function ActivateScreen() {
    document.getElementById("invalid").style.display = "none";
}

function DeactivateScreen() {
    document.getElementById("container").style.display = "none";
}

function originArgument(location) {
    var args = [
        [
            "origin",
            location.origin
        ]
    ];

    return args;
}

function gotoActions(location) {
    CreateTab(Replace(CONSTANTS.PATH.Actions, originArgument(location)));
}

function gotoMediaProcessing(location) {
    CreateTab(Replace(CONSTANTS.PATH.MediaProcessing, originArgument(location)));
}

function gotoPages(location) {
    CreateTab(Replace(CONSTANTS.PATH.Pages, originArgument(location)));
}

function gotoSchema(location) {
    CreateTab(Replace(CONSTANTS.PATH.Schema, originArgument(location)));
}

function gotoScripts(location) {
    CreateTab(Replace(CONSTANTS.PATH.Scripts, originArgument(location)));
}

function gotoSettings(location) {
    CreateTab(Replace(CONSTANTS.PATH.Settings, originArgument(location)));
}

function gotoTaxonomy(location) {
    CreateTab(Replace(CONSTANTS.PATH.Taxonomy, originArgument(location)));
}

function gotoThemes(location) {
    CreateTab(Replace(CONSTANTS.PATH.Themes, originArgument(location)));
}

function gotoTriggers(location) {
    CreateTab(Replace(CONSTANTS.PATH.Triggers, originArgument(location)));
}

function gotoAssetDetailPage(location) {
    CreateTab(Replace(CONSTANTS.PATH.AssetDetailPage, originArgument(location)));
}

function gotoSchemaM_Asset(location) {
    CreateTab(Replace(CONSTANTS.PATH.SchemaM_Asset, originArgument(location)));
}

//### Sitecore code

//base wrapper to execute all commands. bind tab and location context to each method
function BaseFunction(next, data) {
    return function () {
        SelectCurrentTab(function (tab) {
            var location = GetLocation(tab.url);
            next(location, tab.id, data);
        });
    };
}

//redirects to api/entities
function GoToEntity(location) {
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            GetLastSegment(location.href)
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.APIENTITY, args));
}

var CONSTANTS = {
    PATH: {
        APIENTITY: "{origin}/api/entities/{entityId}",
        APIASSET: "{origin}/en-us/asset/{entityId}",
        APIENTITYIDENTIFIER: "{origin}/api/entities/identifier/{entityIdentifier}",
        ENTITYMGMT: "{origin}/en-us/admin/entitymgmt/entity/{entityId}",
        MESSAGEMGMT: "{origin}/api/status/messages/{entityId}",
        INITSEARCH: "{origin}/api/search/InitSearch",
        OPTIONLIST: "{origin}/api/datasources/{datasource}",
        ENTITYDEFINITION: "{origin}/api/entitydefinitions/{definition}?includeConditionalMembers=true",
        QUEUES: "{origin}/api/status/queues",


        // CUSTOM
        Actions: "{origin}/en-us/admin/actions",
        MediaProcessing: "{origin}/en-us/admin/media-processing-mgmt",
        Pages: "{origin}/en-us/admin/page",
        Schema: "{origin}/en-us/admin/definitionmgmt",
        Scripts: "{origin}/en-us/admin/scripts",
        Settings: "{origin}/en-us/admin/settingmanagement",
        Taxonomy: "{origin}/en-us/admin/taxonomy",
        Themes: "{origin}/en-us/admin/thememgmt",
        Triggers: "{origin}/en-us/admin/triggers",
        AssetDetailPage: "{origin}/en-us/admin/page/566?q=asset+detail",
        SchemaM_Asset: "{origin}/en-us/admin/definitionmgmt/detail/40"
    }
};

//redirects to api/entities
function GoToAsset(location) {
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            GetLastSegment(location.href)
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.APIASSET, args));
}

//ask for id and redirect to api/entities
function GoToEntityById(location) {
    var entityId = GetUserResponse("Enter entity ID");
    if (isEmpty(entityId)) {
        alert("You haven't specified entity ID");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            entityId
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.APIENTITY, args));
}

//ask for id and redirect to api/entities
function GoToEntityByIdentifier(location) {
    var entityIdentifier = GetUserResponse("Enter entity Identifier");
    if (isEmpty(entityIdentifier)) {
        alert("You haven't specified entity Identifier");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityIdentifier",
            entityIdentifier
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.APIENTITYIDENTIFIER, args));
}

//ask for id and redirect to api/datasources
function GoToOptionList(location) {
    var datasource = GetUserResponse("Enter Option List name");
    if (isEmpty(datasource)) {
        alert("You haven't specified any Option List name");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "datasource",
            datasource
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.OPTIONLIST, args));
}

//asks for entity id and redirects to entity management
function GoToEntityMgmtById(location) {
    var entityId = GetUserResponse("Enter entity ID");
    if (isEmpty(entityId)) {
        alert("You haven't specified entity ID");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            entityId
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.ENTITYMGMT, args));
}

//asks for message id and redirects to entity management
function GoToMessageMgmtById(location) {
    var entityId = GetUserResponse("Enter message ID");
    if (isEmpty(entityId)) {
        alert("You haven't specified message ID");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            entityId
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.MESSAGEMGMT, args));
}

//asks for definition name and redirects to api/definition
function GoToEntityDefinition(location) {
    var definitionName = GetUserResponse("Enter entity definition");
    if (isEmpty(definitionName)) {
        alert("You haven't specified entity definition name");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "definition",
            definitionName
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.ENTITYDEFINITION, args));
}

//redirect to current entity management
function GoToEntityMgmt(location) {
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            GetLastSegment(location.href)
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.ENTITYMGMT, args));
}

//redirects to api/entities
function GoToQueues(location) {
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            GetLastSegment(location.href)
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.QUEUES, args));
}

//clear cache
function ClearCache(location) {
    var args = [
        [
            "origin",
            location.origin
        ]
    ];
    SendRequest(Replace(CONSTANTS.PATH.CLEARCACHE, args), "DELETE");
    SendRequest(Replace(CONSTANTS.PATH.INITSEARCH, args), "POST");
}

//clear cache and reload the page
function ClearCacheAndReload(location, tabId) {
    ClearCache(location);
    RefreshPage(tabId);
    Exit();
}