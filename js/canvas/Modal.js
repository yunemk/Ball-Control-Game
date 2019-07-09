class CanvasModal {
  show(style, ball, runTodoEvent, handleMouseClickOnResetTodos) {
    // ball arguments is needed for delModal button's click event behavior (reset ball position)
    const modal = this.create(style, ball, handleMouseClickOnResetTodos, runTodoEvent);
    canvas.parentElement.appendChild(modal);
  }

  create(style, ball, handleMouseClickOnResetTodos, runTodoEvent) {
    const mStyles = this.getStyles(style); // modal styles
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
    // modal.style.background = '#343a407a';
    modal.style.background = `${mStyles.bg}`;
    modal.querySelector('.delModal').addEventListener('click', () => {
      modal.remove();
      document.getElementById('actions').addEventListener('click', TODO.handleMouseClickOnActions);
      document.getElementById('resetTodos').addEventListener('click', handleMouseClickOnResetTodos);
      document.getElementById('runTodos').addEventListener('click', runTodoEvent);
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
    } else if (style === 'error') {
      modalStyles.msg = 'エラー';
      modalStyles.textColor = 'danger';
      modalStyles.bg = '#846a027a';
    } else {
      console.error(`style is not failed, clear, error or string (passed style is ${style})`);
    }
    return modalStyles;
  }
}