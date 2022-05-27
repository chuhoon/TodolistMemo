const timeCont = document.querySelector('.cont-time');
const todoList = document.querySelector('.cont-list');
const inputForm = document.querySelector('.input-form');
todoInput = inputForm.querySelector('.input-text');

let todoListArr = [];
let listI = 0;

function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  timeCont.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  setInterval(() => {
    getTime();
  }, 100);
  if (localStorage.getItem('key') !== null) {
    for (let i = 0; i < JSON.parse(localStorage.getItem('key')).length; i++) {
      getTodoList(JSON.parse(localStorage.getItem('key'))[i]);
    }
  }
  inputForm.addEventListener('submit', handleSubmit);
}

function setTodoList(text) {
  todoListArr.push(text);
  const todoStr = JSON.stringify(todoListArr);
  localStorage.setItem('key', todoStr);
  console.log(todoStr);
}

function getTodoList(text) {
  const getStr = localStorage.getItem('key');
  const parseGetStr = JSON.parse(getStr);

  const elli = document.createElement('li');
  const checkBtn = document.createElement('div');
  const elp = document.createElement('p');
  const clearBtn = document.createElement('div');
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
  clearBtn.addEventListener('click', deletelist);

  console.log(parseGetStr);
}

function handleSubmit(event) {
  event.preventDefault();
  const myList = todoInput.value;
  setTodoList(myList);
  getTodoList(myList);
  todoInput.value = '';
}

// function pushText() {
//   window.addEventListener('keydown', (e) => {
//     if (e.key == 'Enter' && document.getElementById('input-text').value != '') {
//       todoListArr.push(document.getElementById('input-text').value);
//       document.getElementById('input-text').value = '';
//       setTodoList();
//       createTodoList();
//       listI += 1;
//     }
//   });
// }

// function createTodoList() {
//   const elli = document.createElement('li');
//   const checkBtn = document.createElement('div');
//   const elp = document.createElement('p');
//   const clearBtn = document.createElement('div');
//   clearBtn.innerText = 'x';

//   elli.classList.add('list-item');
//   checkBtn.classList.add('btn-checkBox');
//   elp.classList.add('p-data');
//   clearBtn.classList.add('btn-clear');
//   getTodoList();

//   elp.innerText = todoListArr[listI];

//   elli.appendChild(checkBtn);
//   elli.appendChild(elp);
//   elli.appendChild(clearBtn);

//   todoList.appendChild(elli);
//   completeTodo(checkBtn, elp);
//   clearBtn.addEventListener('click', deletelist);
// }

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

function deletelist(event) {
  const li = event.target.parentElement;
  li.remove();
}

init();
