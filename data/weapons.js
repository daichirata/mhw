export class Weapon {
  constructor({
    id,
    name,
    rarity,
    attack,
    affinity = 0,
    sharpnesses,
    initSharpness = 50,
    extendedSharpness = 0,
    elementId = 0,
    elementalAttack = 0,
    elementalLimit = 0,
    hiddenElement = false
  }) {
    Object.assign(this, {
      id,
      name,
      rarity,
      attack,
      affinity,
      sharpnesses,
      initSharpness,
      extendedSharpness,
      elementId,
      elementalAttack,
      elementalLimit,
      hiddenElement
    });
  }

  get element() {
    return elementsFind(this.elementId);
  }

  get aeCount() {
    return 9 - this.rarity;
  }

  sharpness(extended = 0) {
    let s = 0;
    for (const [i, v] of this.sharpnesses.entries()) {
      s += v;
      if (s >= this.initSharpness + extended) {
        return sharpnesses.find(s => s.id === i + 1);
      }
    }
    return sharpnesses[sharpnesses.length - 1];
  }
}

export const elements = [
  {
    id: 0,
    name: "無"
  },
  {
    id: 1,
    name: "火"
  },
  {
    id: 2,
    name: "水"
  },
  {
    id: 3,
    name: "雷"
  },
  {
    id: 4,
    name: "氷"
  },
  {
    id: 5,
    name: "龍"
  },
  {
    id: 6,
    name: "毒"
  },
  {
    id: 7,
    name: "眠"
  },
  {
    id: 8,
    name: "麻"
  },
  {
    id: 9,
    name: "爆"
  }
];

export const sharpnesses = [
  {
    id: 1,
    name: "赤",
    multiplier: 0.5,
    elementalMultiplier: 0.25
  },
  {
    id: 2,
    name: "橙",
    multiplier: 0.75,
    elementalMultiplier: 0.5
  },
  {
    id: 3,
    name: "黄",
    multiplier: 1.0,
    elementalMultiplier: 0.75
  },
  {
    id: 4,
    name: "緑",
    multiplier: 1.05,
    elementalMultiplier: 1
  },
  {
    id: 5,
    name: "青",
    multiplier: 1.2,
    elementalMultiplier: 1.0625
  },
  {
    id: 6,
    name: "白",
    multiplier: 1.32,
    elementalMultiplier: 1.125
  }
];

export const augmentEquipments = [
  {
    id: 1,
    name: "攻撃力強化"
  },
  {
    id: 2,
    name: "会心率強化"
  }
];

export const data = [
  new Weapon({
    id: 1,
    name: "滅鬼の凶器",
    rarity: 8,
    attack: 1008,
    sharpnesses: [10, 10, 10, 10, 10 * 10, 10], // dummy
    elementId: 5,
    elementalAttack: 150,
    elementalLimit: 200
  }),
  new Weapon({
    id: 2,
    name: "ジャグラスハッカーⅢ",
    rarity: 6,
    attack: 912,
    sharpnesses: [10, 10, 10, 10, 10 * 10, 10], // dummy
    elementId: 2,
    elementalAttack: 300,
    elementalLimit: 360,
    hiddenElement: true
  }),
  new Weapon({
    id: 3,
    name: "モンストロの憤怒",
    rarity: 8,
    attack: 960,
    sharpnesses: [10, 10, 10, 10, 10 * 2, 10], // dummy
    elementId: 5,
    elementalAttack: 300,
    elementalLimit: 390
  }),
  new Weapon({
    id: 4,
    name: "アングイッシュ",
    rarity: 7,
    attack: 1104,
    affinity: -30,
    sharpnesses: [10, 10, 10, 10, 10 * 1, 10], // dummy
    elementId: 5,
    elementalAttack: 240,
    elementalLimit: 310
  }),
  new Weapon({
    id: 5,
    name: "竜熱機関式【鋼翼】改",
    rarity: 7,
    attack: 1008,
    affinity: -15,
    sharpnesses: [10, 10, 10, 10, 10, 10 * 100], // dummy
    initSharpness: 60,
    elementId: 1,
    elementalAttack: 510,
    elementalLimit: 660,
    hiddenElement: true
  })
];

export const find = id => data.find(d => d.id === Number(id));

export const findAugmentEquipments = id =>
  augmentEquipments.find(a => a.id === Number(id));

export const elementsFind = id => elements.find(d => d.id === Number(id));
