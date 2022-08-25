<template>
  <div>
    <h1>请求封装</h1>
    <span>{{ loading }}</span>
    <button @click="getData">请求</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import useApi from '@/hooks/useApi'
import useRequest from '@/hooks/useRequest'

export default defineComponent({
  setup() {
    function fetchUserList() {
      return new Promise(resolve => {
        setTimeout(() => {
          const payload = {
            code: 200,
            data: [11, 22, 33],
            msg: 'success'
          }
          resolve(payload)
        }, 500)
      })
    }
    // const { loading, error, result } = useRequest(fetchUserList)
    const { loading, error, result, fetchResource } = useApi(fetchUserList, { manual: false })
    console.log(loading.value, error.value, result.value)
    const getData = () => {
      fetchResource({})
      console.log(loading.value, error.value, result.value)
    }
    return {
      loading,
      result,
      getData
    }
  }
})
</script>
