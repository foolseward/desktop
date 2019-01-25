<template>
  <div class="outer">
    <div class="inner">
      <edit-left @emit-state="emitState"></edit-left>
      <edit-add v-if="state"></edit-add>
    </div> 
  </div>
</template>
<script>
//混入
import { heightMixin } from '@/mixin'

//组件
import editLeft from './components/edit-left'
import editAdd from './components/edit-add'

let prefix;
export default {
  name: 'videosedit',
  mixins:[ heightMixin ],
  components: {
    editLeft, editAdd
  },
  beforeRouteEnter(to, from, next){
    prefix= to.query.prefix;
    if(from.matched.length=== 0) next('/');
    if(!prefix){
      next('/');
    } else {
      next();
    }
  },
  created(){
    this.$store.commit('videos/prefix', prefix);
  },
  data(){
    return {
      state: true,
      current: null,
    }
  },
  methods: {
    changeContainer(){
      this.containerState= !this.containerState;
    },
    emitState(bol){
      this.state= bol;
    }
  }
}
</script>

<style scoped>
.outer {
  position: relative;
}

.inner {
  display: flex;
  height: 100%;
  padding:20px 100px 0 100px;
}
</style>