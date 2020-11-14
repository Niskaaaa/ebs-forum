const pending ={}
const isHttpSuccess=(status)=>{
    return status >=200 && status<300
}

const errorHandle=(res)=>{
    console.log(res)
    wx.showToast({
        title:res.msg?res.msg:'请求异常',
        type:'none',
        duration:2000
    })
}
export const request=(options={})=>{
    const { success,fail } = options
    const key = options.url+'&'+(options.method||'GET')
    const result = new Promise((resolve,reject)=>{
        const handler = wx.request(Object.assign({},options,{
            success:(res)=>{
                delete pending[key]
                if(isHttpSuccess(res.statusCode)){
                    success:(res)=>{
                        success(res.data)
                        return 
                    }
                    resolve(res.data)
                }
                else{
                    errorHandle(res)
                }
            },
            fail:(err)=>{
                delete pending[key]
                errorHandle(err)
                if(fail){
                    fail(res.data)
                    return
                }
                
                reject(err)
            }
        }))

        if(pending[key]){
          pending[key].abort()  
        }
        setTimeout(()=>{
            pending[key]=handler
        },0)
        
    })

    return result
}