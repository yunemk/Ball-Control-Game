class RunTodos {
  getTodosArr() {
    const rawTodos = Array.from(document.getElementById('todos').children)
      .filter(todo => todo.classList.contains('not-empty'))
      .map(emptyTodo => emptyTodo.dataset.action);
    let dirEditedTodos = this.getDirEditedTodos(rawTodos);
    const compiledTodos = this.getLoopCompiledTodos(dirEditedTodos);
    return compiledTodos || null;
  }

  getDirEditedTodos(rawTodos) {
    const dirEditedTodos = [];
    rawTodos.forEach(rawTodo => {
      for (const num of range(1, 3)) {
        if (rawTodo === `上へ${num}マス`) {
          for (const _ of range(1, num)) {
            dirEditedTodos.push('上へ1マス');
          }
          break;
        } else if (rawTodo === `右へ${num}マス`) {
          for (const _ of range(1, num)) {
            dirEditedTodos.push('右へ1マス');
          }
          break;
        } else if (rawTodo === `下へ${num}マス`) {
          for (const _ of range(1, num)) {
            dirEditedTodos.push('下へ1マス');
          }
          break;
        } else if (rawTodo === `左へ${num}マス`) {
          for (const _ of range(1, num)) {
            dirEditedTodos.push('左へ1マス');
          }
          break;
        } else if (rawTodo === `繰り返し${num + 1}回`) {
          dirEditedTodos.push(`繰り返し${num + 1}回`);
          break;
        } else if (rawTodo === '繰り返し終わり') {
          dirEditedTodos.push('繰り返し終わり');
          break;
        }
      }
    });
    return dirEditedTodos;
  }

  getLoopCompiledTodos(dirEditedTodos, compiledTodos = []) {
    if (dirEditedTodos.length === 0) {
      return compiledTodos;
    }
    for (const dir of ['上', '右', '下', '左']) {
      if (dirEditedTodos[0] === `${dir}へ1マス`) {
        compiledTodos.push(`${dir}へ1マス`);
        dirEditedTodos.shift();
        return this.getLoopCompiledTodos(dirEditedTodos, compiledTodos);
      }
    }
    for (const num of range(2, 4)) {
      if (dirEditedTodos[0] === `繰り返し${num}回`) {
        let tmpForTodos = [];
        let forCounts = 0;
        let endCounts = 0;
        for (const i of range(1, dirEditedTodos.length - 1)) {
          if (dirEditedTodos[i] === '繰り返し終わり') {
            if (endCounts > 0) {
              endCounts--;
              continue;
            } else if (endCounts === 0) {
              break;
            }
          }
          for (const num of range(2, 4)) {
            if (dirEditedTodos[i] === `繰り返し${num}回`) {
              endCounts++;
              forCounts++;
              break;
            }
          }
        }

        if (dirEditedTodos.filter(todo => todo === '繰り返し終わり')[forCounts]) {
          const loopEndIndex = this.getLoopEndIndex(dirEditedTodos, forCounts);
          for (const _ of range(2, num)) {
            tmpForTodos = [...tmpForTodos, ...dirEditedTodos.slice(1, loopEndIndex)];
          }
          dirEditedTodos.splice(loopEndIndex, 1);
          dirEditedTodos.shift();
          if (forCounts > 0) {
            compiledTodos = this.getLoopCompiledTodos(tmpForTodos, compiledTodos);
            return this.getLoopCompiledTodos(dirEditedTodos, compiledTodos);
          } else {
            compiledTodos = [...compiledTodos, ...tmpForTodos];
            return this.getLoopCompiledTodos(dirEditedTodos, compiledTodos);
          }
        } else {
          return null;
        }
      }
    }
    return null;
  }

  getLoopEndIndex(dirEditedTodos, forCounts) {
    let loopEndCounts = 0;
    for (const i of range(1, dirEditedTodos.length - 1)) {
      if (dirEditedTodos[i] === '繰り返し終わり') {
        if (loopEndCounts === forCounts) {
          return i;
        }
        loopEndCounts++;
      }
    }
    return null;
  }

  runTodosHandler(field, alphabets, arithmetic, ball, canvasModal, actions) {
    // Clear event handler
    document.getElementById('actions').outerHTML = document.getElementById('actions').outerHTML;
    document.getElementById('resetTodos').outerHTML = document.getElementById('resetTodos').outerHTML;
    document.getElementById('runTodos').outerHTML = document.getElementById('runTodos').outerHTML;
    (async () => {
      const todos = this.getTodosArr();
      if (todos) {
        ball.isMoving = true;
        for (const todo of todos) {
          await this.moveBallSmooth(todo, ball);
          const blockStatus = this.getBlockStatusOfBallPos(ball, field);
          if (blockStatus === 'black' || blockStatus === 'none') {
            canvasModal.show('ballError', field, alphabets, arithmetic, ball, canvasModal, actions, this);
            todos.splice(0, todos.length);
          } else if (blockStatus === 'gold') {
            ball.posX = field.specialBlock.olive.x;
            ball.posY = field.specialBlock.olive.y;
          }
          alphabets.addToCurrent(ball);
          arithmetic.addToCurrent(ball);
        }
        ball.isMoving = false;
        const blockStatus = this.getBlockStatusOfBallPos(ball, field);
        if (blockStatus === 'white' || blockStatus === 'olive') {
          canvasModal.show('failed', field, alphabets, arithmetic, ball, canvasModal, actions, this);
        } else if (blockStatus === 'magenta') {
          if (alphabets.isCorrect() && arithmetic.isCorrect()) {
            canvasModal.show('clear', field, alphabets, arithmetic, ball, canvasModal, actions, this);
          } else {
            canvasModal.show('failed', field, alphabets, arithmetic, ball, canvasModal, actions, this);
          }
        }
      } else {
        canvasModal.show('loopError', field, alphabets, arithmetic, ball, canvasModal, actions, this);
      }
    })();
  }

  async moveBallSmooth(todo, ball) {
    switch (todo) {
      case '上へ1マス':
        await ball.moveSmooth(0, -1);
        break;
      case '右へ1マス':
        await ball.moveSmooth(1, 0);
        break;
      case '下へ1マス':
        await ball.moveSmooth(0, 1);
        break;
      case '左へ1マス':
        await ball.moveSmooth(-1, 0);
        break;
    }
  }

  getBlockStatusOfBallPos(ball, field) {
    if (ball.posX >= 0 && ball.posY >= 0 && ball.posX < field.column && ball.posY < field.row) {
      return field.blockStatus[ball.posX][ball.posY];
    } else {
      return 'none';
    }
  }
}