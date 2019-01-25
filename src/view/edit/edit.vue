<template>
  <div class="outer">
    <div class="inner">
      <edit-left @emit-state="emitState"></edit-left>
      <edit-add v-if="state"></edit-add>
      <edit-change v-if="!state" @emit-state="emitState"></edit-change>
    </div> 
  </div>
</template>
<script>
//混入
import { heightMixin } from '@/mixin'

//组件
import editLeft from './components/edit-left'
import editAdd from './components/edit-add'
import editChange from './components/edit-change'
export default {
  name: 'edit',
  mixins:[ heightMixin ],
  beforeRouteEnter(to, from, next){
    let prefix= to.query.prefix;
    if(!prefix){
      next('/');
    } else {
      next();
    }
  },
  components: {
    editLeft, editAdd, editChange
  },
  data(){
    return {
      state: true,
    }
  },
  // computed:{
  //   projectors(){
  //     return this.$store.getters.entities;
  //   }
  // },
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