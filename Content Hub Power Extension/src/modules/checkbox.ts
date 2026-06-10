export interface CheckboxData {
  elementId: string;
  iconClass: string;
  iconColor: string;
  text: string;
  checked?: boolean;
}

export function createCheckboxTemplate(checkboxData: CheckboxData): string {
  const { elementId, iconClass, iconColor, text, checked } = checkboxData;

  return `
    <div>
        <input type='checkbox' name="${elementId}" id="${elementId}" 
        ${checked ? "checked" : ""} />
        <label for="${elementId}">
            <span class="icon ${iconClass}" style="background-color: ${iconColor};" aria-hidden="true"></span>
            <span>${text}</span>
        </label>
    </div>
    `;
}

export function parseCheckboxTemplates(
  buttonTemplates: string
): DocumentFragment {
  const template = document.createElement("template");
  template.innerHTML = buttonTemplates;

  return template.content;
}
