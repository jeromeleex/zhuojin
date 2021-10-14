<template>
  <!--头部导航-->
  <AppNav></AppNav>

  <!--内容部分-->
  <div id="main">
    <!--左侧边栏-->
    <div class="app-side">
      <AppSide></AppSide>
    </div>

    <!--路由页面-->
    <router-view></router-view>
  </div>
  <div class="beian"><img src="./assets/beian.png" alt=""><a href="http://beian.miit.gov.cn" target="_blank" >赣ICP备2021005452号</a>  </div>
  
</template>

<script>
import AppNav from "@/components/AppNav";
import AppSide from "@/components/AppSide";
import {mapMutations} from "vuex";

export default {
  components: {
    AppNav, AppSide
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
  },
  async created() {
    //检测用户是否登录
    let {data} = await this.$axios({
      method: "post",
      url: "/login/check"
    })
    if (data.code)return

    //代表已经登录
    this.updateUserInfo(data.data)
  }
}
</script>

<style lang="less">

@import './assets/css/reset.css';
@import './assets/css/font.css';
@import './assets/css/font/iconfont.css';

/*自定义滚动条*/
::-webkit-scrollbar { /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 167, 232, .3);
}

::-webkit-scrollbar-track { /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #EDEDED;
}

body {
  // background: url("./assets/img/bg/bg-left.png") no-repeat left 50px,
  // url("./assets/img/bg/bg-right.png") no-repeat right 50px;
  background:url("./assets/img/bj2.jpg") 100%;
  background-color: #f2f2f2;
  user-select: none;
}

#app {
  padding-top: 65px;
}

#main {
  display: flex;
  box-sizing: border-box;
  max-width: 1300px;
  padding: 0 15px;
  margin: 0 auto 0;

  .m-right {
    flex: 1;
  }
  .app-side{
    width: 270px;
    margin-right: 15px;
  }
}
div.beian{
    
    text-align: center;
    position: absolute;
    left:45%;
    a{
    width: 100%;
    text-align: center;
    color:#000;
    text-decoration: none;
  }
}
</style>
