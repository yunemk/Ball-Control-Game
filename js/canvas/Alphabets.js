class Alphabets {
  constructor(field, alphabets) {
    this.initAlphabets = alphabets || null;
    this.alphabets = JSON.parse(JSON.stringify(this.initAlphabets));
    if (this.alphabets) {
      this.currentString = '';
      this.fontSize = `${(field.colScale > field.rowScale ? field.rowScale : field.rowScale) - 10}px`;
      this.finally = '';
      for (const i of range(0, this.alphabets.length - 1)) {
        this.finally += this.alphabets[i].char;
      }
    }
  }

  addToCurrent(ball) {
    if (this.alphabets) {
      for (const i of range(0, this.alphabets.length - 1)) {
        if (ball.posX === this.alphabets[i].x && ball.posY === this.alphabets[i].y) {
          this.currentString += this.alphabets[i].char;
          this.alphabets = this.alphabets.filter(alphabet => alphabet !== this.alphabets[i]);
          break;
        }
      }
      if (this.isCorrect()) {
        this.changeAlertBg('correct')
      } else {
        this.changeAlertBg('wrong');
      }
      this.showCurrentStringAlert();
    }
  }

  showCurrentStringAlert() {
    document.getElementById('alphabets').classList.replace('d-none', 'd-block');
    document.getElementById('alphabets').innerHTML = this.currentString || '&ThinSpace;';
  }

  changeAlertBg(style) {
    if (style === 'correct') {
      document.getElementById('alphabets').classList.replace('alert-warning', 'alert-info');
    } else if (style === 'wrong') {
      document.getElementById('alphabets').classList.replace('alert-info', 'alert-warning');
    } else {
      console.error('style should be clear or wrong');
    }
  }

  hideCurrentStringAlert() {
    document.getElementById('alphabets').classList.replace('d-block', 'd-none');
  }

  isCorrect() {
    if (this.currentString === this.finally) {
      return true;
    }
    return false;
  }

  reset() {
    this.alphabets = JSON.parse(JSON.stringify(this.initAlphabets));
    this.currentString = '';
  }

  drawOn(field) {
    if (this.alphabets) {
      ctx.fillStyle = '#000';
      ctx.font = `${this.fontSize} sans-serif`;
      this.alphabets.forEach(alphabet => {
        const x = field.colScale * (alphabet.x + .25);
        const y = field.rowScale * (alphabet.y + .75);
        ctx.fillText(alphabet.char, x, y);
      });
    }
  }
}