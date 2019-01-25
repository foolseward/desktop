<template>
  <div class="my-tips" :style="{'width': show?'50px':'100vw'}"
  @click="show= !show"
  >
    <span v-if="show">tips</span>
    <div v-else v-html="htmlStr"></div>
  </div>
</template>

<script>
export default {
  name: 'my-tips',
  props: ['htmlStr'],
  data () {
    return {
      show: true,
    }
  },
}
</script>

<style>
.my-tips {
  display: inline-block;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.7);
  z-index: 1000;
  padding: 10px;
  line-height: 1.5;
  word-wrap: break-word;
}
</style>