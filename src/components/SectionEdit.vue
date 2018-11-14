<template>
    <div class="section-edit">
        
        <div class="section-edit__title">
          <h5>Редактировать узел</h5>

          <div class="form-group">
            <label for="Name">Сменить название</label>
            <input class="form-control" v-on:change="onChangeName" v-model="section.name">
          </div>
          
        </div>
        <template v-if="section.parent !== 0">
          <div class="form-group" v-if="validSectionAllList.length > 0">
              <label for="Section">Переместить узел</label>
              <select class="form-control" v-model="selected" name="Section">
                  <option v-for="section in validSectionAllList" :key="section.id" :value="section.id">
                      {{ section.name }}
                  </option>
              </select>
              <button class="btn btn-primary mt-3" v-if="selected" v-on:click="$emit('move-section', selected)">Перенести</button>
          </div>
          <div class="section-edit__remove">
            <button class="btn btn-danger" v-on:click="$emit('remove-section', section.id)">Удалить</button>
          </div>
        </template>
    </div>
</template>


<script>
import _ from "lodash";
import Ajax from "App/utils/ajaxApp";

export default {
  name: "SectionEdit",
  props: {
    section: Object,
    sectionAllList: null,
    leftLock: null,
    leftUnlock: null
  },
  data: function() {
    return {
      selected: null
    };
  },
  methods: {
    onChangeName: function() {
      this.leftLock();
      Ajax("rename_node", {id: this.section.id, name: this.section.name}, () => this.leftUnlock());
    }
  },
  watch: {},
  created: function() {},
  computed: {
    validSectionAllList: function() {
      this.selected = null;
      let ignore = [this.section.parent];

      let addIgnore = section => {
        ignore.push(section.id);
        if (section.sections.length > 0) {
          section.sections.forEach(e => addIgnore(e));
        }
      };
      addIgnore(this.section);
      return _.filter(this.sectionAllList, s => {
        return _.find(ignore, i => i === s.id) === undefined;
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.section-edit {
  position: relative;
}
</style>

