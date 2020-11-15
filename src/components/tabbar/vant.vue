!<template>
<van-tabs :active="activeTab" class="custom-tab">
    <van-tab title="首页" @click="test()">内容 1</van-tab>
    <van-tab title=" 提问">内容 2</van-tab>
    <van-tab title="建议">内容 3</van-tab>
    <van-tab title="分享">内容 4</van-tab>
    <van-tab title="讨论">内容 5</van-tab>

</van-tabs>
</template>

<script>
export default {
    props: ['active'],
    methods: {
        onChange(event) {
            this.acitve = event.mp.detail
            wx.swichTab({
                url: list[this.active]
            })
        },

    },

    data() {
        return {
            list: [
                '/pages/index/main',
                '/pages/msg/main',
                '/pages/hot/main',
                '/pages/center/main'
            ]

        }
    },

}
</script>

<style lang="scss">
.item {
    text-align: center;
    align-self: flex-end;
    padding-bottom: 5px;

    div {
        padding-top: 5px
    }
}

.custom-tab {
    --tabs-bottom-bar-color: #99CCFF;
    --tab-active-text-color: #99CCFF;
}
</style>
