const isHttpSuccess=(status)=>{
    return status >=200 && status<300
}

const errorHandle=(res)=>{
    console.log(res)
    wx.showToast({
        title:res.msg?res.msg:'请求异常'
    })
}
const request =(options={})=>{
    return new Promise((resolve,reject)=>{
        wx.request(Object.assign({},opitons,{
            success:(res)=>{
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
                errorHandle(err)
                if(fail){
                    fail(res.data)
                    return
                }
                
                reject(err)
            }
        }))
    })
}