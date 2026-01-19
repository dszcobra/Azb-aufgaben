"use strict";

let itemsArray = [];
let nextId = 0;

function initialize() {
  itemsArray = reloadItems();
  nextId = parseInt(localStorage.getItem('nextId') || '0', 10);
  renderItems();
}

function saveItemsInStorage(items) {
    localStorage.setItem("items", JSON.stringify(items));
}

function saveNextIdInStorage(nextId) {
  localStorage.setItem('nextId', nextId.toString());
  console.log(localStorage);
}

function reloadItems() {
  const items = localStorage.getItem("items");
  if (items) {
    return JSON.parse(items);
  }
  return [];
}

function handleClear() {
  localStorage.clear();
  itemsArray = [];
  nextId = 0;
  document.getElementById('input-text').value = "Neue Aufgabe hinzufügen";
  renderItems();
}

function handleAdd(inputText) {
  if (inputText.trim()) {
    itemsArray.push({
      id: nextId++,
      text: inputText,
      isEditable: false,
      isCompleted: false,
    });
    saveItemsInStorage(itemsArray);
    saveNextIdInStorage(nextId);
    renderItems();
  }
}

function handleComplete(itemIndex) {
  console.log("handleComplete function");
  const currentItem = itemsArray[itemIndex];
  if (currentItem) {
    currentItem.isCompleted = true;
    saveItemsInStorage(itemsArray);
    renderItems();
  }
}

function handleEdit(itemIndex) {
  const currentItem = itemsArray[itemIndex];

  if (currentItem.isEditable) {
    const span = document.querySelector(`#editable-${itemIndex}`);

    if (span) {
      const newText = span.innerText.trim();
      currentItem.text = newText;
    }
  }
  currentItem.isEditable = !currentItem.isEditable;
  saveItemsInStorage(itemsArray);
  renderItems();
}

function handleDelete(itemIndex) {
  itemsArray = itemsArray.filter((item) => item.id !== itemIndex);
  saveItemsInStorage(itemsArray);
  renderItems();
}

function renderItems() {
  const containerCurrent = document.getElementById("container-current-items");
  const containerCompleted = document.getElementById("container-completed-items");

  // UI leeren für die gerenderten elemente
  containerCurrent.innerHTML = "";
  containerCompleted.innerHTML = "";

  itemsArray.forEach((item) => {
    if (!item.isCompleted) {
      const html = `
        <div class="item" id="item-${item.id}">
          <button class="btn-edit" 
                  data-index="${item.id}" 
                  onclick="handleEdit(${item.id})"
          >
            ${ item.isEditable ? "&check;" : `<img class='icon-edit' src='./icons/edit.svg'/>`}
          </button>
          <span id="editable-${item.id}" contenteditable="${item.isEditable}">${item.text}</span>
          <button class="btn-complete" 
                  data-index="${item.id}" 
                  onclick="handleComplete(${item.id})"
          >
            <img class='icon-delete' src='./icons/check.svg'/>
          </button>
          <button class="btn-delete" 
                  data-index="${item.id}" 
                  onclick="handleDelete(${item.id})"
          >
            <img class='icon-delete' src='./icons/delete.svg'/>
          </button>
        </div>
      `;
      containerCurrent.insertAdjacentHTML("beforeend", html);
    } else {
        const html = `
          <div class="item" id="item-${item.id}">
          <span >${item.text}</span>
            <button class="btn-delete" 
                    data-index="${item.id}" 
                    onclick="handleDelete(${item.id})">
              <img class='icon-delete' src='./icons/delete.svg'/>
            </button>
          </div>
        `;
      containerCompleted.insertAdjacentHTML("beforeend", html);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  itemsArray = reloadItems(); 
  initialize();
  
  const inputText = document.getElementById("input-text");
  const buttonAdd = document.getElementById("button-add");
  const buttonClear = document.getElementById("button-clear");

  buttonAdd.addEventListener("click", () => {
    handleAdd(inputText.value);
    //inputText.value = "";
  });

  buttonClear.addEventListener("click", handleClear);
});