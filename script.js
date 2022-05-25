const timeCont = document.querySelector('.cont-time');
const todoList = document.querySelector('.cont-list');

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
}

let todoListArr = [];
let listI = 0;

function setTodoList() {
  localStorage.setItem('key', JSON.stringify(todoListArr));
}

function loadToDos() {}

function pushText() {
  window.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && document.getElementById('input-text').value != '') {
      todoListArr.push(document.getElementById('input-text').value);
      console.log(todoListArr);
      document.getElementById('input-text').value = '';
      createTodoList();
      console.log(todoListArr);
      listI += 1;
    }
  });
}

function createTodoList() {
  const elli = document.createElement('li');
  const checkBtn = document.createElement('div');
  const elp = document.createElement('p');
  const clearBtn = document.createElement('div');
  clearBtn.innerText = 'x';

  elli.classList.add('list-item');
  checkBtn.classList.add('btn-checkBox');
  elp.classList.add('p-data');
  clearBtn.classList.add('btn-clear');

  elp.innerText = todoListArr[listI];

  elli.appendChild(checkBtn);
  elli.appendChild(elp);
  elli.appendChild(clearBtn);

  todoList.appendChild(elli);
  completeTodo(checkBtn, elp);
  clearBtn.addEventListener('click', deletelist);
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

function deletelist(event) {
  const li = event.target.parentElement;
  li.remove();
}

pushText();
init();
