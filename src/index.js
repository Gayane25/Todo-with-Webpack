import './styles.css';
const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const todoWrapper = document.querySelector('.todos-wrapper');
let tasks;
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem('tasks')));

function Task(description) {
  this.description = description;
  this.completed = false;
}

function updateLocal() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', function () {
  tasks.push(new Task(deskTaskInput.value));
  updateLocal();
  fillHtmlList();
  deskTaskInput.value = '';
});
let todoItemsElem = [];
function createTemplate(task, index) {
  return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
          <div class="description">${task.description}</div>
          <div class="buttons">
             <input onclick = "completeTask(${index})" class="btn-complete" type="checkbox" 
  ${tasks.completed ? 'checked' : ''} />
            <button onclick =
              "deleteTask(${index})" class="btn-delete">Delete</button>
          </div>
        </div>
  `;
}
function filterTasks() {
  const activeTasks =
    tasks.length && tasks.filter(item => item.completed == false);
  const completedTasks =
    tasks.length && tasks.filter(item => item.completed == true);
  tasks = [...activeTasks, ...completedTasks];
}

function fillHtmlList() {
  todoWrapper.innerHTML = '';
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      todoWrapper.innerHTML += createTemplate(item, index);
    });
    todoItemsElem = document.querySelectorAll('.todo-item');
  }
}
fillHtmlList();

function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemsElem[index].classList.add('checked');
  } else {
    todoItemsElem[index].classList.remove('checked');
  }
  updateLocal();
  fillHtmlList();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocal();
  fillHtmlList();
}
