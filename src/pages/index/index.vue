<template>
  <div class="zoom">
    <div class="fixed">
      <search :barHeight="barHeight"></search>
      <imooc-tabs :actvie="0"> </imooc-tabs>
    </div>

    <articleList :content="lists" :offsetTop="offsetTop"></articleList>
    <img
      src="../../../static/images/post.png"
      @click="addPost()"
      alt
      class="addBtn"
      mode="widthFit"
    />
    <tab-bar :selected="0"></tab-bar>
  </div>
</template>

<script>
import { getArticleList } from "../../api/content";
import tabBar from "../../components/tabbar/index";
import articleList from "../../components/articleList/index";
import { request, axios } from "@/utils/request";
import VantTabs from "@/components/tabbar/vant";
import search from "../../components/search/index";
import store from "./store";
import { StoreUser,StoreToken } from "@/utils/wxstore";
import wx from "@/utils/wx";
export default {
  data() {
    return {
      active: 0,
      activeTab: 0,
      value: "",
      barHeight: 0,
      isEnd: false,
      isRepeat: false,
      isLogin: false,

      lists: [
        {
          isEnd: "0",
          reads: 7,
          answer: 3,
          status: 0,
          isTop: "0",
          sort: "0",
          _id: "5dca7446ba723835b12f4c83",
          title: "test2",
          catalog: "ask",
          content: "mock",
          tags: [],
          uid: {
            name: "mock",
            isVip: "0",
          },
          created: "2019-11-12 08:58:46",
        },
        {
          isEnd: "0",
          reads: 7,
          answer: 3,
          status: 0,
          isTop: "0",
          sort: "0",
          _id: "5dca7446ba723835b12f4c83",
          title: "test2",
          catalog: "share",
          content: "mock",
          tags: [],
          uid: {
            name: "mock",
            isVip: "0",
          },
          created: "2019-11-12 08:58:46",
        },
        {
          isEnd: "0",
          reads: 7,
          answer: 3,
          status: 0,
          isTop: "0",
          sort: "0",
          _id: "5dca7446ba723835b12f4c83",
          title: "test2",
          catalog: "discuss",
          content: "mock",
          tags: [],
          uid: {
            name: "mock",
            isVip: "0",
          },
          created: "2019-11-12 08:58:46",
        },
        {
          isEnd: "0",
          reads: 7,
          answer: 3,
          status: 0,
          isTop: "0",
          sort: "0",
          _id: "5dca7446ba723835b12f4c83",
          title: "test2",
          catalog: "ask",
          content: "mock",
          tags: [],
          uid: {
            name: "mock",
            isVip: "0",
          },
          created: "2019-11-12 08:58:46",
        },
      ],
    };
  },
  computed: {
    catalog() {
      console.log("111" + store.state.catalog);
      return store.state.catalog;
    },
    offsetTop() {
      return store.state.contentOffset;
    },
  },

  watch: {
    catalog(newval, oldval) {
      console.log("cata", this.catalog);
      if (newval !== oldval) {
        this.page = 0;
        (this.lists = []), this._getList();
      }
    },
  },
  props: ["item"],
  components: {
    tabBar,
    "imooc-tabs": VantTabs,
    search,
    articleList,
  },
  onLoad() {
    this.getBarHeight();
    this._getList();
  },
  async onShow() {
    this.isLogin = await this.checkAuth();
  },
  methods: {
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
    async _getList() {
      var url = "/public/list" + store.state.catalog;
      const result = await getArticleList(store.state.catalog);
      console.log(result);
      this.lists = result;
      store.commit("setContent", result);
    },
    showUser(id) {
      console.log("showUser->id", id);
    },
    showDetail(id) {
      console.log("showDetail->id", id);
    },
    getBarHeight() {
      let statusBarHeight = 0;
      wx.getSystemInfo({
        success: (result) => {
          statusBarHeight = result.statusBarHeight;
          let isiOS = result.system.indexOf("iOS") > -1;
          console.log("getNavBarHeight -> isiOS", isiOS);
          if (isiOS) {
            this.barHeight = statusBarHeight + 5;
          } else {
            this.barHeight = statusBarHeight + 7;
          }
          store.commit("setContentOffset", this.barHeight + 238);
          console.log("barheight", store.state.contentOffset);
        },
      });
    },
    async addPost() {
      if (!this.isLogin) {
        console.log(this.isLogin);
        console.log("check");
        await this.confirmAuth();
        return;
      }
      //校验用户是否登录
      else  wx.navigateTo({
        url:'/pages/newPost/main'
      })
    },
  },

  onPullDownRefresh() {
    this.page = 0;
    (this.lists = []), this._getList();
  },
  onReachBottom() {
    console.log("bottom");
  },
};
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;

  background: #fff;
}

.addBtn {
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 110px;
  right: 10px;
}
</style>
