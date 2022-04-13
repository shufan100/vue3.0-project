<template>
  <div class="home">
    <h1>ref----------------------------------------------------------------</h1>
    <h2> 姓名：{{name}} -- {{state.name}} </h2>
    <h2> 年龄：{{age}} -- {{state.age}} </h2>
    <el-input type="text" v-model="keyword" />
    <el-button @click="edit">修改</el-button>

    <h1>reactive---------------------------------------------------------</h1>
    <h2>对象：{{obj.type}}--{{obj.a.b.c}}</h2>
    <h2>数组：{{arr}}</h2>
    <el-button @click="edit2">修改2</el-button>
    <el-button @click="del">删除</el-button>
    <h1>props---------------------------------------------------------</h1>
    <Demo msg1='11' @getdata='showMsg'>
      <!-- 插槽 -->
      <template v-slot:qwe>
        <div>哈哈哈哈1111</div>
      </template>
      <span>急急急</span>
    </Demo>
  </div>
</template>

<script>
import { ref, reactive, defineComponent } from 'vue'
import Demo from './Demo.vue'
export default defineComponent({
  name: 'Home',
  components: { Demo },
  setup () {
    // ******props----------------------------------------------------------------
    // 需要在setup外面接收props,setup的props才有值
    // ******ref函数----------------------------------------------------------------
    let name = ref('司机')
    let age = ref(12)
    let state = ref({
      name: '花花',
      age: 18
    })
    // input
    const keyword = ref('1111')
    // 点击事件
    const edit = () => {
      name.value = '安妮'
      age.value = 18
      state.value = {
        name: '帆帆',
        age: 19
      }
      keyword.value = '' //清空input
      console.log('name:', name)
      console.log('state.value:', state.value)
    }


    // ******reactive函数----------------------------------------------------------------
    // reactive的响应式是深层次的
    let obj = reactive({
      type: '机械师',
      a: { b: { c: 666 } }
    })
    let arr = reactive(['数据1', '数据2', '数据3'])

    // 修改
    const edit2 = () => {
      reactiveName = '弟弟'
      obj.type = '海贼王'
      obj.a.b.c = '999'
      arr[1] = '修改后111'
    }

    // 删除
    const del = () => {
      delete obj.a.b.c
      delete arr[1]
      setTimeout(() => {
        arr[1] = 3333
      }, 1000)
    }
    const showMsg = (param) => {
      alert('父组件方法,参数：' + param)
    }



    // 返回的是一个对象
    return {
      name,
      age,
      state,
      edit,
      keyword,
      obj,
      arr,
      edit2,
      del,
      showMsg
    }
  }
})
</script>
