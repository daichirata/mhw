export class ItemType {
  constructor({ id, name }) {
    Object.assign(this, { id, name });
  }

  get items() {
    return items.filter(i => i.typeId === this.id);
  }
}

export class Item {
  constructor({ id, typeId, name, attack = 0, affinity = 0 }) {
    Object.assign(this, { id, typeId, name, attack, affinity });
  }

  get type() {
    return types.find(t => t.id === this.typeId);
  }
}

export const types = [
  new ItemType({ id: 1, name: "爪・護符" }),
  new ItemType({ id: 2, name: "種・丸薬" }),
  new ItemType({ id: 3, name: "薬" }),
  new ItemType({ id: 4, name: "粉塵" }),
  new ItemType({ id: 5, name: "猫飯" }),
  new ItemType({ id: 6, name: "猫スキル" }),
  new ItemType({ id: 7, name: "達人の煙筒" }),
  new ItemType({ id: 8, name: "回避の装衣" })
];

export const items = [
  new Item({ id: 11, typeId: 1, name: "爪(6)", attack: 6 }),
  new Item({ id: 12, typeId: 1, name: "護符(9)", attack: 9 }),
  new Item({ id: 13, typeId: 1, name: "爪護符(15)", attack: 15 }),

  new Item({ id: 21, typeId: 2, name: "怪力の種(10)", attack: 10 }),
  new Item({ id: 22, typeId: 2, name: "怪力の丸薬(25)", attack: 25 }),

  new Item({ id: 31, typeId: 3, name: "鬼人薬(5)", attack: 5 }),
  new Item({ id: 32, typeId: 3, name: "鬼人薬グレート(7)", attack: 7 }),

  new Item({ id: 41, typeId: 4, name: "鬼人の粉塵(10)", attack: 10 }),

  new Item({ id: 51, typeId: 5, name: "攻撃力UP【小】", attack: 5 }),
  new Item({ id: 52, typeId: 5, name: "攻撃力UP【中】", attack: 10 }),
  new Item({ id: 53, typeId: 5, name: "攻撃力UP【大】", attack: 15 }),

  new Item({ id: 61, typeId: 6, name: "猫の短期催眠術(9)", attack: 9 }),

  new Item({ id: 71, typeId: 7, name: "達人の煙筒(50)", affinity: 50 }),

  new Item({ id: 81, typeId: 8, name: "回避の装衣(50)", attack: 50 })
];

export const find = id => items.find(i => i.id === Number(id));
