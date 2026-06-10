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
import { dataKey, customLinkDataKey, tryGetConfig } from "../modules/configuration.js";
import {
  createCustomButtonTemplate,
  parseCustomButtonTemplates,
} from "../modules/custom_button.js";
import {
  createCustomLinkTemplate,
  parseCustomLinkTemplates,
  CustomLink,
} from "../modules/custom_link.js";
import { addClickEvent, createPromise, createTab } from "../modules/helpers.js";

type CustomButton = {
  elementId: string;
  iconClass: string;
  iconColor: string;
  text: string;
  path?: string;
};

type ClickEventLocation = {
  origin: string;
  href: string;
  tabId?: number;
};

function initialize(): void {
  tryGetConfig(dataKey, (data: Record<string, unknown>) => {
    const config = (data[dataKey] as Record<string, boolean>) ?? {};

    tryGetConfig(customLinkDataKey, (linkData: Record<string, unknown>) => {
      const customLinks = (linkData[customLinkDataKey] as CustomLink[]) ?? [];

      const customButtons = [...CUSTOM_BUTTONS] as CustomButton[];
      const customButtonsToRender = customButtons.filter(
        (button) => !config[button.elementId]
      );

      renderCustomButtons(customButtonsToRender);

      getCurrentTab()
        .then(() => {
          renderCustomLinks(customLinks);
          addClickEvents(customButtonsToRender, customLinks);
        })
        .catch((error) => {
          console.error("Unable to determine current tab for custom links:", error);
          renderCustomLinks([]);
          addClickEvents(customButtonsToRender, []);
        });
    });
  });
}

function getCurrentTab(): Promise<chrome.tabs.Tab> {
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

function createAnchorElementFromTabUrl(
  tab: chrome.tabs.Tab
): Promise<HTMLAnchorElement & { tabId?: number }> {
  return createPromise((resolve, reject) => {
    const tabUrl = tab.url ?? "";
    if (!tabUrl) reject(new Error("Tab url was not found"));

    const anchorElement = document.createElement("a") as HTMLAnchorElement & {
      tabId?: number;
    };

    anchorElement.href = tabUrl;
    anchorElement.tabId = tab.id;

    resolve(anchorElement);
  });
}

function createClickEventContext(
  path: string | null,
  callback: (
    path: string | null,
    location: ClickEventLocation
  ) => void
): () => void {
  return () => {
    getCurrentTab()
      .then((tab) => createAnchorElementFromTabUrl(tab))
      .then((element) => callback(path, element))
      .catch((error) =>
        console.error("error creating click event context: ", error)
      );
  };
}

function resolveLinkUrl(linkUrl: string, baseUrl: string): string {
  try {
    return new URL(linkUrl).href;
  } catch {
    return new URL(linkUrl, baseUrl).href;
  }
}

function openCustomLinkUrl(linkUrl: string): void {
  getCurrentTab()
    .then((tab) => {
      const tabUrl = tab.url ?? window.location.href;
      const resolvedUrl = resolveLinkUrl(linkUrl, tabUrl);
      createTab(resolvedUrl);
    })
    .catch((error) =>
      console.error("Unable to resolve custom link URL:", error)
    );
}

function renderCustomButtons(buttons: CustomButton[]): void {
  let buttonElementTemplates = "";

  buttons.forEach((button) => {
    buttonElementTemplates += createCustomButtonTemplate(button);
  });

  const customButtonElements = parseCustomButtonTemplates(
    buttonElementTemplates
  );

  const container = document.getElementById("built-in-column");
  if (container && customButtonElements) {
    container.append(customButtonElements);
  }
}

function renderCustomLinks(links: CustomLink[]): void {
  let buttonElementTemplates = "";

  links.forEach((link) => {
    buttonElementTemplates += createCustomLinkTemplate(link);
  });

  const customLinkElements = parseCustomLinkTemplates(buttonElementTemplates);
  const container = document.getElementById("custom-links-column");
  if (container && customLinkElements) {
    container.append(customLinkElements);
  }
  else {
    const parentContainer = document.getElementById("custom-links-column");
    if (parentContainer) {
      parentContainer.append(document.createTextNode("No custom links found for this host"));
    }
  }
}

function addClickEvents(buttons: CustomButton[], customLinks: CustomLink[]): void {
  customLinks.forEach((link) => {
    addClickEvent(link.id, () => openCustomLinkUrl(link.url));
  });

  buttons.forEach((button) => {
    if (button.path !== undefined) {
      addClickEvent(
        button.elementId,
        createClickEventContext(button.path, goToCustomPath)
      );
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
}

document.addEventListener("DOMContentLoaded", () => initialize());
