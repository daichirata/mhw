import lodash from "lodash";

import * as weaponData from "~/data/weapons";
import * as skillData from "~/data/skills";
import * as itemData from "~/data/items";

const c = obj => Object.values(obj).filter(o => !!o);

export default class WeaponSetList {
  constructor(query = {}) {
    this.setList = [];

    if (Object.keys(query).length === 0) {
      this.initialize(1);
      this.initialize(2);
    } else {
      this._fromQuery(query);
    }
  }

  initialize(id, blank = false) {
    return this.createOrUpdate(id, this._initialData(id, blank));
  }

  find(id) {
    return this.setList.find(s => s.id === Number(id));
  }

  findOrInitialize(id, blank = false) {
    return this.find(id) || this.initialize(id, blank);
  }

  createOrUpdate(id, set) {
    const index = this.setList.findIndex(s => s.id === Number(id));

    if (index === -1) {
      this.setList.splice(id - 1, 1, set);
    } else {
      this.setList.splice(index, 1, set);
    }

    return set;
  }

  copy(fromId, toId) {
    const from = lodash.cloneDeep(this.find(fromId));

    this.createOrUpdate(toId, { ...from, id: toId });
  }

  convert() {
    return (
      this._available().map(s => {
        return {
          id: s.id,
          weapon: s.weapon,
          augmentEquipments: c(s.augmentEquipments),
          skills: c(s.skills),
          items: c(s.items)
        };
      }) || []
    );
  }

  toQuery() {
    const query = {};

    for (const set of this._available()) {
      query[`${set.id}i`] = set.id;
      query[`${set.id}w`] = set.weapon.id;
      query[`${set.id}a`] = c(set.augmentEquipments)
        .map((a, i) => `${a.id}.${i + 1}`)
        .join(",");
      query[`${set.id}s`] = c(set.skills)
        .map(s => s.id)
        .join(",");
      query[`${set.id}i`] = c(set.items)
        .map(i => i.id)
        .join(",");
    }

    return query;
  }

  _initialData(id, blank = false) {
    const items = blank ? {} : { 1: itemData.find(13) };

    return { id, weapon: {}, augmentEquipments: {}, skills: {}, items };
  }

  _available() {
    return this.setList.filter(s => s.weapon.id);
  }

  _fromQuery(query) {
    this.setList = [];

    for (const [key, val] of Object.entries(query)) {
      if (val !== "") this._parse(key, val);
    }

    this.findOrInitialize(1);
    this.findOrInitialize(2);
  }

  _parse(key, val) {
    const id = Number(key[0]);
    const prefix = key[1];

    const set = this.findOrInitialize(id, true);

    switch (prefix) {
      case "w":
        set.weapon = weaponData.find(val);
        break;
      case "a":
        for (const v of val.split(",")) {
          const [id, count] = v.split(".");

          set.augmentEquipments[count] = weaponData.augmentEquipmentsFind(id);
        }
        break;
      case "s":
        for (const v of val.split(",")) {
          const skill = skillData.find(v);

          set.skills[skill.typeId] = skill;
        }
        break;
      case "i":
        for (const v of val.split(",")) {
          const item = itemData.find(v);

          set.items[item.typeId] = item;
        }
        break;
    }
  }
}
