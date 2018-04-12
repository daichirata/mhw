<template>
  <div>
    <div class="container my-3">
      <div class="row">
        <div class="col">
          <div class="d-flex align-items-center p-3 mb-3 bg-purple rounded text-white">
            <div class="logo rounded border border-white mr-3">肩</div>
            <h6 class="mb-0 text-white lh-100">MHW 大剣シミュレーター</h6>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-12">
          <Form :weapon-set.sync="weaponSetList.setList[0]" @copy="onCopy" @reset="onReset" />
        </div>
        <div class="col-lg-6 col-12">
          <Form :weapon-set.sync="weaponSetList.setList[1]" @copy="onCopy" @reset="onReset" />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Result :weapon-sets="weaponSetList.convert()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeaponSetList from "~/lib/weapon-set";

import Form from "~/components/Form";
import Result from "~/components/Result";

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
      weaponSetList: new WeaponSetList(this.$route.query)
    };
  },

  watch: {
    weaponSetList: {
      handler: "onUpdate",
      deep: true
    }
  },

  methods: {
    onUpdate(val, val2) {
      this.$router.push({ path: "/", query: this.weaponSetList.toQuery() });
    },

    onCopy(toId) {
      const fromId = toId === 1 ? 2 : 1;
      this.weaponSetList.copy(fromId, toId);
    },

    onReset(id) {
      this.weaponSetList.initialize(id);
    }
  }
};
</script>
