export function createCheckboxPanel(): HTMLElement {
  const panel = document.createElement("div");
  panel.id = "checkbox-panel";

  const heading = document.createElement("h2");
  heading.textContent = "Built-in shortcuts";
  panel.appendChild(heading);

  const checkboxContainer = document.createElement("div");
  checkboxContainer.id = "checkbox-container";
  panel.appendChild(checkboxContainer);

  return panel;
}

export function createLinkPanel(): HTMLElement {
  const panel = document.createElement("div");
  panel.id = "link-panel";

  const heading = document.createElement("h2");
  heading.textContent = "Custom links";
  panel.appendChild(heading);

  const form = document.createElement("form");
  form.id = "custom-link-form";

  form.appendChild(createFormRow("Link label", "custom-link-label", "text", "", ""));
  form.appendChild(
    createFormRow(
      "Link URL",
      "custom-link-url",
      "text",
      "",
      ""
    )
  );

  const iconRow = document.createElement("div");
  iconRow.className = "form-row";
  const iconLabel = document.createElement("label");
  iconLabel.htmlFor = "custom-link-icon";
  iconLabel.textContent = "Icon";
  iconRow.appendChild(iconLabel);

  const iconWrapper = document.createElement("div");
  iconWrapper.className = "icon-select-wrapper";

  const iconSelect = document.createElement("select");
  iconSelect.id = "custom-link-icon";
  iconWrapper.appendChild(iconSelect);

  const iconPreview = document.createElement("span");
  iconPreview.id = "custom-link-icon-preview";
  iconPreview.className = "icon icon--account-multiple-outline";
  iconPreview.setAttribute("aria-hidden", "true");
  iconWrapper.appendChild(iconPreview);

  iconRow.appendChild(iconWrapper);
  form.appendChild(iconRow);

  const colorRow = document.createElement("div");
  colorRow.className = "form-row";

  const colorLabel = document.createElement("label");
  colorLabel.htmlFor = "custom-link-color";
  colorLabel.textContent = "Color";
  colorRow.appendChild(colorLabel);

  const colorSelect = document.createElement("select");
  colorSelect.id = "custom-link-color";
  colorRow.appendChild(colorSelect);

  form.appendChild(colorRow);

  const buttonRow = document.createElement("div");
  buttonRow.className = "form-row form-actions-row";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Add custom link";
  buttonRow.appendChild(submitButton);

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.id = "custom-link-cancel";
  cancelButton.className = "cancel-custom-link";
  cancelButton.textContent = "Cancel";
  cancelButton.style.display = "none";
  buttonRow.appendChild(cancelButton);

  form.appendChild(buttonRow);

  panel.appendChild(form);
  panel.appendChild(createCustomLinksComponent());

  return panel;
}

export function createFormRow(
  labelText: string,
  inputId: string,
  type: string,
  placeholder: string,
  value: string
): HTMLElement {
  const row = document.createElement("div");
  row.className = "form-row";

  const label = document.createElement("label");
  label.htmlFor = inputId;
  label.textContent = labelText;
  row.appendChild(label);

  const input = document.createElement("input");
  input.id = inputId;
  input.type = type;
  input.placeholder = placeholder;
  input.value = value;
  row.appendChild(input);

  return row;
}

export function createCustomLinksComponent(): HTMLElement {
  const list = document.createElement("div");
  list.id = "custom-links-list";
  return list;
}
