<template>
  <div>
    detail
  </div>
</template>

<script type="text/javascript">
import {getDetail} from '../../api/content'
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
      if(res.code===200)
      this.page=res.data})

    console.log(page)
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
</style>
