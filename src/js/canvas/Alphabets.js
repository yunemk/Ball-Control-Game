class Alphabets {
  constructor(field, alphabets) {
    this.hideCurrentStringAlert();
    this.reset();
    if (alphabets) {
      this.initPos = alphabets.pos;
      this.pos = JSON.parse(JSON.stringify(this.initPos));
      this.currentString = '';
      this.fontSize = `${(field.colScale > field.rowScale ? field.rowScale : field.rowScale) - 20}px`;
      this.ans = alphabets.ans;
      this.question = alphabets.question;
      this.alertBgColor = 'warning';
      this.showCurrentStringAlert();
    }
  }

  addToCurrent(ball) {
    if (this.pos) {
      for (const i of range(0, this.pos.length - 1)) {
        if (ball.posX === this.pos[i].x && ball.posY === this.pos[i].y) {
          this.currentString += this.pos[i].char;
          this.pos = this.pos.filter(alphabet => alphabet !== this.pos[i]);
          break;
        }
      }
      if (this.isCorrect()) {
        this.alertBgColor = 'info';
      } else {
        this.alertBgColor = 'warning';
      }
      this.showCurrentStringAlert();
    }
  }

  showCurrentStringAlert() {
    document.getElementById('alphabets').classList.replace('d-none', 'd-flex');
    document.getElementById('alphabets').innerHTML = `
      <h5 class="mr-auto px-3 py-1" style="background: #ffddf799; border-radius: 10px;">ミッション</h5>
      <div class="d-flex flex-row">
        <h2 class="mr-3">${this.question}</h2>
        ${this.currentString ? `<div class="alert alert-${this.alertBgColor} align-items-center mt-n2 mb-n1">${this.currentString}</div>` : ''}
      </div>
    `;
  }

  hideCurrentStringAlert() {
    document.getElementById('alphabets').classList.replace('d-flex', 'd-none');
  }

  isCorrect() {
    if (this.pos) {
      if (this.currentString === this.ans) {
        return true;
      }
      return false;
    }
    return true;
  }

  reset() {
    if (this.pos) {
      this.pos = JSON.parse(JSON.stringify(this.initPos));
      this.currentString = '';
      this.showCurrentStringAlert();
    }
  }

  drawOn(field) {
    if (this.pos) {
      ctx.fillStyle = '#000';
      ctx.font = `${this.fontSize} 'Impact', sans-serif`;
      this.pos.forEach(alphabet => {
        const x = field.colScale * (alphabet.x + .35);
        const y = field.rowScale * (alphabet.y + .75);
        ctx.fillText(alphabet.char, x, y);
      });
    }
  }
}