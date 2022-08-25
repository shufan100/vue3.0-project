<template>
  <div>
    <h1>Demo2组件</h1>
    当前点击时鼠标的坐标：x: {{ point.x }}，y:{{ point.y }}
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import usePoint from '@/hooks/usePoint'
export default defineComponent({
  setup() {
    // 自定义hooks
    const point = usePoint(111)
    console.log(point, '--')
    return {
      point
    }
  }
})
</script>
