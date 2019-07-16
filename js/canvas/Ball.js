class Ball {
  constructor(field, ballData) {
    this.initPosX = ballData.initPosX != null ? ballData.initPosX : 1;
    this.initPosY = ballData.initPosY != null ? ballData.initPosY : 1;
    this.posX = this.initPosX;
    this.posY = this.initPosY;
    if (canvas.height / field.row >= canvas.width / field.column) {
      this.r = Math.floor((canvas.width / field.column) / 2) - 4;
    } else {
      this.r = Math.floor((canvas.height / field.row) / 2) - 4;
    }
    this.color = 'cyan';
    this.strokeColor = 'black';
    this.color = ballData.color || 'cyan';
    this.strokeColor = ballData.strokeColor || 'black';
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

  // following method is related to field class //
  drawBallOn(field) {
    ctx.beginPath();
    const rowScale = canvas.height / field.row;
    const colScale = canvas.width / field.column;
    const centerOfBall = {
      x: this.posX * colScale + colScale / 2,
      y: this.posY * rowScale + rowScale / 2
    }
    ctx.fillStyle = this.color;
    ctx.arc(centerOfBall.x, centerOfBall.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.strokeStyle = this.strokeColor;
    ctx.stroke();
    ctx.closePath();
  }
}