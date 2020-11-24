<template>
  <div>
  <scroll-view scroll-x>
  <block>
  <view v-for="(item,index) in tokenLines" :key="index">
<text class="line-number">{{i+index}}</text>
</view>
  </div>
</template>

<script type="text/javascript">

export default {

  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
</style>
