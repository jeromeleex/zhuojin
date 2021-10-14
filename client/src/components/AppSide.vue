<template>
  <div id="AppSide">
    <!--个人信息-->
    <Personal></Personal>

    <!--用于固定定位-->
    <div
      class="fixed"
      :class="{
        true: ifFixed
      }"
    >
      <!--热门文章-->
      <HotArticle></HotArticle>
      <!--最近访客-->
      <Visitor></Visitor>
    </div>
  </div>
</template>

<script>
import Personal from "@/components/AppSide/Personal";
import HotArticle from "@/components/AppSide/HotArticle";
import Visitor from "@/components/AppSide/Visitor";

export default {
  name: "AppSide",
  data() {
    return {
      ifFixed: ""
    }
  },
  components: {
    Personal, HotArticle, Visitor
  },
  methods: {
    /*很久滚动高度检测要不要加上固定定位*/
    scrollEventFn() {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      this.ifFixed = scrollTop >= 240 ? 'true' : ''
    }
  },
  mounted() {
    //手动触发一次，然后再监听事件
    this.scrollEventFn()
    window.addEventListener("scroll",this.scrollEventFn)
  }
}
</script>

<style lang="less" scoped>
#AppSide {
  width: 270px;

  .fixed.true {
    position: fixed;
    top: 65px;
    width: 270px;
  }
}
</style>














