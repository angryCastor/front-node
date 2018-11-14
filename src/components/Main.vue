<template>
  <div class="container-fluid">
    <div class="main-container">
      <div class="left">
        
        <div class="content">
          <div v-if="lockLeft" class="load">Загрузка...</div>
          <section-add v-on:add-section="onAddSection" :sectionAllList="sectionAllList"></section-add>
          <div class="tree-content mt-3">
            <h5>Структура</h5>
            <tree-folder :onSelectNode="onSelectNode" :section="sectionReact"></tree-folder>
          </div>
          <section-edit 
          v-on:move-section="onMoveSection"
          v-on:remove-section="onRemoveSection" 
          :leftLock="leftLock"
          :leftUnlock="leftUnlock"
          v-if="selectedSection" 
          :section="selectedSection" 
          :sectionAllList="sectionAllList"></section-edit>
        </div>
        
      </div>
      <div class="right">
        <div class="content">
          <item-manage :section="selectedSection" :allSection="sectionAllList"></item-manage>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import TreeFolder from "./TreeFolder.vue";
import SectionEdit from "./SectionEdit.vue";
import SectionAdd from "./SectionAdd.vue";
import ItemManage from "./ItemManage.vue";
import Ajax from "App/utils/ajaxApp";

export default {
  name: "Main",
  components: {
    TreeFolder,
    SectionEdit,
    SectionAdd,
    ItemManage
  },
  props: ["section"],
  data: function() {
    return {
      selectedSection: null,
      sectionReact: this.section,
      debugId: 300,
      lockLeft: false
    };
  },
  methods: {
    onSelectNode: function(selectedSection) {
      this.selectedSection = selectedSection;
      Ajax("get_elements", {id: selectedSection.id}, json => this.selectedSection.items = json.body.items);
    },
    onRemoveSection: function(id, viewOnly) {
      let removeSection = section => {
        if (section.sections) {
          section.sections.forEach((e, i) => {
            if (e.id === id) {
              if (viewOnly !== true) {
                this.leftLock();
                Ajax("remove_node", {id: id}, () => this.leftUnlock());
              }
              section.sections.splice(i, 1);
            }
          });
          section.sections.forEach(e => removeSection(e));
        }
      };
      removeSection(this.sectionReact);
      this.selectedSection = null;
    },
    onMoveSection: function(id) {
      let target = this.selectedSection;
      this.onRemoveSection(target.id, true);
      let addSection = section => {
        if (section.id == id) {
          this.leftLock();
          target.parent = id;
          section.sections.push(target);
          Ajax("move_node", {id: target.id, pid: id}, () => this.leftUnlock());
          return;
        }
        if (section.sections) {
          section.sections.forEach(e => addSection(e));
        }
      };

      addSection(this.sectionReact);
    },
    onAddSection: function(id, name) {
      let AddSection = section => {
        if (section.id === id) {
          this.leftLock();

          Ajax("add_none", {name: name, pid: id}, (json) => {
            this.leftUnlock();
            section.sections.push({
              name: name,
              parent: id,
              sections: [],
              items: [],
              id: json.body.id
            });
          });

          return;
        }
        section.sections.forEach(e => AddSection(e));
      };

      AddSection(this.sectionReact);
    },
    leftLock: function() {
      this.lockLeft = true;
    },
    leftUnlock: function() {
      this.lockLeft = false;
    }
  },
  mounted() {},
  created() {},
  computed: {
    sectionAllList: function() {
      let sectionList = [];
      if (this.sectionReact !== null) {
        let setSection = section => {
          sectionList.push({
            name: section.name,
            id: section.id
          });
          section.sections.forEach(e => setSection(e));
        };
        setSection(this.sectionReact);
      }
      return sectionList;
    },
  }
};
</script>

<style scoped lang="scss">
@import "./../css/styles.scss";
.main-container {
  @include make-row();

  %main_part {
    padding: 20px;

    .content {
      position: relative;
      border: 1px solid #{$gray-300};
      padding: 10px;
    }
  }

  .left {
    @include make-col(8, $col_count);
    @extend %main_part;
  }

  .right {
    @include make-col(16, $col_count);
    @extend %main_part;
  }
}
</style>