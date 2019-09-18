class Stage {
  constructor() {
    this.data = {
      "stages": {
        "stage-0": {
          "field": {
            "column": 6,
            "row": 6,
            "status": [
              [0, 0, 0, 0, 0, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 2, 0],
              [0, 0, 0, 0, 0, 0]
            ]
          },
          "ball": {
            "initPosX": 1,
            "initPosY": 1,
            "color": "lightcyan",
            "strokeColor": "black"
          },
          "canvas": {
            "background": "#fff"
          },
          "actionsBadgeNum": {
            "dir": {
              "up": [3, 3, 3],
              "right": [3, 3, 3],
              "down": [3, 3, 3],
              "left": [3, 3, 3]
            },
            "loop": {
              "start": [0, 0, 0],
              "end": 0
            }
          }
        },
        "stage-1": {
          "field": {
            "column": 6,
            "row": 6,
            "status": [
              [0, 0, 0, 0, 0, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 2, 0],
              [0, 0, 0, 0, 0, 0]
            ]
          },
          "ball": {
            "initPosX": 1,
            "initPosY": 1,
            "color": "cyan",
            "strokeColor": "black"
          },
          "arithmetic": {
            "subject": "答えが3になるようにたどろう",
            "ans": 3,
            "pos": [{
                "char": "1",
                "x": 2,
                "y": 1
              },
              {
                "char": "2",
                "x": 1,
                "y": 2
              },
              {
                "char": "+",
                "x": 4,
                "y": 2
              },
              {
                "char": "=",
                "x": 3,
                "y": 3
              },
              {
                "char": "1",
                "x": 4,
                "y": 3
              }
            ]
          },
          "canvas": {
            "background": "#fff"
          },
          "actionsBadgeNum": {
            "dir": {
              "up": [3, 3, 3],
              "right": [3, 3, 3],
              "down": [3, 3, 3],
              "left": [3, 3, 3]
            },
            "loop": {
              "start": [0, 3, 1],
              "end": 4
            }
          }
        },
        "stage-2": {
          "field": {
            "column": 6,
            "row": 6,
            "status": [
              [0, 0, 0, 0, 0, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 2, 0],
              [0, 0, 0, 0, 0, 0]
            ]
          },
          "ball": {
            "initPosX": 1,
            "initPosY": 1,
            "color": "darkcyan",
            "strokeColor": "black"
          },
          "arithmetic": {
            "subject": "答えが2になるようにたどろう",
            "ans": 2,
            "pos": [{
                "char": "1",
                "x": 1,
                "y": 2
              },
              {
                "char": "+",
                "x": 2,
                "y": 2
              },
              {
                "char": "1",
                "x": 3,
                "y": 3
              },
              {
                "char": "=",
                "x": 3,
                "y": 4
              }
            ]
          },
          "canvas": {
            "background": "#fff"
          },
          "actionsBadgeNum": {
            "dir": {
              "up": [5, 5, 5],
              "right": [5, 5, 5],
              "down": [5, 5, 5],
              "left": [5, 5, 5]
            },
            "loop": {
              "start": [5, 5, 5],
              "end": 5
            }
          }
        },
        "stage-3": {
          "field": {
            "column": 8,
            "row": 8,
            "status": [
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 2, 0],
              [0, 0, 0, 0, 0, 0, 0, 0]
            ]
          },
          "ball": {
            "initPosX": 1,
            "initPosY": 1,
            "color": "darkgreen"
          },
          "arithmetic": {
            "subject": "答えが7になるようにたどろう",
            "ans": 7,
            "pos": [{
                "char": "+",
                "x": 3,
                "y": 3
              },
              {
                "char": "1",
                "x": 4,
                "y": 3
              },
              {
                "char": "=",
                "x": 5,
                "y": 3
              },
              {
                "char": "1",
                "x": 3,
                "y": 4
              },
              {
                "char": "+",
                "x": 4,
                "y": 4
              }
            ]
          },
          "canvas": {
            "background": "#fff"
          },
          "actionsBadgeNum": {
            "dir": {
              "up": [3, 3, 3],
              "right": [3, 3, 3],
              "down": [3, 3, 3],
              "left": [3, 3, 3]
            },
            "loop": {
              "start": [3, 3, 3],
              "end": 3
            }
          }
        },
        "stage-4": {
          "field": {
            "column": 6,
            "row": 6,
            "status": [
              [0, 0, 0, 0, 0, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 0],
              [0, 2, 1, 1, 1, 0],
              [0, 0, 0, 0, 0, 0]
            ]
          },
          "ball": {
            "initPosX": 2,
            "initPosY": 2,
            "color": "lightyellow",
            "strokeColor": "black"
          },
          "arithmetic": {
            "subject": "答えが30になるようにたどろう",
            "ans": 30,
            "pos": [{
                "char": "2",
                "x": 2,
                "y": 1
              },
              {
                "char": "+",
                "x": 3,
                "y": 1
              },
              {
                "char": "3",
                "x": 4,
                "y": 1
              },
              {
                "char": "+",
                "x": 4,
                "y": 2
              },
              {
                "char": "=",
                "x": 1,
                "y": 3
              },
              {
                "char": "+",
                "x": 2,
                "y": 3
              },
              {
                "char": "3",
                "x": 2,
                "y": 4
              },
              {
                "char": "+",
                "x": 3,
                "y": 4
              },
              {
                "char": "2",
                "x": 4,
                "y": 4
              }
            ]
          },
          "canvas": {
            "background": "#fff"
          },
          "actionsBadgeNum": {
            "dir": {
              "up": [2, 2, 5],
              "right": [2, 2, 5],
              "down": [2, 2, 5],
              "left": [2, 2, 5]
            },
            "loop": {
              "start": [1, 1, 1],
              "end": 1
            }
          }
        },
        "stage-5": {
          "field": {
            "column": 7,
            "row": 6,
            "status": [
              [0, 0, 0, 0, 0, 0, 0],
              [0, 1, 1, 1, 1, 0, 0],
              [0, 1, 1, 1, 1, 0, 0],
              [0, 1, 1, 1, 1, 0, 0],
              [0, 1, 1, 1, 1, 2, 0],
              [0, 0, 0, 0, 0, 0, 0]
            ]
          },
          "ball": {
            "initPosX": 1,
            "initPosY": 1,
            "color": "lightgreen",
            "strokeColor": "black"
          },
          "arithmetic": {
            "subject": "答えが1になるようにたどろう",
            "ans": 1,
            "pos": [{
              "char": "9",
              "x": 2,
              "y": 1
            }, {
              "char": "+",
              "x": 3,
              "y": 1
            }, {
              "char": "9",
              "x": 1,
              "y": 2
            }, {
              "char": "-",
              "x": 2,
              "y": 2
            }, {
              "char": "-",
              "x": 1,
              "y": 3
            }, {
              "char": "3",
              "x": 2,
              "y": 3
            }, {
              "char": "2",
              "x": 4,
              "y": 3
            }, {
              "char": "+",
              "x": 2,
              "y": 4
            }, {
              "char": "6",
              "x": 3,
              "y": 4
            }, {
              "char": "=",
              "x": 4,
              "y": 4
            }]
          },
          "canvas": {
            "background": "#fff"
          },
          "actionsBadgeNum": {
            "dir": {
              "up": [3, 3, 3],
              "right": [3, 3, 3],
              "down": [3, 3, 3],
              "left": [3, 3, 3]
            },
            "loop": {
              "start": [3, 1, 0],
              "end": 3
            }
          }
        },
        "stage-6": {
          "field": {
            "column": 9,
            "row": 7,
            "status": [
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 1, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 0, 1, 0, 1, 0],
              [0, 1, 1, 1, 0, 2, 0, 1, 0],
              [0, 1, 1, 1, 0, 0, 0, 1, 0],
              [0, 1, 1, 1, 1, 1, 1, 1, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
          },
          "ball": {
            "initPosX": 1,
            "initPosY": 5,
            "color": "green",
            "strokeColor": "black"
          },
          "arithmetic": {
            "subject": "答えが13になるようにたどろう",
            "ans": 13,
            "pos": [{
                "char": "3",
                "x": 1,
                "y": 1
              },
              {
                "char": "1",
                "x": 6,
                "y": 1
              },
              {
                "char": "-",
                "x": 1,
                "y": 2
              },
              {
                "char": "=",
                "x": 5,
                "y": 2
              },
              {
                "char": "4",
                "x": 2,
                "y": 3
              },
              {
                "char": "2",
                "x": 1,
                "y": 4
              },
              {
                "char": "×",
                "x": 2,
                "y": 4
              },
              {
                "char": "1",
                "x": 2,
                "y": 5
              },
              {
                "char": "+",
                "x": 3,
                "y": 5
              },
              {
                "char": "3",
                "x": 6,
                "y": 5
              },
              {
                "char": "+",
                "x": 7,
                "y": 5
              }
            ]
          },
          "canvas": {
            "background": "#fff"
          },
          "actionsBadgeNum": {
            "dir": {
              "up": [3, 3, 3],
              "right": [3, 3, 3],
              "down": [3, 3, 3],
              "left": [3, 3, 3]
            },
            "loop": {
              "start": [2, 2, 0],
              "end": 4
            }
          }
        },
        "stage-7": {
          "field": {
            "column": 9,
            "row": 9,
            "status": [
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 1, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 2, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 1, 1, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
          },
          "ball": {
            "initPosX": 1,
            "initPosY": 4,
            "color": "yellow",
            "strokeColor": "black"
          },
          "arithmetic": {
            "subject": "答えが14になるようにたどろう",
            "ans": 14,
            "pos": [{
                "char": "(",
                "x": 1,
                "y": 1
              },
              {
                "char": "2",
                "x": 2,
                "y": 1
              },
              {
                "char": "+",
                "x": 4,
                "y": 1
              },
              {
                "char": "2",
                "x": 5,
                "y": 1
              },
              {
                "char": ")",
                "x": 7,
                "y": 1
              },
              {
                "char": "8",
                "x": 2,
                "y": 4
              },
              {
                "char": "=",
                "x": 5,
                "y": 4
              },
              {
                "char": "3",
                "x": 6,
                "y": 4
              },
              {
                "char": "×",
                "x": 7,
                "y": 4
              },
              {
                "char": "3",
                "x": 1,
                "y": 5
              },
              {
                "char": "+",
                "x": 2,
                "y": 5
              },
              {
                "char": "9",
                "x": 3,
                "y": 5
              },
              {
                "char": "3",
                "x": 4,
                "y": 5
              },
              {
                "char": "3",
                "x": 7,
                "y": 5
              },
              {
                "char": "1",
                "x": 2,
                "y": 6
              },
              {
                "char": "8",
                "x": 4,
                "y": 7
              },
              {
                "char": "+",
                "x": 5,
                "y": 7
              },
              {
                "char": "2",
                "x": 6,
                "y": 7
              },
              {
                "char": "+",
                "x": 7,
                "y": 7
              }
            ]
          },
          "canvas": {
            "background": "#fff"
          },
          "actionsBadgeNum": {
            "dir": {
              "up": [5, 5, 5],
              "right": [5, 5, 5],
              "down": [5, 5, 5],
              "left": [5, 5, 5]
            },
            "loop": {
              "start": [5, 5, 5],
              "end": 2
            }
          }
        }
      }
    };
  }

  getNum(e) {
    if (e.target.nodeName === 'P' || e.target.nodeName === 'LI') {
      const selectedLi = e.target.nodeName === 'LI' ? e.target : e.target.parentElement;
      Array.from(document.getElementById('stage-list').lastElementChild.children)
        .forEach(li => li.classList.remove('stage-selected'));
      selectedLi.classList.add('stage-selected');
      const stageNum = parseInt(selectedLi.dataset.stageNum, 10);
      return stageNum;
    }
  }

  loadData(number) {
    return this.data.stages[`stage-${number}`];
  }
}