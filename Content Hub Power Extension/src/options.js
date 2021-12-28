document.addEventListener("DOMContentLoaded", function () {
  initialize();
});

// the options page

function initialize() {
  let container = document.getElementById("container");
  let configs = initializeConfig();

  configs.forEach((config) => {
    addRow(container, config);
  });

  let button = document.getElementById("save");
  button.addEventListener("click", saveOptions);
  //chrome.storage.sync.set
}

function saveOptions(configs) {
  console.log("Saving!");
}

function addRow(container, config) {
  const div = document.createElement("div");

  var isChecked = config.isActive ? "checked" : "";
  let divText =
    '<div><input type="checkbox" id="' +
    config.id +
    '" ' +
    isChecked +
    '><label for="' +
    config.id +
    '">' +
    config.name +
    "</label></div>";
  div.innerHTML = divText;

  container.appendChild(div);
}
