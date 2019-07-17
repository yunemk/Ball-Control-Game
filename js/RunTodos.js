class RunTodos {
  static getTodosArr() {
    const todos = Array.from(document.getElementById('todos').children)
      .filter(el => el.classList.contains('not-empty'))
      .map(el => el.innerText.slice(0, -2)); // remove x and break line
    let editedTodos = [];
    todos.forEach(todo => {
      for (const num of range(1, 3)) {
        if (todo === `上へ${num}マス`) {
          for (const _ of range(1, num)) {
            editedTodos.push('上へ1マス');
          }
          continue;
        } else if (todo === `右へ${num}マス`) {
          for (const _ of range(1, num)) {
            editedTodos.push('右へ1マス');
          }
          continue;
        } else if (todo === `下へ${num}マス`) {
          for (const _ of range(1, num)) {
            editedTodos.push('下へ1マス');
          }
          continue;
        } else if (todo === `左へ${num}マス`) {
          for (const _ of range(1, num)) {
            editedTodos.push('左へ1マス');
          }
          continue;
        }
      }
    });
    return editedTodos;
  }

  setRunTodosHandler(field, ball, canvasModal, actions) {
    return {
      field,
      ball,
      canvasModal,
      actions,
      handleEvent: function handleEvent(e) {
        e.currentTarget.removeEventListener('click', this);
        // Clear event handler
        document.getElementById('actions').outerHTML = document.getElementById('actions').outerHTML;
        document.getElementById('resetTodos').outerHTML = document.getElementById('resetTodos').outerHTML;
        (async () => {
          const todos = RunTodos.getTodosArr();
          // This can't be written by forEach in async => https://qiita.com/frameair/items/e7645066075666a13063
          for (const todo of todos) {
            await RunTodos.moveBallSmooth(todo, this.ball);
            const blockStatus = RunTodos.getBlockStatusOfBallPos(this.ball, this.field);
            if (blockStatus === 'black' || blockStatus === 'none') {
              canvasModal.show('error', this.ball, this, this.actions);
              todos.splice(0, todos.length);
            } else if (blockStatus === 'gold') {
              this.ball.posX = this.field.specialBlock.olive.x;
              this.ball.posY = this.field.specialBlock.olive.y;
            }
          }
          const blockStatus = RunTodos.getBlockStatusOfBallPos(this.ball, this.field);
          if (blockStatus === 'white' || blockStatus === 'olive') {
            canvasModal.show('failed', this.ball, this, this.actions);
          } else if (blockStatus === 'magenta') {
            canvasModal.show('clear', this.ball, this, this.actions);
          }
        })();
      }
    }
  }

  static async moveBallSmooth(todo, ball) {
    switch (todo) {
      case '上へ1マス':
        await ball.moveSmooth(0, -1, 60);
        break;
      case '右へ1マス':
        await ball.moveSmooth(1, 0, 60);
        break;
      case '下へ1マス':
        await ball.moveSmooth(0, 1, 60);
        break;
      case '左へ1マス':
        await ball.moveSmooth(-1, 0, 60);
        break;
    }
  }

  static getBlockStatusOfBallPos(ball, field) {
    if (ball.posX >= 0 && ball.posY >= 0 && ball.posX < field.column && ball.posY < field.row) {
      return field.blockStatus[ball.posX][ball.posY];
    } else {
      return 'none';
    }
  }
}