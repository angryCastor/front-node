<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <h5>Добавть элемент</h5>
                </div>
                <div class="form-group col-lg-6">
                    <label for="Name">Название</label>
                    <input class="form-control" v-model="name" placeholder="Введите название">
                </div>
                <div class="form-group col-lg-6">
                    <label for="Date">Дата</label>
                    <input type="date" class="form-control" v-model="date">
                </div>
                <div class="col-lg-12 d-flex justify-content-end" v-if="isValidName">
                    <button class="btn btn-primary" v-on:click="onAddElement">Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Ajax from "App/utils/ajaxApp";


export default {
  name: "ItemAdd",
  props: {
    section: null
  },
  components: {},
  data: function() {
    return {
      name: "",
      date: ""
    };
  },
  methods: {
    onAddElement: function() {
        Ajax("add_element", {
            name: this.name,
            date: this.unix,
            pid: this.section.id
        }, json => {
            this.section.items.push({
                name: this.name,
                date: this.unix,
                parent: this.section.id,
                id: json.body.id
            });
        })
    }
  },
  mounted() {},
  created() {},
  computed: {
    unix: function(){
        let unix;
        if(this.date == ""){
            unix = new Date().getTime();
        }
        else{
            unix = new Date(this.date).getTime();
        }
        return unix;
    },
    isValidName: function(){
      return this.name.trim() !== "";
    }
  },
  watch: {
    section: function() {
      (this.name = ""), (this.date = "");
    }
  }
};
</script>
