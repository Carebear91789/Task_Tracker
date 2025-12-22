import * as fire from "./firebase_funcs.js"

class Task {
    constructor(name, due, repeated) {
        this.name = name
        this.due = due
        this.repeated = repeated
    }
}

function uploadTestTasks() {
    const upload_tasks = [
        new Task("Webwork", "31/12/2025"),
        new Task("Mastering Physics", "32/12/2025")
    ];

    fire.uploadJSON("user1.json", upload_tasks);
}

function addTaskHTML() {
    for (let i = 0; i < tasks.length; i++) {
        let task_div = document.createElement("div");
        task_div.setAttribute("class", "task");

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");

        let text_holder = document.createElement("p");
        let text = document.createTextNode(tasks[i].name);
        text_holder.appendChild(text);

        task_div.appendChild(checkbox);
        task_div.appendChild(text_holder);

        document.getElementById("task_list").appendChild(task_div)
    }
}

//--------------MAIN---------------//

//uploadTestTasks()

let tasks = await fire.downloadJSON("user1.json");
//addTaskHTML()