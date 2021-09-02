//Selectors
let x = 0;
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const one = document.querySelector('.todo');
const done = document.querySelector('.done');
const filterOption = document.querySelector('.filter-todo');
//Event Listeners
todoButton.addEventListener('click', addTodo);
filterOption.addEventListener('click', filterTodo);
todoButton.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTodo;
  }
});
todoList.addEventListener('click', deleteCheck);
done.addEventListener('click', finished);
//Functions
//Adds an item ont the checklist with buttons
function addTodo(event) {
  x++;
  event.preventDefault();
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class = "fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
  todoInput.value = '';
}
//Checking wether the trash button or complete button is pressed
function deleteCheck(event) {
  const item = event.target;
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
    x--;
  }
  if (item.classList[0] === 'complete-btn') {
    item.parentElement.classList.toggle('completed');
  }
}
//When the done button is pressed
function finished() {
  const container = document.querySelectorAll('.todo');
  let y = x;
  while (x > 0) {
    container[x - 1].classList.add('fall');
    x = x - 1;
  }
  container[0].addEventListener('transitionend', function () {
    while (y > 0) {
      console.log('transitioned)');
      container[y - 1].remove();
      y--;
    }
  });
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}
function saveLocalTodos (todo)