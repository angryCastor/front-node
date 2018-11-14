<template>
    <ul class="folder__list">
        <li v-for="section in sections" :key="section.id">
            <tree-folder :section="section" :onSelectNode="onSelectNode"></tree-folder>
        </li>
    </ul>
</template>

<script>
import TreeFolder from './TreeFolder.vue';

export default {
    name: "TreeContents",
    props: {
        sections: null,
        onSelectNode: null
    },
    components: {
        TreeFolder
    },
    data: function() {
        return {
            
        };
    },
    methods: {
        
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
    .folder__list{
        list-style-type: none;
        padding-left: 20px;
    }
</style>
