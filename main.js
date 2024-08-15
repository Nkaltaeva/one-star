const addTask = document.getElementById("task-add");
const deskTaskImput = document.getElementById("task-input");
const todoWrapper = document.querySelector(".task-list");

let tasks;
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

let todoItemeElems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTask = (task, index) => {
  return `
    <div class='todo-list ${task.completed ? "checked" : ""}'>
        <div class='name-description'>${task.description}</div>
        <div class='btn-input'>
          <input onclick="completeTask(${index})" class='checkbox-input' type="checkbox" ${
    task.completed ? "checked" : ""
  }>
          <button onclick="deleteTask(${index})" class='delete-btn'>🗑</button>
        </div>
    </div>
    `;
};

const filterTasks = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed == false);
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed == true);
  tasks = [...activeTasks, ...completedTasks];
};

const fillHtmlList = () => {
  todoWrapper.innerHTML = "";
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      todoWrapper.innerHTML += createTask(item, index);
    });
    todoItemeElems = document.querySelectorAll(".todo-list");
  }
};

fillHtmlList();

const updateLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemeElems[index].classList.add("checked");
  } else {
    todoItemeElems[index].classList.remove("checked");
  }
  updateLocal();
  fillHtmlList();
};

addTask.addEventListener("click", () => {
  tasks.push(new Task(deskTaskImput.value));
  updateLocal();
  fillHtmlList();
  deskTaskImput.value = "";
});

function checkPhoneKey(key) {
  if (key == "Enter") {
    tasks.push(new Task(deskTaskImput.value));
    updateLocal();
    fillHtmlList();
    deskTaskImput.value = "";
  }
}

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateLocal();
  fillHtmlList();
};
