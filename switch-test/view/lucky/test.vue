<template>
  <div>
    <div ref="editor">
      http://baidu.com
    </div>
    <button id="btn1">getJSON</button>
  </div>
</template>

<script>
/*<======|环境配置|======>*/

/*<======|静态资源|======>*/

/*<======|引用插件|======>*/
import './wangeditor.js'
/*<======|工具方法|======>*/

/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/
let WANG_EDITOR_DOM;
export default {
/*名称*/
  name: '',

/*子组件*/
  components: {},

/*混入*/ 
  mixins: [],

/*生命周期*/
  // beforeRouteEnter(to, from, next){
  //   let HEAD = document.getElementsByTagName('head')[0];
  //   WANG_EDITOR_DOM= document.createElement('script');
  //   WANG_EDITOR_DOM.type = "text/javascript";
  //   new Promise((res, rej) => {
  //     WANG_EDITOR_DOM.onload= () => {
  //       res();
  //     }
  //     WANG_EDITOR_DOM.src= 'https://unpkg.com/wangeditor/release/wangEditor.min.js';
  //     HEAD.insertBefore(WANG_EDITOR_DOM, HEAD.firstChild);
  //   }).then(res => {
  //     next();
  //   })
  // },
  mounted(){

    var editor = new wangEditor(this.$refs.editor);
    editor.customConfig.uploadImgServer = '/upload'
    editor.create()
    document.getElementById('btn1').addEventListener('click', function () {
        var json = editor.txt.getJSON()  // 获取 JSON 格式的内容
        var jsonStr = JSON.stringify(json)
        console.log(json)
        console.log(jsonStr)
    })
  },
/*传参*/
  props: [],

/*data*/
  data: function(){
    return {

    }
  },

/*computed*/
  computed:{},

/*方法*/ 
  methods: {

  },
} 
</script>

<style scoped>
  
</style> 