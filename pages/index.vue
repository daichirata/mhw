<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex align-items-center p-3 my-3 bg-purple rounded text-white">
            <div class="logo rounded border border-white mr-3">肩</div>
            <h6 class="mb-0 text-white lh-100">MHW 大剣シミュレーター</h6>
          </div>
        </div>
      </div>

      <div class="row">
        <div v-for="weaponSet in weaponSets" :key="weaponSet.id" class="col-md-6 col-12">
          <Form :weapon-set.sync="weaponSet" @copy="onCopy" @reset="onReset" />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Result :weapon-sets="availableSets" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import * as itemData from "~/data/items";

import Form from "~/components/Form";
import Result from "~/components/Result";

const c = obj => Object.values(obj).filter(o => !!o);

export default {
  head: {
    bodyAttrs: {
      class: "bg-light"
    }
  },

  components: {
    Form,
    Result
  },

  data() {
    return {
      weaponSets: [this.initialData(1), this.initialData(2)]
    };
  },

  computed: {
    availableSets() {
      return (
        this.weaponSets.filter(s => s.weapon.id).map(s => {
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
  },

  methods: {
    initialData(id) {
      return {
        id,
        weapon: {},
        augmentEquipments: {},
        skills: {},
        items: { 1: itemData.find(103) }
      };
    },

    update(id, weaponSet) {
      this.weaponSets.splice(
        this.weaponSets.findIndex(s => s.id === id),
        1,
        weaponSet
      );
    },

    onCopy(id) {
      const fromId = id === 1 ? 2 : 1;
      const from = lodash.cloneDeep(this.weaponSets.find(s => s.id === fromId));
      this.update(id, { ...from, id: id });
    },

    onReset(id) {
      this.update(id, this.initialData(id));
    }
  }
};
</script>
