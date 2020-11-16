<template>
  <div>
    <div class="search" :style="{'padding-top':barHeight+'px'}">
        <van-search :value="value" shape="round" placeholder="请输入搜索关键词" />
    </div>

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
.search {
    width: 60%;
    --search-padding: 0;
    padding-left: 25px;
    padding-bottom: 8.5px;

    @media (max-width: 320px) {
        width: 50%;
    }
}
</style>
