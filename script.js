const inputTask = document.querySelector("#inputTask");
const addTask = document.querySelector("#addTask");
const todoUl = document.querySelector("taskUl");

function createTask(todoTask){

    let taskLi = document.createElement("li");
    let taskText = document.createElement("div");
    let checkBtn = document.createElement("button");
    let trashBtn = document.createElement("button");

    todoUl.appendChild(taskLi);
    taskLi.appendChild(taskText);
    taskLi.appendChild(checkBtn);
    taskLi.appendChild(trashBtn);

    taskLi.classList.add("d-flex" ,"justify-content-center")
    taskText.classList.add("fs-5" ,"align-items-center" ,"d-flex" , "p-2");
    checkBtn.classList.add("check-btn", "btn", "btn-success", "rounded-0");
    trashBtn.classList.add("close-btn", "btn", "btn-danger", "rounded-0")

    taskText.textContent = todoTask
    checkBtn.innerHTML = '<i class="bi bi-check-lg"></i>'
    trashBtn.innerHTML = '<i class="bi bi-trash"></i>'

}

addTask.addEventListener("click", (inputTask.value =! "" ? createTask(inputTask.value) : prompt("Insira alguma atividade")))
 

