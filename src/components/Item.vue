<template>
    <div class="item">
      <template v-if="isEdit">
        <div class="form-group">
          <label for="Name">Сменить название</label>
          <input class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label for="Name">Сменить дату</label>
          <input type="date" class="form-control" v-model="inputDate">
        </div>
        <div class="form-group">
          <label for="Section">Узел</label>
          <select class="form-control" v-model="parent" name="Section">
              <option v-for="section in allSection" :key="section.id" :value="section.id">
                  {{ section.name }}
              </option>
          </select>
        </div>

        <div class="btn-container">
          <button class="btn btn-danger" v-on:click="$emit('remove-element', item.id)">Удалить</button>
          <button class="btn btn-secondary" v-on:click="onCancel">Отмена</button>
          <button class="btn btn-primary" v-if="isShowButton" v-on:click="onSave">Сохранить</button>
        </div>
      </template>
      <template v-else>
        <div class="item__name">
          <div class="item__name-title">Название:</div>
          <div class="item__name-value">{{ item.name }}</div>
          
        </div>
        <div class="item__date">
          <div class="item__date-title">Дата:</div>
          <div class="item__date-value">{{ commonDate }}</div>
          
        </div>
        <button class="btn btn-primary" v-on:click="onChange">Изменить</button>
      </template>
      
    </div>
</template>


<script>
import _ from "lodash";
import Ajax from "App/utils/ajaxApp";

export default {
  name: "Item",
  props: {
    item: Object,
    allSection: null,
    removeDomItem: null
  },
  components: {},
  data: function() {
    return {
      isEdit: false,
      name: this.item.name,
      date: this.item.date,
      parent: this.item.parent
    };
  },
  methods: {
    onChange: function() {
      this.isEdit = true;
    },
    onCancel: function() {
      this.isEdit = false;
      this.name = this.item.name;
      this.date = this.item.date;
      this.parent = this.item.parent;
    },
    onSave: function() {
      let saveData = {
        id: this.item.id
      };
      let isRemoveDomItem = false;
      if (this.name !== this.item.name) {
        saveData["name"] = this.name;
      }
      if (this.date !== this.item.date) {
        saveData["date"] = this.date;
      }
      if (this.parent !== this.item.parent) {
        saveData["pid"] = this.parent;
        isRemoveDomItem = true;
      }

      Ajax("edit_element", saveData, () => {
        if (isRemoveDomItem) {
          this.removeDomItem(this.item.id);
        } else {
          this.isEdit = false;
          this.item.name = this.name;
          this.item.date = this.date;
        }
      });
    }
  },
  mounted() {},
  created() {},
  computed: {
    inputDate: {
      get: function() {
        let date = new Date(this.date);
        let m = date.getMonth() + 1;
        m = m < 10 ? m + "0" : m;
        let d = date.getDate() < 10 ? date.getDate() + "0" : date.getDate();
        return `${date.getFullYear()}-${m}-${d}`;
      },
      set: function(value) {
        let date = new Date(value);
        this.date = date.getTime();
      }
    },
    commonDate: function() {
      let date = new Date(this.item.date);
      let m = date.getMonth() + 1;
      m = m < 10 ? m + "0" : m;
      let d = date.getDate() < 10 ? date.getDate() + "0" : date.getDate();
      return `${date.getFullYear()}-${m}-${d}`;
    },
    isShowButton: function() {
      return (
        this.name !== this.item.name ||
        this.date !== this.item.date ||
        this.parent !== this.item.parent
      );
    }
  }
};
</script>


<style lang="scss" scoped>
.item {
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.459);
  transition: height .3s ease;

  .btn-container {
    display: flex;
    justify-content: flex-end;
    .btn {
      margin-left: 10px;
    }
  }
  .btn {
    cursor: pointer;
  }

  .item__name, .item__date{
    display: flex;
  }

  .item__name-title, .item__date-title{
    font-weight: bold;
  } 
  .item__name-value, .item__date-value{
    margin-left: 5px;
  }

  .item__date{
    margin-bottom: 10px;
  }
}
</style>
