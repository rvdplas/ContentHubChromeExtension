export interface CustomButtonData {
  elementId: string;
  iconClass: string;
  iconColor: string;
  text: string;
}

export function createCustomButtonTemplate(buttonData: CustomButtonData): string {
  const { elementId, iconClass, iconColor, text } = buttonData;

  return `
        <button id="${elementId}">
          <span class="icon ${iconClass}" style="background-color: ${iconColor};" aria-hidden="true"></span>
          <span>${text}</span>
        </button>
      `;
}

export function parseCustomButtonTemplates(
  buttonTemplates: string
): HTMLElement | null {
  const buttonsTemplate = `
    <div id="custom-buttons-container">
        ${buttonTemplates}
    </div>
    `;
  const dom = new DOMParser().parseFromString(buttonsTemplate, "text/html");

  return dom.getElementById("custom-buttons-container");
}
