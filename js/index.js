const canvas = document.getElementById('gameCanvasDisplay');
const ctx = canvas.getContext('2d');
const range = (start, stop, step = 1) => Array.from({
  length: (stop - start) / step + 1
}, (_, i) => start + i * step);

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
  let alphabets = new Alphabets(field, stage.alphabets);
  let ball = new Ball(field, stage.ball);
  let canvasModal = new CanvasModal();
  let actions = new Actions(stage.actionsBadgeNum);
  let runTodos = new RunTodos();
  canvas.style.background = stage.canvas.background || '#fff';
  document.getElementById('actionsSelector').addEventListener('click', e => {
    actions.changeBadgeNum(e);
    actions.show();
  });

  document.getElementById('actions').addEventListener('click', e => {
    actions.clickHandler(e);
    actions.show();
  });
  document.getElementById('resetTodos').addEventListener('click', () => {
    actions.resetTodos();
  });

  document.getElementById('runTodos').addEventListener('click', () => {
    runTodos.runTodosHandler(field, alphabets, ball, canvasModal, actions);
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    field.drawFieldLines();
    field.drawBlock();
    alphabets.drawOn(field);
    ball.drawBallOn(field);
  }
  let curScreen = setInterval(draw, 10);

  document.getElementById('stage-list').addEventListener('click', async (e) => {
    const stageNum = Stage.getNum(e);
    const stage = await Stage.fetchStageData(stageNum);
    if (stage != null && !ball.isMoving) {

      field = new Field(stage.field);
      alphabets = new Alphabets(field, stage.alphabets);
      ball = new Ball(field, stage.ball);
      actions = new Actions(stage.actionsBadgeNum);
      canvas.style.background = stage.canvas.background || '#fff';
      Array.from(document.getElementById('actionsSelector').children).forEach(actionsBtn => actionsBtn.classList.remove('active'));
      document.getElementById('actionsSelector').children[0].classList.add('active');
      const todos = Array.from(document.getElementById('todos').children);
      todos.forEach(el => {
        el.classList.replace('not-empty', 'empty');
        el.innerHTML = '&ThinSpace;';
      });
      alphabets.hideCurrentStringAlert();

      if (document.getElementById('canvasModal') != null) {
        document.getElementById('canvasModal').remove();
      }

      document.getElementById('actions').outerHTML = document.getElementById('actions').outerHTML;
      document.getElementById('runTodos').outerHTML = document.getElementById('runTodos').outerHTML;
      document.getElementById('resetTodos').outerHTML = document.getElementById('resetTodos').outerHTML;
      document.getElementById('actions').addEventListener('click', e => {
        actions.clickHandler(e);
        actions.show();
      });
      document.getElementById('resetTodos').addEventListener('click', () => {
        actions.resetTodos();
      });
      document.getElementById('runTodos').addEventListener('click', () => {
        runTodos.runTodosHandler(field, alphabets, ball, canvasModal, actions);
      });

      clearInterval(curScreen);
      curScreen = setInterval(draw, 10);
    }
  });
})();
