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
} from "../modules/clickevent_callbacks.js";
import { createPromise, addClickEvent } from "../modules/helpers.js";
import {
  parseCustomButtonTemplates,
  createCustomButtonTemplate,
} from "../modules/custom_button.js";
import { setScreenState } from "../modules/screen.js";
import { dataKey, tryGetConfig } from "../modules/configuration.js";

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
  buttons.forEach((button) =>
    addClickEvent(
      button.elementId,
      createClickEventContext(button.path, goToCustomPath)
    )
  );

  addClickEvent("api-entity", createClickEventContext(null, goToEntity));
  addClickEvent("api-entity-id", createClickEventContext(null, goToEntityById));
  addClickEvent("api-entity-identifier", createClickEventContext(null, goToEntityByIdentifier));
  addClickEvent("entitymngmt", createClickEventContext(null, goToEntityMgmt));
  addClickEvent("entitymngmt-id", createClickEventContext(null, goToEntityMgmtById));
  addClickEvent("entity-definition", createClickEventContext(null, goToEntityDefinition));
  addClickEvent("option-list", createClickEventContext(null, goToOptionList));
  addClickEvent("messagemngmt-id", createClickEventContext(null, goToMessageMgmtById));
  addClickEvent("queues", createClickEventContext(null, goToQueues));
}

document.addEventListener("DOMContentLoaded", () => initialize());
