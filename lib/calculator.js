export default class Calculator {
  constructor(set, justHit) {
    this.id = set.id;

    console.log(set);

    // 武器
    this.weapon = set.weapon;

    this.d = {
      // 武器倍率(基礎値)
      weaponAttack: Math.round(this.weapon.attack / 4.8),

      // 武器倍率
      attack: 0,

      // 会心率
      affinity: this.weapon.affinity,

      // 抜刀会心率
      drawAttackAffinity: 0,

      // クリティカル倍率
      critical: 0.25,

      // 匠
      extendedSharpness: 0,

      // 属性解放
      freeElem: null,

      // 属性強化
      extendedElement: {},

      // 火事場力
      heroics: 1,

      // 無属性強化
      nonElementalBoost: 1,

      // 中腹補正
      justHit: justHit ? 1.03 : 1
    };

    // デバッグ情報
    this.debug = { weaponAttack: [], attack: [], affinity: [] };

    // アイテム効果反映
    this._applyItems(set.items);

    // カスタム強化反映
    this._applyAugmentEquipments(set.augmentEquipments);

    // スキル効果反映
    for (const skill of set.skills) {
      this._applySkill(skill);
    }
  }

  attack() {
    let weaponAttack = this.d.weaponAttack;
    if (this._weaponIsNonElemental()) {
      weaponAttack *= this.d.nonElementalBoost;
    }
    return Math.round(weaponAttack * this.d.heroics) + this.d.attack;
  }

  elementalAttack() {
    if (this._weaponIsNonElemental()) {
      return 0;
    }

    let elementalAttack = this.weapon.elementalAttack;
    let elementalLimit = this.weapon.elementalLimit;

    // 属性解放
    const freeElem = this.d.freeElem;
    if (this.weapon.hiddenElement && freeElem !== null) {
      elementalAttack = elementalAttack * freeElem.value1 / freeElem.value2;
      elementalLimit = elementalLimit * freeElem.value1 / freeElem.value2;
    }

    // 属性強化
    const extendedSkill = this.d.extendedElement[this.weapon.elementId];
    if (extendedSkill) {
      if (extendedSkill.value2 !== 0) {
        elementalAttack *= extendedSkill.value2;
      }
      elementalAttack += extendedSkill.value1;
    }

    return Math.min(elementalAttack, elementalLimit) * 0.1;
  }

  affinity(drawAttack = false) {
    return Math.min(
      drawAttack
        ? this.d.affinity + this.d.drawAttackAffinity
        : this.d.affinity,
      100
    );
  }

  critical(affinity = 100) {
    return 1.0 + this.d.critical * affinity / 100.0;
  }

  sharpness() {
    return this.weapon.sharpness(this.d.extendedSharpness);
  }

  expectedValue({ motion }) {
    return Math.round(this._calculateAttack({ motion }));
  }

  realDamage({ motion, affinity, hitData }) {
    const justHit = this.d.justHit;
    const damage = Math.round(
      this._calculateAttack({ motion, affinity }) *
        justHit *
        hitData.slash *
        0.01
    );

    const elementalHitData = hitData[this.weapon.elementId] || 0;
    const elementalDamage = Math.round(
      this._calculateElementalAttack({ motion }) * elementalHitData * 0.01
    );

    return damage + elementalDamage;
  }

  _calculateAttack({ motion, affinity = null }) {
    const attack = this.attack();

    const _affinity =
      affinity === null ? this.affinity(motion.drawAttack) : affinity;
    const critical = this.critical(_affinity);

    const sharpness = this.sharpness().multiplier;

    return attack * motion.value * critical * sharpness * 0.01;
  }

  _calculateElementalAttack({ motion }) {
    const elementalAttack = this.elementalAttack();
    const sharpness = this.sharpness().elementalMultiplier;

    return elementalAttack * sharpness * motion.elementalMultiplier;
  }

  _weaponIsNonElemental() {
    // 無属性 or 属性未開放
    return (
      this.weapon.elementId === 0 ||
      (this.weapon.hiddenElement && this.d.freeElem === null)
    );
  }

  _addWeaponAttack(val, object) {
    this.d.weaponAttack += val;
    this.debug.weaponAttack.push(object);
  }

  _addAttack(val, object) {
    this.d.attack += val;
    this.debug.attack.push(object);
  }

  _addAffinity(val, object) {
    this.d.affinity += val;
    this.debug.affinity.push(object);
  }

  _applyItems(items) {
    for (const item of items) {
      if (item.attack != 0) {
        this._addAttack(item.attack, item);
      }
      if (item.affinity != 0) {
        this._addAffinity(item.affinity, item);
      }
    }
  }

  _applyAugmentEquipments(augmentEquipments) {
    const attack = augmentEquipments.filter(a => a.id === 1);
    const affinity = augmentEquipments.filter(a => a.id === 2);

    if (attack.length !== 0) {
      this._addWeaponAttack(attack.length * 5, attack[0]);
    }

    switch (affinity.length) {
      case 0:
        break;
      case 1:
        this._addAffinity(10, affinity[0]);
        break;
      case 2:
        this._addAffinity(15, affinity[0]);
        break;
      case 3:
        this._addAffinity(20, affinity[0]);
        break;
    }
  }

  _applySkill(skill) {
    switch (skill.typeId) {
      // 無属性強化
      case 1:
        this.d.nonElementalBoost = skill.value1;
        break;
      // 匠
      case 2:
        this.d.extendedSharpness = skill.value1;
        break;
      // 攻撃
      case 3:
        this._addAttack(skill.value1, skill);

        if (skill.value2 !== 0) {
          this._addAffinity(skill.value2, skill);
        }
        break;
      // フルチャージ
      case 4:
        this._addAttack(skill.value1, skill);
        break;
      // 逆恨み
      case 5:
        this._addAttack(skill.value1, skill);
        break;
      // 火事場力
      case 6:
        this.d.heroics = skill.value1;
        break;
      // 挑戦者
      case 7:
        this._addAttack(skill.value1, skill);

        this._addAffinity(skill.value2, skill);
        break;
      // 超会心
      case 8:
        this.d.critical = skill.value1 - 1;
        break;
      // 弱点特攻
      case 9:
        this._addAffinity(skill.value1, skill);
        break;
      // 見切り
      case 10:
        this._addAffinity(skill.value1, skill);
        break;
      // 渾身
      case 11:
        this._addAffinity(skill.value1, skill);
        break;
      // 力の解放
      case 12:
        this._addAffinity(skill.value1, skill);
        break;
      // 抜刀術
      case 13:
        this.d.drawAttackAffinity += skill.value1;
        break;
      // 属性解放/装填拡張
      case 15:
        this.d.freeElem = skill;
        break;
      // 火属性攻撃強化
      case 16:
        this.d.extendedElement[1] = skill;
        break;
      // 水属性攻撃強化
      case 17:
        this.d.extendedElement[2] = skill;
        break;
      // 雷属性攻撃強化
      case 18:
        this.d.extendedElement[3] = skill;
        break;
      // 氷属性攻撃強化
      case 19:
        this.d.extendedElement[4] = skill;
        break;
      // 龍属性攻撃強化
      case 20:
        this.d.extendedElement[5] = skill;
        break;
    }
  }
}
