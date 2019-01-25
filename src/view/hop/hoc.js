export default function withConsole(comp){
    return {
        components: {
          comp
        },
        props: comp.props,
        render(c){
            console.log(this.$slots);
            const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        // 手动更正 context
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })
        console.log(slots);
            return c(comp, {
                on: this.$listeners,
                attrs: this.$attrs,
                props: this.$props
            }, slots);
        }
    }
}