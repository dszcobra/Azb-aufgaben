console.log("todolist");
window.onload = function() {
    const add = document.getElementById("new");
    const list = document.getElementById("list");
    const input = document.getElementById("input");
    const next = document.getElementById("next");
    const h1 = document.getElementById("h1");

    let deletedTasks = JSON.parse(localStorage.getItem("del") || "[]");
    let completedTasks = JSON.parse(localStorage.getItem("comp") || "[]");
    let isEditMode = false;
    let currentItem = null;
    let page = "open";

    loadTasks();

    function createButton(className, textContent) {
        let button = document.createElement("div");
        button.className = className;
        button.textContent = textContent;
        return button;
    }

    function addTasks(value, key) {
        let listItem = document.createElement("div");
        let controls = document.createElement("div");
        let container = document.createElement("div");
        listItem.className = "taskItem";
        controls.className = "task-controls";
        listItem.textContent = value;

        switch(page)
        {
            case "open":
                {
                    let edit = createButton("edit", "\u270E");
                    let del = createButton("delete", "x");
                    let complete = createButton("complete", "\u2713");

                    edit.addEventListener("click", function() {
                        input.value = listItem.textContent;
                        add.textContent = "\u2713";
                        add.style.backgroundColor = "lightblue";
                        isEditMode = true;
                        currentItem = listItem;
                        input.focus();
                    });
            
                    del.addEventListener("click", function() {
                        localStorage.removeItem(key);
                        list.removeChild(listItem.parentElement);
                        deletedTasks.push({ key, value });
                        localStorage.setItem("del", JSON.stringify(deletedTasks));
                    });
            
                    complete.addEventListener("click", function() {
                        localStorage.removeItem(key);
                        list.removeChild(listItem.parentElement);
                        completedTasks.push({ key, value });
                        localStorage.setItem("comp", JSON.stringify(completedTasks));
                    });

                    controls.appendChild(complete);
                    controls.appendChild(edit);
                    controls.appendChild(del);
                }
                break;
            case "deleted":
                {
                    let del = createButton("delete", "x");
                    let back = createButton("back", "\u21A9");

                    del.addEventListener("click", function() {
                        deletedTasks = deletedTasks.filter(x => x.key != key);
                        localStorage.removeItem("del", JSON.stringify(deletedTasks));
                        localStorage.removeItem(key, value);
                        loadDeletedTasks();
                    });
            
                    back.addEventListener("click", function() {
                        deletedTasks = deletedTasks.filter(x => x.key != key);
                        localStorage.setItem("del", JSON.stringify(deletedTasks));
                        localStorage.setItem(key, value);
                        loadDeletedTasks();
                    });

                    controls.appendChild(back);
                    controls.appendChild(del);
                }
                break;
            case "completed":
                {
                    let back = createButton("back", "\u21A9");
                    back.addEventListener("click", function() {
                        completedTasks = completedTasks.filter(x => x.key != key);
                        localStorage.setItem("comp", JSON.stringify(completedTasks));
                        localStorage.setItem(key, value);
                        loadCompletedTasks();
                    });
    
                    controls.appendChild(back);
                }
                break;
        }
        
        container.appendChild(listItem);
        container.appendChild(controls);
        list.appendChild(container);
    }

    function loadTasks() {
        list.innerHTML = "";
        h1.innerText = "Open Tasks";
        page = "open";
        const keys = Object.keys(localStorage).filter(x => x.startsWith("task_"));
        keys.sort();
        keys.forEach(x => {
            addTasks(localStorage.getItem(x), x);
        });
    }

    function loadDeletedTasks() {
        h1.innerText = "Deleted Tasks";
        list.innerHTML = "";
        page = "deleted";
        deletedTasks.forEach(x => {
            addTasks(x.value, x.key);
        });
    }

    function loadCompletedTasks() {
        list.innerHTML = "";
        h1.innerText = "Completed Tasks";
        page = "completed";
        completedTasks.forEach(x => {
            addTasks(x.value, x.key);
        });
    }

    function addOrEdit() {
        if (!isEditMode) {
            let key = "task_" + Date.now();
            addTasks(input.value, key);
            localStorage.setItem(key, input.value);
            input.value = "";
        } else {
            let key = Object.keys(localStorage).find(x => localStorage.getItem(x) == currentItem.textContent);
            localStorage.setItem(key, input.value);  
            currentItem.textContent = input.value;
            isEditMode = false;
            add.style.backgroundColor = "lightgreen";
            currentItem.style.backgroundColor = "whitesmoke";
            add.textContent = "+";
            input.value = "";
        }
    }

    add.addEventListener("click", function() {
        if(page == "open")
            addOrEdit();
    });

    addEventListener("keydown", function(event) {
        if (event.key == "Enter" && page == "open")
            addOrEdit();
    });

    next.addEventListener("click", function() {
        switch(page) {
            case "open":
                loadDeletedTasks();
                break;
            case "deleted":
                loadCompletedTasks();
                break;
            case "completed":
                loadTasks();
                break;
        }
    });

}
