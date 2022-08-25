<template>
  <!-- <div class="home"> -->
  <!-- <h1>ref----------------------------------------------------------------</h1> -->
  <el-divider>ref</el-divider>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <el-input type="text" v-model="keyword" style="width: 200px" placeholder="输入修改年龄" @input="age = keyword" />
  <el-button @click="name += '~'">修改姓名</el-button>

  <!-- <h1>reactive---------------------------------------------------------</h1> -->
  <el-divider>reactive</el-divider>
  <h2>对象：{{ obj.type }}--{{ obj.a.b.c }}</h2>
  <h2>数组：{{ arr }}</h2>
  <el-button @click="edit2">修改2</el-button>
  <el-button @click="del">删除</el-button>

  <!-- <h1>props---------------------------------------------------------</h1> -->
  <el-divider>Props</el-divider>
  <Demo msg1="666" @getdata="showMsg">
    <template v-slot:qwe>
      <div>具名插槽值1111111</div>
    </template>
    <div>默认插槽值2222222</div>
  </Demo>

  <el-divider>computed计算属性</el-divider>
  <el-input type="text" v-model="person.firstName" style="width: 100px" />
  <el-input type="text" v-model="person.lastName" style="width: 100px" />
  <el-input type="text" v-model="person.age" style="width: 100px" />
  <div>计算属性1：{{ person.fullName }}</div>
  <div>计算属性2：{{ person.fullAge }}</div>
  修改计算属性：
  <el-input type="text" v-model="person.fullName" style="width: 100px" />

  <el-divider>watch监视</el-divider>
  <h2>姓名1：{{ name }}</h2>
  <h2>年龄1：{{ age }}</h2>
  <el-button @click="editRefs">ref修改</el-button>
  <h2>薪资：{{ person.job.j1.salary }}K</h2>
  <el-button @click="person.job.j1.salary++">reactive修改</el-button>

  <el-divider>watchEffect</el-divider>

  <el-divider>自定义hooks</el-divider>
  <h1>鼠标打点</h1>
  <el-button @click="isShow = !isShow">卸载Demo2组件</el-button>
  <Demo2 v-if="isShow"></Demo2>
  <Demo3 v-if="isShow"></Demo3>

  <el-divider>toRef 、 toRefs</el-divider>
  <div>{{ obj }}</div>
  <div>obj.type》》》 {{ type }}</div>
  <div>obj.a.b.c>》》 {{ c }}</div>
  <el-button @click="type += '~'">修改type</el-button>
  <el-button @click="c++">修改c</el-button>
  <hr />
  <div>{{ person }}</div>
  <div>person.fullName》》》 {{ fullName }}</div>
  <div>person.job》》 {{ job.j1.salary }}</div>
  <el-button @click="fullName += '~'">修改fullName</el-button>
  <el-button @click="job.j1.salary += 10">修改salary</el-button>

  <el-divider>全局属性方法</el-divider>
  <div>{{ $name }}</div>
  <div>{{ $winFilter(age) }}</div>

  <!-- </div> -->
</template>

<script>
import { defineComponent, ref, reactive, computed, watch, watchEffect } from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import { toRef, toRefs } from 'vue'
import { getCurrentInstance } from 'vue' //使用全局配置属性
import Demo from './Demo.vue'
import Demo2 from './Demo2.vue'
import Demo3 from './Demo3.vue'
export default defineComponent({
  name: 'Home',
  components: { Demo, Demo2, Demo3 },
  setup() {
    // ******ref函数----------------------------------------------------------------
    // shallowRef 只处理基本类型的响应式，不处理对象的响应式
    // let shallowRefs = shallowRef({a:0})
    let isShow = ref(true)
    let name = ref('花花')
    let age = ref(12)
    const keyword = ref() // input初始值

    // ******reactive函数----------------------------------------------------------------
    // reactive的响应式是深层次的
    // shallowReactive的响应式是浅层次的（只考虑第一层数据的响应式）
    let obj = reactive({
      type: '机械师',
      a: { b: { c: 666 } }
    })
    let arr = reactive(['数据1', '数据2', '数据3'])

    // 修改
    const edit2 = () => {
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

    // ******props----------------------------------------------------------------
    const showMsg = param => {
      alert('父组件方法,参数：' + param)
    }

    // ******computed计算属性----------------------------------------------------------------
    let person = reactive({
      firstName: 'shu',
      lastName: 'fan',
      age: 2.8,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    let person111 = reactive({})
    console.log(person111)
    person111 = { name: '111' }
    console.log(person111)

    // 简写---只读（计算属性不可被修改）
    // let fullName = computed(() => {
    //   return person.firstName + person.lastName
    // })
    person.fullAge = computed(() => {
      return person.age * 10
    })
    // 完整，可读可修改
    person.fullName = computed({
      get() {
        return person.firstName + '-' + person.lastName
      },
      set(val) {
        const arr = val.split('-')
        person.firstName = arr[0]
        person.lastName = arr[1]
      }
    })

    // ******watch监视----------------------------------------------------------------
    const editRefs = () => {
      name.value = '安妮'
      age.value += 1
    }

    watch(name, (newVal, oldVal) => {
      console.log('name变化触发', newVal, oldVal)
    })
    watch([name, age], (newVal, oldVal) => {
      console.log('name, age任意个变化触发，返回数组', newVal, oldVal)
    })

    watch(
      obj,
      (newVal, oldVal) => {
        console.log('@@@ ~ file: Home.vue ~ line 118 ~ newVal', newVal.a.b.c, oldVal.a.b.c) //reactive定义的属性，监听new和old都是修改后的数据
        // console.log('obj对象变化了，深度监听', newVal, oldVal)
      },
      { immediate: false, deep: true }
    ) //立即监听,配置的deep不再奏效（deep默认false）

    watch(
      () => obj.a.b.c,
      (newVal, oldVal) => {
        console.log('obj.a.b.c变化了，深度监听', newVal, oldVal)
      },
      { immediate: true, deep: true }
    ) //立即监听

    // reactive定义的属性默认会开启深度监听
    watch(
      person,
      (newVal, oldVal) => {
        // console.log('@@@ ~ person:', newVal.job.j1.salary, oldVal.job.j1.salary) //reactive定义的属性，监听new和old都是修改后的数据
      },
      { deep: false }
    ) //deep失效

    watch(
      () => person.job,
      (newVal, oldVal) => {
        console.log('@@@ ~ person:', newVal, oldVal) //reactive定义的属性，监听new和old都是修改后的数据
      },
      { deep: false }
    ) //deep失效

    // ******watchEffect监视----------------------------------------------------------------
    watchEffect(() => {
      const a1 = age.value
      console.log('watchEffect函数回调！！！')
    })

    // ******组合式API（setup）内的生命周期----------------------------------------------------------------
    onBeforeMount(() => {
      console.log('--beforeMount -- 组件挂载到页面之前执行')
    })
    onMounted(() => {
      console.log('--mounted -- 组件挂载到页面之后执行')
    })
    onBeforeUpdate(() => {
      console.log('--beforeUpdate--组件更新之前')
    })
    onUpdated(() => {
      console.log('--updated -- 组件更新之后')
    })
    onBeforeUnmount(() => {
      console.log('--beforeUnmount -- 组件卸载之前')
    })
    onUnmounted(() => {
      console.log('--unmounted -- 组件卸载之后')
    })

    // ******全局属性方法----------------------------------------------------------------
    const {
      ctx,
      appContext: { config }
    } = getCurrentInstance()
    console.log('@@@ ~ file: Home.vue ~ line 210 ~ config', config.globalProperties)

    console.log(toRefs(person))
    // 返回的是一个对象
    return {
      isShow,
      name,
      age,
      keyword,
      arr,
      obj,
      person,
      type: toRef(obj, 'type'),
      c: toRef(obj.a.b, 'c'),
      ...toRefs(person),
      $name: config.globalProperties.$name,
      $winFilter: config.globalProperties.$winFilter,
      edit2,
      del,
      showMsg,
      editRefs
    }
  }
})
</script>
<style lang="less" scoped>
.home {
  padding-bottom: 100px;
}
</style>
