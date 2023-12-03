const contentContainerPage = document.getElementById("content-container");
let contentContainer = contentContainerPage;
const form = document.getElementById("form");
const submitBtn = document.getElementById("submit");
const saveBtn = document.getElementById("save");
const autoSaveBtn = document.getElementById("auto-save");
let activeAutoSave = false;
let activeSwapContainer = false;
let swapContainerBorder = "none";
const loadBtn = document.getElementById("load");
if (!!localStorage.getItem("elements")) {
  loadBtn.disabled = false;
}
const clearBtn = document.getElementById("clear");
const swapContainer = document.getElementById("swap-container");

const elementSelect = document.getElementById("select-element");

const widthInput = document.getElementById("width-input");
const widthSelect = document.getElementById("select-width");
widthInput.max = contentContainer.offsetWidth;

const heightInput = document.getElementById("height-input");
const heightSelect = document.getElementById("select-height");
heightInput.max = contentContainer.offsetHeight;

const backgroundColor = document.getElementById("background-color-input");

const boxShadowXInput = document.getElementById("box-shadow-x-input");
const boxShadowYInput = document.getElementById("box-shadow-y-input");
const boxShadowColor = document.getElementById("box-shadow-color-input");
const createBoxShadow = document.getElementById("create-box-shadow");

const textInput = document.getElementById("text-input");
const fontColor = document.getElementById("font-color-input");
const fontSelect = document.getElementById("select-font");
const weightSelect = document.getElementById("select-weight");

const fontSizeInput = document.getElementById("font-size-input");
const fontSizeSelect = document.getElementById("font-size-select");

const borderInput = document.getElementById("border-input");
const borderStyle = document.getElementById("select-border-type");
const borderColor = document.getElementById("border-color");
const borderRadius = document.getElementById("border-radius-input");

const marginInput = document.getElementById("margin-input");
const marginSelect = document.getElementById("margin-select");
const paddingInput = document.getElementById("padding-input");
const paddingSelect = document.getElementById("padding-select");

const idInput = document.getElementById("id-input");
let message = document.getElementById("msg");
console.clear();

let idSet = new Set();

// EventListeners
idInput.addEventListener("input", validID);
form.addEventListener("submit", formSubmit);
saveBtn.addEventListener("click", save);
loadBtn.addEventListener("click", load);
clearBtn.addEventListener("click", clear);
autoSaveBtn.addEventListener("click", toggleAutoSave);
swapContainer.addEventListener("click", swapContentContainer);

// Functions
function validID() {
  message.innerHTML = "";
  submitBtn.disabled = false;
  if (idSet.has(idInput.value)) {
    message.innerHTML = "ID is used already";
    submitBtn.disabled = true;
  }
  savedIds = new Set(JSON.parse(localStorage.getItem("ids")));
  if (savedIds.has(idInput.value)) {
    message.innerHTML = "ID is saved already";
    submitBtn.disabled = true;
  }
}

function formSubmit(event) {
  event.preventDefault();

  let element = document.createElement(elementSelect.value);
  element.style.width = widthInput.value + widthSelect.value;
  element.style.height = heightInput.value + heightSelect.value;
  element.style.backgroundColor = backgroundColor.value;
  element.innerText = textInput.value;
  element.style.color = fontColor.value;
  element.style.fontSize = fontSizeInput.value + fontSizeSelect.value;
  element.style.border = `${borderInput.value}px ${borderStyle.value} ${borderColor.value}`;
  element.style.borderRadius = borderRadius.value + "px";
  if (createBoxShadow.value == "Yes") {
    element.style.boxShadow = `${boxShadowXInput.value}px ${boxShadowYInput.value}px 10px 1px ${boxShadowColor.value}`;
  } else {
    element.style.boxShadow = "none";
  }
  element.style.wordWrap = "break-word";
  switch (weightSelect.value) {
    case "Normal":
      element.style.fontWeight = "400";
      break;
    case "Bold":
      element.style.fontWeight = "600";
      break;
    case "Bolder":
      element.style.fontWeight = "800";
      break;
  }

  switch (fontSelect.value) {
    case "Arial":
      element.style.fontFamily = "Arial, sans-serif";
      break;
    case "Times":
      element.style.fontFamily = "Times New Roman, serif";
      break;
    case "Cursive":
      element.style.fontFamily = "Cursive";
      break;
  }

  switch (marginSelect.value) {
    case "all sides":
      element.style.margin = marginInput.value + "px";
      break;
    case "buttom":
      element.style.marginBottom = marginInput.value + "px";
      break;
    case "top":
      element.style.marginTop = marginInput.value + "px";
      break;
    case "left & right":
      element.style.margin = `0 ${marginInput.value}px`;
      break;
  }

  switch (paddingSelect.value) {
    case "all sides":
      element.style.padding = paddingInput.value + "px";
      break;
    case "buttom":
      element.style.paddingBottom = paddingInput.value + "px";
      break;
    case "top":
      element.style.paddingTop = paddingInput.value + "px";
      break;
    case "left & right":
      element.style.padding = `0 ${paddingInput.value}px`;
      break;
  }

  let timeCreated = (() => {
    function get2Digits(number) {
      return String(number).length > 1 ? number : `0${number}`;
    }
    const time = new Date();
    const year = time.getFullYear();
    const month = get2Digits(time.getMonth() + 1);
    const day = get2Digits(time.getDate());
    const hours = get2Digits(time.getHours());
    const minutes = get2Digits(time.getMinutes());
    const seconds = get2Digits(time.getSeconds());
    return `${day}/${month}/${year}-${hours}:${minutes}:${seconds}`;
  })();
  element.setAttribute("title", `Date created: ${timeCreated}`);

  if (!idSet.has(idInput.value) && !!idInput.value) {
    idSet.add(idInput.value);
    element.setAttribute("id", idInput.value);
  }

  saveBtn.disabled = false;
  if (!!contentContainerPage.innerHTML) {
    loadBtn.disabled = false;
  }
  contentContainer.appendChild(element);

  validID();
}

function save() {
  contentContainer.style.border = swapContainerBorder;

  localStorage.setItem("elements", contentContainerPage.innerHTML);
  localStorage.setItem("ids", JSON.stringify([...idSet]));

  if (contentContainer.id != "content-container") {
    contentContainer.style.border = "2px dashed black";
  }

  saveBtn.disabled = true;
  loadBtn.disabled = false;
}

function load() {
  if (localStorage.getItem("elements") !== "") {
    const items = localStorage.getItem("elements");
    contentContainerPage.innerHTML = items;
    contentContainer = contentContainerPage;
    loadBtn.disabled = false;
  }
  if (localStorage.getItem("ids") !== "") {
    idSet = savedIds = new Set(JSON.parse(localStorage.getItem("ids")));
  }
  saveBtn.disabled = true;
  loadBtn.disabled = true;
}

function clear() {
  loadBtn.disabled = true;
  localStorage.removeItem("elements");
  localStorage.removeItem("ids");
  window.location.reload();
}

function toggleAutoSave() {
  activeAutoSave = !activeAutoSave;
  autoSaveBtn.classList.remove("red", "green");
  if (activeAutoSave) {
    autoSaveBtn.classList.add("green");
    if (!!contentContainerPage.innerHTML) {
      save();
    }
    if (!localStorage.getItem("elements")) {
      loadBtn.disabled = true;
    }
    form.addEventListener("submit", save);
    autoSaveBtn.innerHTML = "Auto Save-On";
  } else {
    autoSaveBtn.classList.add("red");
    form.removeEventListener("submit", save);
    autoSaveBtn.innerHTML = "Auto Save-Off";
  }
}

function swapContentContainer() {
  swapContainer.style.background = "orange";
  message.innerHTML = "";
  activeSwapContainer = !activeSwapContainer;
  removeEventListenters();
  if (activeSwapContainer) {
    addEventListenters();
  }

  function addEventListenters() {
    document
      .querySelectorAll("*")
      .forEach((element) => element.addEventListener("click", handleClick));
    document
      .querySelectorAll("button")
      .forEach((element) => element.removeEventListener("click", handleClick));
  }

  function removeEventListenters() {
    document
      .querySelectorAll("*")
      .forEach((element) => element.removeEventListener("click", handleClick));
  }

  function isInsideContentContainer(element) {
    let currentElement = element;

    while (currentElement !== null) {
      if (currentElement.id === "content-container") {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }

  function handleClick(clickedCellEvent) {
    const clickedElement = clickedCellEvent.target;
    if (clickedElement.id !== "swap-container") {
      removeEventListenters();
      activeSwapContainer = false;

      if (isInsideContentContainer(clickedElement)) {
        console.log("inside");
        contentContainer.style.border = swapContainerBorder;
        swapContainerBorder = clickedElement.style.border;

        contentContainer = clickedElement;
        if (clickedElement.id !== "content-container") {
          clickedElement.style.border = "2px dashed black";
        }
        widthInput.max = contentContainer.offsetWidth;
        heightInput.max = contentContainer.offsetHeight;
      } else {
        console.log("outside");
        message.innerHTML =
          "Click again, please select your container from your blank page!";
      }
      swapContainer.style.background = "#1f1f1f";
    }
    clickedCellEvent.stopPropagation();
  }
}
