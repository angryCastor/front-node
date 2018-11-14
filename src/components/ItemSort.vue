<template>
    <div class="container-fluid" v-if="section.items.length > 0">
      <div class="row">
        <div class="col-12 sort-container">
          <div class="sort-title">
            Сортировка по:
          </div>
          <div class="sort-item" v-on:click="onClickName">
            <div class="sort-item__title">Названию</div>
            <div class="sort-item__arrow" v-bind:class="name"> 
              <svg :viewBox="iconFolder.viewBox" v-html="iconFolder.node.innerHTML"></svg>
            </div>
          </div>
          <div class="sort-item" v-on:click="onClickDate">
            <div class="sort-item__title">Дате</div>
            <div class="sort-item__arrow" v-bind:class="date"> 
              <svg :viewBox="iconFolder.viewBox" v-html="iconFolder.node.innerHTML"></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
import _ from "lodash";
import iconFolder from "App/images/sort-down.svg";

export default {
  name: "ItemSort",
  components: {},
  props: {
    section: null
  },
  data: function() {
    return {
      isName: true,
      isDate: false,
      isAsc: false
    };
  },
  methods: {
    onClickName: function() {
      this.isName = true;
      this.isDate = false;
      this.isAsc = !this.isAsc;
      this.onSort();
    },
    onClickDate: function() {
      this.isName = false;
      this.isDate = true;
      this.isAsc = !this.isAsc;
      this.onSort();
    },
    onSort: function() {
      let order = this.isAsc ? "asc" : "desc";
      if (this.isName) {
        this.section.items = _.orderBy(this.section.items, ["name"], [order]);
      }
      if (this.isDate) {
        this.section.items = _.orderBy(this.section.items, ["date"], [order]);
      }
    }
  },
  watch:{
    section: function(){
      this.isName = false;
      this.isDate = false;
    }
  },
  mounted() {},
  created() {
    this.iconFolder = iconFolder;
  },
  computed: {
    name: function() {
      return {
        up: this.isName && this.isAsc,
        down: this.isName && !this.isAsc
      };
    },
    date: function() {
      return {
        up: this.isDate && this.isAsc,
        down: this.isDate && !this.isAsc
      };
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./../css/styles.scss";

.sort-container {
  display: flex;

  .sort-title{
    margin-right: 20px;
    font-weight: bold;
  }

  .sort-item {
    margin-right: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .sort-item__arrow {
    display: none;
    margin-left: 7px;

    svg {
      width: 12px;
      fill: $blue;
    }

    &.down {
      display: block;
    }

    &.up {
      display: block;
      transform: rotateZ(180deg);
    }
  }
}
</style>
