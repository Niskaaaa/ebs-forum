<template>
<div>hot
   <svg-icon icon-class="advise" />
    <tab-bar :selected="2"></tab-bar>
</div>
</template>

<script>
import tabBar from '../../components/tabbar/index'
export default {
    name: "app",
    data() {
        return {

        }
    },
    components: {
        tabBar,
    }
}
</script>

<style lang="scss" scoped>
</style>
