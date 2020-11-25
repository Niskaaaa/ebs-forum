<template>
  <div class="flex">
  <van-button size="large" color="#99CCFF" class="btn">
  <van-icon name="weixin" size="16" class-prefix="iconfont"></van-icon>
  <div>微信登陆</div>
  </van-button> 
  </div>

</template>

<script type="text/javascript">

export default {
  name: "app",
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
    flex-flow:column nowrap;
    justify-content: flex-start;
    align-self: center;
    position: fixed;
    width:100vw;
    height: 100vh;
    top:120px;
    left: 0;
    .logo{
        width:120px;
        height:120px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom:100px;
        img{
            width: 100%;
        }
    }
    .btn{
        width:90%;
        display:flex;
        flex-flow:row nowrap;
        border-radius:6px;
    }
}
</style>
