import { setScreenState } from "./modules/screen.js";
import {
  goToCustomPath,
  goToEntityDefinition,
  goToEntityMgmt,
  goToEntityMgmtById,
  goToOptionList,
  goToQueues,
  goToEntity,
  goToMessageMgmtById,
  goToEntityByIdentifier,
  goToEntityById,
} from "./modules/clickevent_callbacks.js";
import { createPromise } from "./modules/helpers.js";
import { CUSTOM_BUTTONS } from "./data/custom_buttons.js";

function initialize() {
  setScreenState();

  CUSTOM_BUTTONS.forEach((button) =>
    addClickEvent(
      button.elementId,
      createClickEventContext(button.path, goToCustomPath)
    )
  );

  addClickEvent("api-entity", createClickEventContext(null, goToEntity));
  addClickEvent("api-entity-id", createClickEventContext(null, goToEntityById));
  addClickEvent(
    "api-entity-identifier",
    createClickEventContext(null, goToEntityByIdentifier)
  );
  addClickEvent("entitymngmt", createClickEventContext(null, goToEntityMgmt));
  addClickEvent(
    "entitymngmt-id",
    createClickEventContext(null, goToEntityMgmtById)
  );
  addClickEvent(
    "entity-definition",
    createClickEventContext(null, goToEntityDefinition)
  );
  addClickEvent("option-list", createClickEventContext(null, goToOptionList));
  addClickEvent(
    "messagemngmt-id",
    createClickEventContext(null, goToMessageMgmtById)
  );
  addClickEvent("queues", createClickEventContext(null, goToQueues));
}

function getCurrentTab() {
  return createPromise((resolve, reject) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
}

function createAnchorElementFromTabUrl(tab) {
  return createPromise((resolve, reject) => {
    const anchorElement = document.createElement("a");
    anchorElement.href = tab.url;
    resolve(anchorElement);
  });
}

function createClickEventContext(path, callback) {
  return () => {
    getCurrentTab()
      .then((tab) => createAnchorElementFromTabUrl(tab))
      .then((element) => callback(path, element))
      .catch((error) =>
        console.error("error creating click event context: ", error)
      );
  };
}

function addClickEvent(elementId, callback) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`element with id "${id}" not found`);
  element.addEventListener("click", callback);
}

document.addEventListener("DOMContentLoaded", () => initialize());
