class Actions {
  constructor(actionsBadgeNum) {
    this.initDir = actionsBadgeNum.dir;
    this.initFor = actionsBadgeNum.for;
    this.dir = this.initDir;
    this.for = this.initFor;
  }

  change(actionsBadgeNum) {
    return {
      actionsBadgeNum,
      handleEvent: (e) => {
        if (e.target.nodeName === 'BUTTON') {
          Array.from(document.getElementById('actionsSelector').children).forEach(actionsBtn => {
            actionsBtn.classList.remove('active');
          })
          e.target.classList.add('active');
          const num = parseInt(e.target.textContent);
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
              繰り返し${num + 1}回<span class="badge badge-pill badge-primary float-right">${this.for.start[num - 1]}</span>
            </button>
            <button type="button" class="list-group-item list-group-item-action">
              繰り返し終わり<span class="badge badge-pill badge-primary float-right">${this.for.end}</span>
            </button>
          `;
        }
      }
    };
  }

  clickHandler(e) {
    if (e.target.nodeName === 'BUTTON') {
      const actionsBtn = e.target;
      const todosElement = document.getElementById('todos');
      const firstEmptyTodo = Array.from(todosElement.children)
        .find(el => el.classList.contains('empty'));
      const badgeNum = parseInt(actionsBtn.lastElementChild.textContent, 10);
      if (firstEmptyTodo !== undefined && badgeNum > 0) {
        actionsBtn.lastElementChild.textContent = `${badgeNum - 1}`;
        firstEmptyTodo.classList.replace('empty', 'not-empty');
        firstEmptyTodo.innerHTML = `
        ${actionsBtn.firstChild.textContent.trim()}
        <button class="btn btn-sm btn-danger my-n1 rounded-circle float-right delTodo">x</button>
        `;
        const delTodoBtn = firstEmptyTodo.querySelector('.delTodo');
        delTodoBtn.onclick = () => {
          actionsBtn.lastElementChild.textContent = `${parseInt(actionsBtn.lastElementChild.textContent, 10) + 1}`;
          delTodoBtn.parentElement.remove();
          const storedInvisibleTodo = document.createElement('li');
          storedInvisibleTodo.innerHTML = '&ThinSpace;';
          storedInvisibleTodo.classList.add('list-group-item', 'empty');
          todosElement.appendChild(storedInvisibleTodo);
        }
      }
    }
  }

  resetActionsBadgeNumber(badgeNum) {
    const stgNumStr = Array.from(document.getElementById('actionsSelector').children)
      .find(el => el.classList.contains('active')).textContent;
    const stgNum = parseInt(stgNumStr) - 1; // Array counting
    const btns = Array.from(document.getElementById('actions').children);
    btns[0].lastElementChild.textContent = badgeNum.dir.up[stgNum];
    btns[1].lastElementChild.textContent = badgeNum.dir.right[stgNum];
    btns[2].lastElementChild.textContent = badgeNum.dir.down[stgNum];
    btns[3].lastElementChild.textContent = badgeNum.dir.left[stgNum];
    btns[4].lastElementChild.textContent = badgeNum.for.start[stgNum];
    btns[5].lastElementChild.textContent = badgeNum.for.end;
  }
}
