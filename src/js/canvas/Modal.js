class CanvasModal {
  constructor() {
    this.styles = {
      msg: '',
      textColor: '',
      bg: ''
    }
    if (document.getElementById('canvasModal') != null) {
      document.getElementById('canvasModal').remove();
    }
  }

  show(style, field, alphabets, arithmetic, ball, canvasModal, actions, runTodos) {
    const modal = this.create(style, field, alphabets, arithmetic, ball, canvasModal, actions, runTodos);
    canvas.parentElement.appendChild(modal);
  }

  create(style, field, alphabets, arithmetic, ball, canvasModal, actions, runTodos) {
    this.changeStyles(style);
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="d-flex flex-column h-100 align-items-center justify-content-center">
        <h1 class="text-${this.styles.textColor} font-weight-bold">${this.styles.msg}</h1>
        <button class="btn btn-danger btn-lg mt-4 delModal">リセットする</button>
      </div>
    `;
    modal.id = 'canvasModal';
    modal.classList.add('position-absolute', 'fixed-top');
    modal.style.width = `${canvas.width}px`;
    modal.style.height = `${canvas.height}px`;
    modal.style.marginLeft = (canvas.parentElement.clientWidth - canvas.width) / 2 + 'px';
    modal.style.background = `${this.styles.bg}`;
    modal.querySelector('.delModal').addEventListener('click', () => {
      modal.remove();
      document.getElementById('actions').addEventListener('click', e => {
        actions.clickHandler(e);
        actions.show();
      });
      document.getElementById('resetTodos').addEventListener('click', () => {
        actions.resetTodos();
      });
      document.getElementById('runTodos').addEventListener('click', () => {
        runTodos.runTodosHandler(field, alphabets, arithmetic, ball, canvasModal, actions);
      });
      ball.resetPos();
      alphabets.reset();
      arithmetic.reset();
    });
    return modal;
  }

  changeStyles(style) {
    if (style === 'failed') {
      this.styles.msg = '失敗';
      this.styles.textColor = 'warning';
      this.styles.bg = '#343a407a';
    } else if (style === 'clear') {
      this.styles.msg = 'クリア！';
      this.styles.textColor = 'primary';
      this.styles.bg = '#f5f5f57a';
    } else if (style === 'ballError') {
      this.styles.msg = 'エラー';
      this.styles.textColor = 'danger';
      this.styles.bg = '#846a027a';
    } else if (style === 'loopError') {
      this.styles.msg = '繰り返しが間違っています';
      this.styles.textColor = 'warning';
      this.styles.bg = '#343a407a';
    } else {
      console.error(`style is not failed, clear, error or string (passed style is ${style})`);
    }
  }
}