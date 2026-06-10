export interface CustomLink {
  id: string;
  label: string;
  url: string;
  iconClass: string;
  iconColor?: string;
  host?: string;
}

export function createCustomLinkTemplate(link: CustomLink): string {
  const styleAttribute = link.iconColor
    ? `style="background-color: ${link.iconColor};"`
    : "";

  return `
        <button id="${link.id}">
          <span class="icon ${link.iconClass}" ${styleAttribute} aria-hidden="true"></span>
          <span>${link.label}</span>
        </button>
      `;
}

export function parseCustomLinkTemplates(buttonTemplates: string): HTMLElement | null {
  const buttonsTemplate = `
    <div id="custom-links-container">
        ${buttonTemplates}
    </div>
    `;
  const dom = new DOMParser().parseFromString(buttonsTemplate, "text/html");

  return dom.getElementById("custom-links-container");
}
