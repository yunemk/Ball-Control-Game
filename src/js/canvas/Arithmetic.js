class Arithmetic {
  constructor(field, arithmetic) {
    this.hideCurrentAlert();
    this.reset();
    if (arithmetic) {
      this.ans = arithmetic.ans;
      this.fontSize = `${(field.colScale > field.rowScale ? field.rowScale : field.rowScale) - 20}px`;
      this.initPos = arithmetic.pos;
      this.pos = JSON.parse(JSON.stringify(this.initPos));
      this.current = '';
      this.result = null;
      this.subject = arithmetic.subject;
      this.alertBgColor = 'warning';
      this.showCurrentAlert();
    }
  }

  addToCurrent(ball) {
    if (this.ans != null) {
      for (const i of range(0, this.pos.length - 1)) {
        if (ball.posX === this.pos[i].x && ball.posY === this.pos[i].y) {
          this.current += this.pos[i].char;
          break;
        }
      }
      if (this.isCorrect()) {
        this.alertBgColor = 'info'
      } else {
        this.alertBgColor = 'warning';
      }
      this.showCurrentAlert();
    }
  }

  showCurrentAlert() {
    document.getElementById('arithmetic').classList.replace('d-none', 'd-block');
    document.getElementById('arithmetic').innerHTML = `
      <h5 class="d-inline-block p-1" style="background: #ffddf799; border-radius: 10px;">ミッション</h5>
      <div class="d-flex flex-row">
        <h2 class="mr-3">${this.subject}</h2>
        ${this.current ? `<div class="alert alert-${this.alertBgColor} align-items-center mt-n2 mb-n1 overflow-wrap-break">${this.current}${this.result !== null ? this.result : ''}</div>` : ''}
      </div>
    `;
  }

  hideCurrentAlert() {
    document.getElementById('arithmetic').classList.replace('d-block', 'd-none');
  }

  isCorrect() {
    if (this.ans != null) {
      if (this.isCurrentEqualOnlyOneAndLastPos() && this.isSameResultWithAnswer()) {
        return true;
      }
      return false;
    }
    return true;
  }

  isCurrentEqualOnlyOneAndLastPos() {
    const firstIndex = this.current.indexOf('=');
    const lastIndex = this.current.lastIndexOf('=');
    if (this.current.includes('=') && firstIndex === lastIndex && lastIndex === this.current.length - 1) {
      return true;
    }
    return false;
  }

  isSameResultWithAnswer() {
    try {
      const formulaStr = this.getFormulaStr();
      // isInvalidFormula function solves security problem of eval
      // performance problem of eval function is not solved, so rewrite here if there's solution to the problem.
      eval(`this.result = ${formulaStr}`);
      if (this.result === this.ans) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.warn(error, `${this.current} is not calculable`);
      return false;
    }
  }

  getFormulaStr() {
    let formulaStr = '';
    for (const i of range(0, this.current.length - 2)) {
      if (this.current[i] === '×') {
        formulaStr += '*';
      } else if (this.current[i] === '÷') {
        formulaStr += '/';
      } else {
        formulaStr += this.current[i];
      }
    }
    if (this.isInvalidFormula(formulaStr)) {
      console.error(`${this}.current have invalid character. (only number and symbols of '+', '-', '*', '/', '(' and ')' are allowed to use)`, formulaStr);
      return null;
    }
    return formulaStr;
  }

  // This function protects security of eval function
  isInvalidFormula(formulaStr) {
    strCharItr: for (const i of range(0, formulaStr.length - 1)) {
      if (!isNaN(formulaStr[i])) {
        continue;
      }
      for (const symbol of ['+', '-', '*', '/', '(', ')']) {
        if (formulaStr[i] === symbol) {
          continue strCharItr;
        }
      }
      return true;
    }
    return false;
  }

  reset() {
    if (this.ans != null) {
      this.pos = JSON.parse(JSON.stringify(this.initPos));
      this.current = '';
      this.result = null;
      this.showCurrentAlert();
    }
  }

  drawOn(field) {
    if (this.ans != null) {
      ctx.fillStyle = '#000';
      ctx.font = `${this.fontSize} cursive`;
      this.pos.forEach(pos => {
        const x = field.colScale * (pos.x + .30);
        const y = field.rowScale * (pos.y + .70);
        ctx.fillText(pos.char, x, y);
      });
    }
  }
}