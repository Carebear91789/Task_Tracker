import * as fire from "./firebase.js"

class Task {
    constructor(name, due, repeated) {
        this.name = name
        this.due = due
        this.repeated = repeated
    }
}

function addTaskHTML() {
    for (let i = 0; i < Object.keys(tasks).length; i++) {
        console.log(i);
        task_div = document.createElement("div")
        document.getElementById("list").appendChild
    }
}

//--------------MAIN---------------//

const upload_tasks = [
    new Task("Webwork", "31/12/2025"),
    new Task("Mastering Physics", "32/12/2025")
];

fire.uploadJSON("user1.json", upload_tasks);

let tasks = await fire.downloadJSON("user1.json");

console.log(tasks);
console.log(tasks[0].name);

addTaskHTML()