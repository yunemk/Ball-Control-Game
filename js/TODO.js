class TODO {
  static handleMouseClickOnActions(e) {
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

  static handleMouseClickOnResetTodos() {
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

  static setRunTodosHandler(field, ball, canvasModal) {
    return {
      field,
      ball,
      canvasModal,
      handleEvent: function handleEvent(e) {
        e.currentTarget.removeEventListener('click', this);
        document.getElementById('actions').removeEventListener('click', TODO.handleMouseClickOnActions);
        document.getElementById('resetTodos').removeEventListener('click', TODO.handleMouseClickOnResetTodos);
        // This can't be written by forEach in async => https://qiita.com/frameair/items/e7645066075666a13063
        (async () => {
          const todos = TODO.getTodosArr();
          for (const todo of todos) {
            switch (todo) {
              case '上へ1マス':
                await this.ball.moveSmooth(0, -1, 70);
                break;
              case '右へ1マス':
                await this.ball.moveSmooth(1, 0, 70);
                break;
              case '下へ1マス':
                await this.ball.moveSmooth(0, 1, 70);
                break;
              case '左へ1マス':
                await this.ball.moveSmooth(-1, 0, 70);
                break;
            }
            if (this.field.blockStatus[ball.posX][ball.posY] === 'black') {
              canvasModal.show('error', this.ball, this);
              todos.splice(0, todos.length);
            }
            if (this.field.blockStatus[ball.posX][ball.posY] === 'gold') {
              this.ball.posX = this.field.specialBlock.olive.x;
              this.ball.posY = this.field.specialBlock.olive.y;
            }
          }
          if (this.field.blockStatus[ball.posX][ball.posY] === 'white' || this.field.blockStatus[ball.posX][ball.posY] === 'olive') {
            canvasModal.show('failed', this.ball, this);
          } else if (this.field.blockStatus[ball.posX][ball.posY] === 'magenta') {
            canvasModal.show('clear', this.ball, this);
          }
        })();
      }
    }
  }
}