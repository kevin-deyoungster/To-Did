// Underline datetime when text changes (with Mutation Observer)
// let config = { attributes: false, characterData: true, subtree: true };

// let lookForDates = function(mutationsList, observer) {
//     for (let mutation of mutationsList) {
//         if (mutation.type == "characterData") {
//             underline();
//         }
//     }
// };

// let observer = new MutationObserver(lookForDates);
// observer.observe(INPUTBOX, config);

function renderTodoList(todos) {
    let todoLIs = todos
        .map(
            todo =>
                `<li> ${todo["title"]} - due: ${todo["date"] || "Nothing"}</li>`
        )
        .join("");
    MAINLIST.innerHTML = todoLIs;
}
