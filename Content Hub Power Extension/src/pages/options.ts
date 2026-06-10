import { CUSTOM_BUTTONS } from "../data/custom_button_data.js";
import { ICON_OPTIONS } from "../data/icon_data.js";
import {
  createCheckboxTemplate,
  parseCheckboxTemplates,
} from "../modules/checkbox.js";
import { addClickEvent } from "../modules/helpers.js";
import { dataKey, customLinkDataKey, saveConfig, tryGetConfig } from "../modules/configuration.js";
import { createCheckboxPanel, createCustomLinksComponent, createFormRow, createLinkPanel } from "./options_components.js";
import type { CustomLink } from "../modules/custom_link.js";

type SavedConfig = Record<string, { id: string; inactive: boolean }>;

let config: SavedConfig = {};
let customLinks: CustomLink[] = [];
let editingCustomLinkId: string | null = null;

const CUSTOM_LINK_DEFAULT_BUTTON_TEXT = "Add custom link";
const CUSTOM_LINK_UPDATE_BUTTON_TEXT = "Save custom link";

function initialize(): void {
  tryGetConfig(dataKey, (data: Record<string, unknown>) => {
    config = (data[dataKey] as SavedConfig) ?? {};

    tryGetConfig(customLinkDataKey, (linkData: Record<string, unknown>) => {
      customLinks = (linkData[customLinkDataKey] as CustomLink[]) ?? [];
      renderPage();
      CUSTOM_BUTTONS.forEach((button) => addClickEvent(button.elementId, onCheckboxClick));
      bindCustomLinkForm();
      renderCustomLinkList();
    });
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

function renderPage(): void {
  const container = document.getElementById("container");
  if (!container) return;

  container.textContent = "";
  container.appendChild(createCheckboxPanel());
  container.appendChild(createLinkPanel());

  renderCheckboxes();
  renderColorOptions();
  renderIconOptions();
}


function renderCheckboxes(): void {
  let elementTemplates = "";

  CUSTOM_BUTTONS.forEach((button) => {
    elementTemplates += createCheckboxTemplate({
      ...button,
      checked: !config[button.elementId],
    });
  });

  const elements = parseCheckboxTemplates(elementTemplates);
  const container = document.getElementById("checkbox-container");

  if (container && elements) {
    container.append(elements);
  }
}

const COLOR_OPTIONS = [
  { value: "rgb(222, 83, 224)", label: "Magenta" },
  { value: "rgb(147, 115, 255)", label: "Purple" },
  { value: "rgb(244, 89, 90)", label: "Red" },
];

function renderIconOptions(): void {
  const iconSelect = document.getElementById("custom-link-icon") as HTMLSelectElement | null;
  if (!iconSelect) return;

  iconSelect.innerHTML = ICON_OPTIONS.map(
    (iconOption) =>
      `<option value="${iconOption.iconClass}">${iconOption.label}</option>`
  ).join("");

  iconSelect.addEventListener("change", () => {
    const colorSelect = document.getElementById("custom-link-color") as HTMLSelectElement | null;
    updateIconPreview(iconSelect.value, colorSelect?.value ?? COLOR_OPTIONS[0].value);
  });

  updateIconPreview(iconSelect.value, getSelectedColor());
}

function renderColorOptions(): void {
  const colorSelect = document.getElementById("custom-link-color") as HTMLSelectElement | null;
  if (!colorSelect) return;

  colorSelect.innerHTML = COLOR_OPTIONS.map(
    (colorOption) =>
      `<option value="${colorOption.value}">${colorOption.label}</option>`
  ).join("");

  colorSelect.addEventListener("change", () => {
    const iconSelect = document.getElementById("custom-link-icon") as HTMLSelectElement | null;
    updateIconPreview(iconSelect?.value ?? "", colorSelect.value);
  });

  colorSelect.value = COLOR_OPTIONS[0].value;
  const iconSelect = document.getElementById("custom-link-icon") as HTMLSelectElement | null;
  if (iconSelect) {
    updateIconPreview(iconSelect.value, colorSelect.value);
  }
}

function getSelectedColor(): string {
  const colorSelect = document.getElementById("custom-link-color") as HTMLSelectElement | null;
  return colorSelect?.value ?? COLOR_OPTIONS[0].value;
}

function updateIconPreview(iconClass: string, iconColor: string): void {
  const preview = document.getElementById("custom-link-icon-preview");
  if (!preview) return;

  preview.className = `icon ${iconClass}`;
  preview.style.backgroundColor = iconColor;
}

function bindCustomLinkForm(): void {
  const form = document.getElementById("custom-link-form") as HTMLFormElement | null;
  const cancelButton = document.getElementById("custom-link-cancel") as HTMLButtonElement | null;

  if (!form) return;

  form.addEventListener("submit", onCustomLinkSubmit);
  if (cancelButton) {
    cancelButton.addEventListener("click", cancelCustomLinkEdit);
  }
}

function onCustomLinkSubmit(event: Event): void {
  event.preventDefault();

  const labelInput = document.getElementById("custom-link-label") as HTMLInputElement | null;
  const urlInput = document.getElementById("custom-link-url") as HTMLInputElement | null;
  const iconSelect = document.getElementById("custom-link-icon") as HTMLSelectElement | null;
  const colorSelect = document.getElementById("custom-link-color") as HTMLSelectElement | null;

  if (!labelInput || !urlInput || !iconSelect || !colorSelect) {
    return;
  }

  const label = labelInput.value.trim();
  const url = urlInput.value.trim();
  const iconClass = iconSelect.value;
  const iconColor = colorSelect.value;

  if (!label || !url) {
    alert("Please provide a label and URL for the custom link.");
    return;
  }

  try {
    new URL(url, window.location.href);
  } catch {
    alert("The provided URL is not valid.");
    return;
  }

  if (editingCustomLinkId) {
    const existingIndex = customLinks.findIndex((link) => link.id === editingCustomLinkId);
    if (existingIndex > -1) {
      customLinks[existingIndex] = {
        ...customLinks[existingIndex],
        label,
        url,
        iconClass,
        iconColor,
      };
    }
  } else {
    const newCustomLink: CustomLink = {
      id: `custom-link-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label,
      url,
      iconClass,
      iconColor,
    };

    customLinks.push(newCustomLink);
  }

  saveConfig(customLinkDataKey, customLinks);
  renderCustomLinkList();
  clearCustomLinkForm();
  resetCustomLinkFormMode();
}

function clearCustomLinkForm(): void {
  const labelInput = document.getElementById("custom-link-label") as HTMLInputElement | null;
  const urlInput = document.getElementById("custom-link-url") as HTMLInputElement | null;
  const iconSelect = document.getElementById("custom-link-icon") as HTMLSelectElement | null;
  const colorSelect = document.getElementById("custom-link-color") as HTMLSelectElement | null;

  if (labelInput) labelInput.value = "";
  if (urlInput) urlInput.value = "";
  if (iconSelect) iconSelect.selectedIndex = 0;
  if (colorSelect) colorSelect.value = COLOR_OPTIONS[0].value;

  if (iconSelect) {
    updateIconPreview(iconSelect.value, getSelectedColor());
  }
}

function renderCustomLinkList(): void {
  const list = document.getElementById("custom-links-list");
  if (!list) return;

  list.innerHTML = "";

  if (!customLinks.length) {
    const message = document.createElement("p");
    message.textContent = "No custom links configured yet.";
    list.appendChild(message);
    return;
  }

  customLinks.forEach((link) => {
    const row = document.createElement("div");
    row.className = "custom-link-row";

    const preview = document.createElement("div");
    preview.className = "custom-link-preview";

    const icon = document.createElement("span");
    icon.className = `icon ${link.iconClass}`;
    if (link.iconColor) {
      icon.style.backgroundColor = link.iconColor;
    }
    icon.setAttribute("aria-hidden", "true");

    const details = document.createElement("div");
    details.className = "custom-link-details";

    const label = document.createElement("div");
    label.className = "link-label";
    label.textContent = link.label;

    const meta = document.createElement("div");
    meta.className = "link-meta";
    meta.textContent = link.host ?? "";

    details.appendChild(label);
    details.appendChild(meta);
    preview.appendChild(icon);
    preview.appendChild(details);

    const actions = document.createElement("div");
    actions.className = "custom-link-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-custom-link action-icon-button";
    editButton.dataset.id = link.id;
    editButton.setAttribute("aria-label", "Edit custom link");
    editButton.title = "Edit";
    editButton.innerHTML = `<span class="action-icon">✎</span>`;
    editButton.addEventListener("click", () => editCustomLink(link.id));

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-custom-link action-icon-button";
    removeButton.dataset.id = link.id;
    removeButton.setAttribute("aria-label", "Remove custom link");
    removeButton.title = "Remove";
    removeButton.innerHTML = `<span class="action-icon">🗑</span>`;
    removeButton.addEventListener("click", () => removeCustomLink(link.id));

    actions.appendChild(editButton);
    actions.appendChild(removeButton);

    row.appendChild(preview);
    row.appendChild(actions);
    list.appendChild(row);
  });
}

function editCustomLink(id: string): void {
  const link = customLinks.find((customLink) => customLink.id === id);
  if (!link) return;

  const labelInput = document.getElementById("custom-link-label") as HTMLInputElement | null;
  const urlInput = document.getElementById("custom-link-url") as HTMLInputElement | null;
  const iconSelect = document.getElementById("custom-link-icon") as HTMLSelectElement | null;
  const colorSelect = document.getElementById("custom-link-color") as HTMLSelectElement | null;

  if (!labelInput || !urlInput || !iconSelect || !colorSelect) {
    return;
  }

  editingCustomLinkId = id;
  labelInput.value = link.label;
  urlInput.value = link.url;
  iconSelect.value = link.iconClass;
  colorSelect.value = link.iconColor ?? COLOR_OPTIONS[0].value;
  updateIconPreview(iconSelect.value, colorSelect.value);
  setCustomLinkFormMode(true);
}

function cancelCustomLinkEdit(): void {
  editingCustomLinkId = null;
  clearCustomLinkForm();
  setCustomLinkFormMode(false);
}

function resetCustomLinkFormMode(): void {
  editingCustomLinkId = null;
  setCustomLinkFormMode(false);
}

function setCustomLinkFormMode(isEditing: boolean): void {
  const submitButton = document.querySelector("#custom-link-form button[type=submit]") as HTMLButtonElement | null;
  const cancelButton = document.getElementById("custom-link-cancel") as HTMLButtonElement | null;

  if (submitButton) {
    submitButton.textContent = isEditing ? CUSTOM_LINK_UPDATE_BUTTON_TEXT : CUSTOM_LINK_DEFAULT_BUTTON_TEXT;
  }

  if (cancelButton) {
    cancelButton.style.display = isEditing ? "inline-flex" : "none";
  }
}

function removeCustomLink(id: string): void {
  customLinks = customLinks.filter((link) => link.id !== id);
  saveConfig(customLinkDataKey, customLinks);
  if (editingCustomLinkId === id) {
    cancelCustomLinkEdit();
  }
  renderCustomLinkList();
}

document.addEventListener("DOMContentLoaded", () => initialize());
