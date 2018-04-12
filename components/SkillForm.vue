<template>
  <div>
    <template v-for="group in groups">
      <div class="form-row" :key="group.id">
        <div v-for="type in group.types" :key="type.id" class="col-md-4 col-6 mt-1 mb-1">
          <select v-model="mutableSkills[type.id]" class="form-control" :class="{'is-invalid': !!mutableSkills[type.id]}">
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

    mutableSkills(val) {
      this.$emit("update:skills", val);
    }
  },

  computed: {
    groups: () => skillData.groups
  }
};
</script>
