import { CUSTOM_BUTTONS } from "../data/custom_button_data.js";
import {
  createCheckboxTemplate,
  parseCheckboxTemplates,
} from "../modules/checkbox.js";
import { addClickEvent } from "../modules/helpers.js";
import { dataKey, saveConfig, tryGetConfig } from "../modules/configuration.js";

type SavedConfig = Record<string, { id: string; inactive: boolean }>;

let config: SavedConfig = {};

function initialize(): void {
  tryGetConfig(dataKey, (data: Record<string, unknown>) => {
    config = (data[dataKey] as SavedConfig) ?? {};

    renderCheckboxes();

    CUSTOM_BUTTONS.forEach((button) =>
      addClickEvent(button.elementId, onCheckboxClick)
    );
  });
}

function onCheckboxClick(e: Event): void {
  const element = e.target as HTMLInputElement;
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

  const container = document.getElementById("container");
  if (container && elements) {
    container.prepend(elements);
  }
}

document.addEventListener("DOMContentLoaded", () => initialize());
