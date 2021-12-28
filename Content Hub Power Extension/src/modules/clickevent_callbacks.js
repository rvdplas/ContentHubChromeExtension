import { createTab, getLastSegment, replaceTemplate } from "./helpers.js";

export function goToCustomPath(path, location) {
  return createTab(replaceTemplate(path, [["origin", location.origin]]));
}

// redirects to api/entities
export function goToEntity(path, location) {
  let args = [
    ["origin", location.origin],
    ["entityId", getLastSegment(location.href)],
  ];
  createTab(replaceTemplate(CONSTANTS.PATH.APIENTITY, args));
}

// redirects to api/entities
export function goToAsset(path, location) {
  let args = [
    ["origin", location.origin],
    ["entityId", getLastSegment(location.href)],
  ];
  createTab(replaceTemplate(CONSTANTS.PATH.APIASSET, args));
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
  createTab(replaceTemplate(CONSTANTS.PATH.APIENTITY, args));
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
  createTab(replaceTemplate(CONSTANTS.PATH.APIENTITYIDENTIFIER, args));
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
  createTab(replaceTemplate(CONSTANTS.PATH.OPTIONLIST, args));
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
  createTab(replaceTemplate(CONSTANTS.PATH.ENTITYMGMT, args));
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
  createTab(replaceTemplate(CONSTANTS.PATH.MESSAGEMGMT, args));
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
  createTab(replaceTemplate(CONSTANTS.PATH.ENTITYDEFINITION, args));
}

// redirect to current entity management
export function goToEntityMgmt(path, location) {
  let args = [
    ["origin", location.origin],
    ["entityId", getLastSegment(location.href)],
  ];
  createTab(replaceTemplate(CONSTANTS.PATH.ENTITYMGMT, args));
}

// redirects to api/entities
export function goToQueues(path, location) {
  let args = [
    ["origin", location.origin],
    ["entityId", getLastSegment(location.href)],
  ];
  createTab(replaceTemplate(CONSTANTS.PATH.QUEUES, args));
}
