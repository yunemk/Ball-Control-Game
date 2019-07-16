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
  let field = new Field(stage.field);
  let ball = new Ball(field, stage.ball);
  let canvasModal = new CanvasModal();
  let actions = new Actions(stage.actionsBadgeNum);
  for (let c = 0; c < stage.field.column; c++) {
    for (let r = 0; r < stage.field.row; r++) {
      field.setBlockStatus(c, r, stage.field.status[r][c]);
    }
  }
  ball.color = stage.ball.color != null ? stage.ball.color : 'cyan';
  ball.strokeColor = stage.ball.strokeColor != null ? stage.ball.strokeColor : 'black';
  canvas.style.background = stage.canvas.background != null ? stage.canvas.background : '#fff';

  let switchActionsHandler = TODO.switchActions(stage.actionsBadgeNum);
  document.getElementById('actionsSelector').addEventListener('click', switchActionsHandler);
  TODO.resetActionsBadgeNumber(stage.actionsBadgeNum.dir, stage.actionsBadgeNum.for);
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
      field = new Field(stage.field);
      ball = new Ball(field, stage.ball);
      actions = new Actions(stage.actionsBadgeNum);
      canvas.style.background = stage.canvas.background || '#fff';
      const todos = Array.from(document.getElementById('todos').children);
      todos.forEach(el => {
        el.classList.replace('not-empty', 'empty');
        el.innerHTML = '&ThinSpace;';
      });

      TODO.resetActionsBadgeNumber(stage.actionsBadgeNum.dir, stage.actionsBadgeNum.for);
      if (document.getElementById('canvasModal') !== null) {
        document.getElementById('canvasModal').remove();
        document.getElementById('actions').addEventListener('click', e => {
          actions.clickHandler(e);
          actions.show();
        });
        document.getElementById('resetTodos').addEventListener('click', () => {
          actions.resetTodos();
        });
      }

      document.getElementById('runTodos').removeEventListener('click', runTodosHandler);
      runTodosHandler = runTodos.setRunTodosHandler(field, ball, canvasModal, actions);
      document.getElementById('runTodos').addEventListener('click', runTodosHandler);

      clearInterval(curScreen);
      curScreen = setInterval(draw, 10, field, ball);
    }
  });
})();
