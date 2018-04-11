<template>
  <div class="form-row align-items-center">
    <div v-for="type in types" :key="type.id" class="col-md-3 col-6 mt-1 mb-1">
      <select v-model="mutableItems[type.id]" class="form-control form-control-sm" :class="{'is-invalid': !!mutableItems[type.id]}">
        <option :value="undefined">{{ type.name }}</option>
        <option v-for="item in type.items" :key="item.id" :value="item">{{ item.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import * as itemData from "~/data/items";

export default {
  props: {
    items: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      mutableItems: this.items
    };
  },

  watch: {
    items(val) {
      this.mutableItems = val;
    },

    mutableItems(val) {
      this.$emit("update:items", val);
    }
  },

  computed: {
    types: () => itemData.types
  }
};
</script>
