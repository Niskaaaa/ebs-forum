<template>
  <div class="flex">
    <div class="logo">
      <img src="/static/images/logo.jpg" mode="widthFix" />
    </div>
    <van-button
      size="large"
      color="#99CCFF"
      class="btn"
      open-type="getUserInfo"
      @getuserinfo="_wxLogin"
    >
      <div class="row">
        <div class="icon">
          <van-icon name="weixin" size="22" class-prefix="iconfont"></van-icon>
        </div>
        <div>微信登录</div>
      </div>
    </van-button>
  </div>
</template>

<script type="text/javascript">
import wx from '@/utils/wx'
import {StoreUser,StoreToken} from '@/utils/wxstore'
import {wxLogin} from  "../../api/login"
import store from '../counter/store';
export default {
  name: "auth",
  data() {
    return {
      code:"",
    };
  },
  components: {},
  onLoad() {
    this.getWxCode()
    console.log('codeget')
   
    
  },
  methods: {
    async getWxCode() {
      const res = await wx.login();
  
      if (res.code) {
        
        //发起网络请求
        this.code = res.code;
        console.log('get',this.code)
      }
    },

    async _wxLogin(e){
      console.log('e',e.mp.detail)
      const user = e.mp.detail
      const re = await StoreUser.set(e.mp.detail)
      console.log('code',e.mp.detail)
      const result = await wxLogin({code:this.code,user:e.mp.detail})
      console.log('result',result.code)
      if(result.code==200)
      await StoreToken.set(result.token)
      console.log('re',result.token)
      console.log('get',await StoreToken.get())
      wx.navigateBack()
    }
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 120px;
  left: 0;
  .logo {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 100px;
    img {
      width: 100%;
      // height: 100%;
    }
  }
  .row {
    flex-flow: row nowrap;
    display: flex;
  }
  .icon {
    margin-right: 20px;
  }
  .btn {
    width: 90%;
    overflow: hidden;
    border-radius: 12px;
  }
}
</style>
