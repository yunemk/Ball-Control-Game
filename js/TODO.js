class TODO {
  static switchActions(actionsBadgeNum) {
    return {
      actionsBadgeNum,
      handleEvent: (e) => {
        if (e.target.nodeName === 'BUTTON') {
          Array.from(document.getElementById('actionsSelector').children).forEach(btn => {
            btn.classList.remove('active');
          })
          e.target.classList.add('active');
          const num = parseInt(e.target.textContent);
          document.getElementById('actions').innerHTML = `
            <button type="button" class="list-group-item list-group-item-action">
              上へ${num}マス<span class="badge badge-pill badge-primary float-right">${actionsBadgeNum.dir.up[num - 1]}</span>
            </button>
            <button type="button" class="list-group-item list-group-item-action">
              右へ${num}マス<span class="badge badge-pill badge-primary float-right">${actionsBadgeNum.dir.right[num - 1]}</span>
            </button>
            <button type="button" class="list-group-item list-group-item-action">
              下へ${num}マス<span class="badge badge-pill badge-primary float-right">${actionsBadgeNum.dir.down[num - 1]}</span>
            </button>
            <button type="button" class="list-group-item list-group-item-action">
              左へ${num}マス<span class="badge badge-pill badge-primary float-right">${actionsBadgeNum.dir.left[num - 1]}</span>
            </button>
            <button type="button" class="list-group-item list-group-item-action">
              繰り返し${num + 1}回<span class="badge badge-pill badge-primary float-right">${actionsBadgeNum.for.start[num - 1]}</span>
            </button>
            <button type="button" class="list-group-item list-group-item-action">
              繰り返し終わり<span class="badge badge-pill badge-primary float-right">${actionsBadgeNum.for.end}</span>
            </button>
          `;
        }
      }
    };
  }

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
        TODO.resetActionsBadgeNumber(stage.actionsBadgeNum);
      }
    };
  }

  static resetActionsBadgeNumber(badgeNum) {
    const stgNumStr = Array.from(document.getElementById('actionsSelector').children)
      .find(el => el.classList.contains('active')).textContent;
    const stgNum = parseInt(stgNumStr) - 1; // Array counting
    Array.from(document.getElementById('actions').children).forEach((btn, index) => {
      if (index === 0) {
        btn.lastElementChild.textContent = badgeNum.dir.up[stgNum];
      } else if (index === 1) {
        btn.lastElementChild.textContent = badgeNum.dir.right[stgNum];
      } else if (index === 2) {
        btn.lastElementChild.textContent = badgeNum.dir.down[stgNum];
      } else if (index === 3) {
        btn.lastElementChild.textContent = badgeNum.dir.left[stgNum];
      } else if (index === 4) {
        btn.lastElementChild.textContent = badgeNum.for.start[stgNum];
      } else if (index === 5) {
        btn.lastElementChild.textContent = badgeNum.for.end;
      }
    });
  }

  static getTodosArr(purpose) {
    const todos = Array.from(document.getElementById('todos').children)
      .filter(el => el.classList.contains('not-empty'))
      .map(el => el.innerText.slice(0, -2)); // remove x and break line
    if (purpose === 'dir') {
      return todos.filter(todo => todo.slice(3, 5) === 'マス');
    } else if (purpose === 'for') {
      return todos.filter(todo => todo.slice(0, 4) === '繰り返し');
    } else {
      throw new Error('purpose string should be \'dir\' or \'for\'');
    }
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
          const dirTodos = TODO.getTodosArr('dir');
          const forTodos = TODO.getTodosArr('for');
          for (const todo of dirTodos) {
            await TODO.moveBallSmooth(todo, this.ball);
            let blockStatus;
            if (this.ball.posX >= 0 && this.ball.posY >= 0 && this.ball.posX < this.field.column && this.ball.posY < this.field.row) {
              blockStatus = this.field.blockStatus[this.ball.posX][this.ball.posY];
            } else {
              blockStatus = 'none';
            }
            if (blockStatus === 'black' || blockStatus === 'none') {
              canvasModal.show('error', this.ball, this, this.handleMouseClickOnResetTodos);
              dirTodos.splice(0, dirTodos.length);
            } else if (blockStatus === 'gold') {
              this.ball.posX = this.field.specialBlock.olive.x;
              this.ball.posY = this.field.specialBlock.olive.y;
            }
          }

          let blockStatus;
          if (this.ball.posX >= 0 && this.ball.posY >= 0 && this.ball.posX < this.field.column && this.ball.posY < this.field.row) {
            blockStatus = this.field.blockStatus[this.ball.posX][this.ball.posY];
          } else {
            blockStatus = 'none';
          }
          if (blockStatus === 'white' || blockStatus === 'olive') {
            canvasModal.show('failed', this.ball, this, this.handleMouseClickOnResetTodos);
          } else if (blockStatus === 'magenta') {
            canvasModal.show('clear', this.ball, this, this.handleMouseClickOnResetTodos);
          }
        })();
      }
    }
  }

  static async moveBallSmooth(todo, ball) {
    switch (todo) {
      case '上へ1マス':
        await ball.moveSmooth(0, -1, 70);
        break;
      case '右へ1マス':
        await ball.moveSmooth(1, 0, 70);
        break;
      case '下へ1マス':
        await ball.moveSmooth(0, 1, 70);
        break;
      case '左へ1マス':
        await ball.moveSmooth(-1, 0, 70);
        break;
      case '上へ2マス':
        await ball.moveSmooth(0, -2, 70);
        break;
      case '右へ2マス':
        await ball.moveSmooth(2, 0, 70);
        break;
      case '下へ2マス':
        await ball.moveSmooth(0, 2, 70);
        break;
      case '左へ2マス':
        await ball.moveSmooth(-2, 0, 70);
        break;
      case '上へ3マス':
        await ball.moveSmooth(0, -3, 70);
        break;
      case '右へ3マス':
        await ball.moveSmooth(3, 0, 70);
        break;
      case '下へ3マス':
        await ball.moveSmooth(0, 3, 70);
        break;
      case '左へ3マス':
        await ball.moveSmooth(-3, 0, 70);
        break;
    }
  }
}