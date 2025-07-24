
const input = document.querySelector('.newTask-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.taskToDo');


let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();


addBtn.addEventListener('click', () => {
    const title = input.value.trim();
    if (!title) {
        alert('Please enter a valid todo title.');
        return;
    }
    const todo = { id: Date.now(), title, done: false };
    todos.push(todo);
    saveAndRender();
    input.value = '';
});


document.addEventListener('click', (e) => {
    // Check button (toggle done)
    if (e.target.closest('.check-btn')) {
        const taskDiv = e.target.closest('.task, .task-done');
        if (taskDiv) {
            const id = Number(taskDiv.dataset.id);
            todos = todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo);
            saveAndRender();
        }
    }
    // Delete button
    if (e.target.closest('.delete-btn')) {
        const taskDiv = e.target.closest('.task, .task-done');
        if (taskDiv) {
            const id = Number(taskDiv.dataset.id);
            todos = todos.filter(todo => todo.id !== id);
            saveAndRender();
        }
    }
});


function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}


function renderTodos() {
    // Clear taskToDo and done-tasks (except headers)
    todoList.innerHTML = '<p class="taskToDo-header">Task to do</p>';
    const doneTasksContainer = document.querySelector('.done-tasks');
    doneTasksContainer.innerHTML = '<p class="done">Done</p>';

    todos.forEach(todo => {
        if (!todo.done) {
            // Not done: show in main list with check and delete buttons
            const div = document.createElement('div');
            div.className = 'task';
            div.dataset.id = todo.id;
            div.innerHTML = `
                <p class="task-paragraph">${todo.title}</p>
                <div class="task-btns">
                    <button class="check-btn">
                        <img src="Group 1.svg" alt="check">
                    </button>
                    <button class="delete-btn">
                        <img src="Group 2.svg" alt="delete">
                    </button>
                </div>
            `;
            todoList.appendChild(div);
        } else {
            // Done: show in done section WITH delete button styled the same
            const doneDiv = document.createElement('div');
            doneDiv.className = 'task-done';
            doneDiv.dataset.id = todo.id;
            doneDiv.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <p style="margin: 0 0 0 10px;">${todo.title}</p>
                    <div class="task-btns">
                        <button class="delete-btn">
                            <img src="Group 2.svg" alt="delete">
                        </button>
                    </div>
                </div>
            `;
            doneTasksContainer.appendChild(doneDiv);
        }
    });
}
