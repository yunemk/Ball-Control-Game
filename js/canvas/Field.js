class Field {
  constructor(fieldData) {
    this.column = fieldData.column || 12;
    this.row = fieldData.row || 12;
    // {column}x{row} array (each element has 'white' status)
    this.blockStatus = (new Array(this.column)).fill().map(() => (new Array(this.row)).fill('white'));
    this.specialBlock = {};
    for (let c = 0; c < this.column; c++) {
      for (let r = 0; r < this.row; r++) {
        this.setBlockStatus(c, r, fieldData.status[r][c]);
      }
    }
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
        x,
        y
      };
    } else {
      console.error(`Passed color is set to ${color}`);
    }
  }
}