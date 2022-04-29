<template>
  <div>
    <h1>子组件demo</h1>

    <el-button @click="gets">父组件方法</el-button>
    <slot></slot>
    <slot name="qwe"></slot>
  </div>
</template>
<script>
export default {
  // 接收props值，不然setup的props接收不到值
  props: ['msg1'],
  emits: ['getdata'], // 接收方法，可省略
  setup (props, context) {

    // console.log(props.msg1, context.attrs.msg1)
    // props--------------------------------
    // console.log("props:", props)

    // context 上下文 三大属性（attrs、emit、slots）-------------------------------------------
    // console.log("context:", context)

    // attrs：接收父组件属性
    // console.log("context.attrs:", context.attrs)

    // emit：触发父组件方法
    const gets = () => {
      context.emit('getdata', 888)
    }

    // slots：插槽
    // console.log("context.slots:", context.slots)






    return {
      gets
    }

  },
}
</script>