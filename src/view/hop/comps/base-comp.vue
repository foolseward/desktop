<template>
  <div>
    <span @click="handleClick">props: {{test}}</span>
    <slot name="slot1"/> <!-- 具名插槽 -->
    <p>===========</p>
    <slot/> <!-- 默认插槽 -->
  </div>
</template>

<script>
export default {
  name: 'BaseComponent',
  props: {
    test: Number
  },
  mounted(){
    console.log(this.$vnode.context);
    console.log(this.$vnode.componentOptions.children[0].context);
  },
  methods: {
    handleClick () {
      this.$emit('customize-click')
    }
  }
}
</script>