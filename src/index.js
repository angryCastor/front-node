import Vue from 'vue'
import Main from './components/Main.vue'
import Ajax from './utils/ajaxApp';
import styles from './css/styles.scss';




Ajax("get_tree", null, (json) => {
  let section = json.body;
  const App = new Vue({
    el: '#app',
    name: 'App',
    render: h => h(Main, { props: section }),
    methods: {
    },
    created() {

    }
  });
})


