import axios from 'axios'
import router from '../router'
import { Loading } from 'element-ui';
axios.defaults.withCredentials = true; //配置为true
const server = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:"5000"
})

//设置loading加载
const loading = {
    loadingService: null,
    // 开启loading加载
    open(){
        if(this.loadingService == null){
            this.loadingService = Loading.service({
                target:".el-main",
                text:'拼命加载中...',
                background:'rgba(255,255,255,0.7)'
            })
        }
    },
    // 关闭loading加载
    close(){
        if(this.loadingService!=null){
            this.loadingService.close();
        }
        this.loadingService = null
    }
}

// 请求拦截器
server.interceptors.request.use((config)=>{
    loading.open()
    // console.log(config)
    //读取sessionStorage中的数据  然后添加到请求头中
    const token = window.sessionStorage.getItem('token')
      if(token){
        config.headers['token'] = token
    }
    return config
},function(error){
   loading.close()
     return Promise.reject(error)
})


// 响应拦截器
server.interceptors.response.use((res)=>{
    loading.close()
    console.log(res)
    if(res.data.status==401){
        sessionStorage.removeItem("token")
        router.push('/')
    }
    return res
},function(error){
    loading.close()
      return Promise.reject(error)
 })  
export default server