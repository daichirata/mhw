export class MotionSet {
  constructor({
    id,
    name,
    value1,
    elementalMultiplier1 = 1,
    value2 = 0,
    elementalMultiplier2 = 1,
    drawAttack = false
  }) {
    this.name = name;

    this.motions = [];

    if (value1 !== 0) {
      this.motions.push({
        value: value1,
        elementalMultiplier: elementalMultiplier1,
        drawAttack
      });
    }
    if (value2 !== 0) {
      this.motions.push({
        value: value2,
        elementalMultiplier: elementalMultiplier2,
        drawAttack
      });
    }
  }
}

export const data = [
  new MotionSet({
    id: 1,
    name: "溜め斬り0",
    value1: 48
  }),
  new MotionSet({
    id: 2,
    name: "溜め斬り1",
    value1: 77,
    elementalMultiplier1: 1.1
  }),
  new MotionSet({
    id: 3,
    name: "溜め斬り2",
    value1: 105,
    elementalMultiplier1: 1.2
  }),

  new MotionSet({
    id: 4,
    name: "抜刀溜め斬り0",
    value1: 48,
    drawAttack: true
  }),
  new MotionSet({
    id: 5,
    name: "抜刀溜め斬り1",
    value1: 77,
    elementalMultiplier1: 1.1,
    drawAttack: true
  }),
  new MotionSet({
    id: 6,
    name: "抜刀溜め斬り2",
    value1: 105,
    elementalMultiplier1: 1.2,
    drawAttack: true
  }),

  new MotionSet({
    id: 7,
    name: "強溜め斬り0",
    value1: 65,
    elementalMultiplier1: 1.1
  }),
  new MotionSet({
    id: 8,
    name: "強溜め斬り1",
    value1: 90,
    elementalMultiplier1: 1.15
  }),
  new MotionSet({
    id: 9,
    name: "強溜め斬り2",
    value1: 115,
    elementalMultiplier1: 1.2
  }),

  new MotionSet({
    id: 10,
    name: "真・溜め斬り0",
    value1: 15,
    value2: 165,
    elementalMultiplier2: 1.3
  }),
  new MotionSet({
    id: 11,
    name: "真・溜め斬り1",
    value1: 20,
    value2: 182,
    elementalMultiplier2: 1.4
  }),
  new MotionSet({
    id: 12,
    name: "真・溜め斬り2",
    value1: 22,
    value2: 211,
    elementalMultiplier2: 1.5
  }),

  new MotionSet({
    id: 13,
    name: "飛び込みなぎ払い0",
    value1: 71,
    elementalMultiplier1: 1.8
  }),
  new MotionSet({
    id: 14,
    name: "飛び込みなぎ払い1",
    value1: 85,
    elementalMultiplier1: 2.45
  }),
  new MotionSet({
    id: 15,
    name: "飛び込みなぎ払い2",
    value1: 110,
    elementalMultiplier1: 2.9
  }),

  new MotionSet({
    id: 16,
    name: "タックル0",
    value1: 26,
    elementalMultiplier1: 0
  }),
  new MotionSet({
    id: 17,
    name: "タックル1",
    value1: 35,
    elementalMultiplier1: 0
  }),
  new MotionSet({
    id: 18,
    name: "タックル2",
    value1: 48,
    elementalMultiplier1: 0
  })
];
