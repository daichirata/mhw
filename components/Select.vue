<template>
  <select :class="{'is-invalid': changed}" :value="value" @change="onChange">
    <slot />
  </select>
</template>

<script>
export default {
  props: {
    value: {
      default: 0
    }
  },

  data() {
    return {
      changed: false
    };
  },

  mounted() {
    this.check();
  },

  methods: {
    check() {
      this.changed = this.$el.value !== "0";
    },

    onChange(e) {
      this.check();
      this.$emit("input", e.target.value);
      this.$emit("change");
    }
  }
};
</script>
