const canvas = document.getElementById('gameCanvasDisplay');
const ctx = canvas.getContext('2d');

// Utility functions
const range = (start, stop, step = 1) => Array.from({
  length: (stop - start) / step + 1
}, (_, i) => start + i * step);
const initCanvasSizeToSmallerLengthSquare = canvas => {
  const width = canvas.parentElement.clientWidth - 15 * 2;
  const height = canvas.parentElement.clientHeight;
  if (width > height) {
    canvas.width = height;
    canvas.height = height;
  } else {
    canvas.width = width;
    canvas.height = width;
  }
};
initCanvasSizeToSmallerLengthSquare(canvas);

// Main //
const stage = new Stage();
const stg = stage.loadData(0);
const settings = new GameSettings();
// Initialize
let field = new Field(stg.field);
let alphabets = new Alphabets(field, stg.alphabets);
let arithmetic = new Arithmetic(field, stg.arithmetic);
let ball = new Ball(field, stg.ball, settings);
let canvasModal = new CanvasModal();
let actions = new Actions(stg.actionsBadgeNum);
const runTodos = new RunTodos();
canvas.style.background = stg.canvas.background || '#fff';

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
let curScreen = setInterval(draw, settings.msPerFrame);

document.getElementById('stage-list').addEventListener('click', e => {
  const stageNum = stage.getNum(e);
  const stg = stage.loadData(stageNum);
  if (stg != null && !ball.isMoving) {
    // Initialize
    field = new Field(stg.field);
    alphabets = new Alphabets(field, stg.alphabets);
    arithmetic = new Arithmetic(field, stg.arithmetic);
    ball = new Ball(field, stg.ball, settings);
    canvasModal = new CanvasModal();
    actions = new Actions(stg.actionsBadgeNum);
    canvas.style.background = stg.canvas.background || '#fff';

    // Reset event handler
    document.getElementById('runTodos').outerHTML = document.getElementById('runTodos').outerHTML;
    document.getElementById('runTodos').addEventListener('click', () => {
      runTodos.runTodosHandler(field, alphabets, arithmetic, ball, canvasModal, actions);
    });

    clearInterval(curScreen);
    curScreen = setInterval(draw, settings.msPerFrame);
  }
});
