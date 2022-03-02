export function createCheckboxTemplate(checkboxData) {
  const { elementId, image, text, checked } = checkboxData;

  return `
    <div>
        <input type='checkbox' name="${elementId}" id="${elementId}" 
        ${checked ? "checked" : ""} />
        <label for="${elementId}">
            <img src="${image}" alt="${text}" width="24" height="24" />
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
