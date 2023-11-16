const inputTask = document.querySelector("#inputTask");
const addTask = document.querySelector("#addTask");
const todoUl = document.querySelector("#taskUl");
const todoList = document.querySelectorAll("li")
const TODO = "TodoList";
const firebaseConfig = {
    apiKey: "AIzaSyCXutUH_cgA_g9SMdNANa6AiKgL-ZJbhBs",
    authDomain: "pratica-curso.firebaseapp.com",
    projectId: "pratica-curso",
    storageBucket: "pratica-curso.appspot.com",
    messagingSenderId: "504817538090",
    appId: "1:504817538090:web:4a1a68b3b37bbb93539f53",
    measurementId: "G-VSM9Z6TZE3"
  };
  firebase.initializeApp(firebaseConfig)
  
let db = firebase.firestore();

document.addEventListener("DOMContentLoaded", loadElements)

function createTask(){
    if(inputTask.value != ""){
    let taskLi = document.createElement("li");
    let taskText = document.createElement("div");
    let checkBtn = document.createElement("button");
    let trashBtn = document.createElement("button");
    
    todoUl.appendChild(taskLi);
    taskLi.appendChild(taskText);
    taskLi.appendChild(checkBtn);
    taskLi.appendChild(trashBtn);

    taskLi.classList.add("d-flex" ,"justify-content-center", "mb-3")
    taskText.classList.add("fs-5" ,"align-items-center" ,"d-flex" , "p-2");
    checkBtn.classList.add("check-btn", "btn", "btn-success", "rounded-0");
    trashBtn.classList.add("close-btn", "btn", "btn-danger", "rounded-0");

    taskText.textContent = inputTask.value;
    checkBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
    trashBtn.innerHTML = '<i class="bi bi-trash"></i>';
    checkBtn.addEventListener("click",checkElement);
    trashBtn.addEventListener("click",deleteElements)
    
    let liProps ={
        id: Math.random(),
        text: inputTask.value,
        check: false
    }
    trashBtn.id = liProps.id
    saveElements(liProps)
    taskLi.id = liProps.id
     console.log(taskLi.id)
    }
    else{
        alert("Insira alguma atividade")
    }
    inputTask.value=""
}

function saveElements(liElement){

    db.collection(TODO).add({
        id: liElement.id,
        text: liElement.text,
        check: liElement.check
    }).then(doc=>{
        console.log("Documento inserido com sucesso", doc);
    }).catch(err =>{
        console.log(err)
    })

}

function deleteElements(e){
    const item = e.target;
    let elementId = item.parentElement.parentNode.id

    
    db.collection(TODO).where("id", "==", parseFloat(elementId)).get().then(snapshot=>{
        snapshot.forEach(doc=>{
            doc.ref.delete().then(()=>item.parentElement.parentNode.remove())
        })
    })
    
}

function loadElements(){
    db.collection(TODO).get().then(snapshot => snapshot.forEach((doc)=>{
    let taskLi = document.createElement("li");
    let taskText = document.createElement("div");
    let checkBtn = document.createElement("button");
    let trashBtn = document.createElement("button");
    
    todoUl.appendChild(taskLi);
    taskLi.appendChild(taskText);
    taskLi.appendChild(checkBtn);
    taskLi.appendChild(trashBtn);

    taskLi.classList.add("d-flex" ,"justify-content-center","mb-3")
    taskText.classList.add("fs-5" ,"align-items-center" ,"d-flex" , "p-2");
    checkBtn.classList.add("check-btn", "btn", "btn-success", "rounded-0");
    trashBtn.classList.add("close-btn", "btn", "btn-danger", "rounded-0");

    taskText.textContent = doc.data().text
    checkBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
    trashBtn.innerHTML = '<i class="bi bi-trash"></i>';

    checkBtn.addEventListener("click",checkElement);
    trashBtn.addEventListener("click",deleteElements);
    
    let liProps ={
        id: doc.data().id,
        text: inputTask.value,
        check: doc.data().check
    }
    taskLi.classList.toggle("check", doc.data().check)
    taskLi.id = liProps.id
    }))
}

function checkElement(e){
    const item = e.target
    let elementId = item.parentElement.parentNode.id

        db.collection(TODO).where("id", "==", parseFloat(elementId)).get().then(snapshot =>{
            snapshot.forEach(doc =>{
                const newCheckStatus = !doc.data().check
                doc.ref.update({
                    check:newCheckStatus
                })
                .then(() => item.parentElement.parentNode.classList.toggle("check", newCheckStatus))

            });
        });
     
        
};
addTask.addEventListener("click", createTask);








 

