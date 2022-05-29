const timeCont = document.querySelector('.cont-time');
const todoList = document.querySelector('.cont-list');
const inputForm = document.querySelector('.input-form');
todoInput = inputForm.querySelector('.input-text');

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

function setTodoList(text) {
  todoListArr.push(text);
  console.log(todoListArr);
  const todoStr = JSON.stringify(todoListArr);
  localStorage.setItem('key', todoStr);
  console.log(todoStr);
}

function getTodoList(text) {
  const getStr = localStorage.getItem('key');
  const parseGetStr = JSON.parse(getStr);
  console.log(parseGetStr);

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
  elp.id = todoListArr.length + 1;

  elli.appendChild(checkBtn);
  elli.appendChild(elp);
  elli.appendChild(clearBtn);

  todoList.appendChild(elli);
  completeTodo(checkBtn, elp);

  clearBtn.addEventListener('click', (event) => {
    const li = event.target.parentElement;
    const pdata = event.target.previousSibling.innerText;
    console.log(pdata);
    li.remove();

    for (let i = 0; i < parseGetStr.length; i++) {
      if (parseGetStr[i] == pdata) {
        parseGetStr.splice(i, 1);
      }
    }
    console.log(parseGetStr);
  });
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
  getTodoList(myList);
  setTodoList(myList);

  todoInput.value = '';
}

function init() {
  setInterval(() => {
    getTime();
  }, 100);
  if (localStorage.getItem('key') !== null) {
    for (let i = 0; i < JSON.parse(localStorage.getItem('key')).length; i++) {
      getTodoList(JSON.parse(localStorage.getItem('key'))[i]);
      todoListArr.push(JSON.parse(localStorage.getItem('key'))[i]);
    }
  }
  inputForm.addEventListener('submit', handleSubmit);
}

init();
