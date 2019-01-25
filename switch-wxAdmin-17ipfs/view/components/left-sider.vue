<template>
  <div :class="['outer', close?'close':'']">
    <div class="inner" :style="{height: innerStyleHeight}">
      <div class="inner-uper">
        <div class="btn"
         @click="close= !close"
        >
          <Icon type="ios-menu" size="24"/>
        </div>
      </div>
      <div class="inner-lower"
       @click="selectRoute"
      >
        <div class="meta" v-for="(meta, index) in metas" :key="meta.title" :data-index="meta.path">
          {{ meta.title }}
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import { heightMixin } from '@/mixin'
import { isNull } from '@/libs/tools'
import { Icon} from 'iview'

export default {
  name:'left-sider',
  mixins: [heightMixin],
  components: {
    Icon
  },
  created(){
    //收集routes用来生成侧边栏
    let routes= this.$router.options.routes;
    let arr= [];
    routes.forEach((ele) => {
      if(ele.meta) return arr.push(ele.meta);
    });
    console.log(arr)
    this.metas= arr;
  },
  mounted(){
    
  },
  methods: {
    selectRoute($event){
      let path= $event.target.getAttribute('data-index');
      if(isNull(path)) return;
      this.close= true;
      this.$router.push(path);
    }
  },

  data: function(){
    return {
      close: true,
      metas: null,
    }
  },
  computed: {
    innerStyleHeight(){
      return window.innerHeight- 48+ 'px';
    }
  },
}
</script>

<style scoped>
.outer {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  height: 100%;
  width: 200px;
  transition: all 0.3s ease-in;
  z-index: 10;
}

.close{
  transform: translateX(-100%);
}

.inner {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0,0,0,0.6);
  width: 100%;
  border-radius:0 4px 4px 0;
}

.inner-uper {
  position: relative;
  background-color: transparent;
  height: 100px;
  width: 100%;
  border-radius: 0 4px 0 0;
}

.inner-uper .btn {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #fff;
  cursor: pointer;
  transform: rotateZ(90deg);
  transition: all 0.3s ease-in;
}

.close .btn {
  transform: rotateZ(0);
  color: #333b46;
  right: -40px;
}

.inner-lower {
  background-color: transparent;
  height: 100%;
  width: 100%;
  border-radius: 0 0 4px 0;
}

.inner-lower .meta {
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  padding: 10px 0 10px 20px;
}

.meta:hover{
  background-color: rgba(0,0,0,0.1);
}
</style>
