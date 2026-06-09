export function createCheckboxTemplate(checkboxData) {
  const { elementId, iconClass, iconColor, text, checked } = checkboxData;
  
  return `
    <div>
        <input type='checkbox' name="${elementId}" id="${elementId}" 
        ${checked ? "checked" : ""} />
        <label for="${elementId}">
            <span class="icon ${iconClass}" style="background-color: ${iconColor};" aria-hidden="true"></span>
            ${text}
        </label>
    </div>
    `;
}

export function parseCheckboxTemplates(buttonTemplates) {
  const buttonsTemplate = `
      <div id="checkbox-container">
          ${buttonTemplates}
      </div>
      `;
  const dom = new DOMParser().parseFromString(buttonsTemplate, "text/html");

  return dom.getElementById("checkbox-container");
}
