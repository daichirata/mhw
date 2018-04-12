<template>
  <form class="box-shadow bg-white mb-2" @submit.prevent>
    <div class="d-flex align-items-center border-bottom p-3">
      <h6 class="mr-auto mb-0">装備セット{{ weaponSet.id }}</h6>

      <div class="css-tooltip cursor-pointer" @click="$emit('copy', weaponSet.id)">
        <font-awesome-icon :icon="['far','clone']" />
        <span class="css-tooltiptext css-tooltip-position">装備セット{{ {1:2,2:1}[weaponSet.id] }}から複製</span>
      </div>

      <div class="cursor-pointer ml-3" @click="$emit('reset', weaponSet.id)">
        <font-awesome-icon icon="sync" />
      </div>
    </div>

    <div class="p-3">
      <WeaponForm :weapon.sync="mutableWeaponSet.weapon"
                  :augment-equipments.sync="mutableWeaponSet.augmentEquipments" />

      <hr />

      <SkillForm :skills.sync="mutableWeaponSet.skills" />

      <hr />

      <ItemForm :items.sync="mutableWeaponSet.items" />
    </div>
  </form>
</template>

<script>
import WeaponForm from "~/components/WeaponForm";
import SkillForm from "~/components/SkillForm";
import ItemForm from "~/components/ItemForm";

export default {
  components: {
    WeaponForm,
    SkillForm,
    ItemForm
  },

  props: {
    weaponSet: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      mutableWeaponSet: Object.assign({}, this.weaponSet)
    };
  },

  watch: {
    weaponSet(val) {
      this.mutableWeaponSet = this.weaponSet;
    },

    mutableWeaponSet: {
      handler: function(value) {
        this.onChange(value);
      },
      deep: true
    }
  },

  methods: {
    onChange(value) {
      this.$nextTick(() => {
        this.$emit("update:weaponSet", value);
      });
    }
  }
};
</script>
