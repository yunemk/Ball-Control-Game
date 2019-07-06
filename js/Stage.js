class Stage {
  static getNum(e) {
    if (e.target.nodeName === 'LI') {
      const stageNum = parseInt(e.target.textContent.replace('ステージ-', ''), 10);
      return stageNum;
    }
  }

  static async fetchStageData(number) {
    const res = await fetch('data/fieldSet.json');
    const data = await res.json();
    return data.stages[`stage-${number}`];
  }
}