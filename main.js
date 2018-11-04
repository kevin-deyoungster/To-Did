let ADD_TODO_BUTTON = document.getElementById("add");
let MAINLIST = document.querySelector(".todos");
let INPUTBOX = document.getElementById("todo");

let todos = [];

let tablePrepend = `<tr><th align="left">Description</th><th align="left">Date</th></tr>`;
function renderTodoList(todos) {
    let todoLIs = todos
        .map(
            (todo, index) =>
                `<tr><td> ${index + 1}. ${todo["title"]} </td><td> ${
                    todo["date"] ? todo["date"].toGMTString() : " "
                }</td><tr>`
        )
        .join("");

    INPUTBOX.innerHTML = "";
    MAINLIST.innerHTML = tablePrepend + todoLIs;
}

ADD_TODO_BUTTON.onclick = function() {
    let title = INPUTBOX.textContent;
    let date = chrono.parseDate(title);
    todos.push({ title, date });
    renderTodoList(todos);
};

let matches = [];
function underline() {
    let title = INPUTBOX.textContent;
    let chron = chrono.parse(title);
    if (chron.length > 0) {
        let index = chron[0]["index"];
        if (!matches.includes(index)) {
            let content = INPUTBOX.innerHTML.replace(
                chron[0]["text"],
                `<span class="target">${chron[0]["text"]}</span>&nbsp;`
            );
            INPUTBOX.innerHTML = content;
            matches.push(chron[0]["index"]);
        }
    } else {
        console.log("No Matches!");
        matches = [];
    }
}

let timeout = null;
INPUTBOX.addEventListener("keyup", function(e) {
    if (e.keyCode != 13) {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            underline();
            moveCursorToEnd(INPUTBOX.lastChild);
        }, 300);
    }
});

INPUTBOX.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
});

function moveCursorToEnd(element) {
    if (element) {
        offset = element instanceof Element ? 2 : element.length;
        INPUTBOX.focus();
        let sel = window.getSelection();
        sel.collapse(element, offset);
    }
}
