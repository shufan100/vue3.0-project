import { ref } from 'vue'

export default (api, manual = false) => {
  const loading = ref(false)
  const result = ref(null)
  const error = ref(null)
  const fetchResource = params => {
    loading.value = true
    return api(params)
      .then(res => {
        // 按照约定，api返回的结果直接复制给result
        result.value = res
      })
      .catch(err => {
        error.value = err
      })
      .finally(() => {
        //不管 Promise 对象最后状态如何，都会执行的操作
        loading.value = false
      })
  }
  manual && fetchResource({})
  return {
    loading,
    error,
    result
  }
}
