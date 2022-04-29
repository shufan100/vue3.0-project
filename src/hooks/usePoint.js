import { reactive, onMounted, onBeforeUnmount } from 'vue'

export default (data) => {
  let point = reactive({
    x: 0,
    y: 0
  })

  // 鼠标打点方法
  function savePoint (event) {
    point.x = event.pageX
    point.y = event.pageY
  }

  onMounted(() => {
    // 鼠标点击打点（给window添加点击事件）
    point.x = 0
    point.y = 0
    window.addEventListener('click', savePoint)
    console.log('onMounted', data)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint)
    console.log('onBeforeUnmount')
    point.x = 0
    point.y = 0
  })

  return point

}