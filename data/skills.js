export class SkillGroup {
  constructor({ id, name }) {
    Object.assign(this, { id, name });
  }

  get types() {
    return types.filter(t => t.groupId === this.id);
  }
}

export class SkillType {
  constructor({ id, groupId, name }) {
    Object.assign(this, { id, groupId, name });
  }

  get skills() {
    return skills.filter(s => s.typeId === this.id);
  }
}

export class Skill {
  constructor({ id, typeId, level, anyName = "", value1, value2 = 0 }) {
    Object.assign(this, { id, typeId, level, anyName, value1, value2 });
  }

  get type() {
    return types.find(t => t.id === this.typeId);
  }

  get name() {
    return this.type.name;
  }

  get fullName() {
    if (this.anyName !== "") {
      return `${this.name}${this.anyName}`;
    }
    return `${this.name}Lv${this.level}`;
  }
}

export const groups = [
  new SkillGroup({ id: 1, name: "武器系" }),
  new SkillGroup({ id: 2, name: "攻撃系" }),
  new SkillGroup({ id: 3, name: "会心系" }),
  new SkillGroup({ id: 4, name: "属性系" })
];

export const types = [
  new SkillType({ id: 1, groupId: 1, name: "無属性強化" }),
  new SkillType({ id: 2, groupId: 1, name: "匠" }),

  new SkillType({ id: 3, groupId: 2, name: "攻撃" }),
  new SkillType({ id: 4, groupId: 2, name: "フルチャージ" }),
  new SkillType({ id: 5, groupId: 2, name: "逆恨み" }),
  new SkillType({ id: 6, groupId: 2, name: "火事場力" }),
  new SkillType({ id: 7, groupId: 2, name: "挑戦者" }),

  new SkillType({ id: 8, groupId: 3, name: "超会心" }),
  new SkillType({ id: 9, groupId: 3, name: "弱点特効" }),
  new SkillType({ id: 10, groupId: 3, name: "見切り" }),
  new SkillType({ id: 11, groupId: 3, name: "渾身" }),
  new SkillType({ id: 12, groupId: 3, name: "力の解放" }),
  new SkillType({ id: 13, groupId: 3, name: "抜刀術【技】" }),
  // { id: 14, groupId: 3, name: "滑走強化" },

  new SkillType({ id: 15, groupId: 4, name: "属性解放/装填拡張" }),
  new SkillType({ id: 16, groupId: 4, name: "火属性攻撃強化" }),
  new SkillType({ id: 17, groupId: 4, name: "水属性攻撃強化" }),
  new SkillType({ id: 18, groupId: 4, name: "雷属性攻撃強化" }),
  new SkillType({ id: 19, groupId: 4, name: "氷属性攻撃強化" }),
  new SkillType({ id: 20, groupId: 4, name: "龍属性攻撃強化" })
];

export const skills = [
  // 無属性強化
  new Skill({ id: 101, typeId: 1, level: 1, value1: 1.1 }),

  // 匠
  new Skill({ id: 201, typeId: 2, level: 1, value1: 10 }),
  new Skill({ id: 202, typeId: 2, level: 2, value1: 20 }),
  new Skill({ id: 203, typeId: 2, level: 3, value1: 30 }),
  new Skill({ id: 204, typeId: 2, level: 4, value1: 40 }),
  new Skill({ id: 205, typeId: 2, level: 5, value1: 50 }),

  // 攻撃
  new Skill({ id: 301, typeId: 3, level: 1, value1: 3 }),
  new Skill({ id: 302, typeId: 3, level: 2, value1: 6 }),
  new Skill({ id: 303, typeId: 3, level: 3, value1: 9 }),
  new Skill({ id: 304, typeId: 3, level: 4, value1: 12, value2: 5 }),
  new Skill({ id: 305, typeId: 3, level: 5, value1: 15, value2: 5 }),
  new Skill({ id: 306, typeId: 3, level: 6, value1: 18, value2: 5 }),
  new Skill({ id: 307, typeId: 3, level: 7, value1: 21, value2: 5 }),

  // フルチャージ
  new Skill({ id: 401, typeId: 4, level: 1, value1: 5 }),
  new Skill({ id: 402, typeId: 4, level: 2, value1: 10 }),
  new Skill({ id: 403, typeId: 4, level: 3, value1: 20 }),

  // 逆恨み
  new Skill({ id: 501, typeId: 5, level: 1, value1: 5 }),
  new Skill({ id: 502, typeId: 5, level: 2, value1: 10 }),
  new Skill({ id: 503, typeId: 5, level: 3, value1: 15 }),

  // 火事場力
  new Skill({ id: 601, typeId: 6, level: 1, value1: 1.05 }),
  new Skill({ id: 602, typeId: 6, level: 2, value1: 1.1 }),
  new Skill({ id: 603, typeId: 6, level: 3, value1: 1.15 }),
  new Skill({ id: 604, typeId: 6, level: 4, value1: 1.2 }),
  new Skill({ id: 605, typeId: 6, level: 5, value1: 1.3 }),
  new Skill({ id: 606, typeId: 6, level: 6, value1: 1.35, anyName: "(猫)" }),

  // 挑戦者
  new Skill({ id: 701, typeId: 7, level: 1, value1: 4, value2: 3 }),
  new Skill({ id: 702, typeId: 7, level: 2, value1: 8, value2: 6 }),
  new Skill({ id: 703, typeId: 7, level: 3, value1: 12, value2: 9 }),
  new Skill({ id: 704, typeId: 7, level: 4, value1: 16, value2: 12 }),
  new Skill({ id: 705, typeId: 7, level: 5, value1: 20, value2: 15 }),

  // 超会心
  new Skill({ id: 801, typeId: 8, level: 1, value1: 1.3 }),
  new Skill({ id: 802, typeId: 8, level: 2, value1: 1.35 }),
  new Skill({ id: 803, typeId: 8, level: 3, value1: 1.4 }),

  // 弱点特効
  new Skill({ id: 901, typeId: 9, level: 1, value1: 15 }),
  new Skill({ id: 902, typeId: 9, level: 2, value1: 30 }),
  new Skill({ id: 903, typeId: 9, level: 3, value1: 50 }),

  // 見切り
  new Skill({ id: 1001, typeId: 10, level: 1, value1: 3 }),
  new Skill({ id: 1002, typeId: 10, level: 2, value1: 6 }),
  new Skill({ id: 1003, typeId: 10, level: 3, value1: 10 }),
  new Skill({ id: 1004, typeId: 10, level: 4, value1: 15 }),
  new Skill({ id: 1005, typeId: 10, level: 5, value1: 20 }),
  new Skill({ id: 1006, typeId: 10, level: 6, value1: 25 }),
  new Skill({ id: 1007, typeId: 10, level: 7, value1: 30 }),

  // 渾身
  new Skill({ id: 1101, typeId: 11, level: 1, value1: 10 }),
  new Skill({ id: 1102, typeId: 11, level: 2, value1: 20 }),
  new Skill({ id: 1103, typeId: 11, level: 3, value1: 30 }),

  // 力の解放
  new Skill({ id: 1201, typeId: 12, level: 1, value1: 10 }),
  new Skill({ id: 1202, typeId: 12, level: 2, value1: 20 }),
  new Skill({ id: 1203, typeId: 12, level: 3, value1: 30 }),
  new Skill({ id: 1204, typeId: 12, level: 4, value1: 40 }),
  new Skill({ id: 1205, typeId: 12, level: 5, value1: 50 }),

  // 抜刀術【技】
  new Skill({ id: 1301, typeId: 13, level: 1, value1: 30 }),
  new Skill({ id: 1302, typeId: 13, level: 2, value1: 60 }),
  new Skill({ id: 1303, typeId: 13, level: 3, value1: 100 }),

  // 属性解放/装填拡張
  new Skill({ id: 15001, typeId: 15, level: 1, value1: 1, value2: 3 }),
  new Skill({ id: 15002, typeId: 15, level: 2, value1: 2, value2: 3 }),
  new Skill({ id: 15003, typeId: 15, level: 3, value1: 1, value2: 1 }),

  // 火属性攻撃強化
  new Skill({ id: 16001, typeId: 16, level: 1, value1: 30 }),
  new Skill({ id: 16002, typeId: 16, level: 2, value1: 60 }),
  new Skill({ id: 16003, typeId: 16, level: 3, value1: 100 }),
  new Skill({ id: 16004, typeId: 16, level: 4, value1: 100, value2: 1.05 }),
  new Skill({ id: 16005, typeId: 16, level: 5, value1: 100, value2: 1.1 }),

  // 水属性攻撃強化
  new Skill({ id: 17001, typeId: 17, level: 1, value1: 30 }),
  new Skill({ id: 17002, typeId: 17, level: 2, value1: 60 }),
  new Skill({ id: 17003, typeId: 17, level: 3, value1: 100 }),
  new Skill({ id: 17004, typeId: 17, level: 4, value1: 100, value2: 1.05 }),
  new Skill({ id: 17005, typeId: 17, level: 5, value1: 100, value2: 1.1 }),

  // 雷属性攻撃強化
  new Skill({ id: 18001, typeId: 18, level: 1, value1: 30 }),
  new Skill({ id: 18002, typeId: 18, level: 2, value1: 60 }),
  new Skill({ id: 18003, typeId: 18, level: 3, value1: 100 }),
  new Skill({ id: 18004, typeId: 18, level: 4, value1: 100, value2: 1.05 }),
  new Skill({ id: 18005, typeId: 18, level: 5, value1: 100, value2: 1.1 }),

  // 氷属性攻撃強化
  new Skill({ id: 19001, typeId: 19, level: 1, value1: 30 }),
  new Skill({ id: 19002, typeId: 19, level: 2, value1: 60 }),
  new Skill({ id: 19003, typeId: 19, level: 3, value1: 100 }),
  new Skill({ id: 19004, typeId: 19, level: 4, value1: 100, value2: 1.05 }),
  new Skill({ id: 19005, typeId: 19, level: 5, value1: 100, value2: 1.1 }),

  // 龍属性攻撃強化
  new Skill({ id: 20001, typeId: 20, level: 1, value1: 30 }),
  new Skill({ id: 20002, typeId: 20, level: 2, value1: 60 }),
  new Skill({ id: 20003, typeId: 20, level: 3, value1: 100 }),
  new Skill({ id: 20004, typeId: 20, level: 4, value1: 100, value2: 1.05 }),
  new Skill({ id: 20005, typeId: 20, level: 5, value1: 100, value2: 1.1 })
];

export const find = id => skills.find(i => i.id === Number(id));
