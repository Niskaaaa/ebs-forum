<template>
<!--miniprogram/custom-tab-bar/index.wxml-->
<cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view v-for="(item,index) in list" :key="index" class="tab-bar-item" :data-path="item.pagePath" :data-index="index" @click="switchTab(item,index)">
        <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath"></cover-image>
        <cover-view :style="{'color': selected === index ? selectedColor : color}">{{item.text}}</cover-view>
    </cover-view>
</cover-view>
</template>

<script>
export default {
    name: 'tab-bar',
    props: ['selected'],
    data() {
        return {
            color: "#666666",
            selectedColor: "#99CCFF",
            list: [{
                    text: "首页",
                    pagePath: "/pages/index/main",
                    iconPath: "../../static/tabs/home-2.png",
                    selectedIconPath: "../../static/tabs/home-1.png",
                    size: 50

                },
                {
                    text: "消息",
                    pagePath: "/pages/msg/main",
                    iconPath: "../../static/tabs/bulb(2).png",
                    selectedIconPath: "../../static/tabs/bulb(1).png",
                    size: 50
                },
                {
                    text: "热门",
                    pagePath: "/pages/hot/main",
                    iconPath: "../../static/tabs/like.png ",
                    selectedIconPath: "../../static/tabs/like1.png",
                    size: 50
                },
                {
                    text: "我的 ",
                    pagePath: "/pages/center/main",
                    iconPath: "../../static/tabs/user(1).png ",
                    selectedIconPath: "../../static/tabs/user.png ",
                    size: 50
                }
            ],

        }
    },

    attached() {},
    methods: {
        switchTab(item, index) {

            wx.switchTab({
                url: item.pagePath
            })

            //this.selected = index

        }
    }
}
</script>

<style lang="scss" scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: white;
    display: flex;
    padding-bottom: 5px;
    box-shadow: 0px -4px 6px 0px rgba(36, 37, 37, 0.08)
}

.tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
}

.tab-bar-item cover-image {
    width: 27px;
    height: 27px;
}

.tab-bar-item cover-view {
    font-size: 10px;
}
</style>
