const canvas = document.getElementById('gameCanvasDisplay');
const ctx = canvas.getContext('2d');

// Utility functions
const range = (start, stop, step = 1) => Array.from({
  length: (stop - start) / step + 1
}, (_, i) => start + i * step);
const initCanvasSizeToWidthLengthSquare = (canvas) => {
  const width = canvas.parentElement.clientWidth - 15 * 2; // subtract padding size
  canvas.width = width;
  canvas.height = width;
}
initCanvasSizeToWidthLengthSquare(canvas);

// Main //
(async () => {
  const stage = await Stage.fetchStageData(1);
  // Initialize
  let field = new Field(stage.field);
  let alphabets = new Alphabets(field, stage.alphabets);
  let arithmetic = new Arithmetic(field, stage.arithmetic);
  let ball = new Ball(field, stage.ball);
  let canvasModal = new CanvasModal();
  let actions = new Actions(stage.actionsBadgeNum);
  let runTodos = new RunTodos();
  canvas.style.background = stage.canvas.background || '#fff';

  document.getElementById('runTodos').addEventListener('click', () => {
    runTodos.runTodosHandler(field, alphabets, arithmetic, ball, canvasModal, actions);
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    field.drawFieldLines();
    field.drawBlock();
    alphabets.drawOn(field);
    arithmetic.drawOn(field);
    ball.drawBallOn(field);
  }
  let curScreen = setInterval(draw, 10);

  let timer = 0;
  window.onresize = () => {
    if (timer > 0) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      initCanvasSizeToWidthLengthSquare(canvas);
      field = new Field(stage.field);
      alphabets = new Alphabets(field, stage.alphabets);
      arithmetic = new Arithmetic(field, stage.arithmetic);
      ball = new Ball(field, stage.ball);
    }, 200);
  };

  document.getElementById('stage-list').addEventListener('click', async (e) => {
    const stageNum = Stage.getNum(e);
    const stage = await Stage.fetchStageData(stageNum);
    if (stage != null && !ball.isMoving) {
      // Initialize
      field = new Field(stage.field);
      alphabets = new Alphabets(field, stage.alphabets);
      arithmetic = new Arithmetic(field, stage.arithmetic);
      ball = new Ball(field, stage.ball);
      canvasModal = new CanvasModal();
      actions = new Actions(stage.actionsBadgeNum);
      canvas.style.background = stage.canvas.background || '#fff';

      // Reset event handler
      document.getElementById('runTodos').outerHTML = document.getElementById('runTodos').outerHTML;
      document.getElementById('runTodos').addEventListener('click', () => {
        runTodos.runTodosHandler(field, alphabets, arithmetic, ball, canvasModal, actions);
      });

      clearInterval(curScreen);
      curScreen = setInterval(draw, 10);

      timer = 0;
      window.onresize = () => {
        if (timer > 0) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          initCanvasSizeToWidthLengthSquare(canvas);
          field = new Field(stage.field);
          alphabets = new Alphabets(field, stage.alphabets);
          arithmetic = new Arithmetic(field, stage.arithmetic);
          ball = new Ball(field, stage.ball);
        }, 200);
      };
    }
  });
})();
