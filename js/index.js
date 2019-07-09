'use strict';

const canvas = document.getElementById('gameCanvasDisplay');
const ctx = canvas.getContext('2d');

const initCanvasSizeToWidthLengthSquare = (canvas) => {
  const width = canvas.parentElement.clientWidth - 15 * 2; // subtract padding size
  canvas.width = width;
  canvas.height = width;
}
initCanvasSizeToWidthLengthSquare(canvas);

// main //
(async () => {
  const stage = await Stage.fetchStageData(1);
  // Initialize
  let field = new Field(stage.field.column, stage.field.row);
  let ball = new Ball(field, stage.ball.initPosX, stage.ball.initPosY);
  let canvasModal = new CanvasModal();
  for (let c = 0; c < stage.field.column; c++) {
    for (let r = 0; r < stage.field.row; r++) {
      field.setBlockStatus(c, r, stage.field.status[r][c]);
    }
  }
  ball.color = stage.ball.color != null ? stage.ball.color : 'cyan';
  ball.strokeColor = stage.ball.strokeColor != null ? stage.ball.strokeColor : 'black';
  canvas.style.background = stage.canvas.background != null ? stage.canvas.background : '#fff';

  // Will Change Code If Pagination Implement //
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
  // ---------------- //

  document.getElementById('actions').addEventListener('click', TODO.handleMouseClickOnActions);
  let handleMouseClickOnResetTodos = TODO.handleMouseClickOnResetTodos(stage);
  document.getElementById('resetTodos').addEventListener('click', handleMouseClickOnResetTodos);
  let handleMouseClickOnRunTodos = TODO.setRunTodosHandler(field, ball, canvasModal, handleMouseClickOnResetTodos);
  document.getElementById('runTodos').addEventListener('click', handleMouseClickOnRunTodos);

  function draw(field, ball) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    field.drawFieldLines();
    field.drawBlock();
    ball.drawBallOn(field);
  }
  let curScreen = setInterval(draw, 10, field, ball);

  document.getElementById('stage-list').addEventListener('click', async (e) => {
    const stageNum = Stage.getNum(e);
    const stage = await Stage.fetchStageData(stageNum);
    if (stage != null) {
      field = new Field(stage.field.column, stage.field.row);
      ball = new Ball(field, stage.ball.initPosX, stage.ball.initPosY);
      canvasModal = new CanvasModal();
      for (let c = 0; c < stage.field.column; c++) {
        for (let r = 0; r < stage.field.row; r++) {
          field.setBlockStatus(c, r, stage.field.status[r][c]);
        }
      }
      ball.color = stage.ball.color != null ? stage.ball.color : 'cyan';
      ball.strokeColor = stage.ball.strokeColor != null ? stage.ball.strokeColor : 'black';
      canvas.style.background = stage.canvas.background != null ? stage.canvas.background : '#fff';

      // Will Change Code If Pagination Implement //
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
      // ---------------- //

      if (document.getElementById('canvasModal') !== null) {
        document.getElementById('canvasModal').remove();
        document.getElementById('actions').addEventListener('click', TODO.handleMouseClickOnActions);
        handleMouseClickOnResetTodos = TODO.handleMouseClickOnResetTodos(stage);
        document.getElementById('resetTodos').addEventListener('click', handleMouseClickOnResetTodos);
      }

      document.getElementById('runTodos').removeEventListener('click', handleMouseClickOnRunTodos);
      handleMouseClickOnRunTodos = TODO.setRunTodosHandler(field, ball, canvasModal, handleMouseClickOnResetTodos);
      document.getElementById('runTodos').addEventListener('click', handleMouseClickOnRunTodos);

      clearInterval(curScreen);
      curScreen = setInterval(draw, 10, field, ball);
    }
  });
})();