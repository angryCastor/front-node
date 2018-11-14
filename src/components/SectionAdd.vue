<template>
    <div class="section-add mt-1">
        <h5>Добавить узел</h5>

        <div class="form-group">
          <label for="Name">Название</label>
          <input class="form-control" v-model="name" placeholder="Введите название">
        </div>

        
        <div class="form-group">
          <label for="Section">Раздел</label>
          <select class="form-control" v-model="selected" name="Section">
              <option v-for="section in sectionAllList" :key="section.id" :value="section.id">
                  {{ section.name }}
              </option>
          </select>
        </div>

        <button class="btn btn-primary" v-if="isValidName" v-on:click="$emit('add-section', selected, name)">Добавить</button>
    </div>
</template>


<script>
export default {
  name: "SectionAdd",
  props: {
    sectionAllList: Array
  },
  components: {},
  data: function() {
    return {
      name: "",
      selected: ""
    };
  },
  methods: {},
  mounted() {},
  created(){
    this.selected = this.sectionAllList[0].id
  },
  computed:{ 
    isValidName: function(){
      return this.name.trim() !== "";
    }
  }
};
</script>

<style lang="scss" scoped>
  
</style>
