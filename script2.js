const timeCont = document.querySelector('.cont-time');
const todoList = document.querySelector('.cont-list');
const inputForm = document.querySelector('.input-form');
todoInput = inputForm.querySelector('.input-text');

let todoListArr = [];

function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  timeCont.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function saveToDoList(txt) {
  const toDoListObj = {
    text: txt,
    id: todoList.length + 1,
  };
  todoListArr.push(toDoListObj);
  localStorage.setItem('key', JSON.stringify(todoListArr));
}

function paintTodoList(txt) {
  const elli = document.createElement('li');
  const checkBtn = document.createElement('div');
  const elp = document.createElement('p');
  const clearBtn = document.createElement('btn-clear');
  clearBtn.innerText = 'x';

  elli.classList.add('list-item');
  checkBtn.classList.add('btn-checkBox');
  elp.classList.add('p-data');
  clearBtn.classList.add('btn-clear');

  elp.innerText = txt;

  elli.appendChild(checkBtn);
  elli.appendChild(elp);
  elli.appendChild(clearBtn);

  todoList.appendChild(elli);
  completeTodo(checkBtn, elp);

  clearBtn.addEventListener('click', deleteBtn);
}

function deleteBtn(event) {
  const li = event.target.parentElement;
  console.log(li);
  li.remove();
  todoListArr = todoListArr.filter((txt) => txt.id !== Number(li.id));
  saveToDoList();
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
  const txt = todoInput.value;
  paintTodoList(txt);
  saveToDoList(txt);
  todoInput.value = '';
}

function loadList() {
  const loadTodoList = localStorage.getItem('key');
  if (loadTodoList !== null) {
    const parsedloadTodoList = JSON.parse(loadTodoList);
    for (let txt of parsedloadTodoList) {
      const { text } = txt;
      paintTodoList(text);
      saveToDoList(text);
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
