import { CUSTOM_BUTTONS } from "../data/custom_button_data.js";
import {
  goToCustomPath,
  goToEntity,
  goToEntityById,
  goToEntityByIdentifier,
  goToEntityDefinition,
  goToEntityMgmt,
  goToEntityMgmtById,
  goToMessageMgmtById,
  goToOptionList,
  goToQueues,
  sendPostRequestToSettings,
} from "../modules/clickevent_callbacks.js";
import { dataKey, tryGetConfig } from "../modules/configuration.js";
import {
  createCustomButtonTemplate,
  parseCustomButtonTemplates,
} from "../modules/custom_button.js";
import { addClickEvent, createPromise } from "../modules/helpers.js";
import { setScreenState } from "../modules/screen.js";

function initialize() {
  setScreenState();

  tryGetConfig(dataKey, (data) => {
    const config = data[dataKey] ?? {};

    const customButtons = [...CUSTOM_BUTTONS];
    const customButtonsToRender = customButtons.filter(
      (button) => !config[button.elementId]
    );

    renderCustomButtons(customButtonsToRender);
    addClickEvents(customButtonsToRender);
  });
}

function getCurrentTab() {
  return createPromise((resolve, reject) => {
    window.chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      (tabs) => {
        if (!tabs.length) reject("Current tab was not found");
        resolve(tabs[0]);
      }
    );
  });
}

function createAnchorElementFromTabUrl(tab) {
  return createPromise((resolve, reject) => {
    if (!tab.url) reject(new Error("Tab url was not found"));

    const anchorElement = document.createElement("a");
    anchorElement.href = tab.url;
    anchorElement.tabId = tab.id;

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

function renderCustomButtons(buttons) {
  let buttonElementTemplates = "";

  buttons.forEach((button) => {
    buttonElementTemplates += createCustomButtonTemplate(button);
  });

  const customButtonElements = parseCustomButtonTemplates(
    buttonElementTemplates
  );

  document.getElementById("container").prepend(customButtonElements);
}

function addClickEvents(buttons) {
  buttons.forEach((button) => {
    if(button.path !== undefined) {
      addClickEvent(
        button.elementId,
        createClickEventContext(button.path, goToCustomPath)
      )
    }
 });

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
  addClickEvent("settings_post", createClickEventContext(null, sendPostRequestToSettings));
}

document.addEventListener("DOMContentLoaded", () => initialize());
