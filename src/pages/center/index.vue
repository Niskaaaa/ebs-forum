<template>
  <div >
    <div class="zoom" >
      <div class="grey" >
        <div class="bg"></div>
        <div class="wrapper" >
          <div class="profile">
            <div class="info">
              <img
                class="pic"
                :src="isLogin ? user.pic : '/static/images/header.jpg'"
                alt
              />
              <div class="user">
                <p class="name" @click="checkAuth()">
                  {{ isLogin ? user.name : "请登录" }}
                </p>
                <p class="fav">
                  <van-icon
                    name="fav2"
                    class-prefix="iconfont"
                    size="14"
                  ></van-icon>
                  积分：{{ user && user.favs ? user.favs : 0 }}
                </p>
              </div>
              <navigator class="link">个人主页 ></navigator>
            </div>
            <ul class="stats">
              <li class="item">
                <navigator>
                  <p>{{ countMyPost }}</p>
                  <p class="title">我的帖子</p>
                </navigator>
              </li>
              <li class="item">
                <navigator>
                  <p>{{ countMyCollect }}</p>
                  <p class="title">收藏夹</p>
                </navigator>
              </li>
              <li class="item">
                <navigator>
                  <p>{{ countMyHistory }}</p>
                  <p class="title">最近浏览</p>
                </navigator>
              </li>
            </ul>
          </div>
        </div>
        <div class="center-wraper" >
          <ul class="center-list first">
            <li
              v-for="(item, index) in lists"
              :key="index"
              @click="goTo(item.routeName)"
            >
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </li>
          </ul>
          <ul class="center-list">
            <li
              v-for="(item, index) in routes"
              :key="index"
              @click="navTo(item)"
            >
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <tab-bar :selected="3"></tab-bar>
  </div>
</template>

<script>
import search from "../../components/search/index";
import tabBar from "../../components/tabbar/index";
import { StoreUser,StoreToken } from "@/utils/wxstore";
import store from "../index/store";
import wx from "@/utils/wx";
export default {
  name: "app",
  data() {
    return {
      isLogin: false,
      user: "",
      lists: [
        {
          name: "我的帖子",
          icon: "icon-teizi",
          routeName: "mypost",
        },
        {
          name: "修改设置",
          icon: "icon-setting",
          routeName: "settings",
        },
        {
          name: "修改密码",
          icon: "icon-lock2",
          routeName: "passwd",
        },
        {
          name: "签到中心",
          icon: "icon-qiandao",
          routeName: "sign",
        },
        {
          name: "购买记录",
          icon: "icon-qiandao",
          routeName: "404",
        },
        {
          name: "赞助商",
          icon: "icon-jiangbei",
          routeName: "404",
        },
      ],
      routes: [
        {
          name: "学习",
          icon: "icon-question",
          tab: "learn",
        },
        {
          name: "分享",
          icon: "icon-share",
          tab: "share",
          path:"/pages/index/main"
        },
        {
          name: "生活",
          icon: "icon-taolun",
          tab: "life",
        },
        {
          name: "讨论",
          icon: "icon-advise",
          tab: "discuss",
        },
      ],
    };
  },

  computed:{
    bar:function(){
      return store.state.contentOffset}

  },
  async onShow() {
    console.log("islogin?",this.bar);
    const user = await StoreUser.get();
    if (user) {
      this.user = user;
    }
    this.isLogin = await this.checkAuth();

    console.log("islogin?", this.isLogin);
    
  },
  methods: {
    navTo(item){
      
      getApp().globalData.tab=item.tab
      console.log(getApp().globalData.tab)
      store.commit("setCatalog",getApp().globalData.tab);
      wx.switchTab({
        url:'/pages/index/main'
      })
    },
    async confirmAuth() {
      Dialog.confirm({ title: "未登录", message: "确定登录吗？" })
        .then(() => {
          // 确定登录
          wx.navigateTo({ url: "/pages/auth/main" });
        })
        .catch(() => {});
    },

    async checkAuth() {
      const token = await StoreToken.get();
      console.log("token", token);
      if (token) {
        const flag = await this.checkSession();
        console.log("flag", flag);
        if (flag) {
          return true;
        }
      }
      return this.confirmAuth();
    },

    async checkSession() {
      try {
        console.log("try");
        await wx.checkSession();
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  components: {
    tabBar,
  },
};
</script>

<style lang="scss" scoped>
.zoom {
  zoom: 0.5;
}
.grey {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 30;
}
a {
  color: #666;
  text-decoration: none;
}
// .bg {
//   height: 260px;
//   // 4个参数： 左上 右上 右下 左下
//   border-radius: 0 0 50% 50%;
//   background-color: #16d1a2;
//   position: relative;
//   z-index: 50;
// }
.bg {
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 280px;
  background-position: 0 0;
  z-index: 100;
}
.wrapper {
  width: 100%;
  height: 370px;
  padding: 25px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
  .profile {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    .name {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 10px;
      margin-top: 0;
    }
    .link {
      font-size: 24px;
      color: #999;
    }
    .fav {
      display: inline-block;
      padding: 8px 12px;
      background: rgba(2, 209, 153, 0.16);
      border-radius: 12px;
      color: #02d199;
      margin: 0;
      font-size: 22px;
      .icon-fav {
        padding-right: 10px;
      }
    }
    .info,
    .stats {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }
    .info {
      margin-bottom: 24px;
    }
    .stats {
      justify-content: space-around;
    }
    .user {
      flex: 1;
      padding-left: 20px;
    }
    .pic {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    .item {
      text-align: center;
      position: relative;
      p {
        margin-top: 14px;
        margin-bottom: 0;
      }
      &:after {
        width: 2px;
        height: 80px;
        background: #ddd;
        content: "";
        position: absolute;
        right: -60px;
        top: 20px;
      }
      &:last-child {
        &:after {
          width: 0;
        }
      }
      .title {
        color: #666;
      }
    }
  }
}
.center-wraper {
  background: #f6f5f8;
  position: relative;
  width: 100%;
  // height: 100%;
  z-index: 10;
  .center-list {
    background: #fff;
    margin-bottom: 30px;
    display: flex;
    flex-flow: wrap;
    padding-top: 40px;
    &.first {
      padding-top: 100px;
    }
    li {
      width: 25%;
      text-align: center;
      color: #666;
      margin-bottom: 40px;
      font-size: 26px;
    }
    i {
      display: block;
      margin: 0 auto;
      font-size: 40px;
      width: 56px;
      height: 56px;
      margin-bottom: 20px;
      color: #888;
      background-size: contain;
    }
  }
}

    .icon-teizi {
      background-image: url('http://localhost:3000/img/teizi@2x.png');
    }
    .icon-setting {
      background-image: url('http://localhost:3000/img/setting@2x.png');
    }
    .icon-lock2 {
      background-image: url('http://localhost:3000/img/lock2@2x.png');
    }
    .icon-qiandao {
      background-image: url('http://localhost:3000/img/qiandao@2x.png');
    }
    .icon-record {
      background-image: url('http://localhost:3000/img/record@2x.png');
    }
    .icon-jiangbei {
      background-image: url('http://localhost:3000/img/jiangbei@2x.png');
    }
    .icon-question {
      background-image: url('http://localhost:3000/img/question@2x.png');
    }
    .icon-share {
      background-image: url('http://localhost:3000/img/share@2x.png');
    }
    .icon-taolun {
      background-image: url('http://localhost:3000/img/taolun@2x.png');
    }
    .icon-advise {
      background-image: url('http://localhost:3000/img/advice@2x.png');
    }
</style>
