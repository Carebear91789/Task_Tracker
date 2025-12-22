import * as fire from "./firebase_funcs.js"

const ONLINE = true;
let tasks = [];

class Task {
    constructor(name, due, repeated) {
        this.name = name
        this.due = due
        this.repeated = repeated
    }
}

$(document).ready(async function(){
    if (ONLINE) tasks = await fire.downloadJSON("user1.json");
    addAllTaskHTML()
    console.log("JQuery Ready");

    $("#task_list").on({
        mouseenter: showGarbage, 
        mouseleave: hideGarbage
    }, ".task");

    $("#task_list").on({
        click: deleteTask
    }, ".garbage_button");

    $("#plus_button").on("click", addTask);
    $(document).on({
        mouseenter: buttonHover,
        mouseleave: buttonUnhover
    }, ".hoverable_button");

    $(".task_input").on("keydown", function(event) {
        if (event.key == "Enter") {
            addTask()
        }
    });
});

function showGarbage() {
    $(this).children(".garbage_button").fadeIn(200);
}

function hideGarbage() {
    $(this).children(".garbage_button").fadeOut(200);
}

function buttonHover() {
    $(this).animate({
        top: "-=2px"
    }, 100)
}

function buttonUnhover() {
    $(this).animate({
        top: "+=2px"
    }, 100)
}

async function addTask() {
    let task = new Task($("#task_name_input").val(), $("#due_date").val())
    tasks.push(task)
    addTaskHTML(task)

    $("#task_name_input").val("")
    $("#due_date").val("")

    if (ONLINE) fire.uploadJSON("user1.json", tasks);
}

function deleteTask() {
    let task_div = $(this).parent()
    let task_name = task_div.children("p").text()

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].name == task_name) {
            tasks.splice(i, 1);
            break;
        }
    }
    task_div.remove()

    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i].name);
    }

    if (ONLINE) fire.uploadJSON("user1.json", tasks);
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
    task_div.setAttribute("id", "building_task");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    let text_holder = document.createElement("p");
    let text = document.createTextNode(task.name);
    text_holder.appendChild(text);

    let garbage_holder = document.createElement("div");
    garbage_holder.setAttribute("class", "garbage_button");
    garbage_holder.setAttribute("hidden", "true");
    let garbage = document.createElement("img");
    garbage.setAttribute("class", "garbage");
    garbage.setAttribute("src", "assets/trash.png");
    garbage_holder.appendChild(garbage);

    task_div.appendChild(checkbox);
    task_div.appendChild(text_holder);
    task_div.appendChild(garbage_holder);

    document.getElementById("task_list").appendChild(task_div)
    task_div.setAttribute("style", "display:none");
    $("#building_task").fadeIn(200);
    task_div.removeAttribute("id");
}

function uploadTestTasks() {
    const upload_tasks = [
        new Task("Webwork", "31/12/2025"),
        new Task("Mastering Physics", "32/12/2025")
    ];

    fire.uploadJSON("user1.json", upload_tasks);
}