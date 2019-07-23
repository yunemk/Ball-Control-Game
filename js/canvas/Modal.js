class CanvasModal {
  show(style, field, ball, canvasModal, actions, runTodos) {
    const modal = this.create(style, field, ball, canvasModal, actions, runTodos);
    canvas.parentElement.appendChild(modal);
  }

  create(style, field, ball, canvasModal, actions, runTodos) {
    const mStyles = this.getStyles(style);
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="d-flex flex-column h-100 align-items-center justify-content-center">
        <h1 class="text-${mStyles.textColor} font-weight-bold">${mStyles.msg}</h1>
        <button class="btn btn-danger btn-sm mt-4 delModal">リセットする</button>
      </div>
    `;
    modal.id = 'canvasModal';
    modal.classList.add('text-center', 'position-absolute', 'fixed-top');
    modal.style.width = `${canvas.width}px`;
    modal.style.height = `${canvas.height}px`;
    modal.style.marginLeft = '15px'; // parent col padding (bootstrap setting)
    modal.style.background = `${mStyles.bg}`;
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
        runTodos.runTodosHandler(field, ball, canvasModal, actions);
      });
      ball.resetPos();
    });
    return modal;
  }

  getStyles(style) {
    const modalStyles = {
      msg: '',
      textColor: '',
      bg: ''
    }
    if (style === 'failed') {
      modalStyles.msg = '失敗';
      modalStyles.textColor = 'warning';
      modalStyles.bg = '#343a407a';
    } else if (style === 'clear') {
      modalStyles.msg = 'クリア！';
      modalStyles.textColor = 'primary';
      modalStyles.bg = '#f5f5f57a';
    } else if (style === 'ballError') {
      modalStyles.msg = 'エラー';
      modalStyles.textColor = 'danger';
      modalStyles.bg = '#846a027a';
    } else if (style === 'loopError') {
      modalStyles.msg = '繰り返しが間違っています';
      modalStyles.textColor = 'warning';
      modalStyles.bg = '#343a407a';
    } else {
      console.error(`style is not failed, clear, error or string (passed style is ${style})`);
    }
    return modalStyles;
  }
}