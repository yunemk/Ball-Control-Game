'use strict';
/* 
  // Fix List //
  index.js -> fetch data
  runTodos button controls

  // useful command //
  Random magenta block command:
  field.setBlockStatus(Math.floor(Math.random() * (field.column - 4) + 2), Math.floor(Math.random() * (field.row - 4) + 2), 'magenta');
*/

const canvas = document.getElementById('gameCanvasDisplay');
const ctx = canvas.getContext('2d');

const initCanvasSizeToWidthLengthSquare = (canvas) => {
  const width = canvas.parentElement.clientWidth - 15 * 2; // subtract padding size
  console.log(width);
  // const height = canvas.parentElement.clientHeight;
  canvas.width = width;
  canvas.height = width;
}
initCanvasSizeToWidthLengthSquare(canvas);

// event handler //
function handleMouseClickOnActions(e) {
  TODO.addActionToTodoList(e);
}

function handleMouseClickOnResetTodos() {
  TODO.allClear();
}

// main //
(async () => {
  const getData = async (stage) => {
    const res = await fetch('data/fieldSet.json')
    return await res.json();
  }

  const data = await getData();
  const stage = data.stages[`stage-${2}`];
  const field = new Field(stage.field.column, stage.field.row);
  const ball = new Ball(field, stage.ball.initPosX, stage.ball.initPosY);
  const canvasModal = new CanvasModal();
  for (let c = 0; c < stage.field.column; c++) {
    for (let r = 0; r < stage.field.row; r++) {
      field.setBlockStatus(c, r, stage.field.status[r][c]);
    }
  }
  ball.color = stage.ball.color;
  ball.strokeColor = stage.ball.strokeColor;
  canvas.style.background = stage.canvas.background;

  document.getElementById('actions').addEventListener('click', handleMouseClickOnActions);
  document.getElementById('resetTodos').addEventListener('click', handleMouseClickOnResetTodos);

  // runTodos handler //
  const handleMouseClickOnRunTodos = {
    field,
    ball,
    canvasModal,
    handleEvent: function handleEvent(e) {
      e.currentTarget.removeEventListener('click', handleMouseClickOnRunTodos);
      document.getElementById('actions').removeEventListener('click', handleMouseClickOnActions);
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
          if (this.ball.isOnBlock('black', this.field)) {
            canvasModal.show('error', this.ball, this);
            todos.splice(0, todos.length);
          }
        }
        if (this.ball.isOnBlock('white', this.field)) {
          canvasModal.show('failed', this.ball, this);
        } else if (this.ball.isOnBlock('magenta', this.field)) {
          canvasModal.show('clear', this.ball, this);
        }
      })();
    }
  }
  document.getElementById('runTodos').addEventListener('click', handleMouseClickOnRunTodos);

  function draw(field, ball) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    field.drawFieldLines();
    field.drawBlock();
    ball.drawBallOn(field);
  }
  setInterval(draw, 10, field, ball);
})();