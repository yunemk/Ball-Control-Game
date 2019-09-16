class GameSettings {
  constructor(fps = 50) {
    this.fps = fps;
    // x[frame] / 1[sec] = this.fps[frame/sec]
    this.msPerFrame = 1000 / this.fps;
    this.modalStyles = new Map([
      ['background', '#000b'],
      ['z-index', '200'],
      ['top', '20vh'],
      ['left', '10%'],
      ['height', '60vh'],
      ['width', '80%']
    ]);
    this.closed = true;
    document.getElementById('settings').addEventListener('click', () => {
      if (this.closed) {
        this.showModal();
        this.closed = false;
      }
    });
  }

  setFPS(fps) {
    if (typeof fps !== 'number') return false;
    this.fps = fps;
    this.msPerFrame = 1000 / this.fps;
  }

  showModal() {
    const modal = document.createElement('div');
    modal.classList = 'position-absolute rounded';
    for (const [property, value] of this.modalStyles) {
      modal.style.setProperty(property, value);
    }
    modal.innerHTML = `
      <div class="h-100">
        <p class="text-light text-center mt-5">Canvas FPS: <span class="fps">${this.fps}</span> (1秒あたりにcanvasを描画する回数)</p>
        <input type="range" class="d-block w-50 mx-auto fpsSetter" min="10" max="100" value="${this.fps}" step="1">
      </div>
      <div class="saveBtn btn btn-success btn-lg position-absolute" style="bottom: 2rem; left: 50%; transform: translateX(-50%)">セーブ</div>
      <div class="delModalBtn btn btn-danger position-absolute" style="top: 1rem; right: 1rem">X</div>
    `;
    const fpsSetter = modal.querySelector('.fpsSetter');
    fpsSetter.addEventListener('input', () => modal.querySelector('.fps').textContent = fpsSetter.value);
    this.setModalAnimation(modal);
    modal.querySelector('.delModalBtn').addEventListener('click', () => this.deleteModal(modal));
    modal.querySelector('.saveBtn').addEventListener('click', () => {
      this.deleteModal(modal);
      this.setFPS(parseInt(fpsSetter.value, 10));
      // reset draw interval
      clearInterval(curScreen);
      setInterval(draw, this.msPerFrame);
    })
    document.getElementById('settings').after(modal);
  }

  setModalAnimation(modal) {
    modal.style.opacity = '0';
    modal.style.transition = 'opacity .30s ease 0s';
    setTimeout(() => modal.style.opacity = '1', 0);
  }

  deleteModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
    this.closed = true;
  }
}