<template>
    <div class="container-fluid" v-if="section.items.length > 0">
      <div class="row">
        <div class="col-lg-12 mt-4">
          <h5>Список элементов</h5>
        </div>
        <div class="col-lg-12 item-list">
          <ul class="row">
            <li class="col-lg-6" v-for="item in section.items" :key="item.id">
              <item v-on:remove-element="onRemove" :item="item" :allSection="allSection" :removeDomItem="removeDomItem"></item>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>



<script>
import Item from "./Item.vue";
import Ajax from "App/utils/ajaxApp";

export default {
  name: "ItemList",
  props: {
    section: null,
    allSection: null
  },
  components: {
    Item
  },
  data: function() {
    return {};
  },
  methods: {
    onRemove: function(id) {
      let index = null;
      this.section.items.forEach((e, i) => {
        if (id === e.id) index = i;
      });
      if (index !== null) {
        Ajax("remove_element", { id: id }, () =>
          this.section.items.splice(index, 1)
        );
      }
    },
    removeDomItem: function(id) {
      let index = null;
      this.section.items.forEach((e, i) => {
        if (id === e.id) index = i;
      });
      if (index !== null) {
        this.section.items.splice(index, 1);
      }
    }
  },
  mounted() {},
  created() {},
  computed: {}
};
</script>


<style lang="scss" scoped>
.item-list {
  ul {
    list-style-type: none;
    padding-left: 0;
  }
}
</style>
