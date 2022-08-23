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

function saveToDoList() {
    localStorage.setItem('key', JSON.stringify(todoListArr));
}

function setTodoList(txt) {
    const toDoListObj = {
        text: txt,
        id: todoListArr.length + 1,
    };
    todoListArr.push(toDoListObj);
    saveToDoList();
}

function deleteBtn(event) {
    let li = event.target.parentElement;
    li.remove();
    for (let i = 0; i < todoListArr.length; i++) {
        if (li.childNodes[1].innerText === todoListArr[i].text) {
            todoListArr.splice(i, 1);
        }
    }
    saveToDoList();
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
    setTodoList(txt);
    todoInput.value = '';
}

function loadList() {
    const loadTodoList = localStorage.getItem('key');
    if (loadTodoList !== null) {
        const parsedloadTodoList = JSON.parse(loadTodoList);
        for (let txt of parsedloadTodoList) {
            const { text } = txt;
            paintTodoList(text);
            setTodoList(text);
        }
    }
}

function init() {
    setInterval(() => {
        getTime();
    }, 100);
    loadList();
    inputForm.addEventListener('submit', handleSubmit);
}

init();
