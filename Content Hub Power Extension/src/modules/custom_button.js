export function createCustomButtonTemplate(buttonData) {
  const { elementId, image, text } = buttonData;

  return `
        <button id="${elementId}">
          <img alt="${elementId}" src="${image}" />
          <span>${text}</span>
        </button>
      `;
}

export function parseCustomButtonTemplates(buttonTemplates) {
  const buttonsTemplate = `
    <div id="custom-buttons-container">
        ${buttonTemplates}
    </div>
    `;
  const dom = new DOMParser().parseFromString(buttonsTemplate, "text/html");

  return dom.getElementById("custom-buttons-container");
}
