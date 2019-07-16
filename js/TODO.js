class TODO {
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