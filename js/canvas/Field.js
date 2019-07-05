class Field {
  constructor(column = 12, row = 12) {
    this.column = column;
    this.row = row;
    // {column}x{row} array (each element has status)
    this.blockStatus = (new Array(column)).fill().map(() => (new Array(row)).fill('white'));
    for (let c = 0; c < column; c++) {
      this.blockStatus[c][0] = 'black';
      this.blockStatus[c][row - 1] = 'black';
    }
    for (let r = 1; r < row - 1; r++) {
      this.blockStatus[0][r] = 'black';
      this.blockStatus[column - 1][r] = 'black';
    }
  }

  drawFieldLines() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
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
        if (this.blockStatus[c][r] === 'black') {
          ctx.fillStyle = 'black';
          ctx.fillRect(c * colScale + 2, r * rowScale + 2, colScale - 4, rowScale - 4);
        } else if (this.blockStatus[c][r] === 'magenta') {
          ctx.fillStyle = 'magenta';
          ctx.fillRect(c * colScale + 2, r * rowScale + 2, colScale - 4, rowScale - 4);
        }
      }
    }
  }

  setBlockStatus(x, y, color) {
    if (color === 'black' || color === 'white' || color === 'magenta') {
      this.blockStatus[x][y] = color;
    } else if (color === 0) {
      this.blockStatus[x][y] = 'black';
    } else if (color === 1) {
      this.blockStatus[x][y] = 'white'
    } else if (color === 2) {
      this.blockStatus[x][y] = 'magenta';
    } else {
      console.error(`color is not black, white, magenta or string (passed color is set to ${color})`);
    }
  }
}