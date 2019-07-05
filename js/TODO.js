class TODO {
  static addActionToTodoList(e) {
    if (e.target.nodeName === 'BUTTON') {
      const todosElement = document.getElementById('todos');
      const firstEmptyTodo = Array.from(todosElement.children)
        .find(el => el.classList.contains('empty'));
      if (firstEmptyTodo !== undefined) {
        // e.target.nodeName is set to "UL" sometimes
        const addedTodoText = e.target.textContent;
        firstEmptyTodo.classList.replace('empty', 'not-empty');
        firstEmptyTodo.innerHTML = `
        ${addedTodoText}
        <button class="btn btn-sm btn-danger my-n1 rounded-circle float-right delTodo">x</button>
        `;
        const delTodoBtn = firstEmptyTodo.querySelector('.delTodo');
        delTodoBtn.onclick = () => {
          delTodoBtn.parentElement.remove();
          const storedInvisibleTodo = document.createElement('li');
          storedInvisibleTodo.innerHTML = '&ThinSpace;';
          storedInvisibleTodo.classList.add('list-group-item', 'empty');
          todosElement.appendChild(storedInvisibleTodo);
        }
      }
    }
  }

  static allClear() {
    const todos = Array.from(document.getElementById('todos').children);
    todos.forEach(el => {
      el.classList.replace('not-empty', 'empty');
      el.innerHTML = '&ThinSpace;';
    });
  }

  static getTodosArr() {
    const todoElements = Array.from(document.getElementById('todos').children);
    return todoElements.filter(el => el.classList.contains('not-empty'))
      .map(el => el.innerText.slice(0, -2)); // remove x and break line
  }
}