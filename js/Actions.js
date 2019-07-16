class Actions {
  constructor(actionsBadgeNum) {
    this.initDir = actionsBadgeNum.dir;
    this.initLoop = actionsBadgeNum.loop;
    this.dir = JSON.parse(JSON.stringify(this.initDir));
    this.loop = JSON.parse(JSON.stringify(this.initLoop));
    this.selectedBadge = 1;
    this.show();
  }

  show() {
    const num = this.selectedBadge;
    document.getElementById('actions').innerHTML = `
      <button type="button" class="list-group-item list-group-item-action">
        上へ${num}マス<span class="badge badge-pill badge-primary float-right">${this.dir.up[num - 1]}</span>
      </button>
      <button type="button" class="list-group-item list-group-item-action">
        右へ${num}マス<span class="badge badge-pill badge-primary float-right">${this.dir.right[num - 1]}</span>
      </button>
      <button type="button" class="list-group-item list-group-item-action">
        下へ${num}マス<span class="badge badge-pill badge-primary float-right">${this.dir.down[num - 1]}</span>
      </button>
      <button type="button" class="list-group-item list-group-item-action">
        左へ${num}マス<span class="badge badge-pill badge-primary float-right">${this.dir.left[num - 1]}</span>
      </button>
      <button type="button" class="list-group-item list-group-item-action">
        繰り返し${num + 1}回<span class="badge badge-pill badge-primary float-right">${this.loop.start[num - 1]}</span>
      </button>
      <button type="button" class="list-group-item list-group-item-action">
        繰り返し終わり<span class="badge badge-pill badge-primary float-right">${this.loop.end}</span>
      </button>
    `;
  }

  changeBadgeNum(e) {
    if (e.target.nodeName === 'BUTTON') {
      Array.from(document.getElementById('actionsSelector').children).forEach(actionsBtn => actionsBtn.classList.remove('active'));
      e.target.classList.add('active');
      this.selectedBadge = parseInt(e.target.textContent);
    }
  }

  clickHandler(e) {
    if (e.target.nodeName === 'BUTTON' || e.target.nodeName === 'SPAN') {
      const selectedAction = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentElement;
      const badgeNum = parseInt(selectedAction.lastElementChild.textContent, 10);
      const firstEmptyTodo = Array.from(document.getElementById('todos').children)
        .find(el => el.classList.contains('empty'));
      if (firstEmptyTodo !== undefined && badgeNum > 0) {
        this.decrementSelectedActionNum(selectedAction.firstChild.textContent.trim());
        firstEmptyTodo.classList.replace('empty', 'not-empty');
        firstEmptyTodo.innerHTML = `
          ${selectedAction.firstChild.textContent.trim()}
          <button class="btn btn-sm btn-danger my-n1 rounded-circle float-right delTodo">x</button>
        `;
        const delTodoBtn = firstEmptyTodo.querySelector('.delTodo');
        delTodoBtn.onclick = () => {
          this.incrementSelectedActionNum(delTodoBtn.previousSibling.textContent.trim());
          delTodoBtn.parentElement.remove();
          document.getElementById('todos').appendChild(this.storedInvisibleTodo());
          this.show();
        };
      }
    }
  }

  decrementSelectedActionNum(str) {
    if (str === `上へ${this.selectedBadge}マス`) {
      this.dir.up[this.selectedBadge - 1]--;
    } else if (str === `右へ${this.selectedBadge}マス`) {
      this.dir.right[this.selectedBadge - 1]--;
    } else if (str === `下へ${this.selectedBadge}マス`) {
      this.dir.down[this.selectedBadge - 1]--;
    } else if (str === `左へ${this.selectedBadge}マス`) {
      this.dir.left[this.selectedBadge - 1]--;
    } else if (str === `繰り返し${this.selectedBadge + 1}回`) {
      this.loop.start[this.selectedBadge - 1]--;
    } else if (str === '繰り返し終わり') {
      this.loop.end--;
    }
  }

  incrementSelectedActionNum(str) {
    for (let i = 1; i <= 3; i++) {
      if (str === `上へ${i}マス`) {
        this.dir.up[i - 1]++;
      } else if (str === `右へ${i}マス`) {
        this.dir.right[i - 1]++;
      } else if (str === `下へ${i}マス`) {
        this.dir.down[i - 1]++;
      } else if (str === `左へ${i}マス`) {
        this.dir.left[i - 1]++;
      } else if (str === `繰り返し${i + 1}回`) {
        this.loop.start[i - 1]++;
      }
    }
    if (str === '繰り返し終わり') {
      this.loop.end++;
    }
  }

  storedInvisibleTodo() {
    const storedInvisibleTodo = document.createElement('li');
    storedInvisibleTodo.innerHTML = '&ThinSpace;';
    storedInvisibleTodo.classList.add('list-group-item', 'empty');
    return storedInvisibleTodo;
  }

  resetTodos() {
    const todos = Array.from(document.getElementById('todos').children);
    todos.forEach(el => {
      el.classList.replace('not-empty', 'empty');
      el.innerHTML = '&ThinSpace;';
    });
    this.dir = JSON.parse(JSON.stringify(this.initDir));
    this.loop = JSON.parse(JSON.stringify(this.initLoop));
    this.show();
  }
}
