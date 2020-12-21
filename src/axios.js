import axios from 'axios'
import Element from 'element-ui'

axios.defaults.baseURL = 'http://localhost:8088/testCors'

axios.interceptors.response.use(response => {
  return response.data
},
err => {
  console.log(err)
  Element.Message.error('服务器开小差了~~')
})
