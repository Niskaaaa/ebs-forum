<template>
<!--miniprogram/custom-tab-bar/index.wxml-->
<cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view v-for="(item,index) in list" :key="index" class="tab-bar-item" :data-path="item.pagePath" :data-index=" index" @click="switchTab">
        <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath"></cover-image>
        <cover-view :style="{'color': selected === index ? selectedColor : color}">{{item.text}}</cover-view>
    </cover-view>
</cover-view>
</template>

<script>
export default {
    name: 'tab-bar',
    data() {
        return {
            selected: 0,
            color: "#7A7E83",
            selectedColor: "#3cc51f",
            list2: [1, 2, 3, 4, 5],
            list: [{
                    text: "首页",
                    pagePath: "pages/index/main",
                    iconPath: "../../static/tabs/home-2.png",
                    selectedIconPath: "../../static/tabs/home-1.png"
                },
                {
                    text: "消息",
                    pagePath: "pages/index/main",
                    iconPath: "../../static/tabs/bulb(2).png",
                    selectedIconPath: "../../static/tabs/bulb(1).png"
                },
                {
                    text: "热门",
                    pagePath: "pages / index / main ",
                    iconPath: "../../static/tabs/like.png ",
                    selectedIconPath: "../../static/tabs/like1.png"
                },
                {
                    text: "我的 ",
                    pagePath: "pages/index/main",
                    iconPath: "../../static/tabs/user(1).png ",
                    selectedIconPath: "../../static/tabs/user.png "
                }
            ],

        }
    },

    attached() {},
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({
                url
            })

            this.selected = data.index

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
    padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
    background-color: rgba(0, 0, 0, 0.33);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
}

.tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
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
