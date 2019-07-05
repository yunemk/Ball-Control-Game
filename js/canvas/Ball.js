class Ball {
  constructor(field, initPosX = 1, initPosY = 1) {
    this.initPosX = initPosX;
    this.initPosY = initPosY;
    this.posX = initPosX;
    this.posY = initPosY;
    if (canvas.height / field.row >= canvas.width / field.column) {
      this.r = Math.floor((canvas.width / field.column) / 2) - 4;
    } else {
      this.r = Math.floor((canvas.height / field.row) / 2) - 4;
    }
    this.color = 'cyan';
    this.strokeColor = 'black';
  }

  moveTo(x, y) {
    this.posX = x;
    this.posY = y;
  }

  resetPos() {
    this.posX = this.initPosX;
    this.posY = this.initPosY;
  }

  async moveSmooth(dx, dy, smoothness) {
    const newPosX = this.posX + dx;
    const newPosY = this.posY + dy;
    for (let i = 0; i < smoothness; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (i !== smoothness - 1) {
            this.posX += dx / smoothness;
            this.posY += dy / smoothness;
            resolve();
          } else {
            this.posX = newPosX;
            this.posY = newPosY;
            resolve();
          }
        }, 10);
      });
    }
  }

  // following methods are related to field class //
  isOnBlock(status, field) {
    if (status === 'black' || status === 'white' || status === 'magenta') {
      return field.blockStatus[this.posX][this.posY] === status ? true : false;
    } else {
      console.error(`passed status (${status}) is not black, white, magenta or string`);
      return false;
    }
  }

  drawBallOn(field) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    const rowScale = canvas.height / field.row;
    const colScale = canvas.width / field.column;
    const centerOfBall = {
      x: this.posX * colScale + colScale / 2,
      y: this.posY * rowScale + rowScale / 2
    }
    ctx.arc(centerOfBall.x, centerOfBall.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.strokeStyle = this.strokeColor;
    ctx.stroke();
    ctx.closePath();
  }
}