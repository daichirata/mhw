export class Item {
  constructor({ id, typeId, name, attack = 0, affinity = 0 }) {
    Object.assign(this, { id, typeId, name, attack, affinity });
  }

  get type() {
    return type.find(t => t.id === this.typeId);
  }
}

export const type = [
  {
    id: 1,
    name: "爪・護符"
  },
  {
    id: 2,
    name: "種・丸薬"
  },
  {
    id: 3,
    name: "薬"
  },
  {
    id: 4,
    name: "粉塵"
  },
  {
    id: 5,
    name: "猫飯"
  },
  {
    id: 6,
    name: "達人の煙筒"
  },
  {
    id: 7,
    name: "回避の装衣"
  }
];

export const data = [
  new Item({ id: 101, typeId: 1, name: "爪(6)", attack: 6 }),
  new Item({ id: 102, typeId: 1, name: "護符(9)", attack: 9 }),
  new Item({
    id: 103,
    typeId: 1,
    name: "爪護符(15)",
    attack: 15
  }),

  new Item({ id: 201, typeId: 2, name: "怪力の種(10)", attack: 10 }),
  new Item({ id: 202, typeId: 2, name: "怪力の丸薬(25)", attack: 25 }),

  new Item({ id: 301, typeId: 3, name: "鬼人薬(5)", attack: 5 }),
  new Item({ id: 302, typeId: 3, name: "鬼人薬グレート(7)", attack: 7 }),

  new Item({ id: 401, typeId: 4, name: "鬼人の粉塵(10)", attack: 10 }),

  new Item({ id: 501, typeId: 5, name: "攻撃力UP【小】", attack: 5 }),
  new Item({ id: 502, typeId: 5, name: "攻撃力UP【中】", attack: 10 }),
  new Item({ id: 503, typeId: 5, name: "攻撃力UP【大】", attack: 15 }),

  new Item({ id: 601, typeId: 6, name: "達人の煙筒(50)", affinity: 50 }),

  new Item({ id: 701, typeId: 7, name: "回避の装衣(50)", attack: 50 })
];

export const find = id => data.find(d => d.id === Number(id));

export const findType = id => type.find(t => t.id === id);

export const filterTypeId = id => data.filter(d => d.typeId === id);
