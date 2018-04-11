<template>
  <div v-if="weaponSets.length !== 0" >
    <div class="box-shadow bg-white p-3 mt-3">
      <dl class="row my-2">
        <template v-for="weaponSet in weaponSets">
          <dt :key="`1_${weaponSet.id}`" class="col-md-2">装備セット{{ weaponSet.id }}</dt>
          <dd :key="`2_${weaponSet.id}`" class="col-md-10">{{ weaponSetString(weaponSet) }}</dd>
        </template>
      </dl>

      <div class="row">
        <div class="col">
          <div class="table-responsive">
            <table class="table table-sm table-striped table-hover">
              <thead>
                <tr>
                  <th class="align-middle" style="width: 140px;">
                    <div class="form-row align-items-center mx-1">
                      <input v-model="filter" type="email" class="form-control form-control-sm" placeholder="モーション (値)">
                    </div>
                  </th>
                  <th v-for="weaponSet in weaponSets" :key="`1_${weaponSet.id}`" style="width: 140px;">装備セット{{ weaponSet.id }}<br />期待値</th>
                  <th v-for="weaponSet in weaponSets" :key="`2_${weaponSet.id}`" style="width: 140px;">装備セット{{ weaponSet.id }}<br />{{ hitDataSelect === 1 ? '柱' : '' }}ダメージ(会心)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="motionSet in searchedMotionData" :key="motionSet.id">
                  <td>{{ motionSet.name }} ({{ motionSetString(motionSet) }})</td>
                  <td v-for="weaponSet in weaponSets" :key="`1_${weaponSet.id}`">{{ expectedValuesString(weaponSet, motionSet) }}</td>
                  <td v-for="weaponSet in weaponSets" :key="`2_${weaponSet.id}`">{{ realDamagesString(weaponSet, motionSet) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="form-check">
            <input v-model="justHit" type="checkbox" class="form-check-input" id="just-hit">
            <label class="form-check-label" for="just-hit">中腹補正(1.03)</label>
          </div>
        </div>
      </div>

      <div class="row mt-3 d-flex align-items-end">
        <div class="col-md-4 col-12">
          <label for="hitData">肉質</label>
          <select v-model="hitDataSelect" class="form-control" id="hitData">
            <option :value="1">柱</option>
            <option :value="2">直接指定</option>
          </select>
        </div>
      </div>

      <div v-if="hitDataSelect === 2" class="form-row mt-1">
        <div class="col-md-2 col-6 mt-1 mb-1">
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">切</div>
            </div>
            <input v-model="customHitData.slash" type="number" class="form-control" id="inlineFormInputGroup">
          </div>
        </div>
        <div v-for="i in 5" :key="i" class="col-md-2 col-6 mt-1 mb-1">
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">{{ elementsFind(i).name }}</div>
            </div>
            <input v-model="customHitData[i]" type="number" class="form-control">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as weaponData from "~/data/weapons";
import * as motionSetData from "~/data/motions";
import * as hitData from "~/data/hitdata";

import Calculator from "~/lib/calculator";

export default {
  props: {
    weaponSets: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      justHit: true,
      filter: "",
      hitDataSelect: 1,
      customHitData: {
        slash: 80,
        1: 30,
        2: 30,
        3: 30,
        4: 30,
        5: 30
      }
    };
  },

  computed: {
    searchedMotionData() {
      if (!this.filter) {
        return motionSetData.data;
      }
      return motionSetData.data.filter(m => m.name.indexOf(this.filter) != -1);
    },

    calculators() {
      return this.weaponSets.map(s => new Calculator(s, this.justHit));
    },

    hitData() {
      if (this.hitDataSelect === 1) {
        return hitData.find(1).hitData;
      }
      return this.customHitData;
    }
  },

  methods: {
    elementsFind: weaponData.elementsFind,

    calculator(weaponSet) {
      return this.calculators.find(c => c.id === weaponSet.id);
    },

    weaponSetString(weaponSet) {
      const calculator = this.calculator(weaponSet);

      let result = [];

      let weapon = weaponSet.weapon.name;
      if (weaponSet.augmentEquipments.length !== 0) {
        weapon += `(${weaponSet.augmentEquipments
          .map(a => a.name[0])
          .join(",")})`;
      }
      result.push(weapon);

      let attackStr = `攻${Math.round(calculator.attack() * 4.8)}`;
      const elemAttack = calculator.elementalAttack();
      if (elemAttack !== 0) {
        attackStr += `(${weaponSet.weapon.element.name}${Math.round(
          elemAttack * 10
        )})`;
      }
      result.push(attackStr);

      result.push(`会${calculator.affinity()}%`);

      result = result.concat(weaponSet.skills.map(s => s.fullName));
      result = result.concat(weaponSet.items.map(i => i.name));

      return result.join(", ");
    },

    expectedValues(weaponSet, motionSet) {
      return motionSet.motions.map(motion =>
        this.calculator(weaponSet).expectedValue({ motion })
      );
    },

    realDamages(weaponSet, motionSet) {
      return motionSet.motions.map((motion, i) =>
        [0, 100].map(affinity =>
          this.calculator(weaponSet).realDamage({
            motion,
            affinity,
            hitData: this.hitData
          })
        )
      );
    },

    motionSetString(motionSet) {
      return motionSet.motions.map(m => m.value).join("/");
    },

    expectedValuesString(weaponSet, motionSet) {
      return this.expectedValues(weaponSet, motionSet).join(" / ");
    },

    realDamagesString(weaponSet, motionSet) {
      return this.realDamages(weaponSet, motionSet)
        .map(e => `${e[0]}(${e[1]})`) // e.join(", "))
        .join(" / ");
    }
  }
};
</script>
