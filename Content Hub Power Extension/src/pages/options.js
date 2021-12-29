import { CUSTOM_BUTTONS } from "../data/custom_button_data.js";
import {
  createCheckboxTemplate,
  parseCheckboxTemplates,
} from "../modules/checkbox.js";
import { addClickEvent } from "../modules/helpers.js";
import { setScreenState } from "../modules/screen.js";
import { dataKey, saveConfig, tryGetConfig } from "../modules/configuration.js";

let config = {};

function initialize() {
  setScreenState();

  tryGetConfig(dataKey, (data) => {
    config = data[dataKey] ?? {};

    renderCheckboxes();

    CUSTOM_BUTTONS.forEach((button) =>
      addClickEvent(button.elementId, onCheckboxClick)
    );
  });
}

function onCheckboxClick(e) {
  const element = e.target;
  const isChecked = element.checked;
  const id = element.id;

  if (config[id] && isChecked) {
    delete config[id];
  }

  if (!config[id] && !isChecked) {
    config[id] = {
      id,
      inactive: true,
    };
  }

  saveConfig(dataKey, config);
}

function renderCheckboxes() {
  let elementTemplates = "";

  CUSTOM_BUTTONS.forEach((button) => {
    elementTemplates += createCheckboxTemplate({
      ...button,
      checked: !config[button.elementId],
    });
  });

  const elements = parseCheckboxTemplates(elementTemplates);

  document.getElementById("container").prepend(elements);
}

document.addEventListener("DOMContentLoaded", () => initialize());
