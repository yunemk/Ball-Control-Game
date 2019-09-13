class Actions {
  constructor(actionsBadgeNum) {
    this.initDir = actionsBadgeNum.dir;
    this.initLoop = actionsBadgeNum.loop;
    this.dir = JSON.parse(JSON.stringify(this.initDir));
    this.loop = JSON.parse(JSON.stringify(this.initLoop));
    this.selectedBadge = 1;
    this.currentActions = null;
    this.show();
    Array.from(document.getElementById('actionsSelector').children)
      .forEach(actionsBtn => actionsBtn.classList.remove('active'));
    document.getElementById('actionsSelector').children[0].classList.add('active');
    const todos = Array.from(document.getElementById('todos').children);
    todos.forEach(todo => {
      todo.classList.replace('not-empty', 'empty');
      todo.innerHTML = '';
    });

    // reset event handler
    document.getElementById('actionsSelector').outerHTML = document.getElementById('actionsSelector').outerHTML;
    document.getElementById('actions').outerHTML = document.getElementById('actions').outerHTML;
    document.getElementById('resetTodos').outerHTML = document.getElementById('resetTodos').outerHTML;
    document.getElementById('actionsSelector').addEventListener('click', e => {
      this.changeBadgeNum(e);
      this.show();
    });
    document.getElementById('actions').addEventListener('click', e => {
      this.clickHandler(e);
      this.show();
    });
    document.getElementById('resetTodos').addEventListener('click', () => {
      this.resetTodos();
    });
  }

  show() {
    const num = this.selectedBadge;
    const actions = document.getElementById('actions');
    let liIndex = 0;
    for (let [key, dir] of new Map([
        ['up', '上'],
        ['right', '右'],
        ['down', '下'],
        ['left', '左']
      ])) {
      const li = actions.children[liIndex++];
      li.dataset.action = `${dir}へ${num}マス`;
      li.firstElementChild.innerHTML = `<i class="fas fa-long-arrow-alt-${key} fa-2x"></i>${num > 1 ? `x ${num}` : ''}`;
      li.lastElementChild.textContent = this.dir[key][num - 1];
    }
    const loopStartLi = actions.children[liIndex++];
    loopStartLi.dataset.action = `繰り返し${num + 1}回`;
    loopStartLi.firstElementChild.innerHTML = `<i class="fas fa-redo-alt fa-rotate-90 fa-lg"></i> x ${num + 1}`;
    loopStartLi.lastElementChild.textContent = this.loop.start[num - 1];
    const loopEndLi = actions.children[liIndex++];
    loopEndLi.lastElementChild.textContent = this.loop.end;

    const badges = Array.from(actions.children).map(action => action.lastElementChild);
    badges.forEach(badge => badge.classList.replace('badge-secondary', 'badge-primary'));
    const zeroBadgeElms = badges.filter(badge => parseInt(badge.textContent, 10) === 0);
    zeroBadgeElms.forEach(badge => badge.classList.replace('badge-primary', 'badge-secondary'));
  }

  changeBadgeNum(e) {
    if (e.target.nodeName === 'BUTTON') {
      Array.from(document.getElementById('actionsSelector').children)
        .forEach(actionsBtn => actionsBtn.classList.remove('active'));
      e.target.classList.add('active');
      this.selectedBadge = parseInt(e.target.textContent);
    }
  }

  clickHandler(e) {
    const selectedActionElm = this.getActionElm(e.target);
    if (selectedActionElm == null) return false;
    const firstEmptyTodo = Array.from(document.getElementById('todos').children)
      .find(todo => todo.classList.contains('empty'));
    const badgeNum = parseInt(selectedActionElm.lastElementChild.textContent, 10);
    if (firstEmptyTodo !== undefined && badgeNum > 0) {
      const selectedAction = selectedActionElm.dataset.action;
      this.decrementSelectedActionNum(selectedAction);
      firstEmptyTodo.classList.replace('empty', 'not-empty');
      firstEmptyTodo.dataset.action = selectedAction;
      firstEmptyTodo.innerHTML = `
          <span class="flex-grow-1">${selectedActionElm.firstElementChild.innerHTML}</span>
          <button class="badge badge-pill badge-danger delTodo">x</button>
        `;

      const delTodoBtn = firstEmptyTodo.querySelector('.delTodo');
      delTodoBtn.onclick = () => {
        this.incrementSelectedActionNum(selectedAction);
        delTodoBtn.parentElement.remove();
        document.getElementById('todos').appendChild(this.storedInvisibleTodo());
        this.show();
      };
    }
  }

  getActionElm(elm) {
    if (elm.nodeName === 'LI') return elm;
    if (elm.nodeName === 'SPAN') {
      if (elm.parentElement.classList.contains('actions-list-item')) return elm.parentElement;
      if (elm.classList.contains('fa-stack')) return elm.parentElement.parentElement; // loop end span
    }
    if (elm.nodeName === 'I') {
      if (elm.classList.contains('fa-stack-1x')) return elm.parentElement.parentElement.parentElement; // Loop end icon
      return elm.parentElement.parentElement; // Other icons
    }
    return null;
  }

  decrementSelectedActionNum(str) {
    for (let [key, dir] of new Map([
        ['up', '上'],
        ['right', '右'],
        ['down', '下'],
        ['left', '左']
      ])) {
      if (str === `${dir}へ${this.selectedBadge}マス`) {
        return this.dir[key][this.selectedBadge - 1]--;
      }
    }
    if (str === `繰り返し${this.selectedBadge + 1}回`) {
      return this.loop.start[this.selectedBadge - 1]--;
    }
    if (str === '繰り返し終わり') {
      return this.loop.end--;
    }
    return new Error('str is invalid' + str);
  }

  incrementSelectedActionNum(str) {
    for (let [key, dir] of new Map([
        ['up', '上'],
        ['right', '右'],
        ['down', '下'],
        ['left', '左']
      ])) {
      for (let i = 1; i <= 3; i++) {
        if (str === `${dir}へ${i}マス`) {
          return this.dir[key][i - 1]++;
        }
      }
    }
    for (let loopI = 2, arrI = 0; loopI <= 4; loopI++, arrI++) {
      if (str === `繰り返し${loopI}回`) {
        return this.loop.start[arrI]++;
      }
    }
    if (str === '繰り返し終わり') {
      return this.loop.end++;
    }
    return new Error('str is invalid ' + str);
  }

  storedInvisibleTodo() {
    const storedInvisibleTodo = document.createElement('li');
    storedInvisibleTodo.innerHTML = '';
    storedInvisibleTodo.classList.add('list-group-item', 'todos-list-item', 'empty');
    return storedInvisibleTodo;
  }

  resetTodos() {
    Array.from(document.getElementById('todos').children)
      .forEach(todo => {
        todo.classList.replace('not-empty', 'empty');
        todo.innerHTML = '';
      });
    this.dir = JSON.parse(JSON.stringify(this.initDir));
    this.loop = JSON.parse(JSON.stringify(this.initLoop));
    this.show();
  }
}
