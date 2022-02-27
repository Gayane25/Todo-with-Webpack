import './styles.css';
const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');

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
