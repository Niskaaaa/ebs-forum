<template>
  <div class="container">
    <van-field placeholder="请输入帖子标题" clearable :value="title"></van-field>
    <van-field placeholder="请输入帖子内容" @change="changeShoppingDetail" clearable :value="content"></van-field>

    <div class="upload-img">
      <van-uploader @afterRead="afterRead" :fileList="fileList" @delete="deteleImg"></van-uploader>
    </div>
    <picker @change="changePostType" :value="block[blockIndex]" :range="block" class="picker">
      <van-field
        disabled
        label="发贴类型"
        inputAlign="right"
        placeholder="请选择"
        isLink
        :value="block[blockIndex]"
      ></van-field>
    </picker>
    <picker @change="changeFavs" :value="favs[favsIndex]" :range="favs" class="picker">
      <van-field
        disabled
        label="奖励积分"
        inputAlign="right"
        placeholder="请选择"
        isLink
        :value="favs[favsIndex]"
      ></van-field>
    </picker>
    <div class="btn-wrap">
      <van-button size="large" type="primary" @click="submit()">发布</van-button>
    </div>
  </div>
</template>

<script>
import {addPost} from  "../../api/content"
import { StoreUser,StoreToken } from "@/utils/wxstore";
import wx from '@/utils/wx'
export default {
  name: 'newPost',
  data () {
    return {
      title: '',
      content: '',
      fileList: [],
      imgList: [],
      block: ['请选择', '学习', '生活', '分享', '讨论'],
      blockValue: ['', 'learn', 'life', 'share','discuss'],
      blockIndex: 0,
      favs: [20, 30, 50, 60, 80],
      favsIndex: ''
    }
  },
  methods: {
    async afterRead (e) {
      console.log('afterRead -> e.mp.detail', e.mp.detail)
      const file = e.mp.detail.file
      uploadImg(file).then((res) => {
        console.log('afterRead -> res', res)
        if (res.code === 200) {
          this.fileList.push(file)
          this.imgList.push(res.data)
          wx.showToast({
            title: '上传成功',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '上传失败，原因：' + res.errmsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    changeShoppingName (event) {
        this.title = event.mp.detail
      },
      changeShoppingDetail (event) {
        this.content = event.mp.detail
      },
    deteleImg (e) {
      this.fileList.splice(e.mp.detail.index, 1)
      this.imgList.splice(e.mp.detail.index, 1)
    },
    changePostType (e) {
      this.blockIndex = e.target.value
    },
    changeFavs (e) {
      this.favsIndex = e.target.value
    },
    async submit(){
      
      var user = await StoreUser.get()
      console.log(user)
      await addPost({title:this.title,content:this.content,user:user,catalog:this.blockValue[this.blockIndex]})
      wx.navigateBack()

    }
  }
}
</script>

<style lang="scss" >
.upload-img {
  padding: 30px;
}
.edit-content {
  --field-text-area-min-height: 350px;
}
.btn-wrap {
  padding: 30px;
  margin-top: 20px;
  --button-primary-background-color: #02d199;
}
</style>