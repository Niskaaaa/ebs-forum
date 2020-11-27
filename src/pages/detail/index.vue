<template>
  <div class='zoom'>
    <div class="wrapper">
      <div class="detail-head">{{page.title}}</div>
      <div class="detail-info">
        <div class="detail-info-head">
          <div class="avatar">
            <img :src="page.uid && page.uid.pic ? page.uid.pic : '/static/images/header.jpg'" alt />
          </div>
          <div class="cont">
            <p class="name">{{page.authorId && page.authorName ? page.authorName : '未设置用户昵称'}}</p>
            <p class="time">{{page.time}}</p>
          </div>
          <div class="subscribe">
            <van-button @click="subscribe()" size="small" class="sub">订阅</van-button>
          </div>
        </div>
        <div class="detail-info-body">
          <div >{{page.content}}</div>
        </div>
        <div class="detail-info-foot">{{page.reads}} 阅读</div>
      </div>
      <commentList :comments="comments"></commentList>
    </div>
    <div class="detail-bottom" :class="{'fixed': isFocus ||faceStatus, 'on': faceStatus}">
      <div class="bottom-input-wrap">
        <van-icon name="advice" class-prefix="iconfont" size="17"></van-icon>
        <div class="input">
          <input type="text" @confirm="focus()" placeholder="写评论..." />
        </div>
        <div @click="showFace()">
          <van-icon name="smile" class-prefix="iconfont" size="17"></van-icon>
        </div>
      </div>
      <ul class="bottom-right">
        <li :class="{'row': !showText}">
          <van-icon name="bianji" class-prefix="iconfont" size="14"></van-icon>
          <p>
            <span v-show="showText" @click="transfer()">评论</span>
            {{page.commentNumber}}
          </p>
        </li>
        <li :class="{'row': !showText}" @click="setFav()">
          <van-icon name="shoucang" class-prefix="iconfont" size="16"></van-icon>
          <p>
            <span v-show="showText">{{page.isFav?'取消收藏':'收藏'}}</span>
          </p>
        </li>
        <!-- <li :class="{'row': !showText}">
          <van-icon name="zan"></van-icon>
          <p>
            <span v-show="showText">赞</span>
            {{page.fav}}
          </p>
        </li>-->
      </ul>
    </div>
    <!-- <div class="block"></div> -->
    <div class="detail-face" :class="{'on': faceStatus}">
      <scroll-view scroll-y>
        <div class="detail-face-item" v-for="(value,key) in faces" :key="key">
          <img :src="value" mode="widthFix" />
        </div>
      </scroll-view>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script type="text/javascript">
import {getDetail} from '../../api/content'
import comment from './comment'
export default {
  name: "detail",
  data() {
    return {
      page:{},
      comments:[]
    }
  },
  mounted(){
    console.log(this.$mp.query['id'].substring(1,24))

    getDetail(this.$mp.query['id'].substring(1,25)).then((res)=>{
      console.log('res',res)

      this.page=res
      this.comments=res.comment
      console.log(this.comments)}
      )

    console.log('page',this.page)
  },
  components: {
    commentList:comment

  },
  computed:{
    showText(){
      return this.comments
    }
  },
  methods: {
    transfer(){
 wx.navigateTo({
        url:'/pages/auth/main'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.zoom {
  // padding-top: $header-height;

  zoom:0.5
}
.wrapper {
  // padding-top: $header-height;
  background-color: #f6f6f6;
 
}
.detail-head {
  font-size: 36px;
  color: #333;
  padding: 0 30px 20px 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  margin: 0 0 20px 0;
  // line-height: $header-height;
  background-color: #fff;
  z-index: 10;
  position: relative;
}
.detail-info {
  background-color: #fff;
  padding: 20px 30px 60px 30px;
  margin: 0 0 20px 0;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  .detail-info-head {
    background-color: #fff;
    display: flex;
    align-items: center;
    font-size: 25px;
    padding-bottom: 20px;
    .sub {
      --button-border-radius: 6px;
      --button-default-color: #fff;
      --button-default-background-color: #02d199;
    }
    .avatar {
      margin-right: 20px;
      img {
        width: 72px;
        height: 72px;
        border-radius: 100%;
      }
    }
    .cont {
      flex: 1;
      .name {
        font-size: 26px;
        color: #333;
        margin-bottom: 10px;
      }
      .time {
        color: #999;
        font-size: 22px;
      }
    }
  }
  .detail-info-body {
    padding-bottom: 46px;
    color: #666;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 55px;
    font-size: 30px;
    overflow-x: hidden;
    img {
      max-width: 100%;
    }
  }
  .detail-info-foot {
    color: #ccc;
    font-size: 26px;
  }
}
// .block {
//   height: calc(env(safe-area-inset-bottom) / 2);
//   height: calc(constant(safe-area-inset-bottom) / 2);
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   background: #fff;
// }
.detail-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  // iOS 11的场景
  padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
  height: 100px;
  height: 100px;
  position: fixed;
  left: 0;
  bottom: 0;
  // bottom: calc(constant(safe-area-inset-bottom) / 2);
  // bottom: calc(env(safe-area-inset-bottom) / 2);
  width: 100%;
  z-index: 10;
  border-top: 1px solid #f6f6f6;
  background-color: #fff;
  display: flex;
  align-items: center;
  // padding-top: 20px;
  justify-content: flex-end;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.5s;
  // @include resH-to(big-screens) {
  //   padding-bottom: 28px;
  // }
  &.fixed {
    padding-bottom: 0;
  }
  &.on {
    transform: translateY(-600px);
  }
  .bottom-input-wrap {
    background-color: #f3f3f3;
    flex: 1;
    display: flex;
    align-items: center;
    border-radius: 50px;
    width: 200px;
    color: #ccc;
    font-size: 28px;
    height: 64px;
    margin: 0 20px;
    padding: 0 20px;
    .input {
      margin-right: 20px;
      flex: 1;
      input {
        border: 0;
        background-color: transparent;
        outline: 0;
      }
      // padding-right: 20px;
    }
  }
  .bottom-right {
    display: flex;
    margin-right: 20px;
    font-size: 26px;
    li {
      flex: 1;
      padding: 0 10px;
      text-align: center;
      white-space: nowrap;
      color: #999;
      &.row {
        flex-flow: row nowrap;
        display: flex;
        align-items: center;
        p {
          margin-left: 8px;
        }
      }
    }
  }
}
.detail-face {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  height: 600px;
  background: #fff;
  transition: all 0.5s;
  transform: translateY(600px);
  visibility: hidden;
  overflow-y: scroll;
  border-bottom: 1px solid #dcdcdc;
  // overscroll-behavior: contain;
  &.on {
    transform: translateY(0);
    visibility: visible;
  }
  .detail-face-item {
    float: left;
    width: 12.5%;
    text-align: center;
    padding: 12px 0;
    img {
      width: 54px;
    }
  }
}
</style>
