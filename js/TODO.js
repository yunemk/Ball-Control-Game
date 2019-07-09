class TODO {
  static handleMouseClickOnActions(e) {
    if (e.target.nodeName === 'BUTTON') {
      const btn = e.target;
      const todosElement = document.getElementById('todos');
      const firstEmptyTodo = Array.from(todosElement.children)
        .find(el => el.classList.contains('empty'));
      const badgeNum = parseInt(btn.lastElementChild.textContent, 10);
      if (firstEmptyTodo !== undefined && badgeNum > 0) {
        btn.lastElementChild.textContent = `${badgeNum - 1}`;
        firstEmptyTodo.classList.replace('empty', 'not-empty');
        firstEmptyTodo.innerHTML = `
        ${btn.firstChild.textContent.trim()}
        <button class="btn btn-sm btn-danger my-n1 rounded-circle float-right delTodo">x</button>
        `;
        const delTodoBtn = firstEmptyTodo.querySelector('.delTodo');
        delTodoBtn.onclick = () => {
          btn.lastElementChild.textContent = `${parseInt(btn.lastElementChild.textContent, 10) + 1}`;
          delTodoBtn.parentElement.remove();
          const storedInvisibleTodo = document.createElement('li');
          storedInvisibleTodo.innerHTML = '&ThinSpace;';
          storedInvisibleTodo.classList.add('list-group-item', 'empty');
          todosElement.appendChild(storedInvisibleTodo);
        }
      }
    }
  }

  static handleMouseClickOnResetTodos(stage) {
    return {
      stage,
      handleEvent: () => {
        const todos = Array.from(document.getElementById('todos').children);
        todos.forEach(el => {
          el.classList.replace('not-empty', 'empty');
          el.innerHTML = '&ThinSpace;';
        });
        TODO.resetActionsBadgeNumber(stage);
      }
    };
  }

  static getTodosArr() {
    const todoElements = Array.from(document.getElementById('todos').children);
    return todoElements.filter(el => el.classList.contains('not-empty'))
      .map(el => el.innerText.slice(0, -2)); // remove x and break line
  }

  static setRunTodosHandler(field, ball, canvasModal, handleMouseClickOnResetTodos) {
    return {
      field,
      ball,
      canvasModal,
      handleMouseClickOnResetTodos,
      handleEvent: function handleEvent(e) {
        e.currentTarget.removeEventListener('click', this);
        document.getElementById('actions').removeEventListener('click', TODO.handleMouseClickOnActions);
        document.getElementById('resetTodos').removeEventListener('click', handleMouseClickOnResetTodos);
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
              canvasModal.show('error', this.ball, this, this.handleMouseClickOnResetTodos);
              todos.splice(0, todos.length);
            }
            if (this.field.blockStatus[ball.posX][ball.posY] === 'gold') {
              this.ball.posX = this.field.specialBlock.olive.x;
              this.ball.posY = this.field.specialBlock.olive.y;
            }
          }
          if (this.field.blockStatus[ball.posX][ball.posY] === 'white' || this.field.blockStatus[ball.posX][ball.posY] === 'olive') {
            canvasModal.show('failed', this.ball, this, this.handleMouseClickOnResetTodos);
          } else if (this.field.blockStatus[ball.posX][ball.posY] === 'magenta') {
            canvasModal.show('clear', this.ball, this, this.handleMouseClickOnResetTodos);
          }
        })();
      }
    }
  }

  static resetActionsBadgeNumber(stage) {
    Array.from(document.getElementById('actions').children).forEach((btn, index) => {
      if (index === 0) {
        btn.lastElementChild.textContent = stage.actionsBadgeNum.dir.up;
      } else if (index === 1) {
        btn.lastElementChild.textContent = stage.actionsBadgeNum.dir.right;
      } else if (index === 2) {
        btn.lastElementChild.textContent = stage.actionsBadgeNum.dir.down;
      } else if (index === 3) {
        btn.lastElementChild.textContent = stage.actionsBadgeNum.dir.left;
      } else if (index === 4) {
        btn.lastElementChild.textContent = stage.actionsBadgeNum.for.start;
      } else if (index === 5) {
        btn.lastElementChild.textContent = stage.actionsBadgeNum.for.end;
      }
    });
  }
}