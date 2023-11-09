import {
  createTab,
  getLastSegment,
  replaceTemplate,
  isEmpty,
} from "./helpers.js";
import { PATHS } from "../data/paths.js";

export function goToCustomPath(path, location) {
  return createTab(replaceTemplate(path, [["origin", location.origin]]));
}

// redirects to api/entities
export function goToEntity(path, location) {
  let args = [
    ["origin", location.origin],
    ["entityId", getLastSegment(location.href)],
  ];
  createTab(replaceTemplate(PATHS.DEFAULT.APIENTITY, args));
}

// redirects to api/entities
export function goToAsset(path, location) {
  let args = [
    ["origin", location.origin],
    ["entityId", getLastSegment(location.href)],
  ];
  createTab(replaceTemplate(PATHS.DEFAULT.APIASSET, args));
}

// ask for id and redirect to api/entities
export function goToEntityById(path, location) {
  let entityId = prompt("Enter entity ID");
  if (isEmpty(entityId)) {
    alert("You haven't specified entity ID");
    return;
  }
  let args = [
    ["origin", location.origin],
    ["entityId", entityId],
  ];
  createTab(replaceTemplate(PATHS.DEFAULT.APIENTITY, args));
}

// ask for id and redirect to api/entities
export function goToEntityByIdentifier(path, location) {
  let entityIdentifier = prompt("Enter entity Identifier");
  if (isEmpty(entityIdentifier)) {
    alert("You haven't specified entity Identifier");
    return;
  }
  let args = [
    ["origin", location.origin],
    ["entityIdentifier", entityIdentifier],
  ];
  createTab(replaceTemplate(PATHS.DEFAULT.APIENTITYIDENTIFIER, args));
}

// ask for id and redirect to api/datasources
export function goToOptionList(path, location) {
  let datasource = prompt("Enter Option List name");
  if (isEmpty(datasource)) {
    alert("You haven't specified any Option List name");
    return;
  }
  let args = [
    ["origin", location.origin],
    ["datasource", datasource],
  ];
  createTab(replaceTemplate(PATHS.DEFAULT.OPTIONLIST, args));
}

// asks for entity id and redirects to entity management
export function goToEntityMgmtById(path, location) {
  let entityId = prompt("Enter entity ID");
  if (isEmpty(entityId)) {
    alert("You haven't specified entity ID");
    return;
  }
  let args = [
    ["origin", location.origin],
    ["entityId", entityId],
  ];
  createTab(replaceTemplate(PATHS.DEFAULT.ENTITYMGMT, args));
}

// asks for message id and redirects to entity management
export function goToMessageMgmtById(path, location) {
  let entityId = prompt("Enter message ID");
  if (isEmpty(entityId)) {
    alert("You haven't specified message ID");
    return;
  }
  let args = [
    ["origin", location.origin],
    ["entityId", entityId],
  ];
  createTab(replaceTemplate(PATHS.DEFAULT.MESSAGEMGMT, args));
}

// asks for definition name and redirects to api/definition
export function goToEntityDefinition(path, location) {
  let definitionName = prompt("Enter entity definition");
  if (isEmpty(definitionName)) {
    alert("You haven't specified entity definition name");
    return;
  }
  let args = [
    ["origin", location.origin],
    ["definition", definitionName],
  ];
  createTab(replaceTemplate(PATHS.DEFAULT.ENTITYDEFINITION, args));
}

// redirect to current entity management
export function goToEntityMgmt(path, location) {
  let args = [
    ["origin", location.origin],
    ["entityId", getLastSegment(location.href)],
  ];
  createTab(replaceTemplate(PATHS.DEFAULT.ENTITYMGMT, args));
}

// redirects to api/entities
export function goToQueues(path, location) {
  let args = [
    ["origin", location.origin],
    ["entityId", getLastSegment(location.href)],
  ];
  createTab(replaceTemplate(PATHS.DEFAULT.QUEUES, args));
}

// sends POST request to Settings
export function sendPostRequestToSettings(path, location) {
  let settingCategoryId = prompt("Enter SettingCategoryId");
  if (isEmpty(settingCategoryId)) {
    alert("You haven't specified SettingCategoryId");
    return;
  }
  let settingName = prompt("Enter SettingName");
  if (isEmpty(settingName)) {
    alert("You haven't specified SettingName");
    return;
  }
  let settingLabel = prompt("Enter SettingLabel");
  if (isEmpty(settingLabel)) {
    alert("You haven't specified SettingLabel");
    return;
  }
  let args = [
    ["origin", location.origin],
  ];
  const jsonData = {};
  jsonData.id = -1;
  jsonData.entitydefinition = {
    href: `${location.origin}/api/entitydefinitions/M.Setting`,
    templated: false
  };
  jsonData.cultures = ["en-US"];
  jsonData.relations = {
    SettingCategoryToSettings: {
      inheritsSecurity: true,
      parent: {
        templated: false,
        href: `${location.origin}/api/entities/${settingCategoryId}`
      },
      self: {
        templated: false,
        href: `${location.origin}/api/entities/-1/relations/SettingCategoryToSettings?id=-1&name=SettingCategoryToSettings`
      }
    }
  };
  jsonData.properties = {
    "M.Setting.Name": `${settingName}`,
    "M.Setting.Label": {
      "en-US": `${settingLabel}`
    },
    "M.Setting.Value": {},
    //"M.Setting.EnvironmentSpecific": true
  };
  jsonData.renditions = {};
  jsonData.self = {
    href: `${location.origin}/api/entities/-1`,
    templated: false,
  }

  // fetch API function is used in content-script.js
  chrome.tabs.sendMessage(Number(location.tabId),
    {url: replaceTemplate(PATHS.CUSTOM.SettingsPost, args), jsonData: JSON.stringify(jsonData)}
  );
}

