<template>
  <div>
    <van-tabs :active="activeTab" class="custom-tab" v-on:change="onChange($event)">
      <van-tab :title="tab.value" v-for="(tab, index) in tabs" :key="index">{{
        tab.value
      }}</van-tab>
    </van-tabs>

  </div>
</template>

<script>
import store from "@/pages/index/store";

export default {
  data() {
    return {

      activeTab: 0,
      tabs: [
        { key: "", value: "首页" },
        { key: "learn", value: "学习" },
        { key: "life", value: "生活" },
        { key: "share", value: "分享" },
        { key: "discuss", value: "讨论" },
      ],
      list: [
        "/pages/index/main",
        "/pages/msg/main",
        "/pages/hot/main",
        "/pages/center/main",
      ],
    };
  },
  methods: {
    onChange(event) {
      this.activeTab = event.mp.detail.index;
      console.log(event);
      store.commit("setCatalog", this.tabs[this.activeTab].key);
      console.log(store.state.catalog)
    },
    onClick(event) {
        console.log(event)
    
    },
  },
};
</script>

<style lang="scss">
.item {
  text-align: center;
  align-self: flex-end;
  padding-bottom: 5px;

  div {
    padding-top: 5px;
  }
}

.custom-tab {
  --tabs-bottom-bar-color: #99ccff;
  --tab-active-text-color: #99ccff;
}
</style>
