<template>
  <div>
    <template v-for="group in groups">
      <div class="form-row" :key="group.id">
        <div v-for="type in group.types" :key="type.id" class="col-md-3 col-6 mt-1 mb-1">
          <select v-model="mutableSkills[type.id]" class="form-control custom-form-control-sm" :class="{'is-invalid': !!mutableSkills[type.id]}">
            <option :value="undefined">{{ type.name }}</option>
            <option v-for="skill in type.skills" :key="skill.id" :value="skill">{{ skill.fullName }}</option>
          </select>
        </div>
      </div>
      <hr v-if="group.id !== groups.length" :key="`hr_${group.id}`" />
    </template>
  </div>
</template>

<script>
import * as skillData from "~/data/skills";

export default {
  props: {
    skills: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      mutableSkills: Object.assign({}, this.skills)
    };
  },

  watch: {
    skills(val) {
      this.mutableSkills = val;
    },

    mutableSkills: {
      handler: function(val) {
        this.$emit("update:skills", val);
      },
      deep: true
    }
  },

  computed: {
    groups: () => skillData.groups
  }
};
</script>
