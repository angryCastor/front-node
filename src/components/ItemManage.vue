<template>
    <div>
        <template v-if="this.section">
            <item-add :section="this.section"></item-add>
            <item-sort :section="this.section"></item-sort>
            <item-list :section="this.section" :allSection="allSection"></item-list>
        </template>
        
    </div>
</template>


<script>
import ItemList from "./ItemList.vue";
import ItemAdd from "./ItemAdd.vue";
import ItemSort from "./ItemSort.vue";
import Ajax from "App/utils/ajaxApp";
import _ from "lodash";

export default {
  name: "ItemManage",
  components: {
    ItemList,
    ItemAdd,
    ItemSort
  },
  props: {
    section: null,
    allSection: Array
  },
  data: function() {
    return {
        sort: {},
    };
  },
  methods: {},
  mounted() {},
  created() {},
  computed: {

  }
};
</script>
