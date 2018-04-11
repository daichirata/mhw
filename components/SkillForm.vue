<template>
  <div>
    <template v-for="i in 4">
      <div class="form-row" :key="i">
        <div v-for="type in skillData.filterGroupId(i)" :key="type.id" class="col-md-4 col-6 mt-1 mb-1">
          <select v-model="mutableSkills[type.id]" class="form-control form-control-sm" :class="{'is-invalid': !!mutableSkills[type.id]}">
            <option :value="undefined">{{ type.name }}</option>
            <option v-for="skill in skillData.filterTypeId(type.id)" :key="skill.id" :value="skill">{{ skill.fullName }}</option>
          </select>
        </div>
      </div>
      <hr v-if="i !== 4" :key="`hr_${i}`" />
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
    skillData: () => skillData
  }
};
</script>
