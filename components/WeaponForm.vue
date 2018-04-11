<template>
  <div class="form-row">
    <div class="col-md-3 col-12 mt-1 mb-1">
      <select v-model="mutableWeapon" class="form-control form-control-sm" :class="{'is-invalid': !!mutableWeapon.id}">
        <option :value="{}">武器</option>
        <option v-for="weapon in weaponData.data" :key="weapon.id" :value="weapon">
          {{ weapon.name }}
        </option>
      </select>
    </div>

    <div v-for="c in (weapon.aeCount || 0)" :key="c" class="col-md-3 col-4 mt-1 mb-1">
      <select v-model="mutableAugmentEquipments[c]" class="form-control form-control-sm" :class="{'is-invalid': !!mutableAugmentEquipments[c]}">
        <option :value="undefined">カスタム強化{{ c }}</option>
        <option v-for="a in weaponData.augmentEquipments" :key="a.id" :value="a">
          {{ a.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import * as weaponData from "~/data/weapons";

export default {
  props: {
    weapon: {
      type: Object,
      required: true
    },
    augmentEquipments: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      mutableWeapon: this.weapon,
      mutableAugmentEquipments: this.augmentEquipments
    };
  },

  watch: {
    weapon(val) {
      this.mutableWeapon = val;
    },

    augmentEquipments(val) {
      this.mutableAugmentEquipments = val;
    },

    mutableWeapon(val) {
      this.$emit("update:weapon", this.mutableWeapon);
      this.mutableAugmentEquipments = {};
    },

    mutableAugmentEquipments(val) {
      this.$emit("update:augmentEquipments", this.mutableAugmentEquipments);
    }
  },

  computed: {
    weaponData: () => weaponData
  }
};
</script>
