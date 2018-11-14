<template>
    <div class="folder">
        <div v-on:click="() => onSelectNode(section)" class="folder__name">
            <div class="folder__icon">
                <svg :viewBox="iconFolder.viewBox" v-html="iconFolder.node.innerHTML"></svg>
            </div>
            {{ section.name }}
        </div>
        <tree-contents v-if="section.sections.length > 0" :sections="section.sections" :onSelectNode="onSelectNode"></tree-contents>
    </div>
</template>


<script>
import _ from 'lodash';
import iconFolder from "App/images/folder.svg";

export default {
    name: "TreeFolder",
    props: {
        section: Object,
        onSelectNode: null
    },
    data: function() {
        return {
            iconFolder: null
        };
    },
    methods: {
       
    },
    mounted() {

    },
    created() {
        this.iconFolder = iconFolder;
    },

    beforeCreate: function () {
        this.$options.components.TreeContents = require('./TreeContents.vue').default
    }
};
</script>


<style lang="scss" scoped>
    @import "./../css/styles.scss";
    .folder{

        .folder__name{
            padding: 5px 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            transition: background-color .3s ease;

            svg{
                width: 25px;
                margin-right: 10px;
            }


            &:hover{
                background-color: lighten($primary, 20%);
            }
        }
    }
</style>

