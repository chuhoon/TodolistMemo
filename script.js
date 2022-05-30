const timeCont = document.querySelector('.cont-time');
const todoList = document.querySelector('.cont-list');
const inputForm = document.querySelector('.input-form');
todoInput = inputForm.querySelector('.input-text');

// const TodoList = 'list';
const todoListArr = [];

function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  timeCont.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function saveToDoList() {
  localStorage.setItem('key', JSON.stringify(todoListArr));
}

function setTodoList(text) {
  todoListArr.push(text);
  console.log(todoListArr);
  localStorage.setItem('key', JSON.stringify(todoListArr));
  saveToDoList();
}

function getTodoList(text) {
  const elli = document.createElement('li');
  const checkBtn = document.createElement('div');
  const elp = document.createElement('p');
  const clearBtn = document.createElement('btn-clear');
  clearBtn.innerText = 'x';

  elli.classList.add('list-item');
  checkBtn.classList.add('btn-checkBox');
  elp.classList.add('p-data');
  clearBtn.classList.add('btn-clear');

  elp.innerText = text;

  elli.appendChild(checkBtn);
  elli.appendChild(elp);
  elli.appendChild(clearBtn);

  todoList.appendChild(elli);
  completeTodo(checkBtn, elp);

  clearBtn.addEventListener('click', deleteBtn);
  saveToDoList();
}

function deleteBtn(event) {
  const li = event.target.parentElement;
  const loadTodoList = localStorage.getItem('key');
  const parsedloadTodoList = JSON.parse(loadTodoList);
  for (let i = 0; i < parsedloadTodoList.length; i++) {
    if (parsedloadTodoList[i] == event.target.previousSibling.innerText) {
      li.remove();
      parsedloadTodoList.splice(i, 1);
      console.log(parsedloadTodoList);
    }
  }
}

function completeTodo(checkBtn, elp) {
  checkBtn.addEventListener('click', function () {
    if (checkBtn.innerText == '') {
      checkBtn.innerText = '✔';
      elp.classList.add('checked');
    } else {
      checkBtn.innerText = '';
      elp.classList.remove('checked');
    }
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const myList = todoInput.value;
  setTodoList(myList);
  getTodoList(myList);
  todoInput.value = '';
}

function loadList() {
  const loadTodoList = localStorage.getItem('key');
  if (loadTodoList !== null) {
    const parsedloadTodoList = JSON.parse(loadTodoList);
    for (let i = 0; i < parsedloadTodoList.length; i++) {
      const txt = parsedloadTodoList[i];
      setTodoList(txt);
      getTodoList(txt);
    }
  }
}

function init() {
  setInterval(() => {
    getTime();
  }, 100);
  // localStorage.removeItem('key');
  loadList();
  inputForm.addEventListener('submit', handleSubmit);
}

init();
