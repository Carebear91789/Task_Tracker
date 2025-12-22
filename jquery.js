import * as fire from "./firebase_funcs.js"

let tasks = [];

class Task {
    constructor(name, due, repeated) {
        this.name = name
        this.due = due
        this.repeated = repeated
    }
}

$(document).ready(async function(){
    //let tasks = await fire.downloadJSON("user1.json");
    addAllTaskHTML()
    console.log("JQuery Ready");

    $("#plus_button").on("click", addTask);
});

async function addTask() {
    //let tasks = await fire.downloadJSON("user1.json");
    let task = new Task($("#task_name_input").val(), $("#due_date").val())
    tasks.push(task)
    addTaskHTML(task)

    $("#task_name_input").val("")
    $("#due_date").val("")
    console.log(tasks)
}

//Change to use JQuery
function addAllTaskHTML() {
    for (let i = 0; i < tasks.length; i++) {
        addTaskHTML(tasks[i])
    }
}

function addTaskHTML(task) {
    let task_div = document.createElement("div");
    task_div.setAttribute("class", "task");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    let text_holder = document.createElement("p");
    let text = document.createTextNode(task.name);
    text_holder.appendChild(text);

    task_div.appendChild(checkbox);
    task_div.appendChild(text_holder);

    document.getElementById("task_list").appendChild(task_div)
}

function uploadTestTasks() {
    const upload_tasks = [
        new Task("Webwork", "31/12/2025"),
        new Task("Mastering Physics", "32/12/2025")
    ];

    fire.uploadJSON("user1.json", upload_tasks);
}