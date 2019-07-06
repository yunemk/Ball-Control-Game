class Field {
  constructor(column = 12, row = 12) {
    this.column = column;
    this.row = row;
    // {column}x{row} array (each element has status)
    this.blockStatus = (new Array(column)).fill().map(() => (new Array(row)).fill('white'));
    this.specialBlock = {};
  }

  drawFieldLines() {
    ctx.beginPath();
    ctx.fillStyle = 'lightgray';
    for (let c = 0; c < this.column; c++) {
      const lineX = Math.floor(c * canvas.width / this.column);
      ctx.fillRect(lineX, 0, 1, canvas.height);
    }
    ctx.fillRect(canvas.width, 0, -1, canvas.height);
    for (let r = 0; r < this.row; r++) {
      const lineY = Math.floor(r * canvas.height / this.row);
      ctx.fillRect(0, lineY, canvas.width, 1);
    }
    ctx.fillRect(0, canvas.height, canvas.width, -1);
    ctx.closePath();
  }

  drawBlock() {
    const rowScale = canvas.height / this.row;
    const colScale = canvas.width / this.column;
    for (let c = 0; c < this.column; c++) {
      for (let r = 0; r < this.row; r++) {
        ctx.fillStyle = this.blockStatus[c][r];
        ctx.fillRect(c * colScale + 2, r * rowScale + 2, colScale - 4, rowScale - 4);
      }
    }
  }

  setBlockStatus(x, y, color) {
    if (color === 'black' || color === 0) {
      this.blockStatus[x][y] = 'black';
    } else if (color === 'white' || color === 1) {
      this.blockStatus[x][y] = 'white';
    } else if (color === 'magenta' || color === 2) {
      this.blockStatus[x][y] = 'magenta';
    } else if (color === 'gold' || color === 3) {
      this.blockStatus[x][y] = 'gold';
    } else if (color === 'olive' || color === 4) {
      this.blockStatus[x][y] = 'olive';
      this.specialBlock.olive = {
        x: x,
        y: y
      };
    } else {
      console.error(`Passed color is set to ${color}`);
    }
  }
}